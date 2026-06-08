import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaHeart, FaRegEnvelopeOpen } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { IoImagesOutline } from "react-icons/io5";
import siteConfig from "../config/siteConfig.js";
import LetterReveal from "./LetterReveal";
import MemoryReveal from "./MemoryReveal";

const MotionDiv = motion.div;

export default function BirthdayReveal() {
  const [showLetter, setShowLetter] = useState(false);
  const [showMemories, setShowMemories] = useState(false);

  if (showLetter) {
    return (
      <main className="relative z-10 min-h-screen">
        <Confetti recycle />
        <LetterReveal onBack={() => setShowLetter(false)} />
      </main>
    );
  }

  if (showMemories) {
    return (
      <main className="relative z-10 min-h-screen">
        <Confetti recycle />
        <MemoryReveal onBack={() => setShowMemories(false)} />
      </main>
    );
  }

  return (
    <main className="relative z-10 flex flex-col min-h-screen items-center justify-center px-6">
      <Confetti recycle />

      <MotionDiv
        initial={{ y: 500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-center"
      >
        <div className="flex flex-col items-center">
          <p className="birthday-title text-xl font-black text-pink-500 md:text-4xl tracking-widest">
            HAPPY
          </p>
          <motion.div
            className="flex tracking-tighter"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {[
              ["B", "mt-5"],
              ["I", ""],
              ["R", "mt-5"],
              ["T", ""],
              ["H", "mt-5"],
              ["D", ""],
              ["A", "mt-5"],
              ["Y", ""],
            ].map(([letter, margin]) => (
              <h1
                key={letter}
                className={`overflow-hidden text-7xl font-black uppercase text-white drop-shadow-lg md:text-8xl lg:text-9xl ${margin}`}
                style={{
                  textShadow:
                    "0px 1px 0px #e5e7eb, 0px 2px 0px #d1d5db, 0px 3px 0px #cbd5e1, 0px 4px 0px #cbd5e1, 0px 5px 0px #cbd5e1, 0px 10px 20px rgba(0,0,0,0.15)",
                }}
              >
                {letter}
              </h1>
            ))}
          </motion.div>
        </div>

        <p className="handwritten text-3xl text-pink-600 mt-6">
          Dear {siteConfig.name}{" "}
          <FaHeart className="inline-block text-2xl align-middle" aria-hidden="true" />
        </p>

        <p className="info text-4xl text-pink-600 mt-10">
          Some people make life brighter just by being in it, and today is a
          beautiful reminder of how special you truly are.
        </p>
      </MotionDiv>

      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-4 rounded-3xl bg-white/30 p-3 shadow-xl backdrop-blur-sm"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <button
          type="button"
          onClick={() => setShowLetter(true)}
          className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 px-5 py-3 text-md font-bold text-white shadow-xl transition hover:scale-105 hover:from-pink-600 hover:to-rose-500"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/25">
            <FaRegEnvelopeOpen className="text-lg" />
          </span>
          Open Letter
          <FaHeart className="text-sm transition group-hover:scale-125" />
        </button>
        <button
          type="button"
          onClick={() => setShowMemories(true)}
          className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-400 px-5 py-3 font-bold text-white shadow-xl transition hover:scale-105 hover:from-fuchsia-600 hover:to-pink-500"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/25">
            <IoImagesOutline className="text-xl" />
          </span>
          Explore
          <HiSparkles className="text-lg transition group-hover:rotate-12 group-hover:scale-125" />
        </button>
      </motion.div>
    </main>
  );
}
