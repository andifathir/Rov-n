import { useState, useEffect } from 'react';
import { Box, Text, HStack, Image, Spinner } from '@chakra-ui/react';
import { useStore } from '../../Store/Review'; 

const logos = [
  { src: 'https://www.minedot.com/cdn/shop/files/051177200_1621928908-fimela-dekstop-2_300x.png?v=1624785934', alt: 'Fimela Logo' },
  { src: 'https://www.minedot.com/cdn/shop/files/download_300x.jpg?v=1613558141', alt: 'Female Daily Logo' },
  { src: 'https://www.minedot.com/cdn/shop/files/nova-logo_300x.png?v=1624785966', alt: 'Nova Logo' },
  { src: 'https://www.minedot.com/cdn/shop/files/download_d6b68ab5-e3d2-4a06-923d-3064efe1fe8b_300x.png?v=1627359055', alt: 'Media Indonesia Logo' },
  { src: 'https://www.minedot.com/cdn/shop/files/HalfLogoSWA_300x.png?v=1627359288', alt: 'Mix Logo' }
];

const ReviewShowcase = () => {
  const { reviews, isLoading, error, fetchReviews } = useStore();
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    fetchReviews(); // Fetch reviews on component mount

    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 7000); // 7 seconds interval

    return () => clearInterval(interval);
  }, [fetchReviews, reviews.length]);

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <Box textAlign="center" py={10} px={5}>
      {reviews.length > 0 && (
        <>
          <Text fontSize="xl" fontStyle="italic" mb={2}>
            {`'${reviews[currentReviewIndex].comment}'`} {/* Display only the comment */}
          </Text>
          <Text fontSize="md" color="gray.500">
             {reviews[currentReviewIndex].user.name} {/* Display the user_id */}
          </Text>
        </>
      )}

      <HStack justify="center" spacing={8} mt={10} gapX={4}>
        {logos.map((logo, index) => (
          <Image key={index} src={logo.src} alt={logo.alt} maxW="100px" opacity={0.8} />
        ))}
      </HStack>
    </Box>
  );
};

export default ReviewShowcase;
