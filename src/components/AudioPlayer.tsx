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
    // Prefer a local file at /audio/music.mp3 (place it in public/audio/music.mp3).
    // If not present, fall back to a demo URL (SoundHelix example) or a custom URL saved in localStorage.
    const demoUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // demo music for preview
    const savedUrl = typeof window !== "undefined" ? localStorage.getItem("rose.audio.url") : null;
    const srcToTry = savedUrl || "/audio/music.mp3";

    const audio = new Audio(srcToTry);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    // Try to autoplay. If it fails (blocked or 404), try the demoUrl, then show controls.
    const tryPlay = async (urlToPlay: string) => {
      if (!audioRef.current) return false;
      audioRef.current.src = urlToPlay;
      try {
        await audioRef.current.play();
        setPlaying(true);
        setAutoplayBlocked(false);
        return true;
      } catch (e) {
        return false;
      }
    };

    (async () => {
      const ok = await tryPlay(srcToTry);
      if (!ok && srcToTry !== demoUrl) {
        // try demo URL as fallback
        const ok2 = await tryPlay(demoUrl);
        if (!ok2) {
          setAutoplayBlocked(true);
          setPlaying(false);
        }
      }
    })();

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
      {(autoplayBlocked || !playing) && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 bg-white/90 dark:bg-black/60 backdrop-blur rounded-md p-2 shadow-lg">
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

          {/* Small panel to allow adding a custom audio URL or use demo */}
          <div className="mt-2 bg-white/90 dark:bg-black/60 backdrop-blur rounded-md p-2 shadow-lg w-64 text-xs">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Paste audio URL (mp3)"
                defaultValue={typeof window !== "undefined" ? localStorage.getItem("rose.audio.url") || "" : ""}
                id="rose-audio-url-input"
                className="flex-1 text-xs px-2 py-1 rounded border"
              />
              <button
                className="px-2 py-1 rounded bg-primary text-white text-xs"
                onClick={() => {
                  const el = document.getElementById("rose-audio-url-input") as HTMLInputElement | null;
                  if (!el) return;
                  const url = el.value.trim();
                  if (!url) return;
                  try {
                    localStorage.setItem("rose.audio.url", url);
                    if (audioRef.current) {
                      audioRef.current.src = url;
                      audioRef.current.play();
                      setPlaying(true);
                      setAutoplayBlocked(false);
                    }
                  } catch (e) {
                    // ignore
                  }
                }}
              >
                Use
              </button>
            </div>

            <div className="flex gap-2">
              <button
                className="text-xs underline"
                onClick={() => {
                  // set demo url and play
                  const demoUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
                  localStorage.setItem("rose.audio.url", demoUrl);
                  if (audioRef.current) {
                    audioRef.current.src = demoUrl;
                    audioRef.current.play();
                    setPlaying(true);
                    setAutoplayBlocked(false);
                  }
                }}
              >
                Use demo romantic sample
              </button>

              <span className="text-muted-foreground">or add your own in public/audio/music.mp3</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
