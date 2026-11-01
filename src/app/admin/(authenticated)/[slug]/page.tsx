import { notFound } from "next/navigation";
import { getFolderBySlug, getImagesByFolderId } from "@/lib/db";
import { UploadForm } from "./UploadForm";

export const dynamic = "force-dynamic";

export default async function AdminFolderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const folder = await getFolderBySlug(slug);
  if (!folder) notFound();

  const images = await getImagesByFolderId(folder.id);

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      <div>
        <a href="/admin" className="hover:underline text-sm">
          &larr; all folders
        </a>
        <h1 className="text-xl mt-2">{folder.name}</h1>
      </div>

      <form
        action={`/api/admin/folders/${folder.id}/description`}
        method="post"
        className="flex flex-col gap-2"
      >
        <label htmlFor="description" className="text-lg">
          Text
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={folder.description}
          placeholder="Text shown at the top of this folder's page"
          className="border border-foreground/20 px-3 py-2 bg-transparent"
        />
        <button
          type="submit"
          className="self-start border border-foreground/20 px-3 py-2 hover:underline cursor-pointer"
        >
          Save text
        </button>
      </form>

      <UploadForm folderId={folder.id} />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="flex flex-col gap-2">
            <img
              src={image.url}
              alt={image.alt || folder.name}
              className="w-full h-auto"
            />
            <form action={`/api/admin/images/${image.id}/delete`} method="post">
              <button
                type="submit"
                className="text-red-600 hover:underline text-sm cursor-pointer"
              >
                delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
