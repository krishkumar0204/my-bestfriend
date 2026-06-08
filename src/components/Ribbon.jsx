import { motion } from "framer-motion";
import { useState } from "react";

const MotionDiv = motion.div;
const MotionP = motion.p;

export default function Ribbon({ onOpen }) {
  const [opened, setOpened] = useState(false);

  const handleDragEnd = (_, info) => {
    if (opened) {
      return;
    }

    if (info.offset.x > 140) {
      setOpened(true);

      setTimeout(() => {
        onOpen();
      }, 650);
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center px-6">
      <p className="mb-5 text-center text-lg font-semibold text-pink-600">
        Pull the ribbon to unlock our memories
      </p>

      <div className="relative flex h-20 w-full items-center justify-start overflow-hidden rounded-full bg-pink-100 p-2 shadow-inner">
        <MotionDiv
          className="absolute left-8 right-8 h-3 origin-left rounded-full bg-pink-300"
          animate={{
            scaleX: opened ? 0 : 1,
            opacity: opened ? 0 : 1,
          }}
          transition={{
            duration: 0.45,
          }}
        />

        <MotionDiv
          drag="x"
          dragConstraints={{
            left: 0,
            right: 260,
          }}
          dragElastic={0.08}
          onDragEnd={handleDragEnd}
          animate={{
            x: opened ? 260 : 0,
            scale: opened ? 0.9 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 18,
          }}
          className="
            relative
            z-10
            cursor-grab
            select-none
            rounded-full
            bg-pink-500
            px-8
            py-4
            font-bold
            text-white
            shadow-xl
            active:cursor-grabbing
          "
        >
          Pull Me
        </MotionDiv>
      </div>

      {opened && (
        <MotionP
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-5 text-sm font-semibold text-pink-500"
        >
          Opening memories...
        </MotionP>
      )}
    </div>
  );
}
