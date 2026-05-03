import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TitleProps, weddingPhotos } from "./weddingPhotos";
import { MusicProvider } from "./MusicContext";
import { Navbar } from "./Navbar";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./home"));
const SectionPage = lazy(() => import("./sectionPage"));

const App = () => {
  return (
    <MusicProvider>
      <Router>
        <Navbar />

        <div>
          <Suspense
            fallback={
              <div className="fixed inset-0 flex items-center justify-center bg-[#f7f1ea] z-50">
                <div className="flex flex-col items-center gap-4">
                  {/* Spinner */}
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2f241d] border-t-transparent" />

                  {/* Texto */}
                  <p className="text-sm font-medium text-[#6f625a]">
                    Carregando...
                  </p>
                </div>
              </div>
            }
          >
            <Routes>
              <Route
                path="/"
                element={<Home weddingPhotos={weddingPhotos} />}
              />
              {Object.entries(weddingPhotos).map(([section, photos]) => (
                <Route
                  key={section}
                  path={`/${section}`}
                  element={
                    <SectionPage
                      section={section as keyof TitleProps}
                      photos={photos}
                    />
                  }
                />
              ))}
            </Routes>
          </Suspense>
        </div>
      </Router>
    </MusicProvider>
  );
};

export default App;
