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
import Background from "../assets/BG Login.jpg"; // Gantilah dengan jalur gambar yang sesuai

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    navigate("/account"); // Navigate to Account page on successful login
  });

  return (
    <Box overflow="hidden" minHeight="100vh">
      {/* Background Image Section */}
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
          position="absolute"
          top="0"
          left="0"
          zIndex={-1}
        />
      </Box>

      {/* Form Section */}
      <Box position="relative" zIndex={1} width="100%" height="100%">
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
                  color: "white", // Tulisan dalam input tetap putih
                  "::placeholder": {
                    color: "white", // Placeholder juga putih
                  },
                  _focus: {
                    borderColor: "white",
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
                fontc
                sx={{
                  color: "white", // Tulisan dalam input tetap putih
                  "::placeholder": {
                    color: "white", // Placeholder juga putih
                  },
                  _focus: {
                    borderColor: "white",
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
              _hover={{ bg: "gray.800", cursor: "pointer" }}
              fontWeight="bold" // Make button text bold
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
