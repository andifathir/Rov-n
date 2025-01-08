import { Box, Image } from "@chakra-ui/react";
import Background from "../assets/BG HOME MENU.png";
import NewBackground from "../assets/PERFUME FEMININ/Perfume 13.jpg";
import AnotherImage from "../assets/PERFUME FEMININ/Perfume 2.jpg";
import Image3 from "../assets/PERFUME FEMININ/Perfume 5.jpg";
import Image4 from "../assets/PERFUME FEMININ/Perfume 12.jpg";
import HighlightedProduct from "@/components/Home/HighlightedProduct";
import HomeCategories from "@/components/Home/HomeCatgories";
import HomeCarousel from "@/components/Home/HomeCarousel";
import ReviewShowcase from "@/components/Home/ReviewShowcase";

function Home() {
  const variants = {
    hiddenRight: { opacity: 0, x: 100 },
    hiddenLeft: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const images = [NewBackground, AnotherImage, Image3, Image4];

  return (
    <Box overflow="hidden">
      {/* Top Image Section */}
      <Box
        position="relative"
        height="80vh"
        width="100vw"
        overflow="visible"
        zIndex={0}
      >
        <Image
          src={Background}
          alt="Logo Roven"
          objectFit="cover"
          width="100vw"
          height="100%"
          position="absolute"
          top="-10%"
          left="0"
          zIndex={-1}
        />
      </Box>

      {/* Highlighted Product Sections */}
      {images.map((image, index) => (
        <HighlightedProduct
          key={index}
          image={image}
          index={index}
          variants={variants}
        />
      ))}

      <HomeCategories />

      <HomeCarousel />

      <ReviewShowcase />
    </Box>
  );
}

export default Home;
