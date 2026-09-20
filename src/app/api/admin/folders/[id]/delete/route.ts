import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { deleteFolder, getImagesByFolderId } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const folderId = Number(id);

  const images = await getImagesByFolderId(folderId);
  if (images.length > 0) {
    await del(images.map((image) => image.url));
  }
  await deleteFolder(folderId); // images cascade via FK

  return NextResponse.redirect(new URL("/admin", request.url), { status: 303 });
}
