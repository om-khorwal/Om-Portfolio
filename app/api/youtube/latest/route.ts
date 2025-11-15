import { NextResponse } from "next/server";
import xml2js from "xml2js";

export async function GET() {
  const CHANNEL_ID = process.env.YT_CHANNEL_ID;

  if (!CHANNEL_ID) {
    return NextResponse.json({ error: "Missing YT_CHANNEL_ID" }, { status: 500 });
  }

  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

  const xml = await fetch(feedUrl).then((r) => r.text());

  const json = await xml2js.parseStringPromise(xml);

  const items = json.feed.entry?.map((e: any) => ({
    id: e["yt:videoId"][0],
    title: e.title[0],
    url: e.link[0].$.href,
    publishedAt: e.published[0],
    thumbnail: `https://img.youtube.com/vi/${e["yt:videoId"][0]}/hqdefault.jpg`,
    category: "Video", // RSS cannot detect shorts but still works
  })) || [];

  return NextResponse.json({ items });
}
