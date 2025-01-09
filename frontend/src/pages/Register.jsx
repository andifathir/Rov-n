// src/components/Register.js
import React from "react";
import { Box, Input, Button, Text, VStack, Link, Image } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../axios";  // Import the axios instance you configured
import Background from "../assets/BG Login.jpg"; 
import  useStore  from "../Store/Account"; // Zustand store

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { registerAccount, isLoading, error, token } = useStore();

  // Form submission handler
  const onSubmit = handleSubmit(async (data) => {
    const { name, email, password } = data;
    try {
      // First, ensure you get the CSRF cookie
      await axios.get("/sanctum/csrf-cookie"); // Get CSRF token

      // Send registration request
      const response = await axios.post("/api/users/register", { name, email, password });

      // Optionally handle success response, e.g., store token in localStorage
      if (response.data.status) {
        navigate("/");  // Redirect on successful registration
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  });

  // Redirect if token exists (user is logged in)
  if (token) {
    navigate("/");  // Redirect to dashboard if token exists
  }

  return (
    <Box overflow="hidden" height="100vh" width="100vw">
      {/* Background Image */}
      <Box position="absolute" top="0" left="0" right="0" bottom="0" zIndex={-1}>
        <Image src={Background} alt="Register Background" objectFit="cover" width="100%" height="100%" position="absolute" top="0" left="0" />
      </Box>

      {/* Form Section */}
      <form
        onSubmit={onSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
          paddingTop: "20vh",
        }}
      >
        <VStack mt={8} spacing={4} align="center">
          <Text fontSize="2xl" fontWeight="bold" color="white">Register</Text>
          <Text fontSize="sm" color="white">Please fill in the information below:</Text>

          {/* Name Input */}
          <Box width="100%">
            <Text mb={1} fontSize="sm" fontWeight="bold" color={errors.name ? "red.500" : "white"}>Full name</Text>
            <Input {...register("name", { required: "Name is required" })} placeholder="Full name" size="md" borderColor="white" isInvalid={errors.name} />
            <Text mt={1} fontSize="xs" color="red.500">{errors.name?.message}</Text>
          </Box>

          {/* Email Input */}
          <Box width="100%">
            <Text mb={1} fontSize="sm" fontWeight="bold" color={errors.email ? "red.500" : "white"}>Email</Text>
            <Input {...register("email", { required: "Email is required" })} placeholder="Email" size="md" borderColor="white" isInvalid={errors.email} />
            <Text mt={1} fontSize="xs" color="red.500">{errors.email?.message}</Text>
          </Box>

          {/* Password Input */}
          <Box width="100%">
            <Text mb={1} fontSize="sm" fontWeight="bold" color={errors.password ? "red.500" : "white"}>Password</Text>
            <Input {...register("password", { required: "Password is required" })} placeholder="Password" type="password" size="md" borderColor="white" isInvalid={errors.password} />
            <Text mt={1} fontSize="xs" color="red.500">{errors.password?.message}</Text>
          </Box>

          {/* Submit Button */}
          <Button type="submit" width="100%" bg="black" color="white" fontWeight="bold" isLoading={isLoading}>CREATE MY ACCOUNT</Button>

          {/* Error Message */}
          {error && <Text color="red.500" fontSize="sm" mt={2}>{error}</Text>}

          <Text fontSize="sm" color="white">
            Already have an account?{" "}
            <Link onClick={() => navigate("/login")} _hover={{ textDecoration: "underline", cursor: "pointer" }} color="white">Login here</Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
}

export default Register;
