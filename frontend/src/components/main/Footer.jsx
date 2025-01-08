import {
  Box,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";

function Footer() {
  return (
    <Box bg={"black"} color={"white"} py={10} px={6} mt={200}>
      <Flex
        justify={"space-between"}
        direction={["column", "column", "row"]}
        align={"start"}
        gap={6}
      >
        <VStack align={"start"} spacing={1} flex={1}>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Image
              src="src/assets/Logo Roven.png"
              alt="Roven Logo"
              boxSize="100px"
              mb={-2}
              _hover={{ cursor: "pointer" }} // Add cursor pointer on hover
            />
          </Link>
          <Text fontSize="md" fontWeight="medium">
            Roven is a perfume store that brings luxurious and elegant scents.
            Discover your character in every drop, as each of our fragrances is
            designed to create a lasting impression.
          </Text>
          <HStack spacing={4} mt={4}>
            {[
              { icon: FaWhatsapp, href: "#" },
              { icon: FaFacebook, href: "#" },
              { icon: FaInstagram, href: "#" },
              { icon: FaLinkedin, href: "#" },
              { icon: FaTiktok, href: "#" },
            ].map((social, idx) => (
              <Box
                as={Link}
                key={idx}
                href={social.href}
                _hover={{
                  transform: "scale(1.2)",
                  filter:
                    "drop-shadow(0 0 1px #FF69B4) drop-shadow(0 0 1px #DB7093)",
                  color: "#FF69B4",
                }}
                transition="transform 0.2s, filter 0.2s, color 0.2s"
              >
                <social.icon size={24} />
              </Box>
            ))}
          </HStack>
        </VStack>

        <VStack align="start" flex={1} spacing={6} mt={4} ml={20}>
          <Text fontWeight="bold">SHOP BY DEPARTMENT</Text>
          <VStack align="start" spacing={1}>
            <Text
              textAlign="left"
              _hover={{ cursor: "pointer", color: "#FF69B4" }} // Change color to #FF69B4 on hover
            >
              Perfumes
            </Text>
            <Text
              textAlign="left"
              _hover={{ cursor: "pointer", color: "#FF69B4" }} // Change color to #FF69B4 on hover
            >
              Women's Perfume
            </Text>
            <Text
              textAlign="left"
              _hover={{ cursor: "pointer", color: "#FF69B4" }} // Change color to #FF69B4 on hover
            >
              Men's Cologne
            </Text>
            <Text
              textAlign="left"
              _hover={{ cursor: "pointer", color: "#FF69B4" }} // Change color to #FF69B4 on hover
            >
              Best Sellers
            </Text>
            <Text
              textAlign="left"
              _hover={{ cursor: "pointer", color: "#FF69B4" }} // Change color to #FF69B4 on hover
            >
              New Arrivals
            </Text>
          </VStack>
        </VStack>

        <VStack
          align="start"
          flex={1}
          spacing={6}
          mt={4}
          ml={10} // Move FOLLOW US more to the right without affecting SHOP BY DEPARTMENT
        >
          <Text fontWeight="bold">FOLLOW US</Text>
          <VStack align="start" spacing={1}>
            <Link
              href="#"
              _hover={{ cursor: "pointer", color: "#FF69B4" }} // Change color to #FF69B4 on hover
            >
              Instagram
            </Link>
            <Link
              href="#"
              _hover={{ cursor: "pointer", color: "#FF69B4" }} // Change color to #FF69B4 on hover
            >
              Facebook
            </Link>
            <Link
              href="#"
              _hover={{ cursor: "pointer", color: "#FF69B4" }} // Change color to #FF69B4 on hover
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              _hover={{ cursor: "pointer", color: "#FF69B4" }} // Change color to #FF69B4 on hover
            >
              Tiktok
            </Link>
          </VStack>
        </VStack>

        <VStack align="start" flex={1} spacing={6} mt={4}>
          <Text fontWeight="bold">JOIN OUR MAILING LIST</Text>
          <VStack spacing={2} align="start" w="full">
            <Input placeholder="First Name" bg="white" color="black" />
            <Input placeholder="Email" bg="white" color="black" />
            <Button
              colorScheme="whiteAlpha"
              bg="white"
              color="black"
              w="full"
              _hover={{ bg: "#FF69B4", color: "white" }} // Menambahkan perubahan warna saat hover
            >
              Subscribe
            </Button>
          </VStack>
        </VStack>
      </Flex>
    </Box>
  );
}

export default Footer;
