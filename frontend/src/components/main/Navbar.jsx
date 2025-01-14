import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Text,
  Input,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RiAccountCircle2Line, RiHeartLine, RiAdminLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import logo from "../../assets/Logo Roven.png";
import { CiLogout } from "react-icons/ci";
import useStore from "../../Store/Account"; // Zustand store
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  PopoverRoot,
} from "../ui/popover"; // Custom Popover imports

function Navbar({ onSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [userData, setUserData] = useState(null); // To store fetched user data
  const navigate = useNavigate();
  const { token, user, logout } = useStore(); // Access user info and logout from Zustand
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8000/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success" && data.data) {
            const userEmail = user?.email;
            const currentUser = data.data.find(
              (user) => user.email === userEmail
            );
            if (currentUser) {
              setUserData(currentUser);
            } else {
              console.error("Logged-in user not found in API response");
            }
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [token, user?.email]);

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const textColor = isScrolled || isHovered ? "black" : "white";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container
      maxW="100%"
      position="fixed"
      top="0"
      zIndex="1000"
      backgroundColor={isScrolled || isHovered ? "white" : "transparent"}
      transition="background-color 1s ease, box-shadow 1s ease"
      boxShadow={isScrolled ? "0px 5px 20px rgba(0, 0, 0, 0.4)" : "none"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Image
          src={logo}
          alt="Logo"
          py={5}
          boxSize={{ base: "95px", sm: "95px" }}
          objectFit="contain"
          _hover={{ cursor: "pointer" }}
          onClick={() => handleNavigation("/")}
        />

        <HStack spacing={12} alignItems={"center"} gapX={10}>
          {["Home", "Product", "Best Seller", "About Us"].map((item, index) => (
            <Text
              key={index}
              fontWeight="bold"
              color={textColor}
              onClick={() =>
                handleNavigation(`/${item.toLowerCase().replace(" ", "-")}`)
              }
              _hover={{ cursor: "pointer" }}
            >
              {item}
            </Text>
          ))}
        </HStack>

        <HStack spacing={6} alignItems={"center"} ml="auto">
          {token && user ? (
            <PopoverRoot>
              <PopoverTrigger asChild>
                <Button
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: "transparent" }}
                  color={textColor}
                  leftIcon={<RiAccountCircle2Line />}
                >
                  {user.name || "Account"}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  <Text>Welcome, {user.name || "User"}</Text>
                  <Button
                    variant="outline"
                    colorScheme="red"
                    leftIcon={<CiLogout />}
                    onClick={handleLogout}
                    mt={2}
                  >
                    Logout
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
          ) : (
            <Button
              backgroundColor="transparent"
              _hover={{ backgroundColor: "transparent" }}
              color={textColor}
              onClick={() => handleNavigation("/login")}
            >
              <RiAccountCircle2Line />
            </Button>
          )}

          <Button
            backgroundColor="transparent"
            _hover={{ backgroundColor: "transparent" }}
            color={textColor}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <IoMdSearch />
          </Button>

          {searchOpen && (
            <Input
              width="200px"
              backgroundColor="white"
              borderRadius="md"
              boxShadow="lg"
              value={searchText}
              onChange={handleSearchInputChange}
              placeholder="Search..."
              mr={2}
            />
          )}

          <Button
            backgroundColor="transparent"
            _hover={{ backgroundColor: "transparent" }}
            color={textColor}
            onClick={() => handleNavigation("/wishlists")}
          >
            <RiHeartLine />
          </Button>

          <Button
            backgroundColor="transparent"
            _hover={{ backgroundColor: "transparent" }}
            color={textColor}
            onClick={() => handleNavigation("/admin-dashboard")}
          >
            <RiAdminLine />
          </Button>

          <Button
            backgroundColor="transparent"
            _hover={{ backgroundColor: "transparent" }}
            color={textColor}
            onClick={() => handleNavigation("/cart")}
          >
            <IoBagOutline />
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
