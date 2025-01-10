import { Input, Textarea, HStack, Button, Box } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import { useStore } from "../../Store/Products"; // Import the same store here
import useUserStore from "../../Store/Account"; // Make sure this is correct
import axios from "axios";

const WriteReview = () => {
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [reviewText, setReviewText] = useState("");

  // Default product ID 10 and user ID 10
  const defaultProductId = 10;
  const defaultUserId = 17;

  const { selectedProduct } = useStore(); // Fetch selected product from the store
  const { userData } = useUserStore(); // Fetch user data from the account store

  // Fallback to default values if product or user is not available
  const product = selectedProduct || { product_id: defaultProductId };
  const user = userData || { user_id: defaultUserId };

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  const handleSubmit = async () => {
    if (!user || !product) {
      alert("User or Product not found.");
      return;
    }

    const review = {
      email,
      reviewText,
      rating,
      user_id: user.user_id, // Correctly use user_id here
      product_id: product.product_id, // Correctly use product_id here
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/reviews",
        review
      );
      if (response.status === 200) {
        alert("Review posted successfully");
      } else {
        alert("Failed to post review");
      }
    } catch (error) {
      alert("Error posting review");
    }

    setEmail("");
    setReviewText("");
    setRating(0);
  };

  return (
    <Box>
      <Box mb={4}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="me@example.com"
        />
      </Box>

      <Box mb={4}>
        <Textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
        />
      </Box>

      <Box mb={4}>
        <HStack spacing={2}>
          {[1, 2, 3, 4, 5].map((starIndex) => {
            const isActive = rating >= starIndex;
            return (
              <Button
                key={starIndex}
                onClick={() => handleStarClick(starIndex)}
                variant="link"
                color={isActive ? "yellow.400" : "gray.300"}
                padding={0}
              >
                {isActive ? <FaStar /> : <FaRegStar />}
              </Button>
            );
          })}
        </HStack>
      </Box>

      <Box>
        <Button onClick={handleSubmit} colorScheme="blue">
          Post Review
        </Button>
      </Box>
    </Box>
  );
};

export default WriteReview;