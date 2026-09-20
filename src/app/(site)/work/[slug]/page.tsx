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
      <header></header>
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
