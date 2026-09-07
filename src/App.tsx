import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from './pages/Home';
import Gallery from './pages/Gallery';

export default function App () {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />}></Route>
        </Routes>
      </main>
    </div>
  )
}
