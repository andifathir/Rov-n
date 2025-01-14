import { Box, Image, Text, Button, Input, Stack, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { useStore } from "../../Store/Products";
import { Field } from "@/components/ui/field"; // Assuming `Field` is imported correctly
import { Skeleton, SkeletonText } from "../ui/skeleton";

function PerfumeCard({ productId, name, image, price, description, isLoading }) {
  const deleteProduct = useStore((state) => state.deleteProduct); // Get deleteProduct function from store
  const updateProduct = useStore((state) => state.updateProduct); // Get updateProduct function from store

  const [isEditing, setIsEditing] = useState(false);
  const [productData, setProductData] = useState({
    name: name,
    price: price,
    description: description,
  });

  const handleDeleteProduct = async (e) => {
    e.stopPropagation(); // Prevents the Link's click event from triggering
    await deleteProduct(productId); // Call deleteProduct function
  };

  // const handleUpdate = async () => {
  //   const formData = new FormData();
  //   formData.append('name', productData.name);
  //   formData.append('price', productData.price);
  //   formData.append('description', productData.description);
  //   formData.append('category_id', productData.categoryId);  // Add categoryId if necessary
  //   formData.append('stock', productData.stock);  // Add stock if necessary
    
  //   // If there's an image file, append it to the form data
  //   if (productData.image) {
  //     formData.append('image_url', productData.image);
  //   }
  
  //   // Call the update function and pass the formData to the API
  //   await updateProduct(productId, formData);
  //   setIsEditing(false); // Hide the form after updating
  // };

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
        {!isEditing ? (
          <Text fontSize="lg" fontWeight="bold" isTruncated color="black">
            {name}
          </Text>
        ) : (
          <Stack gap="8">
            <Field orientation="horizontal" label="Name">
              <Input
                value={productData.name}
                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                placeholder="Product name"
                flex="1"
              />
            </Field>
          </Stack>
        )}

        {/* Product Description */}
        {!isEditing ? (
          <Text fontSize="sm" color="gray.500" mt="2" noOfLines={2}>
            {description}
          </Text>
        ) : (
          <Stack gap="8">
            <Field orientation="horizontal" label="Description">
              <Input
                value={productData.description}
                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                placeholder="Product description"
                flex="1"
              />
            </Field>
          </Stack>
        )}

        {/* Price */}
        {!isEditing ? (
          <Text fontSize="xl" fontWeight="medium" mt="4" color="blackAlpha.500">
            {price}
          </Text>
        ) : (
          <Stack gap="8">
            <Field orientation="horizontal" label="Price">
              <Input
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                placeholder="Product price"
                flex="1"
              />
            </Field>
          </Stack>
        )}
      </Box>

      {/* Buttons Container */}
      <Box p="4">
        <Flex gap="2">
          <Button
            variant="solid"
            colorScheme="red"
            onClick={handleDeleteProduct} // Delete product when clicked
            w="48%"
          >
            Delete
          </Button>

          {/* <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              if (isEditing) {
                handleUpdate();
              } else {
                setIsEditing(true);
              }
            }} // Toggle edit mode or submit update
            w="48%"
          >
            {isEditing ? "Save" : "Update"}
          </Button> */}
        </Flex>
      </Box>

      {/* Detail Link */}
      <Link to={`/perfume-detail/${productId}`} />
    </Box>
  );
}

PerfumeCard.propTypes = {
  productId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default PerfumeCard;
