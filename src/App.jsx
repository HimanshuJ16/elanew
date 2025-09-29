import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Careers from "./pages/Careers";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/careers" element={<Careers />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;