"use client";

import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
  Separator,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster"; // Your custom toaster

function Checkout() {
  const navigate = useNavigate();

  // Placeholder data for testing
  const selectedProduct = {
    name: "Placeholder Perfume",
    price: 59.99,
    quantity: 2,
  };

  const handlePlaceOrder = () => {
    // Show success notification using your custom toaster
    toaster.success({
      title: "Order placed successfully!",
      description: `Your order for ${selectedProduct.name} has been confirmed.`,
      action: {
        label: "View Order",
        onClick: () => navigate("/order-success"),
      },
    });

    // Navigate to a success or home page
    navigate("/order-success");
  };

  return (
    <Box p={8} maxW="800px" mx="auto">
      {/* Page Heading */}
      <Heading as="h1" size="lg" mb={6} textAlign="center">
        Checkout
      </Heading>

      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        {/* Order Summary */}
        <Box w={{ base: "100%", md: "50%" }} p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
          <Heading as="h2" size="md" mb={4}>
            Order Summary
          </Heading>
          <VStack align="stretch" spacing={4}>
            <HStack justify="space-between">
              <Text>Product</Text>
              <Text fontWeight="bold">{selectedProduct.name}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Price</Text>
              <Text fontWeight="bold">${selectedProduct.price}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Quantity</Text>
              <Text fontWeight="bold">{selectedProduct.quantity}</Text>
            </HStack>
            <Separator />
            <HStack justify="space-between">
              <Text>Total</Text>
              <Text fontWeight="bold">
                ${selectedProduct.price * selectedProduct.quantity}
              </Text>
            </HStack>
          </VStack>
        </Box>

        {/* Payment Details */}
        <Box w={{ base: "100%", md: "50%" }} p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
          <Heading as="h2" size="md" mb={4}>
            Payment Details
          </Heading>
          <Stack spacing={4}>
            <Input placeholder="Cardholder Name" size="lg" />
            <Input placeholder="Card Number" size="lg" type="number" />
            <HStack spacing={4}>
              <Input placeholder="MM/YY" size="lg" />
              <Input placeholder="CVV" size="lg" type="number" />
            </HStack>
            <Input placeholder="Billing Address" size="lg" />
          </Stack>
        </Box>
      </Flex>

      {/* Place Order Button */}
      <VStack mt={8}>
        <Button
          colorScheme="teal"
          size="lg"
          width="100%"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </VStack>
    </Box>
  );
}

export default Checkout;
