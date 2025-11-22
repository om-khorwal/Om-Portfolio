export const runtime = "edge";

export async function POST(req: Request) {
  const formData = await req.formData();

  const backend = "http://52.90.160.137:8000/remove-bg";

  const response = await fetch(backend, {
    method: "POST",
    body: formData,
  });

  const blob = await response.blob();

  return new Response(blob, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
