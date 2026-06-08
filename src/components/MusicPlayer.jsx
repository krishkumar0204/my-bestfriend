import { useMusic } from "../context/useMusic";

export default function MusicPlayer() {
  const {
    currentTrackId,
    hasStarted,
    isPlaying,
    pauseMusic,
    playbackBlocked,
    playMusic,
    playTrack,
    tracks,
  } = useMusic();

  if (!playbackBlocked && !hasStarted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-wrap justify-end gap-2 rounded-2xl p-3 shadow-lg backdrop-blur-md">
      {tracks.map((track) => (
        <button
          key={track.id}
          type="button"
          onClick={() => playTrack(track.id)}
          className={`rounded-full px-4 py-2 font-semibold text-white transition ${
            currentTrackId === track.id
              ? "bg-pink-400"
              : "bg-pink-400 hover:bg-pink-500"
          }`}
        >
          {track.label}
        </button>
      ))}

      <button
        type="button"
        onClick={isPlaying ? pauseMusic : playMusic}
        className="rounded-full bg-slate-700 px-4 py-2 font-semibold text-white transition hover:bg-slate-800"
        aria-label={
          isPlaying ? "Pause selected music" : "Resume selected music"
        }
      >
        {isPlaying ? "Pause" : hasStarted ? "Resume" : "Play"}
      </button>
    </div>
  );
}
