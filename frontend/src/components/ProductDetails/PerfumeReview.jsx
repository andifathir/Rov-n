import React, { useEffect } from 'react';
import { useStore } from '../../Store/Review';
import { Box, Text, Button, VStack, HStack } from '@chakra-ui/react';
import { EmptyState } from '@/components/ui/empty-state';
import { Rating } from '../ui/rating';

function PerfumeReview({ productId }) {
    const { reviews, isLoading, error, fetchReviews } = useStore((state) => state);
  
    useEffect(() => {
      fetchReviews();
    }, [fetchReviews]);
  
    // Wait for reviews to load before filtering
    if (isLoading) {
      return <Text>Loading...</Text>;
    }
  
    if (error) {
      return <Text>Error: {error}</Text>;
    }
  
    // Filter reviews for the current product
    const productReviews = reviews.length > 0 ? reviews.filter(review => review.product_id === productId) : [];
  
    return (
      <Box>
        {productReviews.length === 0 ? (
          <EmptyState />
        ) : (
          <VStack spacing={4}>
            {productReviews.map((review) => (
              <Box key={review.review_id} p={4} borderWidth={1} borderRadius="md" width="100%">
                <HStack spacing={4}>
                  <Box>
                    <Text fontWeight="bold">{review.user.name}</Text>
                    <Text fontSize="sm">{review.review_date}</Text>
                  </Box>
                  <Box flex="1" textAlign="right">
                    <Rating value={review.rating} readOnly />
                  </Box>
                </HStack>
                <Text mt={2}>{review.comment}</Text>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    );
  }
  

export default PerfumeReview;
