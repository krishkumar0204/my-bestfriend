import { useCallback, useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { MusicContext } from "./musicContextValue";
import birthdaySong1 from "../assets/music/Akhiyaan_Gulaab___Kriti_Sanon,_Shahid_Kapoor___Teri_Baaton_Mein_Aisa_Uljha_Jiya___8K_Hindi_Song(256k)(1).mp3";
import birthdaySong2 from "../assets/music/Tere_Vaaste_-_lyrics___Zara_Hatke_Zara_Bachke(256k).mp3";

const TRACKS = [
  { id: "music-1", label: "Akhiyaan Gulaab", src: birthdaySong1 },
  { id: "music-2", label: "Tere Vaaste", src: birthdaySong2 },
];

export function MusicProvider({ children }) {
  const musicRefs = useRef({});
  const currentTrackRef = useRef(TRACKS[0].id);
  const [currentTrackId, setCurrentTrackId] = useState(TRACKS[0].id);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);
  const [autoPlayTrackId, setAutoPlayTrackId] = useState(TRACKS[0].id);

  useEffect(() => {
    musicRefs.current = Object.fromEntries(
      TRACKS.map((track) => [
        track.id,
        new Howl({
          src: [track.src],
          loop: true,
          volume: 0.5,
          html5: true,
          onplay: () => {
            setHasStarted(true);
            setIsPlaying(true);
            setPlaybackBlocked(false);
          },
          onpause: () => setIsPlaying(false),
          onstop: () => setIsPlaying(false),
          onplayerror: () => {
            setIsPlaying(false);
            setPlaybackBlocked(true);
          },
          onloaderror: (_soundId, error) => {
            setIsPlaying(false);
            console.error(`${track.label} could not be loaded.`, error);
          },
        }),
      ]),
    );

    return () => {
      Object.values(musicRefs.current).forEach((music) => music.unload());
      musicRefs.current = {};
    };
  }, []);

  const playMusic = useCallback(() => {
    const music = musicRefs.current[currentTrackRef.current];

    if (music && !music.playing()) {
      music.play();
    }
  }, []);

  const pauseMusic = useCallback(() => {
    musicRefs.current[currentTrackRef.current]?.pause();
  }, []);

  const playTrack = useCallback((trackId) => {
    const nextMusic = musicRefs.current[trackId];

    if (!nextMusic) return;

    const previousTrackId = currentTrackRef.current;

    if (previousTrackId !== trackId) {
      musicRefs.current[previousTrackId]?.stop();
      currentTrackRef.current = trackId;
      setCurrentTrackId(trackId);
    }

    if (!nextMusic.playing()) {
      nextMusic.play();
    }
  }, []);

  return (
    <MusicContext.Provider
      value={{
        currentTrackId,
        hasStarted,
        isPlaying,
        pauseMusic,
        playbackBlocked,
        playMusic,
        playTrack,
        autoPlayTrackId,
        setAutoPlayTrackId,
        tracks: TRACKS.map(({ id, label }) => ({ id, label })),
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
