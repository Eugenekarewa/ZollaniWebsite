import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) return new NextResponse("Missing image URL", { status: 400 });

  let source: URL;
  try {
    source = new URL(url);
  } catch {
    return new NextResponse("Invalid image URL", { status: 400 });
  }

  if (source.hostname !== "ibb.co" && !source.hostname.endsWith(".ibb.co")) {
    return NextResponse.redirect(source);
  }

  const response = await fetch(source, { headers: { "User-Agent": "Mozilla/5.0" }, cache: "no-store", signal: AbortSignal.timeout(5000) });
  if (!response.ok) return new NextResponse("Image not found", { status: 404 });
  const html = await response.text();
  const match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (!match?.[1]) return new NextResponse("Direct image URL required", { status: 422 });
  return NextResponse.redirect(match[1].replaceAll("&amp;", "&"));
}
