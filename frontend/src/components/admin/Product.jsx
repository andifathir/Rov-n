import ProductList from "@/pages/ProductList";
import React, { useEffect } from "react";
import PerfumeCard from "../ProductList/PerfumeCard";
import { SimpleGrid } from "@chakra-ui/react";
import { useStore } from "../../Store/Products";

function Product() {
      const { products, isLoading, error, fetchProducts } = useStore();
    
      useEffect(() => {
        fetchProducts(); // Fetch products on component mount
      }, [fetchProducts]);

  return (
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
  );
}

export default Product;
