import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Grid,
  GridItem,
  Image,
  Center,
} from "@chakra-ui/react";

function PerfumeNotes() {
  const notes = [
    {
      name: "White Musk",
      img: "https://i.shgcdn.com/674b4f17-1444-4396-bb8f-5e85e5ae3aa9/",
    },
    {
      name: "Bois De Rose",
      img: "https://i.shgcdn.com/954f9ae0-f0fa-41a6-a6fe-1fa04af85d3a/",
    },
    {
      name: "Peony",
      img: "https://i.shgcdn.com/69a17ddb-d0b7-4c22-98b8-1376594e1291/",
    },
    {
      name: "Pink Pepper",
      img: "https://i.shgcdn.com/69a17ddb-d0b7-4c22-98b8-1376594e1291/",
    },
    {
      name: "Rose Otto Oil",
      img: "https://i.shgcdn.com/e989b228-3604-41d8-a93b-e382f732b52e/",
    },
    {
      name: "Lychee",
      img: "https://i.shgcdn.com/3b318c2d-2cd7-4e92-9359-c6acd744363e/",
    },
    {
      name: "Wild Berry",
      img: "https://i.shgcdn.com/03c16b86-a88f-4ddf-889d-0fa52f4a8867/",
    },
    {
      name: "Patchouli",
      img: "https://i.shgcdn.com/972871aa-d812-4872-8e56-afd8eb5352c9/",
    },
  ];

  // Array of 10 Spotify song links
  const spotifySongs = [
    "https://open.spotify.com/embed/track/3nxaPqAOxUxkLhIhbvmv4t?si=2f640add89154a59",
    "https://open.spotify.com/embed/track/7elGa98KXTWCCkvbHVjMs3?si=cc6718f6b73349d0",
    "https://open.spotify.com/embed/track/0CJuLeZpCdqrqoCMXWZw8k?si=0157b70a50ac4305",
    "https://open.spotify.com/embed/track/3A0bGJ87nJ1elwT8tRNX86?si=299f1924bd6d42a5",
    "https://open.spotify.com/embed/track/04LRM5cbSULmfwzwQXg7Mu?si=38315bb8e0e34c87",
    "https://open.spotify.com/embed/track/3cAEXSlaCIFiIJmTOTEaXk?si=69462a5e9d9146c6",
    "https://open.spotify.com/embed/track/56YstNT2fL3XXFbMLWYVX8?si=46c27dd38c124941",
    "https://open.spotify.com/embed/track/5K8BwPXLN7rdlYsPHFXrY3?si=243195f89d19404d",
    "https://open.spotify.com/embed/track/2SAnYRg5p9qlUmINe9TCIH?si=32ca644252a445da",
    "https://open.spotify.com/embed/track/4mQXTFLyDas9ycbnbiksGu?si=77a81ba08b374dad",
  ];

  // Function to get a random song link
  const getRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * spotifySongs.length);
    return spotifySongs[randomIndex];
  };

  return (
    <Box bg="#fdf1e5" py={10}>
      <Container maxW="container.xl">
        <Flex gap={10} direction={{ base: "column", lg: "row" }} align="flex-start">
          {/* Left Section: Fragrance Notes */}
          <Box flex="1">
            <Heading as="h2" size="lg" fontWeight="bold" mb={6}>
              About
            </Heading>
            <Heading as="h3" size="md" fontWeight="semibold" mb={4}>
              Fragrance Notes
            </Heading>
            <Grid
              templateColumns={{
                base: "repeat(auto-fit, minmax(100px, 1fr))",
                md: "repeat(4, 1fr)",
              }}
              gap={6}
              mb={6}  // Limit vertical space between grid and text
            >
              {notes.map((note) => (
                <GridItem key={note.name} textAlign="center">
                  <Center
                    bg="orange.100"
                    p={6}
                    borderRadius="full"
                    w="100px"
                    h="100px"
                    mx="auto"
                    mb={4}
                  >
                    <Image src={note.img} alt={note.name} boxSize="60px" />
                  </Center>
                  <Text fontWeight="medium">{note.name}</Text>
                </GridItem>
              ))}
            </Grid>
          </Box>

          {/* Right Section: Descriptions and Spotify */}
          <Box flex="1">
            <Box mb={8}>
              <Heading as="h4" size="sm" fontWeight="semibold" mb={2}>
                The Vibe
              </Heading>
              <Text fontSize="sm">
                A sweet romance, the girl next door, everyone wants to be or be
                seen with her. The combination of both florals and sensual
                sweetness means this fragrance can transition you perfectly from
                day into evening wear.
              </Text>
            </Box>
            <Box mb={8}>
              <Heading as="h4" size="sm" fontWeight="semibold" mb={2}>
                You&aposll Love This If You Are...
              </Heading>
              <Text fontSize="sm">
                Into beautiful fragrances that everyone needs as a staple in
                their collection, a fragrance that can easily become your
                signature scent.
              </Text>
            </Box>
            <Box mb={8}>
              <Heading as="h4" size="sm" fontWeight="semibold" mb={2}>
                The Tune
              </Heading>
              <Text fontSize="sm" mb={4}>
                Our fragrance experts created an algorithm to match your music
                taste to your fragrance taste. Listen to the tunes to know if
                this fragrance is for you.
              </Text>
              <Box
                as="iframe"
                src={getRandomSong()} // Using the random song function here
                width="100%"
                height="80px"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default PerfumeNotes;
