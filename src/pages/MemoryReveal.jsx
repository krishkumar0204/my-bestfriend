import { useState } from "react";
import Ribbon from "../components/Ribbon";
import PhotoGallery from "./PhotoGallery";

const photoModules = import.meta.glob("../assets/photos/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const photos = Object.entries(photoModules)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([, photo]) => photo);

export default function MemoryReveal({ onBack }) {
  const [showPhotos, setShowPhotos] = useState(false);

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-12">
      <button
        type="button"
        onClick={onBack}
        className="absolute left-5 top-5 rounded-full bg-white/80 px-5 py-2 font-semibold text-pink-500 shadow-lg backdrop-blur transition hover:bg-pink-100"
      >
        Back
      </button>

      {!showPhotos ? (
        <Ribbon onOpen={() => setShowPhotos(true)} />
      ) : (
        <PhotoGallery photos={photos} />
      )}
    </section>
  );
}
