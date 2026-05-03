import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback } from "react";

interface FullScreenImageProps {
  fullScreenImage: string | null;
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  setFullScreenImage: React.Dispatch<React.SetStateAction<string | null>>;
  allImages: string[];
}

export const FullScreenImage: React.FC<FullScreenImageProps> = ({
  fullScreenImage,
  currentImageIndex,
  setCurrentImageIndex,
  setFullScreenImage,
  allImages,
}) => {
  const goToImage = useCallback(
    (index: number) => {
      const nextIndex = (index + allImages.length) % allImages.length;
      setCurrentImageIndex(nextIndex);
      setFullScreenImage(allImages[nextIndex]);
    },
    [allImages, setCurrentImageIndex, setFullScreenImage],
  );

  const handleNextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    goToImage(currentImageIndex + 1);
  };

  const handlePrevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    goToImage(currentImageIndex - 1);
  };

  return (
    <AnimatePresence>
      {fullScreenImage && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setFullScreenImage(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setFullScreenImage(null);
            }}
          >
            <X size={24} />
          </button>

          <button
            type="button"
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
          >
            <ChevronLeft size={32} />
          </button>

          <motion.img
            src={fullScreenImage}
            alt="Imagem em tela cheia"
            className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
          >
            <ChevronRight size={32} />
          </button>

          <div className="absolute bottom-5 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
