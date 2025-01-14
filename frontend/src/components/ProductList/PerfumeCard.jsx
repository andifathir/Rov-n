import { Box, Image, Text, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Import Link for routing
import { Skeleton, SkeletonText } from "../ui/skeleton";
import { useStore } from "../../Store/Products";


function PerfumeCard({ productId, name, image, price, description, isLoading }) {
  const deleteProduct = useStore((state) => state.deleteProduct); // Get deleteProduct function from store

  if (isLoading) {
    return (
      <Link to="#"> {/* Add Link here to keep the cursor pointer on skeleton loading */}
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          bg="white"
          shadow="md"
          _hover={{
            transform: "scale(1.05)", // Slightly inflates the card on hover
            boxShadow: "lg", // Optional: Adds a larger shadow for a better hover effect
            transition: "all 0.2s ease-in-out", // Smooth transition
          }}
          cursor="pointer" // Changes the cursor to a pointer when hovering
        >
          {/* Skeleton for Image */}
          <Skeleton height="200px" />

          {/* Card Content */}
          <Box p="4">
            {/* Skeleton for Product Title */}
            <SkeletonText noOfLines={1} spacing="4" />
            
            {/* Skeleton for Product Description */}
            <SkeletonText noOfLines={2} spacing="4" />
            
            {/* Skeleton for Price */}
            <Skeleton height="20px" width="50%" mt="4" />
          </Box>

          {/* Card Footer with Skeletons for Buttons */}
          <Box p="4" display="flex" gap="2">
            <Skeleton height="40px" width="48%" />
            <Skeleton height="40px" width="48%" />
          </Box>
        </Box>
      </Link>
    );
  }

  const handleDeleteProduct = async (e) => {
    e.stopPropagation(); // Prevents the Link's click event from triggering
    await deleteProduct(productId); // Call deleteProduct function
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      shadow="md"
      _hover={{
        transform: "scale(1.05)", // Slightly inflates the card on hover
        boxShadow: "lg", // Optional: Adds a larger shadow for a better hover effect
        transition: "all 0.2s ease-in-out", // Smooth transition
      }}
      cursor="pointer" // Changes the cursor to a pointer when hovering
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

      {/* Delete Button */}
      <Box p="4">
        <Button
          variant="solid"
          colorScheme="red"
          onClick={handleDeleteProduct} // Delete product when clicked
          w="full"
        >
          Delete
        </Button>
      </Box>

      {/* Detail Link */}
      <Link to={`/perfume-detail/${productId}`} />
    </Box>
  );
}

PerfumeCard.propTypes = {
  productId: PropTypes.number.isRequired, // Change to number
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired, // Added isLoading prop to control skeleton loading state
};

export default PerfumeCard;
