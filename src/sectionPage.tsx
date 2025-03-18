import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sectionPastes, sectionTitles, TitleProps } from "./weddingPhotos";

interface BackgroundImagesProp {
  cerimonia: string;
  decoracao: string;
  makingOfNoiva: string;
  makingOfNoivo: string;
  recepcao: string;
}

export const backgroundImages: BackgroundImagesProp = {
  cerimonia: "HF_-70.jpg",
  decoracao: "HF_-3.jpg",
  makingOfNoiva: "HF_-20.jpg",
  makingOfNoivo: "HF_-8.jpg",
  recepcao: "HF_-233.jpg",
};
type SectionKeys = keyof typeof sectionTitles;

interface SectionPageProps {
  section: SectionKeys;
  photos: string[];
}
const SectionPage: React.FC<SectionPageProps> = ({ section, photos }) => {
  const backgroundImageFile =
    backgroundImages[section as keyof BackgroundImagesProp] || "HF_-2.jpg";
  const backgroundImageUrl = `casamento1/${
    sectionPastes[section as keyof TitleProps]
  }/${backgroundImageFile}`;
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const formatSectionName = (section: string) =>
    section.replace(/([A-Z])/g, " $1").trim();

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
        {formatSectionName(sectionTitles[section as keyof TitleProps])}
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
      {fullScreenImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setFullScreenImage(null)}
        >
          <img
            src={fullScreenImage}
            alt="Fullscreen"
            className="max-w-full max-h-full"
          />
        </div>
      )}
    </div>
  );
};
export default SectionPage;
