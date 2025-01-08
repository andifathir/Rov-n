import { Box, Image } from "@chakra-ui/react";
import Background from "../assets/BG About Us.jpg"; // Gantilah dengan jalur gambar yang sesuai

function AboutUs() {
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
          alt="About Us Background"
          objectFit="cover"
          width="100vw"
          height="100%"
          position="absolute"
          top="0"
          left="0"
          zIndex={-1}
        />
        {/* Title in the Center */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={1}
        >
          <h1
            style={{
              fontSize: "5rem", // Menjadikan teks lebih besar
              fontWeight: "bold", // Menjadikan teks lebih tebal
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            About Us
          </h1>
        </Box>
      </Box>
    </Box>
  );
}

export default AboutUs;
