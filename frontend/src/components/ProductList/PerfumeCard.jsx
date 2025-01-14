import React, { useState } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Input,
  Stack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useStore } from "../../Store/Products";
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuItemCommand
} from "@/components/ui/menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle } from "../ui/dialog";
import { Skeleton, SkeletonText } from "../ui/skeleton";

function PerfumeCard({ productId, name, image, price, description, isLoading }) {
  const { updateProduct, deleteProduct } = useStore();
  const [formData, setFormData] = useState({ name, price, description, image });
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleUpdateProduct = async () => {
    const updateData = new FormData();
    updateData.append("name", formData.name);
    updateData.append("price", formData.price);
    updateData.append("description", formData.description);
    if (formData.image) updateData.append("image", formData.image);

    await updateProduct(productId, updateData);
    setIsUpdateDialogOpen(false); // Close dialog after update
  };

  const handleDeleteProduct = async () => {
    await deleteProduct(productId);
  };

  if (isLoading) {
    return (
      <Box>
        {/* Loading Skeleton */}
        <Skeleton height="200px" />
        <SkeletonText mt="4" noOfLines={2} spacing="4" />
        <Skeleton height="20px" mt="4" />
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
      position="relative"
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

      {/* Three-Dot Menu */}
      <MenuRoot>
        <MenuTrigger asChild>
          <Button variant="outline" size="sm">
            <BsThreeDotsVertical />
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem onClick={() => setIsUpdateDialogOpen(true)}>
            Update
          </MenuItem>
          <MenuItem onClick={handleDeleteProduct} color="red.500">
            Delete
          </MenuItem>
        </MenuContent>
      </MenuRoot>

      {/* Card Content */}
      <Box p="4">
        <Text fontSize="lg" fontWeight="bold" isTruncated>
          {name}
        </Text>
        <Text fontSize="sm" color="gray.500" mt="2" noOfLines={2}>
          {description}
        </Text>
        <Text fontSize="xl" fontWeight="medium" mt="4" color="blackAlpha.500">
          ${price}
        </Text>
      </Box>

      {/* Dialog for Updating Product */}
      {isUpdateDialogOpen && (
        <DialogRoot>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Product</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Stack gap="4">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                />
                <Input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter product price"
                />
                <Input
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                />
                <Input type="file" onChange={handleFileChange} />
              </Stack>
            </DialogBody>
            <DialogFooter>
              <DialogCloseTrigger>
                <Button variant="outline">Cancel</Button>
              </DialogCloseTrigger>
              <Button colorScheme="teal" onClick={handleUpdateProduct}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      )}
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
