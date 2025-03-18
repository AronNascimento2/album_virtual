import { motion } from "framer-motion";
import { X } from "lucide-react";
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
  const handleNextImage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      setFullScreenImage(allImages[(currentImageIndex + 1) % allImages.length]);
    },
    [allImages, currentImageIndex, setCurrentImageIndex, setFullScreenImage]
  );

  const handlePrevImage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setCurrentImageIndex(
        (prev) => (prev - 1 + allImages.length) % allImages.length
      );
      setFullScreenImage(
        allImages[(currentImageIndex - 1 + allImages.length) % allImages.length]
      );
    },
    [allImages, currentImageIndex, setCurrentImageIndex, setFullScreenImage]
  );

  return (
    <>
      {fullScreenImage && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setFullScreenImage(null)}
        >
          <button
            className="hover:cursor-pointer absolute top-5 right-5 text-black  text-4xl font-bold hover:text-gray-700 active:text-gray-900 hover:scale-110 active:scale-90"
            onClick={() => setFullScreenImage(null)}
          >
            <X size={30} />
          </button>

          <button
            className="hover:cursor-pointer absolute sm:left-5 left-3 sm:text-black text-blue-500 sm:text-6xl text-4xl transition-all duration-200 
                      hover:text-gray-700 active:text-gray-900 hover:scale-110 active:scale-90"
            onClick={handlePrevImage}
          >
            &#10094;
          </button>

          <motion.img
            src={fullScreenImage}
            alt="Fullscreen"
            className="max-w-full max-h-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.5 }}
          />

          {/* Botão Próximo */}
          <button
            className="hover:cursor-pointer absolute right-3 sm:right-5 sm:text-black text-blue-500 sm:text-6xl text-4xl transition-all duration-200 
                      hover:text-gray-700 active:text-gray-900 hover:scale-110 active:scale-90"
            onClick={handleNextImage}
          >
            &#10095;
          </button>
        </motion.div>
      )}
    </>
  );
};
