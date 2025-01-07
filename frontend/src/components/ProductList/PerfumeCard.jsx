import { Box, Image, Text, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

function PerfumeCard({ name, image, price, description }) {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      shadow="md"
    >
      {/* Image */}
      <Image
        src={image}
        alt={name}
        w="full"
        h="200px"
        objectFit="cover"
        fallbackSrc="/images/fallback.jpg"
      />

      {/* Card Content */}
      <Box p="4">
        {/* Product Title */}
        <Text fontSize="lg" fontWeight="bold" isTruncated>
          {name}
        </Text>

        {/* Product Description */}
        <Text fontSize="sm" color="gray.500" mt="2" noOfLines={2}>
          {description}
        </Text>

        {/* Price */}
        <Text fontSize="xl" fontWeight="medium" mt="4" color="blackAlpha.500">
          {price}
        </Text>
      </Box>

      {/* Card Footer */}
      <Box p="4" display="flex" gap="2">
        <Button variant="solid" colorScheme="teal" flex="1">
          Buy Now
        </Button>
        <Button variant="outline" colorScheme="teal" flex="1">
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
}

PerfumeCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default PerfumeCard;
