import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

// Definição do contexto de música
interface MusicContextType {
  isPlaying: boolean;
  volume: number;
  setVolume: (volume: number) => void;
  togglePlayPause: () => void;
  changeTrack: (direction: number) => void;
  handleUserInteraction: () => void;
  audioRef: React.MutableRefObject<HTMLAudioElement>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(
    sessionStorage.getItem("musicPaused") !== "true"
  );
  const [volume, setVolume] = useState<number>(0.3);
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const tracks: string[] = [
    "/goldenhour.mp3",
    "/belaeafera.mp3",
    "/alladin.mp3",
  ];

  useEffect(() => {
    const audio = audioRef.current;

    // Atualizar apenas a trilha sonora quando `currentTrack` mudar
    if (audio.src !== tracks[currentTrack]) {
      audio.src = tracks[currentTrack];

      // Se não estiver pausado no sessionStorage, tocar automaticamente
      if (isPlaying && hasInteracted) {
        audio.play().catch(() => {});
      }
    }

    const handleEnded = () => changeTrack(1);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack, isPlaying, hasInteracted]);

  // Atualizar apenas o volume sem modificar a música
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const handleUserInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      if (sessionStorage.getItem("musicPaused") !== "true") {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      sessionStorage.setItem("musicPaused", "true");
    } else {
      audioRef.current.play().catch(() => {});
      sessionStorage.removeItem("musicPaused");
    }
    setIsPlaying(!isPlaying);
  };

  const changeTrack = (direction: number) => {
    const newIndex = (currentTrack + direction + tracks.length) % tracks.length;
    setCurrentTrack(newIndex);
    audioRef.current.src = tracks[newIndex];

    // Se não estiver pausado no sessionStorage, tocar automaticamente
    if (sessionStorage.getItem("musicPaused") !== "true") {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        volume,
        setVolume,
        togglePlayPause,
        changeTrack,
        handleUserInteraction,
        audioRef,
      }}
    >
      {children}
      <MusicPlayer />
    </MusicContext.Provider>
  );
};

const MusicPlayer: React.FC = () => {
  const {
    isPlaying,
    togglePlayPause,
    changeTrack,
    volume,
    setVolume,
    audioRef,
  } = useMusic();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center bg-black/80 p-3 rounded-full shadow-lg space-y-2">
      <button
        className="bg-black flex items-center justify-center rounded-full p-2 hover:cursor-pointer transition-transform duration-200 hover:scale-105"
        onClick={() => changeTrack(-1)}
      >
        <SkipBack color="white" size={10} />
      </button>
      <button
        className="bg-black flex items-center justify-center rounded-full p-2 hover:cursor-pointer transition-transform duration-200 hover:scale-105"
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <Pause color="white" size={10} />
        ) : (
          <Play color="white" size={10} />
        )}
      </button>
      <button
        className="bg-black flex items-center justify-center rounded-full p-2 hover:cursor-pointer transition-transform duration-200 hover:scale-105"
        onClick={() => changeTrack(1)}
      >
        <SkipForward color="white" size={10} />
      </button>
      <button
        className="bg-black flex items-center justify-center rounded-full p-2 hover:cursor-pointer transition-transform duration-200 hover:scale-105"
        onClick={() => setVolume(volume > 0 ? 0 : 1)}
      >
        {volume > 0 ? (
          <Volume2 color="white" size={10} />
        ) : (
          <VolumeX color="white" size={10} />
        )}
      </button>
      <div className="flex flex-col items-center w-8 h-24 justify-center">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            const newVolume = parseFloat(e.target.value);
            setVolume(newVolume);
            audioRef.current.volume = newVolume;
          }}
          className="w-24 h-1 rotate-[90deg] appearance-none bg-gray-300 rounded-lg"
          style={{
            background: `linear-gradient(to right, white ${
              volume * 100
            }%, #ccc ${volume * 100}%)`,
          }}
        />
      </div>
    </div>
  );
};
