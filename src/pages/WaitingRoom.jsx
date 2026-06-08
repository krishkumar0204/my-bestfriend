import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMusic } from "../context/useMusic";
import siteConfig from "../config/siteConfig.js";

const MotionDiv = motion.div;
const titleContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const titleLetter = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 18,
    },
  },
};

function getTimeLeft(birthdayDate) {
  // const diff = birthdayDate.getTime() - new Date(Date.now() + 60000);
  const diff = birthdayDate.getTime() - Date.now();

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function WaitingRoom({ birthdayDate, onBirthdayStart }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(birthdayDate));
  const { playTrack, autoPlayTrackId, tracks } = useMusic();

  useEffect(() => {
    let birthdayOpened = false;

    const checkTime = () => {
      const remaining = getTimeLeft(birthdayDate);

      if (remaining) {
        setTimeLeft(remaining);
        return;
      }

      if (!birthdayOpened) {
        birthdayOpened = true;
        playTrack(autoPlayTrackId);
        onBirthdayStart();
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);

    return () => clearInterval(interval);
  }, [birthdayDate, onBirthdayStart, playTrack, autoPlayTrackId]);

  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <MotionDiv
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-5xl text-center"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            variants={titleContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center"
          >
            {"Something Special".split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={titleLetter}
                className="
          birthday-title
          text-6xl
          md:text-7xl
          font-black
          text-white
          inline-block
        "
                style={{
                  textShadow:
                    "0px 1px 0px #e5e7eb, 0px 2px 0px #d1d5db, 0px 3px 0px #cbd5e1, 0px 4px 0px #cbd5e1, 0px 5px 0px #cbd5e1, 0px 10px 20px rgba(0,0,0,0.15)",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <h2 className="mt-6 text-2xl font-semibold text-pink-500 md:text-3xl">
          is waiting for you {"\u2764\uFE0F"}
        </h2>

        {/* Song Selection Section */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-lg font-semibold text-slate-500">
            Choose a song to play when the timer ends:
          </p>
          <SongSelector tracks={tracks} />
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {siteConfig.countdown.showDays && (
            <CountdownCard value={timeLeft?.days ?? 0} label="Days" />
          )}

          {siteConfig.countdown.showHours && (
            <CountdownCard value={timeLeft?.hours ?? 0} label="Hours" />
          )}

          {siteConfig.countdown.showMinutes && (
            <CountdownCard value={timeLeft?.minutes ?? 0} label="Minutes" />
          )}

          {siteConfig.countdown.showSeconds && (
            <CountdownCard value={timeLeft?.seconds ?? 0} label="Seconds" />
          )}
        </div>

        <p className="mt-10 text-lg text-slate-700">
          Come back when the timer reaches zero {"\u2728"}
        </p>
      </MotionDiv>
    </main>
  );
}

function CountdownCard({ value, label }) {
  return (
    <MotionDiv
      whileHover={{ scale: 1.08 }}
      className="flex h-36 w-36 cursor-pointer flex-col items-center justify-center rounded-3xl border border-white/50 bg-white/40 shadow-xl backdrop-blur-md"
    >
      <div className="text-5xl font-black text-fuchsia-400">
        {String(value).padStart(2, "0")}
      </div>

      <div className="mt-2 font-semibold uppercase tracking-widest text-pink-500">
        {label}
      </div>
    </MotionDiv>
  );
}

function SongSelector({ tracks }) {
  const { autoPlayTrackId, setAutoPlayTrackId } = useMusic();

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {tracks.map((track) => (
        <button
          key={track.id}
          type="button"
          onClick={() => setAutoPlayTrackId(track.id)}
          className={`rounded-full px-5 py-2 font-semibold transition ${
            autoPlayTrackId === track.id
              ? "bg-fuchsia-600 text-white shadow-lg"
              : "border-2 border-pink-400 text-pink-400 hover:border-pink-500 hover:text-pink-500"
          }`}
        >
          {track.label}
        </button>
      ))}
    </div>
  );
}
