import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import JDR from "../pages/JDR.jsx";
import IstanbulGrill from "../pages/IstanbulGrill.jsx";
import MiniJeu1 from "../pages/MiniJeu1.jsx";
import MiniJeu2 from "../pages/MiniJeu2.jsx";
import Csharp from "../pages/Csharp.jsx";
import NotFound from "../pages/NotFound.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jdr" element={<JDR />} />
      <Route path="/istanbulGrill" element={<IstanbulGrill />} />
      <Route path="/mini-jeu-1" element={<MiniJeu1 />} />
      <Route path="/mini-jeu-2" element={<MiniJeu2 />} />
      <Route path="/csharp" element={<Csharp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
