export const config = { runtime: "edge" };

export default async function handler(req: Request) {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  const { prompt } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY!;
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

  const r = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }]}] })
  });

  if (!r.ok) return new Response(await r.text(), { status: r.status });
  const data = await r.json();
  return new Response(JSON.stringify(data), { headers: { "content-type": "application/json" }});
}
