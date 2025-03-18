import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { weddingPhotos, sectionTitles, TitleProps } from "./weddingPhotos";

export const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 p-4">
      {/* Menu para telas grandes */}
      <div className="hidden md:flex justify-center gap-8">
        <Link
          to="/"
          className={`text-[12px] font-semibold capitalize hover:text-blue-500 ${
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
                className={`text-[12px] font-semibold capitalize hover:text-blue-500 ${
                  isActive ? "text-blue-500 font-bold" : ""
                }`}
              >
                {sectionTitles[section]}
              </Link>
            );
          }
        )}
      </div>

      {/* Botão do menu hambúrguer para telas pequenas */}
      <div className="md:hidden flex justify-between items-center">
        <button onClick={toggleMenu} className="text-gray-700">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu hambúrguer (aparece quando menuOpen é true) */}
      {menuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-md flex flex-col items-center p-4 gap-4">
          <Link
            to="/"
            className={`text-[14px] font-semibold capitalize hover:text-blue-500 ${
              location.pathname === "/" ? "text-blue-500 font-bold" : ""
            }`}
            onClick={closeMenu}
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
                  className={`text-[14px] font-semibold capitalize hover:text-blue-500 ${
                    isActive ? "text-blue-500 font-bold" : ""
                  }`}
                  onClick={closeMenu}
                >
                  {sectionTitles[section]}
                </Link>
              );
            }
          )}
        </div>
      )}
    </nav>
  );
};
