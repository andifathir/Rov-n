import { Box, Image, Text, Stack, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Import Link for routing
import { Skeleton, SkeletonText } from "../ui/skeleton";

function KontolFuad({ productId, name, image, price, description, isLoading }) {

  if (isLoading) {
    return (
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" shadow="md">
        {/* Skeleton for Image */}
        <Skeleton height="200px" />
        {/* Card Content */}
        <Box p="4">
          <SkeletonText noOfLines={1} spacing="4" />
          <SkeletonText noOfLines={2} spacing="4" />
          <Skeleton height="20px" width="50%" mt="4" />
        </Box>
      </Box>
    );
  }

  return (
    <Link to={`/perfume-detail/${productId}`} style={{ textDecoration: 'none' }}> {/* Wrap the entire card with Link */}
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        shadow="md"
        _hover={{
          transform: "scale(1.05)", 
          boxShadow: "lg", 
          transition: "all 0.2s ease-in-out", 
        }}
        cursor="pointer"
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
      </Box>
    </Link>
  );
}

KontolFuad.propTypes = {
  productId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default KontolFuad;