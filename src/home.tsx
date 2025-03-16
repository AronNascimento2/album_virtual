import { motion } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import { useMusic } from "./MusicContext";
import { X } from "lucide-react";
import { TitleProps } from "./weddingPhotos";

const chunkArray = <T,>(array: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );

interface WeddingPhotos {
  cerimonia: string[];
  decoracao: string[];
  makingOfNoiva: string[];
  makingOfNoivo: string[];
  recepcao: string[];
}

interface HomeProps {
  weddingPhotos: WeddingPhotos;
}

const Home: React.FC<HomeProps> = ({ weddingPhotos }) => {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const { handleUserInteraction } = useMusic();
  const allImages = useMemo(
    () => Object.values(weddingPhotos).flat(),
    [weddingPhotos]
  );

  const handleNextImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      setFullScreenImage(allImages[(currentImageIndex + 1) % allImages.length]);
    },
    [allImages, currentImageIndex]
  );

  const handlePrevImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex(
        (prev) => (prev - 1 + allImages.length) % allImages.length
      );
      setFullScreenImage(
        allImages[(currentImageIndex - 1 + allImages.length) % allImages.length]
      );
    },
    [allImages, currentImageIndex]
  );

  return (
    <div
      className="container mx-auto p-4 max-w-7xl relative"
      onClick={handleUserInteraction}
    >
      {/* Fundo fixo otimizado */}
      <div
        className="fixed inset-0 bg-cover bg-center z-[-1] opacity-50"
        style={{
          backgroundImage: "url('casamento1/CERIMÔNIA OFICIAL/HF_-23.jpg')",
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* Título com menos animação */}
      <h1 className="text-[100px] font-bold text-center mb-8 text-black">
        Aron e Índira
      </h1>

      {/* Seções de Fotos */}
      {Object.entries(weddingPhotos).map(([section, photos]) => {
        const groupedPhotos = chunkArray(photos, 6);
        return (
          <div
            key={section}
            id={section}
            className="mb-12 p-6 rounded-xl shadow-lg bg-white bg-opacity-80"
          >
            <h2 className="text-3xl font-semibold capitalize mb-6 text-center">
              {section.replace(/([A-Z])/g, " $1")}
            </h2>

            <Swiper
              navigation
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={1}
              lazyPreloadPrevNext={1}
              className="w-[1200px] h-[800px] mx-auto"
            >
              {groupedPhotos.map((group, index) => (
                <SwiperSlide key={index}>
                  <div className="grid grid-cols-3 grid-rows-2 gap-6 h-[800px] w-[1200px]">
                    {group.map((photo, i) => (
                      <motion.div
                        key={i}
                        className="overflow-hidden rounded-xl shadow-lg cursor-pointer h-[390px] w-[390px] relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => {
                          setFullScreenImage(photo as keyof TitleProps);
                          setCurrentImageIndex(allImages.indexOf(photo));
                        }}
                      >
                        <img
                          src={photo}
                          alt={`${section} ${i + 1}`}
                          className="w-full h-full object-cover rounded-xl"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        );
      })}

      {/* Imagem em Tela Cheia otimizada */}
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
            className="absolute top-5 right-5 text-black text-4xl font-bold"
            onClick={() => setFullScreenImage(null)}
          >
            <X size={30} />
          </button>
          <button
            className="absolute left-5 text-black text-6xl"
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
          <button
            className="absolute right-5 text-black text-6xl"
            onClick={handleNextImage}
          >
            &#10095;
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
