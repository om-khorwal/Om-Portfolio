"use client";
import { useEffect, useRef, useState } from "react";

const SAMPLE_IMAGE_PATH = "/mnt/data/5494a3ad-9c77-4665-af34-480945b3fcd4.png";

// API resolution (unchanged)
const resolveApi = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || window.location.origin;
  }
  return process.env.NEXT_PUBLIC_API_URL;
};

export default function BgRemove() {
  const [mode, setMode] = useState<"pencil" | "eraser">("pencil");
  const [brush, setBrush] = useState(48);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null); // hidden loader only
  const fileRef = useRef<File | null>(null);

  const baseCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null); // square container

  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const rafId = useRef<number | null>(null);

  const maskElemRef = useRef<HTMLCanvasElement | null>(null);
  const maskCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const baseCanvas = () => baseCanvasRef.current;
  const maskCanvas = () => maskCanvasRef.current;
  const displayCanvas = () => displayCanvasRef.current;

  // --- Helper: set CSS size of canvases to fill the square container ---
  function updateCanvasCssSizesToContainer() {
    const cont = containerRef.current;
    const b = baseCanvas();
    const m = maskCanvas();
    const d = displayCanvas();
    if (!cont || !b || !m || !d) return;

    const rect = cont.getBoundingClientRect();
    // container is square; pick the minimum to be safe
    const displayPx = Math.max(1, Math.floor(Math.min(rect.width, rect.height)));

    // set CSS width/height so canvases visually fit the square
    [b, m, d].forEach((c) => {
      c.style.width = `${displayPx}px`;
      c.style.height = `${displayPx}px`;
    });

    // schedule redraw
    requestComposite();
  }

  // Fit internal canvas sizes to the image natural size (keeps mask coordinates correct)
  function fitCanvases(img: HTMLImageElement) {
    const b = baseCanvas();
    const m = maskCanvas();
    const d = displayCanvas();
    if (!b || !m || !d) return;

    const w = img.naturalWidth || 800;
    const h = img.naturalHeight || 800;

    // Make the internal pixel sizes reflect the image's native size (so mask painting uses image pixels)
    b.width = m.width = d.width = w;
    b.height = m.height = d.height = h;

    // draw original full image into base (so user sees it in composite)
    const bctx = b.getContext("2d");
    if (bctx) {
      bctx.clearRect(0, 0, w, h);
      bctx.drawImage(img, 0, 0, w, h);
    }

    // clear mask
    const mctx = m.getContext("2d");
    if (mctx) {
      mctx.clearRect(0, 0, m.width, m.height);
      mctx.lineCap = "round";
      mctx.lineJoin = "round";
    }

    // Ensure canvas CSS sizes match container (calls composite)
    updateCanvasCssSizesToContainer();
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

  async function autoRemoveBgAndShow(file: File) {
    try {
      const form = new FormData();
      form.append("file", file);
      const resp = await fetch("/api/remove-bg", { method: "POST", body: form });
      if (!resp.ok) throw new Error(await resp.text());
      const blob = await resp.blob();
      setResultUrl(URL.createObjectURL(blob));
      const remImg = await blobToImage(blob);

      const b = baseCanvas();
      if (!b) return;
      const bctx = b.getContext("2d");
      if (!bctx) return;

      // draw refined image into base canvas at native base size
      bctx.clearRect(0, 0, b.width, b.height);
      // preserve aspect: draw remImg scaled to base dims
      bctx.drawImage(remImg, 0, 0, b.width, b.height);

      requestComposite();
    } catch (err) {
      console.error("autoRemoveBg failed", err);
      alert("Auto background removal failed: " + (err as any).message);
    }
  }

  // Load image (from file or sample); imgRef is hidden loader only
  async function loadImageFromFile(file?: File, samplePath?: string) {
    const img = imgRef.current;
    if (!img) return;
    if (file) {
      fileRef.current = file;
      img.src = URL.createObjectURL(file);
      await new Promise((res) => (img.onload = res));
      fitCanvases(img);
      // run auto remove but don't rely on it to size the preview
      await autoRemoveBgAndShow(file);
    } else if (samplePath) {
      const r = await fetch(samplePath);
      const b = await r.blob();
      const f = new File([b], "sample.png", { type: b.type });
      fileRef.current = f;
      img.src = URL.createObjectURL(b);
      await new Promise((res) => (img.onload = res));
      fitCanvases(img);
      await autoRemoveBgAndShow(f);
    }
  }

  function getPosFromEvent(e: PointerEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    // canvas.width is internal pixel width (image native). rect.width is CSS display width.
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

  // Setup pointer drawing on mask (unchanged logic but ensure maskCtxRef is warmed)

  useEffect(() => {
  const initialElem = maskCanvasRef.current;
  if (!initialElem) return;

  // store to stable refs for handlers to reference
  maskElemRef.current = initialElem;

  const ctx = initialElem.getContext("2d");
  if (!ctx) return;
  maskCtxRef.current = ctx;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  function down(e: PointerEvent) {
    const m = maskElemRef.current!;
    const c = maskCtxRef.current!;
    drawing.current = true;
    try { m.setPointerCapture(e.pointerId); } catch {}
    last.current = getPosFromEvent(e, m);
    c.beginPath();
    c.fillStyle = mode === "pencil" ? "white" : "black";
    c.arc(last.current!.x, last.current!.y, brush / 2, 0, Math.PI * 2);
    c.fill();
    requestComposite();
  }

  function move(e: PointerEvent) {
    if (!drawing.current) return;
    const m = maskElemRef.current!;
    const c = maskCtxRef.current!;
    const pos = getPosFromEvent(e, m);
    c.strokeStyle = mode === "pencil" ? "white" : "black";
    c.lineWidth = brush;
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
      try { m.releasePointerCapture(e.pointerId); } catch {}
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
  // intentionally not listing mode/brush to avoid reattaching listeners frequently;
  // if you want handlers to capture latest mode/brush, include them in deps.
}, [/* you can add mode, brush here if you want listeners re-bound */]);

  // Composite: draw base onto display, overlay mask visualisation
  function compositeAndPreview() {
    const b = baseCanvas();
    const m = maskCanvas();
    const d = displayCanvas();
    if (!b || !m || !d) return;
    const bctx = b.getContext("2d");
    const mctx = m.getContext("2d");
    const dctx = d.getContext("2d");
    if (!bctx || !mctx || !dctx) return;

    // Clear display
    dctx.clearRect(0, 0, d.width, d.height);

    // draw base scaled to display's internal pixel dimensions
    // NOTE: display canvas internal pixel size equals b.width/b.height (we set that in fitCanvases),
    // and the CSS size is square; drawImage will preserve aspect and be scaled when shown on screen.
    dctx.drawImage(b, 0, 0, d.width, d.height);

    // create tmp to render mask-colors
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

  function clearMask() {
    const m = maskElemRef.current ?? maskCanvasRef.current;
    const c = maskCtxRef.current;
    if (!m || !c) return;
    c.clearRect(0, 0, m.width, m.height);
    requestComposite();
  }

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
      const maskBlob = await new Promise<Blob | null>((res) => m.toBlob((b) => res(b), "image/png"));
      if (!maskBlob) throw new Error("Mask export failed");
      const form = new FormData();
      form.append("file", fileRef.current);
      form.append("mask", maskBlob, "mask.png");
      const resp = await fetch("/api/remove-bg-refine", { method: "POST", body: form });
      if (!resp.ok) throw new Error(await resp.text());
      const out = await resp.blob();
      setResultUrl(URL.createObjectURL(out));
      const refined = await blobToImage(out);
      const b = baseCanvas();
      if (b) {
        const bctx = b.getContext("2d");
        if (bctx) {
          bctx.clearRect(0, 0, b.width, b.height);
          bctx.drawImage(refined, 0, 0, b.width, b.height);
        }
      }
      requestComposite();
    } catch (err: any) {
      alert("Error: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  }

  // Resize observer: keep the visible square sized responsively
  useEffect(() => {
    const cont = containerRef.current;
    if (!cont) return;
    const ro = new ResizeObserver(() => {
      updateCanvasCssSizesToContainer();
    });
    ro.observe(cont);
    // initial update
    updateCanvasCssSizesToContainer();
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] p-4 md:p-6 lg:p-10 flex flex-col gap-6">
      {/* header unchanged */}
      <header className="w-full max-w-7xl mx-auto glass rounded-lg shadow-lg px-4 py-5 md:px-6 md:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="animated-gradient text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-2 text-white">
            Remove image backgrounds — editable mask
          </h1>
          <p className="mt-1 text-xs sm:text-sm md:text-sm text-gray-300 max-w-2xl">
            Upload an image and the server will automatically remove the background. Refine the result with
            the pencil (keep) and eraser (remove) tools, then click <span className="font-semibold">Refine</span> to
            produce a production-ready transparent PNG.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div>
              <div className="text-xs text-gray-400">Speed</div>
              <div className="text-white font-medium">Automatic removal in seconds</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Control</div>
              <div className="text-white font-medium">Editable mask — pencil & eraser</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Quality</div>
              <div className="text-white font-medium">Server-side refine for original-pixel output</div>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-400">Tip: Use a smaller brush for hair/fur and fine edges.</p>
        </div>

        <div className="flex-shrink-0 flex flex-row md:flex-col items-stretch gap-3">
          <button
            onClick={() => {
              const inp = document.querySelector('input[type="file"]') as HTMLInputElement | null;
              if (inp) inp.click();
            }}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-medium shadow"
            title="Upload image"
            aria-label="Upload image"
          >
            Upload image
          </button>
        </div>
      </header>

      {/* Main area */}
      <main className="w-full max-w-7xl mx-auto bg-gradient-to-br from-white/4 to-white/6 rounded-2xl p-4 md:p-6 border border-white/6 shadow-lg flex flex-col md:flex-row gap-6">
        {/* Left: controls + square canvas area */}
        <div className="flex-1 min-w-0 order-2 md:order-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
            <label className="inline-flex items-center gap-2 px-3 py-2 rounded bg-[#101010] cursor-pointer border border-white/6">
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
              <span className="text-sm text-gray-200">Upload</span>
            </label>

            <button onClick={() => clearMask()} className="inline-flex items-center gap-2 px-3 py-2 rounded bg-[#141414] text-gray-200 border border-white/6 ml-0 sm:ml-2">
              Clear
            </button>

            <div className="ml-auto flex items-center gap-4 text-sm text-gray-300">
              <label className="hidden sm:block">Brush</label>
              <input
                type="range"
                min={4}
                max={200}
                value={brush}
                onChange={(e) => setBrush(Number(e.target.value))}
                className="w-36 sm:w-48"
              />
              <div className="text-xs text-gray-300 w-14 text-right">{brush}px</div>
            </div>
          </div>

          {/* SQUARE CONTAINER */}
          <div
            ref={containerRef}
            className="relative border border-white/8 rounded overflow-hidden bg-black w-full max-w-full"
            style={{
              aspectRatio: "1 / 1",
              minHeight: "260px",
              maxHeight: "80vh",
            }}
          >
            {/* Hidden loader image only (no duplicate visible img) */}
            <img ref={imgRef} alt="loader" style={{ display: "none" }} />

            {/* display canvas (visible) */}
            <canvas
              ref={displayCanvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ background: "transparent", touchAction: "none" }}
            />

            {/* base canvas (offscreen for image data, keep hidden visually) */}
            <canvas ref={baseCanvasRef} style={{ display: "none" }} />

            {/* mask canvas (visible for drawing) */}
            <canvas
              ref={maskCanvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ cursor: "crosshair", background: "transparent" }}
            />
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => setMode("pencil")}
              aria-label="Keep (pencil)"
              className={`p-2 rounded ${mode === "pencil" ? "bg-green-600 text-white" : "bg-white/5 text-gray-200"}`}
              title="Keep (pencil)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 21l3-1 11-11 2-2a2.8 2.8 0 0 0 0-4l-2-2a2.8 2.8 0 0 0-4 0l-2 2L3 16v5z" />
              </svg>
            </button>

            <button
              onClick={() => setMode("eraser")}
              aria-label="Remove (eraser)"
              className={`p-2 rounded ${mode === "eraser" ? "bg-red-600 text-white" : "bg-white/5 text-gray-200"}`}
              title="Remove (eraser)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M21 15L9 3 3 9l12 12 6-6z" />
              </svg>
            </button>

            <button onClick={() => sendForRefine()} disabled={loading || !fileRef.current} className={`ml-auto px-4 py-2 rounded ${loading ? "bg-gray-500 text-white" : "bg-emerald-500 text-white"}`}>
              {loading ? "Processing..." : "Refine"}
            </button>
          </div>
        </div>

        {/* Right: result + download */}
        <aside className="order-1 md:order-2 w-full md:w-96 lg:w-[26rem] shrink-0">
          <div className="mb-4">
            <div className="text-xs text-gray-300 mb-2">Result</div>

            <div className="bg-[#0a0a0a] border border-white/6 rounded p-2 h-56 md:h-64 flex items-center justify-center overflow-hidden">
              {resultUrl ? (
                <img src={resultUrl} alt="result" className="max-w-full max-h-full object-contain rounded" />
              ) : (
                <div className="text-gray-500 text-sm">No result yet</div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href={resultUrl ?? "#"}
              download={resultUrl ? "result.png" : undefined}
              className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${!resultUrl ? "opacity-50 pointer-events-none" : ""}`}
            >
              Download Result
            </a>
          </div>

          <div className="mt-4 text-xs text-gray-400">Tip: Upload → auto-removed → edit → Refine to apply edits.</div>
        </aside>
      </main>
    </div>
  );
}
