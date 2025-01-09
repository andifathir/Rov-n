import { Box } from "@chakra-ui/react";
import Navbar from "./components/main/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/main/Footer";
import Register from "./pages/Register";
import Account from "./pages/Account";
import BestSeller from "./pages/BestSeller";
import AboutUs from "./pages/AboutUs";
import ProductList from "./pages/ProductList";
import PerfumeDetails from "./pages/PerfumeDetails";
import Wishlists from "./pages/Wishlists";



import Test from "./pages/Test";
import RegistrationTest from "./pages/RegistrationTest";


function App() {
  return (
    <>
      <Box>
        <Navbar zIndex={1} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/best-seller" element={<BestSeller />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/wishlists" element={<Wishlists />} />
          <Route path="/perfume-list" element={<ProductList />} />
          <Route path="/test" element={<Test />} />
          <Route path="/kontol" element={<RegistrationTest />} />
          <Route path="/perfume-detail/:productId" element={<PerfumeDetails />} />
        </Routes>
        <Footer />
      </Box>
    </>
  );
}

export default App;
