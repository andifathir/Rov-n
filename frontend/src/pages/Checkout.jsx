"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  VStack,
  Separator,
} from "@chakra-ui/react";
import { RiAppleFill, RiBankCardFill, RiPaypalFill } from "react-icons/ri";
import { toaster } from "@/components/ui/toaster"; // Ensure toaster is correctly imported

import QRCode from "react-qr-code"; // QR code for other payment methods
import { RadioCardItem, RadioCardLabel, RadioCardRoot } from "@/components/ui/radio-card";

function Checkout() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paypal");
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceOrder = () => {
    // Validate payment information
    if (selectedPaymentMethod === "card" && (
      !formData.cardholderName || !formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.billingAddress)) {
      toaster.create({
        description: "Please fill in all the payment details.",
        duration: 6000,
      });
      return;
    }

    // Show success notification
    toaster.create({
      title: "Success",
      description: "Your order has been successfully placed!",
      duration: 6000,
      type: "success",
    });
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
              <Text fontWeight="bold">Example Product</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Price</Text>
              <Text fontWeight="bold">$100</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Quantity</Text>
              <Text fontWeight="bold">1</Text>
            </HStack>
            <Separator />
            <HStack justify="space-between">
              <Text>Total</Text>
              <Text fontWeight="bold">$100</Text>
            </HStack>
          </VStack>
        </Box>

        {/* Payment Method */}
        <Box w={{ base: "100%", md: "50%" }} p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
          <Heading as="h2" size="md" mb={4}>
            Payment Method
          </Heading>
          <RadioCardRoot
            orientation="horizontal"
            align="center"
            justify="center"
            maxW="lg"
            defaultValue="paypal"
          >
            <RadioCardLabel>Choose a payment method</RadioCardLabel>
            <HStack align="stretch">
              {items.map((item) => (
                <RadioCardItem
                  label={item.title}
                  icon={
                    <Icon fontSize="2xl" color="fg.subtle">
                      {item.icon}
                    </Icon>
                  }
                  indicator={false}
                  key={item.value}
                  value={item.value}
                  onChange={() => setSelectedPaymentMethod(item.value)}
                />
              ))}
            </HStack>
          </RadioCardRoot>

          {/* Conditional payment details */}
          {selectedPaymentMethod === "card" && (
            <Stack spacing={4} mt={6}>
              <Input
                name="cardholderName"
                placeholder="Cardholder Name"
                size="lg"
                value={formData.cardholderName}
                onChange={handleInputChange}
              />
              <Input
                name="cardNumber"
                placeholder="Card Number"
                size="lg"
                type="number"
                value={formData.cardNumber}
                onChange={handleInputChange}
              />
              <HStack spacing={4}>
                <Input
                  name="expiryDate"
                  placeholder="MM/YY"
                  size="lg"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                />
                <Input
                  name="cvv"
                  placeholder="CVV"
                  size="lg"
                  type="number"
                  value={formData.cvv}
                  onChange={handleInputChange}
                />
              </HStack>
              <Input
                name="billingAddress"
                placeholder="Billing Address"
                size="lg"
                value={formData.billingAddress}
                onChange={handleInputChange}
              />
            </Stack>
          )}

          {selectedPaymentMethod === "paypal" && (
            <Text mt={6} textAlign="center">
              Redirecting to PayPal...
            </Text>
          )}

          {selectedPaymentMethod === "apple-pay" && (
            <Text mt={6} textAlign="center">
              Redirecting to Apple Pay...
            </Text>
          )}

          {selectedPaymentMethod !== "card" && (
            <Box mt={6} textAlign="center">
              <Text>Scan the QR code below to complete your payment:</Text>
              <QRCode value="https://www.your-payment-qr-code-link.com" />
            </Box>
          )}
        </Box>
      </Flex>

      {/* Place Order Button */}
      <VStack mt={8}>
        <Button colorScheme="teal" size="lg" width="100%" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </VStack>
    </Box>
  );
}

const items = [
  { value: "paypal", title: "Paypal", icon: <RiPaypalFill /> },
  { value: "apple-pay", title: "Apple Pay", icon: <RiAppleFill /> },
  { value: "card", title: "Card", icon: <RiBankCardFill /> },
];

export default Checkout;
