import Home from "./pages/Home.tsx";
import Messages from "./pages/Messages.tsx";
import Gallery from "./pages/Gallery.tsx";
import Admin from "./pages/Admin.tsx";
import { BrowserRouter, Routes, Route} from "react-router-dom";

function MainSite() {
  return (
    <>
      <Home />
      <Messages />
      <Gallery />
      <footer
        className=" text-center text-slate-600 mt-10"
        role="contentinfo"
        aria-label="Footer note"
      >
        <p> Forever in our hearts.</p>
      </footer>
    </>
  );
}


export default function App () {
  return (
    <BrowserRouter>
      <main
        className="app-container"
        role="main"
        aria-labelledby="memorial-title"
        >
        <div className="memorial-frame">
          <div className="frame-mountains" />
          <Routes>
            <Route path="/" element={<MainSite />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  )
}
