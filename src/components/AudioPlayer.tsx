import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume, VolumeX } from "lucide-react";

// AudioPlayer tries to autoplay an audio file located at /audio/music.mp3
// Place your audio file at public/audio/music.mp3. If autoplay is blocked
// by the browser, a small floating control will appear for the user to start playback.
const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/music.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    // Try to autoplay. Most browsers will block autoplay with sound.
    audio
      .play()
      .then(() => {
        setPlaying(true);
        setAutoplayBlocked(false);
      })
      .catch(() => {
        // Autoplay blocked — we will show controls so user can start it.
        setAutoplayBlocked(true);
        setPlaying(false);
      });

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handlePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setPlaying(true);
      setAutoplayBlocked(false);
    } catch (e) {
      // still blocked or failed — do nothing, user can try again
      setPlaying(false);
    }
  };

  const handlePause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlaying(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  // Compact floating controls shown when autoplay is blocked or user paused audio
  return (
    <div>
      {autoplayBlocked || !playing ? (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/80 dark:bg-black/60 backdrop-blur rounded-md p-2 shadow-lg">
          {playing ? (
            <button aria-label="Pause music" onClick={handlePause} className="p-1">
              <Pause className="w-5 h-5" />
            </button>
          ) : (
            <button aria-label="Play music" onClick={handlePlay} className="p-1">
              <Play className="w-5 h-5" />
            </button>
          )}

          <button aria-label="Toggle mute" onClick={toggleMute} className="p-1">
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume className="w-5 h-5" />}
          </button>

          <span className="text-xs text-muted-foreground">Music</span>
        </div>
      ) : null}
    </div>
  );
};

export default AudioPlayer;
