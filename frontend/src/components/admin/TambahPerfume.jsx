import {
  Button,
  Fieldset,
  Input,
  NativeSelectField,
  NativeSelectRoot,
  Stack,
  Grid,
  Box,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Field } from "../ui/field";
import { useStore } from "../../Store/Category";
import { HiCamera } from "react-icons/hi"; // Icon for the button
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "../ui/file-upload";

function TambahPerfume() {
  const { categories, isLoading, error, fetchCategories } = useStore();
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [image, setImage] = useState(null); // State to hold the uploaded image
  const [imageUploaded, setImageUploaded] = useState(false); // Track if image is uploaded

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Function to format number with commas
  const formatNumber = (value) => {
    const numericValue = value.replace(/[^\d.]/g, "");
    const parts = numericValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const handleHargaChange = (e) => {
    setHarga(formatNumber(e.target.value));
  };

  const handleStokChange = (e) => {
    setStok(e.target.value.replace(/\D/g, "")); // Only allow digits
  };

  // Handle the image upload
  const handleImageUpload = (files) => {
    if (files && files.length > 0 && !imageUploaded) {
      const file = files[0]; // Assuming the user selects only one file
      setImage(URL.createObjectURL(file)); // Display the uploaded image
      setImageUploaded(true); // Set the flag to true to disable further uploads
    }
  };

  return (
    <Fieldset.Root size="lg" maxW="xl">
      <Stack>
        <Fieldset.Legend>Tambah Perfume</Fieldset.Legend>
        <Fieldset.HelperText>Menambahkan Perfume baru.</Fieldset.HelperText>
      </Stack>

      {/* Grid layout with form on the left and image on the right */}
      <Grid templateColumns="1fr 1fr" gap={6}>
        <Box w="full">
          {" "}
          {/* Left Column (Form) */}
          <Fieldset.Content>
            <Field label="Nama">
              <Input name="Nama" />
            </Field>
            
            <Field label="Deskripsi">
              <Input name="Deskripsi" />
            </Field>

            <Field label="Brand">
              <Input name="Brand" />
            </Field>

            <Field label="Kategori">
              <NativeSelectRoot>
                <NativeSelectField name="Kategori">
                  {!isLoading && categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      {isLoading ? "Loading..." : "No categories available"}
                    </option>
                  )}
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>

            <Field label="Harga">
              <Input
                name="Harga"
                value={harga}
                onChange={handleHargaChange}
                type="text" // Changed to text to remove up/down buttons
                inputMode="numeric" // Allow numeric keypad on mobile devices
              />
            </Field>

            <Field label="Stok">
              <Input
                name="Stok"
                value={stok}
                onChange={handleStokChange}
                type="text" // Changed to text to remove up/down buttons
                inputMode="numeric" // Allow numeric keypad on mobile devices
              />
            </Field>
          </Fieldset.Content>
        </Box>

        <Box w="full">
          {" "}
          {/* Right Column (Image Upload) */}
          {!imageUploaded && ( // Only show the upload button if no image is uploaded yet
            <FileUploadRoot onChange={handleImageUpload}>
              <FileUploadTrigger asChild>
                <Button variant="outline" size="sm">
                  <HiCamera /> Upload New Image
                </Button>
              </FileUploadTrigger>
              <FileUploadList />
            </FileUploadRoot>
          )}
          {/* Display the image after it's uploaded */}
          {image && (
            <Image
              src={image}
              alt="Uploaded Perfume Image"
              objectFit="cover"
              borderRadius="md"
              w="100%" // Ensures the image takes full width of the container
              h="auto" // Maintains aspect ratio while filling the container
            />
          )}
        </Box>
      </Grid>

      <Button type="submit" alignSelf="flex-start" mt={4}>
        Submit
      </Button>
    </Fieldset.Root>
  );
}

export default TambahPerfume;
