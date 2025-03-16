import { Link, useLocation } from "react-router-dom";
import { weddingPhotos, sectionTitles, TitleProps } from "./weddingPhotos";

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 p-4 flex justify-center gap-4 md:gap-8">
      <Link
        to="/"
        className={`text-lg font-semibold capitalize hover:text-blue-500 ${
          location.pathname === "/" ? "text-blue-500 font-bold" : ""
        }`}
      >
        Home
      </Link>
      {(Object.keys(weddingPhotos) as Array<keyof TitleProps>).map(
        (section) => {
          const isActive = location.pathname.startsWith(`/${section}`);

          return (
            <Link
              key={section}
              to={`/${section}`}
              className={`text-lg font-semibold capitalize hover:text-blue-500 ${
                isActive ? "text-blue-500 font-bold" : ""
              }`}
            >
              {sectionTitles[section]}
            </Link>
          );
        }
      )}
    </nav>
  );
};
