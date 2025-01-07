import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

function PerfumeCard({ name, image }) {
  // Construct the full image URL for the product image
  const imageUrl = image;

  return (
    <Box
      bg="white"
      p={5}
      m={3}
      shadow="md"
      rounded="lg"
      textAlign="center"
      maxW="300px"
      mx={"auto"}
      h={"400px"}
    >
      {/* Image component */}
      <Image
        src={imageUrl}
        alt={name}
        onError={(e) => (e.target.src = '/images/fallback.jpg')}  // Use fallback image on error
        w="full"
        h="250px"
        objectFit="cover"
        rounded="md"
      />
      <Text mt={3} as="h3" fontSize="lg" fontWeight="bold">
        {name}
      </Text>
    </Box>
  );
}

PerfumeCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default PerfumeCard;
