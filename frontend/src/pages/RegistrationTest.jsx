import React, { useState } from "react";
import { Input, Button, Box } from "@chakra-ui/react";
import axios from "../axios"; // import axios instance
import useStore from "../Store/Account"; // Zustand store for token management
import { Field } from "@/components/ui/field";

const RegistrationTest = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useStore(); // This will be used for token management but in a registration context, no need to 'log in'

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/register", // Correct registration endpoint
        {
          name,
          email,
          password,
        }
      );
      if (response.data.status === true) {
        // Storing user info and token after successful registration
        useStore.setState({
          token: response.data.token,
          user: { email, name }, // Store the registered user info in Zustand state
        });

        alert("User Registered successfully!");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
      alert("Registration failed. Please try again.");
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
        <Field>
          <label>Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            marginBottom="4"
            isRequired
          />
        </Field>

        <Field>
          <label>Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            marginBottom="4"
            isRequired
          />
        </Field>

        <Field>
          <label>Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            marginBottom="4"
            isRequired
          />
        </Field>

        <Button type="submit" colorScheme="teal" width="full">
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegistrationTest;
