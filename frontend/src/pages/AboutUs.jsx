import { Box, Image, Flex, Text, Grid } from "@chakra-ui/react";
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

      {/* Our Company Section */}
      <Box padding="4rem 2rem" backgroundColor="gray.50">
        <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb="4">
          The Roven Perfume Legacy
        </Text>
        <Text fontSize="lg" textAlign="center" color="gray.600">
          At Roven, we are more than just a fragrance company; we are the
          creators of unforgettable experiences. With our signature perfumes
          designed for both men and women, every scent is an invitation to step
          into a world of luxury, elegance, and personal expression.
        </Text>
      </Box>

      {/* Introduction Section */}
      <Box padding="4rem 2rem">
        <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb="4">
          Crafting Timeless Fragrances, Tailored for You!
        </Text>
        <Flex justifyContent="center" wrap="wrap" gap="2rem">
          {[
            { title: "Long-Lasting Elegance", icon: "⏳" },
            { title: "Handcrafted Perfection", icon: "🖐️" },
            { title: "Luxurious Scents", icon: "💎" },
          ].map((item, index) => (
            <Box
              key={index}
              padding="2rem"
              borderRadius="md"
              boxShadow="md"
              textAlign="center"
              width="250px"
            >
              <Text fontSize="4xl">{item.icon}</Text>
              <Text fontWeight="bold" fontSize="xl" mt="2">
                {item.title}
              </Text>
              <Text color="gray.600" mt="2">
                Our perfumes are crafted with the finest ingredients, ensuring
                that every spray lasts throughout your day, leaving a signature
                scent wherever you go.
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Team Members Section */}
      <Box padding="4rem 2rem" backgroundColor="gray.100">
        <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb="6">
          Meet the Visionaries Behind Roven
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)", // 1 column on small screens
            sm: "repeat(2, 1fr)", // 2 columns on small screens
            md: "repeat(3, 1fr)", // 3 columns on medium screens
            lg: "repeat(5, 1fr)", // 5 columns on large screens
          }}
          gap="2rem"
          justifyItems="center" // Ensure the items are centered within the grid cells
        >
          {[
            {
              name: "M Hariz Faizul Anwar",
              role: "Founder & Master Perfumer",
              image: "src/assets/Hariz.jpg",
            }, // Updated image path for Hariz
            {
              name: "Andi Fathir Muzakki Diningrat",
              role: "Creative Director",
              image: "src/assets/Fathir.jpg", // Updated image path for Fathir
            },
            { name: "Muhammad Hanif", role: "Fragrance Specialist" },
            {
              name: "Al Fitra Nur Ramadhani",
              role: "Brand Strategist",
              image: "src/assets/Dhani.jpg", // Updated image path for Dhani
            },
            { name: "Achmal Farhan Assidqi", role: "Luxury Perfume Expert" },
          ].map((member, index) => (
            <Box
              key={index}
              padding="2rem"
              borderRadius="md"
              boxShadow="lg"
              textAlign="center"
              backgroundColor="white"
              width="100%" // Ensure boxes don't stretch too wide
            >
              <Image
                borderRadius="full"
                boxSize="100px"
                src={
                  member.image ||
                  `https://via.placeholder.com/100?text=${member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}`
                }
                alt={member.name}
                mb="4"
                display="block"
                margin="0 auto"
              />
              <Text fontWeight="bold" fontSize="xl" mt="2">
                {member.name}
              </Text>
              <Text color="gray.600" mt="2">
                {member.role}
              </Text>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default AboutUs;
