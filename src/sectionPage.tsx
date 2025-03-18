import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { sectionPastes, sectionTitles } from "./weddingPhotos";
import { FullScreenImage } from "./FullScreenImage";
import { backgroundImages, BackgroundImagesProps } from "./backGroundImages";

type SectionKeys = keyof typeof sectionTitles;

interface SectionPageProps {
  section: SectionKeys;
  photos: string[];
}
const SectionPage: React.FC<SectionPageProps> = ({ section, photos }) => {
  const allImages = useMemo(() => Object.values(photos).flat(), [photos]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const formatSectionName = (section: string) =>
    section.replace(/([A-Z])/g, " $1").trim();

  const backgroundImageFile =
    backgroundImages[section as keyof BackgroundImagesProps] ||
    "Imagem nao encontrada";
  const backgroundImageUrl = `casamento1/${sectionPastes[section]}/${backgroundImageFile}`;
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFullScreenImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div
        className="fixed inset-0 bg-cover bg-center z-[-1] opacity-50"
        style={{
          backgroundImage: `url('${backgroundImageUrl}')`,
          backgroundAttachment: "fixed",
        }}
      ></div>
      <h1 className="text-3xl font-bold text-center mb-6">
        {formatSectionName(sectionTitles[section])}
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            className="overflow-hidden rounded-xl shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => setFullScreenImage(photo)}
          >
            <img
              src={photo}
              alt={`${section} ${i + 1}`}
              className="w-full h-auto object-cover rounded-xl"
            />
          </motion.div>
        ))}
      </div>
      <FullScreenImage
        allImages={allImages}
        currentImageIndex={currentImageIndex}
        fullScreenImage={fullScreenImage}
        setCurrentImageIndex={setCurrentImageIndex}
        setFullScreenImage={setFullScreenImage}
      />
    </div>
  );
};
export default SectionPage;
