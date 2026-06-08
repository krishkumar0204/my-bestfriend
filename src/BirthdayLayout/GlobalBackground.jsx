import { motion } from "framer-motion";

const MotionDiv = motion.div;

const leftDecorations = [
  { icon: "\u2B50", top: 20 },
  { icon: "\uD83E\uDD0D", top: 140 },
  { icon: "\uD83D\uDC9C", top: 260 },
];

const rightDecorations = [
  { icon: "\u2B50", top: 40 },
  { icon: "\uD83E\uDD0D", top: 180 },
  { icon: "\uD83D\uDC9C", top: 320 },
];

const GlobalBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#c7f2ff]" />

      {leftDecorations.map((item, index) => (
        <MotionDiv
          key={`left-${item.top}`}
          className="absolute left-2 sm:left-10"
          style={{ top: item.top }}
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 4 + index, repeat: Infinity }}
        >
          <div className="mx-auto h-40 w-[3px] bg-cyan-300" />
          <div className="text-5xl sm:text-6xl">{item.icon}</div>
        </MotionDiv>
      ))}

      {rightDecorations.map((item, index) => (
        <MotionDiv
          key={`right-${item.top}`}
          className="absolute right-2 sm:right-10"
          style={{ top: item.top }}
          animate={{ rotate: [8, -8, 8] }}
          transition={{ duration: 4 + index, repeat: Infinity }}
        >
          <div className="mx-auto h-40 w-[3px] bg-cyan-300" />
          <div className="text-5xl sm:text-6xl">{item.icon}</div>
        </MotionDiv>
      ))}

      <div className="absolute left-1/4 top-0 h-40 w-40 rounded-full bg-cyan-200/40" />
      <div className="absolute bottom-10 right-20 h-56 w-56 rounded-full bg-pink-300/30" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-pink-400/20" />
    </div>
  );
};

export default GlobalBackground;
