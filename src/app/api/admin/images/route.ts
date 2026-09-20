import { NextResponse } from "next/server";
import { addImage } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { folderId, url, pathname, alt } = body ?? {};

  if (!folderId || !url || !pathname) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const image = await addImage({
    folderId: Number(folderId),
    url: String(url),
    pathname: String(pathname),
    alt: typeof alt === "string" ? alt : "",
  });

  return NextResponse.json({ image });
}
