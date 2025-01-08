import React, { useState } from "react";
import { Box, SimpleGrid, Center, Text, Button, Image } from "@chakra-ui/react";

// Feminine images
import Floraison from "../../assets/PERFUME FEMININ/Perfume 2.jpg";
import Etheral from "../../assets/PERFUME FEMININ/Perfume 3.jpg";
import RoseWhisper from "../../assets/PERFUME FEMININ/Perfume 5.jpg";
import lavenderMist from "../../assets/PERFUME FEMININ/Perfume 12.jpg";

// Masculine images
import ScentDesignerKit from "../../assets/MASCULIN PERFUME/Perfume 1.jpg";
import LucidDreams from "../../assets/MASCULIN PERFUME/Perfume 10.jpg";
import OceanBreeze from "../../assets/MASCULIN PERFUME/Perfume 11.jpg";
import MidnightNoir from "../../assets/MASCULIN PERFUME/Perfume 18.webp";

import { useNavigate } from "react-router-dom";

function HomeCategories() {
  // Set the default category to "feminine"
  const [category, setCategory] = useState("feminine");

  const navigate = useNavigate();

  // Example data structure for products
  const products = {
    feminine: [
      { name: "Floraison", image: Floraison },
      { name: "Ethereal", image: Etheral },
      { name: "Rose Whisper", image: RoseWhisper },
      { name: "Lavender Mist", image: lavenderMist },
    ],
    masculine: [
      { name: "Scent Designer Kit", image: ScentDesignerKit },
      { name: "Lucid Dreams", image: LucidDreams },
      { name: "Ocean Breeze", image: OceanBreeze },
      { name: "Midnight Noir", image: MidnightNoir },
    ],
  };

  return (
    <Box py={10} bg="gray.100">
      <Center mb={5}>
        <Text
          as="h2"
          fontSize="2xl"
          fontWeight="bold"
          onClick={() => setCategory("feminine")}
          cursor="pointer"
          textDecoration={category === "feminine" ? "underline" : "none"}
        >
          Feminine
        </Text>
        <Text
          as="h2"
          fontSize="2xl"
          fontWeight="bold"
          ml={10}
          onClick={() => setCategory("masculine")}
          cursor="pointer"
          textDecoration={category === "masculine" ? "underline" : "none"}
        >
          Masculine
        </Text>
      </Center>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={10} mx="auto" w="90%">
        {products[category].map((item, index) => (
          <Box
            key={index}
            bg="white"
            p={5}
            m={3}
            shadow="md"
            rounded="lg"
            textAlign="center" // Center-aligns the text within the Box
          >
            <Image
              src={item.image}
              alt={item.name}
              w="full"
              h="64"
              objectFit="cover"
            />
            <Text mt={3} align="center" as="h3" fontSize="lg" fontWeight="bold">
              {item.name}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
      <Center mt={10}>
        <Button
          colorScheme="black"
          variant="solid"
          onClick={() => navigate("/perfume-list")}
        >
          VIEW ALL PRODUCTS
        </Button>
      </Center>
    </Box>
  );
}

export default HomeCategories;
