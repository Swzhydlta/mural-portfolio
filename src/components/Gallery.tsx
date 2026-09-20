export type GalleryImage = {
  src: string;
  alt: string;
};

export function Gallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="flex flex-col w-full items-center">
      {images.map((image) => (
        <img key={image.src} src={image.src} alt={image.alt} />
      ))}
    </div>
  );
}
