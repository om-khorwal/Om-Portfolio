export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "25mb",
  },
};

export const runtime = "nodejs";

export async function POST(req: Request) {
  const formData = await req.formData();

  const backend = "http://52.90.160.137:8000/remove-bg-refine";

  const resp = await fetch(backend, {
    method: "POST",
    body: formData,
  });

  return new Response(await resp.blob(), {
    headers: { "Content-Type": "image/png" },
  });
}
