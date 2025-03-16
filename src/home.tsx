import { motion } from "framer-motion";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useMusic } from "./MusicContext";
import { X } from "lucide-react";

const chunkArray = <T,>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};

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
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>(
    {}
  );

  const handleImageLoad = (index: string) => {
    setLoadingImages((prev) => ({ ...prev, [index]: false }));
  };

  const { handleUserInteraction } = useMusic();
  const allImages = Object.values(weddingPhotos).flat();

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    setFullScreenImage(allImages[(currentImageIndex + 1) % allImages.length]);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
    setFullScreenImage(
      allImages[(currentImageIndex - 1 + allImages.length) % allImages.length]
    );
  };

  return (
    <div
      className="container mx-auto p-4 max-w-7xl relative"
      onClick={handleUserInteraction}
    >
      {/* Fundo fixo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 bg-cover bg-center z-[-1]"
        style={{
          backgroundImage: "url('casamento1/CERIMÔNIA OFICIAL/HF_-23.jpg')",
          backgroundAttachment: "fixed",
        }}
      ></motion.div>

      {/* Título */}
      <motion.h1
        className="text-[100px] font-bold text-center mb-8 text-black"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Aron e Índira
      </motion.h1>

      {/* Seções de Fotos */}
      {Object.entries(weddingPhotos).map(([section, photos]) => {
        const groupedPhotos = chunkArray(photos, 6);
        return (
          <motion.div
            key={section}
            id={section}
            className="mb-12 p-6 rounded-lg shadow-lg bg-white bg-opacity-80"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-semibold capitalize mb-6 text-center">
              {section.replace(/([A-Z])/g, " $1")}
            </h2>
            <Swiper
              navigation
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={1}
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
                          setFullScreenImage(photo);
                          setCurrentImageIndex(allImages.indexOf(photo));
                        }}
                      >
                        {loadingImages[`${index}-${i}`] && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                            Carregando...
                          </div>
                        )}
                        <img
                          src={photo}
                          alt={`${section} ${i + 1}`}
                          className="w-full h-full object-cover rounded-xl"
                          onLoad={() => handleImageLoad(`${index}-${i}`)}
                          onError={() => handleImageLoad(`${index}-${i}`)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        );
      })}

      {/* Imagem em Tela Cheia */}
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
            className="absolute top-5 right-5 text-black text-4xl font-bold hover:cursor-pointer"
            onClick={() => setFullScreenImage(null)}
          >
            <X size={30} />
          </button>
          <button
            className="absolute left-5 text-black text-6xl hover:cursor-pointer"
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
            className="absolute right-5 text-black text-6xl hover:cursor-pointer"
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
