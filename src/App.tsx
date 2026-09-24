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
        className="min-h-screen bg-background-color text-black flex flex-col items-center px-4 py-10"
        role="main"
        aria-labelledby="memorial-title"
        >
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
