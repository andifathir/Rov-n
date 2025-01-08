import { Input, Textarea, HStack, IconButton } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";

const WriteReview = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  return (
    <div>
      <Field label="Email">
        <Input placeholder="me@example.com" />
      </Field>

      <Field label="Review">
        <Textarea placeholder="Write your review here..." />
      </Field>

      <Field label="Rating">
        <HStack spacing={2}>
          {[1, 2, 3, 4, 5].map((starIndex) => (
            <IconButton
              key={starIndex}
              aria-label={`Star ${starIndex}`}
              icon={
                rating >= starIndex ? (
                  <FaStar color="yellow.400" />
                ) : (
                  <FaRegStar color="gray.300" />
                )
              }
              onClick={() => handleStarClick(starIndex)}
              variant="link"
            />
          ))}
        </HStack>
      </Field>
    </div>
  );
};

export default WriteReview;
