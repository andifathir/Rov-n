import React from "react";
import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import FemBanner from "../../assets/PERFUME FEMININ/Perfume 19.jpg";

function Banner() {
  return (
    <Box position="relative" height="100vh" width="100%" overflow="hidden">
      {/* Background Image */}
      <Image
        src={FemBanner} // Replace with your image URL
        alt="Background"
        objectFit="cover"
        height="100%"
        width="100%"
      />

      {/* Content */}
      <Flex
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        align="center"
        justify="center"
        flexDirection="column"
        backgroundColor="rgba(0, 0, 0, 0.4)" // Dark overlay
        color="white"
        textAlign="center"
        p="8"
      >
        <Heading fontSize="4xl" fontWeight="bold">
          Discover Our Feminine Fragrances
        </Heading>
        <Text fontSize="lg" mt="4">
          Our fragrances are completely genderless, and we believe that both men
          and women can wear feminine fragrances
        </Text>
      </Flex>
    </Box>
  );
}

export default Banner;
