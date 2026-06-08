import { motion } from "framer-motion";

const MotionDiv = motion.div;
const MotionImg = motion.img;

const captions = [
  "Gorgeous Smile",
  "Pure Cuteness",
  "Sweet Soul",
  "Beautiful Heart",
  "Golden Heart",
  "Pretty Vibes",
  "Cute Moments",
  "Best Smile",
  "So Lovely",
];

export default function PhotoGallery({ photos }) {
  const uniquePhotos = [...new Set(photos)];
  const galleryItems = uniquePhotos.map((photo, index) => ({
    caption: captions[index % captions.length],
    photo,
    originalIndex: index,
  }));

  return (
    <MotionDiv
      className="mx-auto grid w-full max-w-7xl place-items-center gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.28,
          },
        },
      }}
    >
      {galleryItems.map(({ caption, photo, originalIndex }, index) => (
        <MotionDiv
          key={photo}
          variants={{
            hidden: {
              opacity: 0,
              scale: 0.65,
              y: 80,
              rotate: index % 2 === 0 ? -8 : 8,
            },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: 0,
            },
          }}
          transition={{
            duration: 0.65,
            ease: "easeOut",
          }}
          whileHover={{
            y: -8,
            scale: 1.04,
          }}
          className="
            flex
            h-full
            w-full
            max-w-68
            flex-col
            items-center
            justify-center
            rounded-3xl
            bg-white/80
            p-4
            text-center
            shadow-2xl
            backdrop-blur
          "
        >
          <div className="flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-pink-50 shadow-inner">
            <MotionImg
              src={photo}
              alt={`Memory ${originalIndex + 1}`}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <p className="mt-4 text-xl font-bold text-pink-500 handwritten">
            {caption}
          </p>
        </MotionDiv>
      ))}
    </MotionDiv>
  );
}
