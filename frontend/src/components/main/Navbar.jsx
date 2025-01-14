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
import { RiAccountCircle2Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import logo from "../../assets/Logo Roven.png";
import { RiHeartLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { RiAdminLine } from "react-icons/ri";
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
            // Assuming the logged-in user's email or ID is stored in the token payload
            const userEmail = user?.email; // Get user's email from Zustand store or decoded token
            const currentUser = data.data.find(
              (user) => user.email === userEmail
            );
            if (currentUser) {
              setUserData(currentUser); // Set the logged-in user's data
              console.log("Current user data:", currentUser);
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
    logout(); // Clear token and user info from Zustand
    navigate("/login"); // Redirect to login page
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
          <Text
            fontWeight="bold"
            color={textColor}
            onClick={() => handleNavigation("/")}
            _hover={{ cursor: "pointer" }}
          >
            Home
          </Text>
          <Text
            fontWeight="bold"
            color={textColor}
            onClick={() => handleNavigation("/perfume-list")}
            _hover={{ cursor: "pointer" }}
          >
            Product
          </Text>
          <Text
            fontWeight="bold"
            color={textColor}
            onClick={() => handleNavigation("/best-seller")}
            _hover={{ cursor: "pointer" }}
          >
            Best Seller
          </Text>
          <Text
            fontWeight="bold"
            color={textColor}
            onClick={() => handleNavigation("/about-us")}
            _hover={{ cursor: "pointer" }}
          >
            About Us
          </Text>
        </HStack>

        <HStack spacing={6} alignItems={"center"} ml="auto">
          {token && user ? ( // Ensure that the user is available
            <PopoverRoot>
              <PopoverTrigger asChild>
                <Button
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: "transparent" }}
                  color={textColor}
                  leftIcon={<RiAccountCircle2Line />}
                >
                  {user.name || "Account"} {/* Display the user name */}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  <Text>Welcome, {user.name || "User"}</Text>{" "}
                  {/* Show the user name */}
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
          <Box position="relative" display="flex" alignItems="center">
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
              onClick={() => handleNavigation("/login")}
            >
              <RiAccountCircle2Line />
            </Button>
          )}

          <Button
            backgroundColor="transparent"
            _hover={{ backgroundColor: "transparent" }}
            color={textColor}
            onClick={() => handleNavigation("/wishlists")} // Navigasi ke halaman wishlist
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

        {token && user ? ( // Ensure that the user is available
  <PopoverRoot>
    <PopoverTrigger asChild>
      <Button
        backgroundColor="transparent"
        _hover={{ backgroundColor: "transparent" }}
        color={textColor}
        leftIcon={<RiAccountCircle2Line />}
      >
        {user.name || "Account"} {/* Display the user name */}
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverBody>
        <Text>Welcome, {user.name || "User"}</Text> {/* Show the user name */}
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

              onClick={() => setSearchOpen(!searchOpen)}
            >
              <IoMdSearch />
            </Button>
          </Box>

          <Button
            backgroundColor="transparent"
            _hover={{ backgroundColor: "transparent" }}
            color={textColor}
            onClick={() => handleNavigation("/login")}
          >
            <RiAccountCircle2Line />
          </Button>

          <Button
            backgroundColor="transparent"
            _hover={{ backgroundColor: "transparent" }}
            color={textColor}
            onClick={() => handleNavigation("/login")}
          >
            <IoBagOutline />
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
