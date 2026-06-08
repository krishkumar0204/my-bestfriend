import { motion } from "framer-motion";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import siteConfig from "../config/siteConfig.js";

const MotionDiv = motion.div;
const MotionArticle = motion.article;

export default function LetterReveal({ onBack }) {
  const [opened, setOpened] = useState(false);

  const handleDragEnd = (_, info) => {
    if (opened) {
      return;
    }

    if (info.offset.x > 140) {
      setOpened(true);
    }
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 py-16">
      <button
        type="button"
        onClick={onBack}
        className="absolute left-5 top-5 z-20 rounded-full bg-white/80 px-5 py-2 font-semibold text-pink-500 shadow-lg backdrop-blur transition hover:bg-pink-100"
      >
        Back
      </button>

      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-pink-100 to-orange-100" />
      <div className="absolute left-10 top-24 h-32 w-32 rounded-full bg-yellow-300/40 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-pink-300/40 blur-3xl" />

      {!opened ? (
        <MotionDiv
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 flex w-full max-w-md flex-col items-center rounded-[2rem] border border-white/70 bg-white/70 p-7 text-center shadow-2xl backdrop-blur-md"
        >
          <p className="handwritten text-4xl font-bold text-pink-500">
            A letter for you
          </p>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            Pull the golden ribbon to open it.
          </p>

          <div className="relative mt-7 flex h-20 w-full items-center justify-start overflow-hidden rounded-full bg-yellow-100 p-2 shadow-inner">
            <MotionDiv
              className="absolute left-8 right-8 h-3 origin-left rounded-full bg-yellow-400"
              animate={{
                scaleX: opened ? 0 : 1,
                opacity: opened ? 0 : 1,
              }}
              transition={{ duration: 0.45 }}
            />

            <MotionDiv
              drag="x"
              dragConstraints={{ left: 0, right: 260 }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
              animate={{ x: opened ? 260 : 0 }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 18,
              }}
              className="relative z-10 cursor-grab select-none rounded-full bg-yellow-500 px-8 py-4 font-bold text-white shadow-xl active:cursor-grabbing"
            >
              Open
            </MotionDiv>
          </div>
        </MotionDiv>
      ) : (
        <MotionArticle
          initial={{ opacity: 0, y: 70, rotateX: -18, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-3xl rounded-[2rem] border-4 border-yellow-200 bg-yellow-100/95 p-7 text-slate-700 shadow-2xl md:p-10"
        >
          <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-pink-300/70 blur-sm" />
          <div className="absolute -bottom-5 -right-5 h-24 w-24 rounded-full bg-yellow-300/80 blur-md" />

          <div className="relative">
            <p className="handwritten text-center text-5xl font-bold text-pink-500">
              Happy Birthday
            </p>

            <div className="mt-7 space-y-4 rounded-3xl bg-white/55 p-6 text-base leading-8 shadow-inner md:text-lg">
              <p className="font-bold text-pink-600">Dear {siteConfig.name},</p>

              <p>
                Today is not just another day. It is the day someone truly
                special came into this world.
              </p>

              <p>
                I wanted to make something different for you, something that
                would always remind you how appreciated you are. Every photo,
                every animation, and every little detail on this website was
                added with you in mind.
              </p>

              <p>
                Thank you for the smiles you have shared, the memories we have
                created, and the moments that became special simply because you
                were a part of them.
              </p>

              <p>
                On your birthday, I wish you endless happiness, good health,
                success in everything you dream of, and countless reasons to
                smile.
              </p>

              <p>
                May this year bring you beautiful memories, exciting adventures,
                and everything your heart hopes for.
              </p>

              <p className="flex items-center gap-2 font-bold text-pink-600">
                Happy Birthday <FaHeart className="text-sm" aria-hidden="true" />
              </p>

              <p>Enjoy your special day. You deserve it.</p>
            </div>
          </div>
        </MotionArticle>
      )}
    </section>
  );
}
