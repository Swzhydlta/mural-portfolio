import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { deleteImage, getFolderById, getImageById } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const imageId = Number(id);

  const image = await getImageById(imageId);
  if (!image) {
    return NextResponse.redirect(new URL("/admin", request.url), {
      status: 303,
    });
  }

  await del(image.url);
  await deleteImage(imageId);

  const folder = await getFolderById(image.folderId);
  const redirectPath = folder ? `/admin/${folder.slug}` : "/admin";
  return NextResponse.redirect(new URL(redirectPath, request.url), {
    status: 303,
  });
}
