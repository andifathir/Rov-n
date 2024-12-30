
import { Link } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { FaDatabase } from "react-icons/fa6";
import { useColorMode } from "../ui/color-mode";
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";

function Navbar() {
  const { colormode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={"4"}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500, purple.600)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Edging</Link>
        </Text>

        <HStack spacing={"2"} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <FaRegPlusSquare fontSize={"20"} />
            </Button>
          </Link>
          <Link to={"/motion"}>
            <Button>
              <FaDatabase fontSize={"20"} />
            </Button>
          </Link>
          <Link>
            <Button onClick={toggleColorMode}>
              {colormode === "light" ? <IoMoon /> : <IoSunnyOutline />}
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
