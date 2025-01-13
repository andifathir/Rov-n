// PerfumeOverview.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  HStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaMinus, FaPlus, FaHeart } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../Store/Products"; // Make sure the path is correct

function PerfumeOverview() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const { selectedProduct, isLoading, fetchProductDetails, error } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      console.log("Fetching details for product:", productId);
      fetchProductDetails(productId); // Fetch product details by productId
    }
  }, [productId, fetchProductDetails]);

  // Log the selected product data for debugging
  console.log("Selected product:", selectedProduct);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  if (!selectedProduct) return <Text>Product not found</Text>;

  const handleQuantityIncrease = () => setQuantity(quantity + 1);
  const handleQuantityDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) setQuantity(value);
  };

  const handleAddToWishlist = () => {
    console.log("Added to Wishlist:", selectedProduct.name);
    // Add your logic here to handle adding to the wishlist
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} p={8} gap={8} align="stretch">
      {/* Left section: Main image and thumbnails */}
      <VStack w={{ base: "100%", md: "50%" }} align="center" spacing={4}>
        <Image
          src={selectedImage || selectedProduct.image}
          alt="Main product"
          borderRadius="md"
          boxShadow="lg"
          boxSize="300px"
          objectFit="cover"
        />
        {/* Thumbnails (if available) */}
        <HStack spacing={4}>
          {selectedProduct.thumbnails?.map((image, idx) => (
            <Image
              key={idx}
              src={image}
              alt={`Thumbnail ${idx + 1}`}
              boxSize="50px"
              cursor="pointer"
              borderRadius="md"
              boxShadow="sm"
              objectFit="cover"
              onClick={() => setSelectedImage(image)}
              border={selectedImage === image ? "2px solid black" : "none"}
            />
          ))}
        </HStack>
      </VStack>

      {/* Right section: Product details */}
      <Box w={{ base: "100%", md: "50%" }} textAlign={{ base: "center", md: "left" }}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            {selectedProduct.name}
            {selectedProduct.name} {/* Display product name */}
            {/* Wishlist Icon */}
            <Box
              as="span"
              ml={2}
              color="red.500"
              fontSize="2xl"
              cursor="pointer"
              onClick={handleAddToWishlist}
              _hover={{ color: "red.700" }}
            >
              <FaHeart />
            </Box>
          </Text>
          <Text fontSize="xl" fontWeight="semibold" color="gray.500" mb={4}>
            {selectedProduct.price}
          </Text>
          <Text fontSize="md" color="gray.600" mb={4}>
            {selectedProduct.description}
          </Text>

          {/* Social Media Share Buttons */}
          <HStack spacing={4} justify={{ base: "center", md: "flex-start" }} mb={6}>
            <Button backgroundColor="transparent" _hover={{ backgroundColor: "transparent" }} color="black">
              <CiFacebook />
            </Button>
            <Button backgroundColor="transparent" _hover={{ backgroundColor: "transparent" }} color="black">
              <FaInstagram />
            </Button>
            <Button backgroundColor="transparent" _hover={{ backgroundColor: "transparent" }} color="black">
              <FaTwitter />
            </Button>
          </HStack>

          <Text fontWeight="semibold">Stock available: {selectedProduct.stock}</Text>
        </Box>

        {/* Quantity Selector */}
        <HStack spacing={4} justify={{ base: "center", md: "flex-start" }} mb={4} mt={4}>
          <Text fontWeight="semibold">Quantity:</Text>
          <HStack>
            <Button onClick={handleQuantityDecrease} variant="outline" size="sm" color="black" border="1px solid" borderColor="gray.300">
              <FaMinus />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
              textAlign="center"
              size="sm"
              width="50px"
            />
            <Button onClick={handleQuantityIncrease} variant="outline" size="sm" color="black" border="1px solid" borderColor="gray.300">
              <FaPlus />
            </Button>
          </HStack>
        </HStack>

        {/* Add to Cart and Buy Now Buttons */}
        <HStack spacing={4} justify={{ base: "center", md: "flex-start" }}>
          <Button size="lg" variant="outline" colorScheme="blackAlpha">
            Add to Cart
          </Button>
          <Button
  size="lg"
  colorScheme="blackAlpha"
  onClick={() => navigate("/checkout", { state: { product: selectedProduct, quantity } })}
>
  Buy It Now
</Button>

        </HStack>
      </Box>
    </Flex>
  );
}

export default PerfumeOverview;
