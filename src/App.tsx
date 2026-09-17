import Home from "./pages/Home.tsx";
import Messages from "./pages/Messages.tsx";
import Gallery from "./pages/Gallery.tsx";

export default function App () {
  return (
    <main
      className="min-h-screen bg-white text-black flex flex-col items-center px-4 py-10"
      role="main"
      aria-labelledby="memorial-title"
    >
      <Home />
      <Messages />

      <Gallery />

      <footer
        className="text-center text-gray-600 mt-10"
        role="contentinfo"
        aria-label="Footer note"
      >
        <p>Forever in our hearts.</p>
      </footer>
    </main>
  )
}
