import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/swiper-bundle.css";
type Photo = string;

import { useMusic } from "./MusicContext";
import { sectionTitles, TitleProps, WeddingPhotosProps } from "./weddingPhotos";
import { FullScreenImage } from "./FullScreenImage";

interface HomeProps {
  weddingPhotos: WeddingPhotosProps;
}

const Home: React.FC<HomeProps> = ({ weddingPhotos }) => {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { handleUserInteraction } = useMusic();

  const allImages = useMemo(
    () => Object.values(weddingPhotos).flat(),
    [weddingPhotos],
  );

  return (
    <main
      onClick={handleUserInteraction}
      className="relative min-h-screen overflow-hidden bg-[#f7f1ea] px-4 pb-20 pt-28 text-[#2f241d]"
    >
      <section className="mx-auto mb-16 max-w-5xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-[#9b745c]">
          Nosso casamento
        </p>

        <h1 className="font-serif text-5xl font-bold tracking-tight text-[#2f241d] md:text-7xl">
          Aron & Índira
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#6f625a] md:text-lg">
          Uma seleção especial dos momentos mais importantes desse dia.
        </p>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-12">
        {Object.entries(weddingPhotos).map(([section, photos]) => {
          const groupedPhotos = photos.map((photo: Photo[]) => [photo]);
          return (
            <motion.div
              key={section}
              id={section}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-[0_20px_70px_rgba(61,43,31,0.12)] backdrop-blur-md md:p-8"
            >
              <div className="mb-7 flex flex-col items-center justify-between gap-3 md:flex-row">
                <div>
                  <h2 className="mt-2 font-serif text-3xl font-bold text-[#2f241d] md:text-4xl">
                    {sectionTitles[section as keyof TitleProps]}
                  </h2>
                </div>

                <span className="rounded-full bg-[#efe2d8] px-4 py-2 text-sm font-medium text-[#8a604b]">
                  {photos.length} fotos
                </span>
              </div>

              <Swiper
                navigation
                modules={[Navigation]}
                spaceBetween={18}
                slidesPerView={1.15}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 26,
                  },
                }}
              >
                {groupedPhotos.map((group: Photo[], index: number) => {
                  const image = group[0];

                  return (
                    <SwiperSlide key={`${section}-${index}`}>
                      <motion.button
                        type="button"
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => {
                          setFullScreenImage(image);
                          setCurrentImageIndex(allImages.indexOf(image));
                        }}
                        className="group block w-full overflow-hidden rounded-[1.5rem] bg-white text-left shadow-lg ring-1 ring-black/5"
                      >
                        <div className="relative h-[330px] overflow-hidden sm:h-[390px]">
                          <img
                            src={image}
                            alt={`${sectionTitles[section as keyof TitleProps]} ${index + 1}`}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-80" />

                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-sm font-medium text-white/90">
                              Álbum {index + 1}
                            </p>
                            <p className="text-xs text-white/70">
                              Clique para visualizar
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </motion.div>
          );
        })}
      </section>

      <FullScreenImage
        setCurrentImageIndex={setCurrentImageIndex}
        setFullScreenImage={setFullScreenImage}
        allImages={allImages}
        fullScreenImage={fullScreenImage}
        currentImageIndex={currentImageIndex}
      />
    </main>
  );
};

export default Home;
