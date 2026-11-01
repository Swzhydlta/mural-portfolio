import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { getFolderBySlug, getImagesByFolderId } from "@/lib/db";

export default async function WorkFolderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const folder = await getFolderBySlug(slug);
  if (!folder) notFound();

  const images = await getImagesByFolderId(folder.id);

  return (
    <div>
      <header>
        {folder.description && (
          <p className="whitespace-pre-wrap max-w-2xl text-left text-sm px-4 py-6">
            {folder.description}
          </p>
        )}
      </header>
      <main>
        <Gallery
          images={images.map((image) => ({
            src: image.url,
            alt: image.alt || folder.name,
          }))}
        />
      </main>
      <footer></footer>
    </div>
  );
}
