import { NextResponse } from "next/server";
import { getFolderById, updateFolderDescription } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const folder = await getFolderById(Number(id));
  if (!folder) {
    return NextResponse.json({ error: "Folder not found" }, { status: 404 });
  }

  const formData = await request.formData();
  const description = String(formData.get("description") ?? "").trim();
  await updateFolderDescription(folder.id, description);

  return NextResponse.redirect(new URL(`/clouds/${folder.slug}`, request.url), {
    status: 303,
  });
}
