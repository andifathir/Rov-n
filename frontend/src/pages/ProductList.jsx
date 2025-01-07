import React, { useEffect } from "react";
import { SimpleGrid, Box, Spinner, Text } from "@chakra-ui/react";
import Banner from "@/components/ProductList/Banner";
import PerfumeCard from "@/components/ProductList/PerfumeCard"; // Import the PerfumeCard component
import { useStore } from "../Store/Products"; // Import the Zustand store

function ProductList() {
  const { products, isLoading, error, fetchProducts } = useStore();

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, [fetchProducts]);

  return (
    <Box>
      {/* Banner Component */}
      <Banner />

      {/* Display loading spinner */}
      {isLoading && (
        <Box textAlign="center" mt={10}>
          <Spinner size="xl" />
        </Box>
      )}

      {/* Display error message */}
      {error && (
        <Box textAlign="center" mt={10}>
          <Text color="red.500">{error}</Text>
        </Box>
      )}

      {/* Perfume Cards */}
      {!isLoading && !error && Array.isArray(products) && (
        <SimpleGrid columns={[1, 2, 3, 4]} gapX={2} mt={10} px={2}>
          {products.map((product) => (
            <PerfumeCard
              key={product.product_id} // Use a unique key from the API data
              name={product.name}
              image={product.image_url} // Adjust to match the API response field
              price={product.price} // Adjust to match the API response field
              description={product.description} // Adjust to match the API response field
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default ProductList;
