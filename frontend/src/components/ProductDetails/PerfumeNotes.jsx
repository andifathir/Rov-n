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

  const spotifyEmbedLink =
    "https://open.spotify.com/embed/track/3Jl2LQmRwbXEF2lO1RTvxn";

  return (
    <Box bg="#fdf1e5" minH="100vh" py={10}>
      <Container maxW="container.xl">
        <Flex gap={10} direction={{ base: "column", lg: "row" }}>
          {/* Left Section: Fragrance Notes */}
          <Box flex="1">
            <Heading as="h2" size="lg" fontWeight="bold" mb={6}>
              About
            </Heading>
            <Heading as="h3" size="md" fontWeight="semibold" mb={4}>
              Fragrance Notes
            </Heading>
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
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
            <Box>
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
                src={spotifyEmbedLink}
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
