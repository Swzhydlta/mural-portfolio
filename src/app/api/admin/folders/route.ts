import { NextResponse } from "next/server";
import { createFolder } from "@/lib/db";
import { slugify } from "@/lib/slug";

function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "23505"
  );
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();

  if (name) {
    const baseSlug = slugify(name) || "folder";
    let slug = baseSlug;
    let suffix = 2;

    for (;;) {
      try {
        await createFolder(name, slug);
        break;
      } catch (err) {
        if (!isUniqueViolation(err)) throw err;
        slug = `${baseSlug}-${suffix++}`;
      }
    }
  }

  return NextResponse.redirect(new URL("/admin", request.url), { status: 303 });
}
