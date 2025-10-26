export const config = { runtime: "edge" };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get("placeId");
  if (!placeId) return new Response("missing placeId", { status: 400 });

  const key = process.env.GOOGLE_PLACES_API_KEY!;
  const fields = "displayName,formattedAddress,rating,userRatingCount";
  const url = `https://places.googleapis.com/v1/places/${placeId}?key=${key}&fields=${fields}`;

  const r = await fetch(url);
  return new Response(r.body, { headers: { "content-type": "application/json" }});
}
