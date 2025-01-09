import React, { useState } from "react";
import { Input, Button, Box } from "@chakra-ui/react"; // Chakra UI components
import { Field } from "@/components/ui/field"; // Import Field from your custom component
import axios from "../axios"; // import axios instance
import useStore from "../Store/Account"; // Correct import for the store

const Test = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useStore(); // Using useStore for state management

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/users/login", {
        email,
        password,
      });

      console.log("Login response:", response); // Log the full response here

      if (response.data.status === true) {
        // Assuming your backend sends a status flag indicating success
        login(response.data.token, { email });
        alert("User Logged In successfully!");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Box
      maxWidth="400px"
      margin="0 auto"
      padding="4"
      boxShadow="md"
      borderRadius="lg"
      mt={20}
    >
      <form onSubmit={handleSubmit}>
        <Field name="email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            marginBottom="4"
          />
        </Field>

        <Field name="password">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            marginBottom="4"
          />
        </Field>

        <Button type="submit" colorScheme="teal" width="full">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Test;
