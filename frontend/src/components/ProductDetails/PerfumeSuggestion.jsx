import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useStore } from "../../Store/Products"; // Update the path as needed

function PerfumeSuggestion() {
  const { products, isLoading, fetchProducts } = useStore();

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, [fetchProducts]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="200px">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <Box textAlign="left" p={4}>
      <Heading size="lg" mb={2}>
        Pair this with...
      </Heading>
      <Text fontSize="md" mb={6}>
        Floraison is a versatile fragrance and can be layered with most other
        fragrances. Our favourites are: <strong>Lucid Dreams, Ethereal</strong>,
        and <strong>La Bohème</strong>.{" "}
        <Link
          to="/fragrance-layering"
          style={{ color: "#3182ce", textDecoration: "underline" }}
        >
          Learn more about fragrance layering here.
        </Link>
      </Text>

      <Flex gap={4} justify="space-between" wrap="wrap">
        {products.map((product) => (
          <Box
            key={product.id}
            maxW="250px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            textAlign="center"
            shadow="md"
            _hover={{
              shadow: "lg",
              transform: "scale(1.03)",
              transition: "0.3s ease",
            }}
          >
            <Link to={`/perfume-detail/${product.id}`}>
              <Image src={product.image} alt={product.name} borderRadius="md" />
              <VStack spacing={2} p={4}>
                <Heading size="sm">{product.name}</Heading>
                <Text fontSize="sm" color="gray.600">
                  Rp{product.price.toLocaleString("id-ID")}
                </Text>
              </VStack>
            </Link>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default PerfumeSuggestion;
