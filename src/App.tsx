import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home";
import { TitleProps, weddingPhotos } from "./weddingPhotos";
import { SectionPage } from "./sectionPage";
import { MusicProvider } from "./MusicContext";
import { Navbar } from "./Navbar";

const App = () => {
  return (
    <MusicProvider>
      <Router>
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home weddingPhotos={weddingPhotos} />} />
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
        </div>
      </Router>
    </MusicProvider>
  );
};

export default App;
