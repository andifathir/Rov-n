import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import useStore from '../../Store/Sidebar';  // Import the store

const Sidebar = () => {
  const setSelectedComponent = useStore((state) => state.setSelectedComponent);

  return (
    <Box
      as="aside"
      w="250px"
      p={4}
      bg="white"
      minH="100vh"
      mt={20} // Adjusts the position slightly in the middle
    >
      {/* Concepts Section */}
      <VStack align="start" spacing={4} mb={6}>
        <Heading as="h3" size="sm" fontWeight="bold" color="black">
          Penjualan
        </Heading>
        <VStack align="start" spacing={2} pl={2}>
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="black"
            _hover={{ bg: "gray.100" }}
            cursor="pointer"
            p={1}
            borderRadius="md"
            onClick={() => setSelectedComponent('product')}
          >
            Product
          </Text>
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="black"
            _hover={{ bg: "gray.100" }}
            cursor="pointer"
            p={1}
            borderRadius="md"
            onClick={() => setSelectedComponent('order')}
          >
            Order
          </Text>
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="black"
            _hover={{ bg: "gray.100" }}
            cursor="pointer"
            p={1}
            borderRadius="md"
            onClick={() => setSelectedComponent('tambahProduct')}
          >
            Tambah Product
          </Text>
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="black"
            _hover={{ bg: "gray.100" }}
            cursor="pointer"
            p={1}
            borderRadius="md"
            onClick={() => setSelectedComponent('text')}
          >
            Text
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;
