import Image from "next/image";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  return (
    <div className="mt-16 grid gap-6">
      {images.map((image, index) => (
        <div
          key={image}
          className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950 shadow-sm"
        >
          <Image
            src={image}
            alt={`${title} project image ${index + 1}`}
            fill
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
