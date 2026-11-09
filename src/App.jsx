import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import AppRoutes from "./app/AppRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <AppRoutes />
      <CustomCursor />
    </BrowserRouter>
  );
}

export default App;
