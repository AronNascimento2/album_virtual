import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import { useMusic } from "./MusicContext";
import { sectionTitles, TitleProps, WeddingPhotosProps } from "./weddingPhotos";
import { FullScreenImage } from "./FullScreenImage";

const chunkArray = <T,>(array: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );

interface HomeProps {
  weddingPhotos: WeddingPhotosProps;
}

const Home: React.FC<HomeProps> = ({ weddingPhotos }) => {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const { handleUserInteraction } = useMusic();
  const allImages = useMemo(
    () => Object.values(weddingPhotos).flat(),
    [weddingPhotos]
  );

  return (
    <div
      className="container mx-auto p-4 max-w-7xl relative"
      onClick={handleUserInteraction}
    >
      <div
        className="fixed inset-0 bg-cover bg-center z-[-1] opacity-50"
        style={{
          backgroundImage: "url('casamento1/CERIMÔNIA OFICIAL/HF_-23.jpg')",
          backgroundAttachment: "fixed",
        }}
      ></div>

      <h1 className="text-5xl md:text-7xl font-bold text-center mb-8 text-black">
        Aron e Índira
      </h1>

      {Object.entries(weddingPhotos).map(([section, photos]) => {
        const groupedPhotos = chunkArray(photos, 6);
        return (
          <div
            key={section}
            id={section}
            className="mb-12 p-8 md:p-8 rounded-xl shadow-lg bg-white bg-opacity-80"
          >
            <h2 className="text-2xl md:text-3xl font-semibold capitalize mb-6 text-center">
              {sectionTitles[section as keyof TitleProps]}
            </h2>

            <Swiper
              navigation
              modules={[Navigation]}
              spaceBetween={10}
              lazyPreloadPrevNext={1}
              slidesPerView={1} 
              breakpoints={{
                768: {
                  slidesPerView: 3, 
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4, 
                  spaceBetween: 30,
                },
              }}
            >
              {groupedPhotos.map((group, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className="overflow-hidden rounded-xl shadow-lg cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      setFullScreenImage(group[0] as keyof TitleProps);
                      setCurrentImageIndex(allImages.indexOf(group[0]));
                    }}
                  >
                    <img
                      src={String(group[0])}
                      alt={`${section} ${index + 1}`}
                      className="w-full h-[300px] object-cover rounded-xl sm:h-[400px]" // Reduz a altura em telas pequenas
                      loading="lazy"
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        );
      })}

      <FullScreenImage
        setCurrentImageIndex={setCurrentImageIndex}
        setFullScreenImage={setFullScreenImage}
        allImages={allImages}
        fullScreenImage={fullScreenImage}
        currentImageIndex={currentImageIndex}
      />
    </div>
  );
};

export default Home;
