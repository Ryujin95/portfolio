import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import PageMetadata from "./components/PageMetadata.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import AppRoutes from "./app/AppRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <PageMetadata />
      <Navbar />
      <ScrollToTop />
      <AppRoutes />
      <CustomCursor />
    </BrowserRouter>
  );
}

export default App;
