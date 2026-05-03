import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { weddingPhotos, sectionTitles, TitleProps } from "./weddingPhotos";

export const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { label: "Home", path: "/" },
    ...(Object.keys(weddingPhotos) as Array<keyof TitleProps>).map(
      (section) => ({
        label: sectionTitles[section],
        path: `/${section}`,
      }),
    ),
  ];

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 py-4">
      <nav className="relative mx-auto flex max-w-6xl items-center rounded-full border border-white/60 bg-white/75 px-5 py-3 shadow-lg backdrop-blur-md">
        {/* Logo (esquerda fixa) */}
        <Link to="/" className="font-serif text-xl font-bold text-[#2f241d]">
          A & I
        </Link>

        {/* MENU CENTRALIZADO */}
        <div className="absolute left-1/2 hidden w-max max-w-[calc(100%-140px)] -translate-x-1/2 items-center gap-2 overflow-x-auto whitespace-nowrap md:flex">
          {" "}
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#2f241d] text-white"
                    : "text-[#6f625a] hover:bg-[#efe2d8] hover:text-[#2f241d]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Botão mobile (direita) */}
        <div className="ml-auto md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-full bg-[#efe2d8] p-2 text-[#2f241d]"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mx-auto mt-3 flex max-w-6xl flex-col gap-2 rounded-3xl border border-white/60 bg-white/90 p-4 shadow-xl backdrop-blur-md md:hidden">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#2f241d] text-white"
                    : "text-[#6f625a] hover:bg-[#efe2d8]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
