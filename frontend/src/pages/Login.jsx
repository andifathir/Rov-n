import {
  Box,
  Input,
  Button,
  Link,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useStore from "../Store/Account";
import Background from "../assets/BG Login.jpg";
import axios from "../axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { isLoading, error, login } = useStore();

  const onSubmit = async (data) => {
    try {
      // Send login request to the backend
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      console.log("Login response:", response); // Log response for debugging

      // If login is successful, get the token
      if (response.data.status === true) {
        const token = response.data.token;

        // Now, fetch the user data using the token
        const userResponse = await axios.get(
          "http://localhost:8000/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("User data response:", userResponse); // Log the user data

        // If the user data is successfully fetched
        if (userResponse.data.status === "success") {
          const userData = {
            name: userResponse.data.data.name || "Default Name", // Fallback to a default name if not available
            email: data.email,
          };

          // Store the token and user data in Zustand
          login(token, userData);

          alert("User Logged In successfully!");
          navigate("/"); // Redirect after successful login
        } else {
          alert("Failed to fetch user data.");
        }
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Box overflow="hidden" minHeight="100vh">
      {/* Background Image */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex={-1}
      >
        <Image
          src={Background}
          alt="Login Background"
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>

      {/* Login Form */}
      <Box position="relative" zIndex={1} width="100%" height="100%">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
            paddingTop: "20vh",
          }}
        >
          <VStack mt={8} spacing={4} align="center">
            <Text fontSize="2xl" fontWeight="bold" color="white">
              Login
            </Text>
            <Text fontSize="sm" color="white">
              Please enter your e-mail and password:
            </Text>
            <Box width="100%">
              <Text
                mb={1}
                fontSize="sm"
                fontWeight="bold"
                color={errors.email ? "red.500" : "white"}
              >
                Email
              </Text>
              <Input
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                size="md"
                borderColor="white"
                isInvalid={errors.email}
                sx={{
                  color: "white",
                  "::placeholder": { color: "white" },
                  _focus: { borderColor: "white" },
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
                fontWeight="bold"
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
                isInvalid={errors.password}
                sx={{
                  color: "white",
                  "::placeholder": { color: "white" },
                  _focus: { borderColor: "white" },
                }}
              />
              <Text mt={1} fontSize="xs" color="red.500">
                {errors.password?.message}
              </Text>
            </Box>

            {error && (
              <Text fontSize="sm" color="red.500">
                {error}
              </Text>
            )}

            <Button
              type="submit"
              width="100%"
              bg="black"
              color="white"
              _hover={{ bg: "gray.800", cursor: "pointer" }}
              fontWeight="bold"
              isLoading={isLoading}
            >
              LOGIN
            </Button>
            <Text fontSize="sm" color="gray.300">
              Don’t have an account?{" "}
              <Link
                onClick={() => navigate("/register")}
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
                color="white"
              >
                Create one
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}

export default Login;