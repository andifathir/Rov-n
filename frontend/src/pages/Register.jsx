import React from "react";
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  Link,
  Image,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Background from "../assets/BG Login.jpg"; // Gantilah dengan jalur gambar yang sesuai

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Box overflow="hidden" height="100vh" width="100vw">
      {/* Background Image Section */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex={-1}
      >
        <Image
          src={Background}
          alt="Register Background"
          objectFit="cover"
          width="100%"
          height="100%"
          position="absolute"
          top="0"
          left="0"
        />
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
          <Text fontSize="2xl" fontWeight="bold" color="white">
            Register
          </Text>
          <Text fontSize="sm" color="white">
            Please fill in the information below:
          </Text>

          <Box width="100%">
            <Text
              mb={1}
              fontSize="sm"
              fontWeight="bold" // Make label bold
              color={errors.firstName ? "red.500" : "white"}
            >
              First name
            </Text>
            <Input
              {...register("firstName", {
                required: "First name is required",
              })}
              placeholder="First name"
              size="md"
              borderColor="white"
              _focus={{ borderColor: "white", color: "white" }}
              _hover={{ borderColor: "white", color: "white" }}
              isInvalid={errors.firstName}
              sx={{
                color: "white", // Make text color white by default
                "::placeholder": {
                  color: "white", // Placeholder color
                },
              }}
            />
            <Text mt={1} fontSize="xs" color="red.500">
              {errors.firstName?.message}
            </Text>
          </Box>

          <Box width="100%">
            <Text
              mb={1}
              fontSize="sm"
              fontWeight="bold" // Make label bold
              color={errors.lastName ? "red.500" : "white"}
            >
              Last name
            </Text>
            <Input
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Last name"
              size="md"
              borderColor="white"
              _focus={{ borderColor: "white", color: "white" }}
              _hover={{ borderColor: "white", color: "white" }}
              isInvalid={errors.lastName}
              sx={{
                color: "white", // Make text color white by default
                "::placeholder": {
                  color: "white", // Placeholder color
                },
              }}
            />
            <Text mt={1} fontSize="xs" color="red.500">
              {errors.lastName?.message}
            </Text>
          </Box>

          <Box width="100%">
            <Text
              mb={1}
              fontSize="sm"
              fontWeight="bold" // Make label bold
              color={errors.email ? "red.500" : "white"}
            >
              Email
            </Text>
            <Input
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              size="md"
              borderColor="white"
              _focus={{ borderColor: "white", color: "white" }}
              _hover={{ borderColor: "white", color: "white" }}
              isInvalid={errors.email}
              sx={{
                color: "white", // Make text color white by default
                "::placeholder": {
                  color: "white", // Placeholder color
                },
              }}
            />
            <Text mt={1} fontSize="xs" color="red.500">
              {errors.email?.message}
            </Text>
          </Box>

          <Box width="100%">
            <Text
              mb={1}
              fontSize="sm"
              fontWeight="bold" // Make label bold
              color={errors.password ? "red.500" : "white"}
            >
              Password
            </Text>
            <Input
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              type="password"
              size="md"
              borderColor="white"
              _focus={{ borderColor: "white", color: "white" }}
              _hover={{ borderColor: "white", color: "white" }}
              isInvalid={errors.password}
              sx={{
                color: "white", // Make text color white by default
                "::placeholder": {
                  color: "white", // Placeholder color
                },
              }}
            />
            <Text mt={1} fontSize="xs" color="red.500">
              {errors.password?.message}
            </Text>
          </Box>

          <Button
            type="submit"
            width="100%"
            bg="black"
            color="white"
            fontWeight="bold" // Make button text bold
            _hover={{ bg: "gray.800", cursor: "pointer" }}
          >
            CREATE MY ACCOUNT
          </Button>
          <Text fontSize="sm" color="white">
            Already have an account?{" "}
            <Link
              onClick={() => navigate("/login")}
              _hover={{ textDecoration: "underline", cursor: "pointer" }}
              color="white"
            >
              Login here
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
}

export default Register;
