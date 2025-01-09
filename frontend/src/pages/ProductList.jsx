import { useEffect } from "react";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import Banner from "@/components/ProductList/Banner";
import PerfumeCard from "@/components/ProductList/PerfumeCard"; // Import PerfumeCard
import { useStore } from "../Store/Products"; // Import Zustand store

function ProductList() {
  const { products, isLoading, error, fetchProducts } = useStore();

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, [fetchProducts]);

  return (
    <Box>
      {/* Banner Component */}
      <Banner />

      {/* Display error message */}
      {error && (
        <Box textAlign="center" mt={10}>
          <Text color="red.500">{error}</Text>
        </Box>
      )}

      {/* Perfume Cards with Skeleton Loader */}
      <SimpleGrid columns={[1, 2, 3, 4]} gapX={2} mt={10} px={2}>
        {/* Display Skeleton Cards when Loading */}
        {isLoading
          ? [...Array(4)].map((_, index) => (
              <PerfumeCard key={index} isLoading={true} />
            ))
          : products.map((product) => (
              <PerfumeCard
                key={product.product_id} // Use a unique key from the API data
                productId={product.product_id}
                name={product.name}
                image={product.image_url}
                price={product.price}
                description={product.description}
                isLoading={false} // Passing false when data is loaded
              />
            ))}
      </SimpleGrid>
    </Box>
  );
}

export default ProductList;
