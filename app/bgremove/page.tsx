// page.tsx
"use client";
import { useEffect, useRef, useState } from "react";

// config
const SAMPLE_IMAGE_PATH = "/mnt/data/5494a3ad-9c77-4665-af34-480945b3fcd4.png";
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const MAX_DIMENSION = 2048;
const MIN_JPEG_QUALITY = 0.5;

// api resolver
const resolveApi = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || window.location.origin;
  }
  return process.env.NEXT_PUBLIC_API_URL;
};

// helper: image & compression
async function fileToImage(file: File): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = (e) => rej(e);
    img.src = URL.createObjectURL(file);
  });
}

async function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob> {
  return await new Promise((res) => {
    canvas.toBlob((b) => res(b as Blob), type, quality);
  });
}

async function compressImageFile(
  origFile: File,
  maxBytes = MAX_UPLOAD_BYTES
): Promise<File> {
  try {
    if (origFile.size <= maxBytes) return origFile;

    const img = await fileToImage(origFile);
    let { width, height } = img;
    let scale = 1;
    if (Math.max(width, height) > MAX_DIMENSION) {
      scale = MAX_DIMENSION / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return origFile;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    let quality = 0.92;
    let blob = await canvasToBlob(canvas, "image/jpeg", quality);

    while (blob.size > maxBytes && quality > MIN_JPEG_QUALITY) {
      quality = Math.max(MIN_JPEG_QUALITY, quality - 0.12);
      blob = await canvasToBlob(canvas, "image/jpeg", quality);
    }

    let downscaleAttempts = 0;
    while (blob.size > maxBytes && downscaleAttempts < 4) {
      downscaleAttempts++;
      const factor = 0.8;
      width = Math.round(width * factor);
      height = Math.round(height * factor);
      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      blob = await canvasToBlob(canvas, "image/jpeg", quality);
    }

    if (blob.size <= 0) return origFile;

    const compressedFile = new File([blob], deriveCompressedName(origFile.name), {
      type: blob.type,
    });
    return compressedFile;
  } catch (err) {
    console.warn("compressImageFile failed, returning original file:", err);
    return origFile;
  }
}

function deriveCompressedName(name: string) {
  const parts = name.split(".");
  if (parts.length === 1) return `${name}-compressed.jpg`;
  const ext = parts.pop();
  return `${parts.join(".")}-compressed.jpg`;
}

// component
export default function BgRemove() {
  const [mode, setMode] = useState<"pencil" | "eraser">("pencil");
  const [brush, setBrush] = useState(48);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [hasImage, setHasImage] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileRef = useRef<File | null>(null);

  const baseCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const rafId = useRef<number | null>(null);

  const maskElemRef = useRef<HTMLCanvasElement | null>(null);
  const maskCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const brushRef = useRef<number>(brush);
  const modeRef = useRef<"pencil" | "eraser">(mode);

  const baseCanvas = () => baseCanvasRef.current;
  const maskCanvas = () => maskCanvasRef.current;
  const displayCanvas = () => displayCanvasRef.current;

  // sizing and fit
  function updateCanvasCssSizesToContainer() {
    const cont = containerRef.current;
    const b = baseCanvas();
    const m = maskCanvas();
    const d = displayCanvas();
    if (!cont || !b || !m || !d) return;

    const rect = cont.getBoundingClientRect();
    const maxSize = Math.min(rect.width, rect.height);

    const iw = b.width;
    const ih = b.height;
    if (!iw || !ih) return;

    const scale = Math.min(maxSize / iw, maxSize / ih);
    const displayW = iw * scale;
    const displayH = ih * scale;
    const left = (rect.width - displayW) / 2;
    const top = (rect.height - displayH) / 2;

    [displayCanvas(), maskCanvas()].forEach((c) => {
      if (!c) return;
      c.style.width = `${displayW}px`;
      c.style.height = `${displayH}px`;
      c.style.left = `${left}px`;
      c.style.top = `${top}px`;
    });
  }

  function fitCanvases(img: HTMLImageElement) {
    const b = baseCanvas();
    const m = maskCanvas();
    const d = displayCanvas();
    if (!b || !m || !d) return;

    const w = img.naturalWidth || 800;
    const h = img.naturalHeight || 800;

    b.width = w;
    b.height = h;
    m.width = w;
    m.height = h;
    d.width = w;
    d.height = h;

    const bctx = b.getContext("2d");
    if (bctx) {
      bctx.clearRect(0, 0, w, h);
      bctx.drawImage(img, 0, 0, w, h);
    }

    const mctx = m.getContext("2d");
    if (mctx) {
      mctx.clearRect(0, 0, m.width, m.height);
      mctx.lineCap = "round";
      mctx.lineJoin = "round";
      mctx.lineWidth = brushRef.current;
    }

    updateCanvasCssSizesToContainer();
    requestComposite();
  }

  function blobToImage(blob: Blob) {
    return new Promise<HTMLImageElement>((res, rej) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = URL.createObjectURL(blob);
    });
  }

  // file size guard
  async function ensureFileUnderLimit(file: File) {
    if (!file) return file;
    if (file.size <= MAX_UPLOAD_BYTES) return file;
    const compressed = await compressImageFile(file, MAX_UPLOAD_BYTES);
    if (compressed.size < file.size) {
      console.info(
        `Compressed ${file.name} from ${Math.round(file.size / 1024)}KB to ${Math.round(
          compressed.size / 1024
        )}KB`
      );
      return compressed;
    }
    return file;
  }

  // server: initial auto remove
  async function autoRemoveBgAndShow(file: File) {
    try {
      setLoading(true);
      setResultUrl(null);

      const uploadFile = await ensureFileUnderLimit(file);
      fileRef.current = uploadFile;

      const form = new FormData();
      form.append("file", uploadFile);

      const resp = await fetch("/api/remove-bg", { method: "POST", body: form });
      if (!resp.ok) {
        const status = resp.status;
        const txt = await resp.text().catch(() => "");
        if (status === 413 || txt.toLowerCase().includes("entity too large")) {
          const moreCompressed = await compressImageFile(
            uploadFile,
            Math.min(MAX_UPLOAD_BYTES, 2 * 1024 * 1024)
          );
          if (moreCompressed.size < uploadFile.size) {
            const retryForm = new FormData();
            retryForm.append("file", moreCompressed);
            const retryResp = await fetch("/api/remove-bg", {
              method: "POST",
              body: retryForm,
            });
            if (!retryResp.ok)
              throw new Error(
                `Server error after retry: ${retryResp.status} ${await retryResp.text()}`
              );
            const blob = await retryResp.blob();
            setResultUrl(URL.createObjectURL(blob));
            fileRef.current = moreCompressed;
            requestComposite();
            return;
          }
        }
        throw new Error(txt || `Request failed with status ${resp.status}`);
      }

      const blob = await resp.blob();
      setResultUrl(URL.createObjectURL(blob));
      requestComposite();
    } catch (err) {
      console.error("autoRemoveBg failed", err);
      alert("Auto background removal failed: " + (err as any).message);
    } finally {
      setLoading(false);
    }
  }

  // load image into editor
  async function loadImageFromFile(file?: File, samplePath?: string) {
    const img = imgRef.current;
    if (!img) return;
    if (file) {
      const uploadFile = await ensureFileUnderLimit(file);
      fileRef.current = uploadFile;
      img.src = URL.createObjectURL(uploadFile);
      await new Promise((res) => (img.onload = res));
      fitCanvases(img);
      setHasImage(true);
      await autoRemoveBgAndShow(uploadFile);
    } else if (samplePath) {
      const r = await fetch(samplePath);
      const b = await r.blob();
      const f = new File([b], "sample.png", { type: b.type });
      fileRef.current = f;
      img.src = URL.createObjectURL(b);
      await new Promise((res) => (img.onload = res));
      fitCanvases(img);
      setHasImage(true);
      await autoRemoveBgAndShow(f);
    }
  }

  // drawing helpers
  function getPosFromEvent(e: PointerEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function requestComposite() {
    if (rafId.current != null) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      compositeAndPreview();
    });
  }

  // sync refs
  useEffect(() => {
    brushRef.current = brush;
    if (maskCtxRef.current) maskCtxRef.current.lineWidth = brush;
  }, [brush]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // pointer events on mask
  useEffect(() => {
    const initialElem = maskCanvasRef.current;
    if (!initialElem) return;

    maskElemRef.current = initialElem;

    const ctx = initialElem.getContext("2d");
    if (!ctx) return;
    maskCtxRef.current = ctx;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brushRef.current;

    function down(e: PointerEvent) {
      const m = maskElemRef.current!;
      const c = maskCtxRef.current!;
      drawing.current = true;
      try {
        m.setPointerCapture(e.pointerId);
      } catch {}
      last.current = getPosFromEvent(e, m);

      const currentBrush = brushRef.current;
      const currentMode = modeRef.current;

      c.beginPath();
      c.fillStyle = currentMode === "pencil" ? "white" : "black";
      c.arc(last.current!.x, last.current!.y, currentBrush / 2, 0, Math.PI * 2);
      c.fill();
      requestComposite();
    }

    function move(e: PointerEvent) {
      if (!drawing.current) return;
      const m = maskElemRef.current!;
      const c = maskCtxRef.current!;
      const pos = getPosFromEvent(e, m);

      const currentBrush = brushRef.current;
      const currentMode = modeRef.current;

      c.strokeStyle = currentMode === "pencil" ? "white" : "black";
      c.lineWidth = currentBrush;
      c.beginPath();
      if (last.current) c.moveTo(last.current.x, last.current.y);
      c.lineTo(pos.x, pos.y);
      c.stroke();
      last.current = pos;
      requestComposite();
    }

    function up(e: PointerEvent) {
      drawing.current = false;
      last.current = null;
      const m = maskElemRef.current;
      if (m) {
        try {
          m.releasePointerCapture(e.pointerId);
        } catch {}
      }
      requestComposite();
    }

    initialElem.addEventListener("pointerdown", down as any);
    initialElem.addEventListener("pointermove", move as any);
    window.addEventListener("pointerup", up as any);

    return () => {
      initialElem.removeEventListener("pointerdown", down as any);
      initialElem.removeEventListener("pointermove", move as any);
      window.removeEventListener("pointerup", up as any);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // composite editor preview
  function compositeAndPreview() {
    const b = baseCanvas();
    const m = maskCanvas();
    const d = displayCanvas();
    if (!b || !m || !d) return;
    const bctx = b.getContext("2d");
    const mctx = m.getContext("2d");
    const dctx = d.getContext("2d");
    if (!bctx || !mctx || !dctx) return;

    dctx.clearRect(0, 0, d.width, d.height);
    dctx.drawImage(b, 0, 0, d.width, d.height);

    const tmp = document.createElement("canvas");
    tmp.width = m.width;
    tmp.height = m.height;
    const tctx = tmp.getContext("2d");
    if (!tctx) return;
    tctx.clearRect(0, 0, tmp.width, tmp.height);
    tctx.drawImage(m, 0, 0);

    const md = tctx.getImageData(0, 0, tmp.width, tmp.height);
    const keepData = tctx.createImageData(md.width, md.height);
    const removeData = tctx.createImageData(md.width, md.height);

    for (let i = 0; i < md.data.length; i += 4) {
      const r = md.data[i];
      keepData.data[i] = 0;
      keepData.data[i + 1] = 200;
      keepData.data[i + 2] = 150;
      keepData.data[i + 3] = r;
      const inv = 255 - r;
      removeData.data[i] = 180;
      removeData.data[i + 1] = 60;
      removeData.data[i + 2] = 60;
      removeData.data[i + 3] = Math.round(inv * 0.28);
    }

    tctx.putImageData(keepData, 0, 0);
    dctx.save();
    dctx.globalAlpha = 0.35;
    dctx.drawImage(tmp, 0, 0, d.width, d.height);
    dctx.restore();

    tctx.putImageData(removeData, 0, 0);
    dctx.drawImage(tmp, 0, 0, d.width, d.height);
  }

  // mask tools
  function clearMask() {
    const m = maskElemRef.current ?? maskCanvasRef.current;
    const c = maskCtxRef.current;
    if (!m || !c) return;
    c.clearRect(0, 0, m.width, m.height);
    requestComposite();
  }

  // server: refine with mask
  async function sendForRefine() {
    if (!fileRef.current) {
      alert("Upload or use the sample image first.");
      return;
    }
    setLoading(true);
    setResultUrl(null);
    try {
      const m = maskElemRef.current ?? maskCanvasRef.current;
      if (!m) throw new Error("Mask not ready");
      const maskBlob = await new Promise<Blob | null>((res) =>
        m.toBlob((b) => res(b), "image/png")
      );
      if (!maskBlob) throw new Error("Mask export failed");

      const finalFile = await ensureFileUnderLimit(fileRef.current);
      fileRef.current = finalFile;

      const form = new FormData();
      form.append("file", finalFile);
      form.append("mask", maskBlob, "mask.png");
      const resp = await fetch("/api/remove-bg-refine", {
        method: "POST",
        body: form,
      });
      if (!resp.ok) {
        const status = resp.status;
        const txt = await resp.text().catch(() => "");
        if (status === 413 || txt.toLowerCase().includes("entity too large")) {
          const moreCompressed = await compressImageFile(
            finalFile,
            Math.min(MAX_UPLOAD_BYTES, 2 * 1024 * 1024)
          );
          if (moreCompressed.size < finalFile.size) {
            const retryForm = new FormData();
            retryForm.append("file", moreCompressed);
            retryForm.append("mask", maskBlob, "mask.png");
            const retryResp = await fetch("/api/remove-bg-refine", {
              method: "POST",
              body: retryForm,
            });
            if (!retryResp.ok)
              throw new Error(
                `Server error after retry: ${retryResp.status} ${await retryResp.text()}`
              );
            const out = await retryResp.blob();
            setResultUrl(URL.createObjectURL(out));
            fileRef.current = moreCompressed;
            requestComposite();
            return;
          }
        }
        throw new Error(txt || `Request failed with status ${resp.status}`);
      }

      const out = await resp.blob();
      setResultUrl(URL.createObjectURL(out));
      requestComposite();
    } catch (err: any) {
      alert("Error: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  }

  // layout resize
  useEffect(() => {
    const cont = containerRef.current;
    if (!cont) return;
    const ro = new ResizeObserver(() => {
      updateCanvasCssSizesToContainer();
    });
    ro.observe(cont);
    updateCanvasCssSizesToContainer();
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const currentModeLabel = mode === "pencil" ? "Keep" : "Remove";

  // ui
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#050509] to-[#050f15] p-4 md:p-6 lg:p-10 flex flex-col gap-6 text-white">
      <header className="w-full max-w-7xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-5 md:px-6 md:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_0_40px_rgba(0,0,0,0.65)]">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-2 bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
            Remove image backgrounds – editable mask
          </h1>
          <p className="mt-1 text-xs sm:text-sm md:text-sm text-gray-200/90 max-w-2xl">
            Upload an image and let the server remove the background automatically.
            Use the pencil to mark what to keep and the eraser to remove, then hit{" "}
            <span className="font-semibold">Refine</span> for a clean transparent PNG.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-2">
              <div className="text-[10px] uppercase tracking-wide text-gray-400">
                Speed
              </div>
              <div className="text-white font-medium">
                Automatic removal in seconds
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-2">
              <div className="text-[10px] uppercase tracking-wide text-gray-400">
                Control
              </div>
              <div className="text-white font-medium">
                Editable mask – pencil &amp; eraser
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-2">
              <div className="text-[10px] uppercase tracking-wide text-gray-400">
                Quality
              </div>
              <div className="text-white font-medium">
                Server-side refine at full resolution
              </div>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-gray-400">
            Tip: Use a smaller brush for hair, fur and detailed edges.
          </p>
        </div>

        <div className="flex-shrink-0 flex flex-row md:flex-col items-stretch gap-3">
          <button
            onClick={() => {
              const inp = document.querySelector(
                'input[type="file"]'
              ) as HTMLInputElement | null;
              if (inp) inp.click();
            }}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-medium shadow-lg shadow-emerald-500/25"
            title="Upload image"
            aria-label="Upload image"
          >
            Upload image
          </button>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto bg-black/40 rounded-2xl p-4 md:p-6 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <section className="flex-1 flex flex-col min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#111111] cursor-pointer border border-white/10 hover:border-emerald-400/60 transition">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    await loadImageFromFile(f);
                  }}
                />
                <span className="text-sm text-gray-100">Upload</span>
              </label>

              <button
                onClick={() => clearMask()}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#151515] text-gray-100 border border-white/10 hover:border-white/30 transition ml-0 sm:ml-2"
              >
                Clear mask
              </button>

              <div className="ml-auto flex items-center gap-3 text-sm text-gray-200 w-full sm:w-auto">
                <span className="hidden sm:inline text-xs text-gray-400">
                  Brush size
                </span>
                <input
                  type="range"
                  min={4}
                  max={200}
                  value={brush}
                  onChange={(e) => setBrush(Number(e.target.value))}
                  className="w-full sm:w-48 accent-emerald-500"
                />
                <div className="text-[11px] text-gray-300 w-16 text-right">
                  {brush}px
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  Editor
                </span>
                {hasImage && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                    Mode: <span className="font-semibold">{currentModeLabel}</span>
                  </span>
                )}
              </div>
              {loading && hasImage && (
                <span className="text-[10px] flex items-center gap-1 text-emerald-300">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Processing…
                </span>
              )}
            </div>

            <div
              ref={containerRef}
              className="relative border border-white/12 rounded-xl overflow-hidden bg-[#030303] w-full max-w-full"
              style={{
                aspectRatio: "1 / 1",
                minHeight: "260px",
                maxHeight: "80vh",
              }}
            >
              <img ref={imgRef} alt="loader" style={{ display: "none" }} />

              <canvas
                ref={displayCanvasRef}
                className="absolute"
                style={{ background: "transparent", touchAction: "none" }}
              />

              <canvas ref={baseCanvasRef} style={{ display: "none" }} />

              <canvas
                ref={maskCanvasRef}
                className="absolute"
                style={{ cursor: "crosshair", background: "transparent" }}
              />

              {loading && hasImage && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center gap-3 pointer-events-none">
                  <div className="h-10 w-10 border-2 border-emerald-400/70 border-t-transparent rounded-full animate-spin" />
                  <div className="text-xs text-gray-200">
                    Applying background removal…
                  </div>
                </div>
              )}

              {!hasImage && !loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-500 text-xs pointer-events-none">
                  <div className="h-16 w-16 rounded-xl border border-dashed border-gray-600/70 flex items-center justify-center">
                    <span className="text-[11px] text-gray-400">No image</span>
                  </div>
                  <div>Upload an image to start editing</div>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={() => setMode("pencil")}
                aria-label="Keep (pencil)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border ${
                  mode === "pencil"
                    ? "bg-emerald-600 text-white border-emerald-400"
                    : "bg-white/5 text-gray-200 border-white/10 hover:border-emerald-300/60"
                }`}
                title="Keep (pencil)"
              >
                <span className="inline-flex h-4 w-4 rounded-full bg-emerald-400/80" />
                Keep
              </button>

              <button
                onClick={() => setMode("eraser")}
                aria-label="Remove (eraser)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border ${
                  mode === "eraser"
                    ? "bg-red-600 text-white border-red-400"
                    : "bg-white/5 text-gray-200 border-white/10 hover:border-red-300/60"
                }`}
                title="Remove (eraser)"
              >
                <span className="inline-flex h-4 w-4 rounded-full bg-red-400/80" />
                Remove
              </button>

              <button
                onClick={() => sendForRefine()}
                disabled={loading || !fileRef.current}
                className={`ml-auto px-4 py-2 rounded-lg text-sm font-medium transition ${
                  loading || !fileRef.current
                    ? "bg-gray-600 text-white opacity-70 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-500 hover:to-cyan-400 shadow-lg shadow-emerald-500/25"
                }`}
              >
                {loading ? "Processing..." : "Refine"}
              </button>
            </div>
          </section>

          <section className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  Result
                </span>
                <span className="text-[11px] text-gray-500">
                  Transparent PNG preview
                </span>
              </div>
              {resultUrl && !loading && (
                <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-500/40">
                  Ready
                </span>
              )}
            </div>

            <div
              className="relative bg-[#050505] border border-white/10 rounded-xl overflow-hidden flex items-center justify-center w-full"
              style={{
                aspectRatio: "1 / 1",
                minHeight: "260px",
                maxHeight: "80vh",
              }}
            >
              {resultUrl ? (
                <img
                  src={resultUrl}
                  alt="result"
                  className="max-w-full max-h-full object-contain rounded"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-gray-500 text-xs px-4 text-center">
                  <div className="h-16 w-16 bg-[linear-gradient(45deg,#1f2933_25%,transparent_25%,transparent_50%,#1f2933_50%,#1f2933_75%,transparent_75%,transparent)] bg-[length:8px_8px] rounded-xl border border-white/5" />
                  <div>No result yet</div>
                  <div className="text-[11px] text-gray-500">
                    Upload an image and click <span className="font-semibold">Refine</span> to see
                    the final cut-out here.
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-col items-center gap-2">
              <a
                href={resultUrl ?? "#"}
                download={resultUrl ? "result.png" : undefined}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  resultUrl
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                    : "bg-gray-700 text-gray-300 opacity-60 cursor-not-allowed"
                }`}
              >
                Download result
              </a>
              <div className="text-[11px] text-gray-400 text-center">
                Flow: Upload → auto remove → edit with mask → Refine → Download.
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
