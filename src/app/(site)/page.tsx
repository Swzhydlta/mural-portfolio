import { Gallery } from "@/components/Gallery";

const images = [
  { src: "seapoint.jpg", alt: "seapoint" },
  { src: "aspen.jpg", alt: "aspen" },
  { src: "bridge.jpg", alt: "bridge" },
  { src: "caydon.jpg", alt: "caydon" },
  { src: "benjoe.jpg", alt: "benjoe" },
  { src: "field.jpg", alt: "field" },
  { src: "lemons.jpg", alt: "lemons" },
  { src: "nicci.jpg", alt: "nicci" },
  { src: "river.jpg", alt: "river" },
  { src: "steps.jpg", alt: "steps" },
];

export default function Home() {
  return (
    <div>
      <header></header>
      <main>
        <Gallery images={images} />
      </main>
      <footer></footer>
    </div>
  );
}
