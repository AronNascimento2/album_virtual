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

        <div className="pt-16">
          <Suspense
            fallback={
              <div className="flex items-center justify-center">
                Carregando...
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
