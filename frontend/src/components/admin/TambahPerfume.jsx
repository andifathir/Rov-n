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
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Field } from "../ui/field";
import { HiCamera } from "react-icons/hi";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "../ui/file-upload";

// Import with aliases to avoid conflict
import { useStore as useCategoryStore } from "../../Store/Category";
import { useStore as useProductStore } from "../../Store/Products";

// Dialog components
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";

function TambahPerfume() {
  const { categories, isLoading, error, fetchCategories } = useCategoryStore(); // Use category store
  const { addProduct } = useProductStore(); // Use product store

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
    setStok(e.target.value.replace(/\D/g, ""));
  };

  const handleImageUpload = async (files) => {
    if (files && files.length > 0 && !imageUploaded) {
      const file = files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log(data); // Log the data to verify if it contains image_url

        if (data.image_url) {
          setImage(data.image_url); // Store the image URL
          setImageUploaded(true);
        }
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      description,
      brand,
      category_id: category,
      price: harga,
      stock: stok,
      image_url: image, // Ensure image is properly set
    };

    console.log(newProduct); // Log the newProduct to verify image_url
    await addProduct(newProduct);
  };

  return (
    <Fieldset.Root size="lg" maxW="xl">
      <Stack>
        <Fieldset.Legend>Tambah Perfume</Fieldset.Legend>
        <Fieldset.HelperText>Menambahkan Perfume baru.</Fieldset.HelperText>
      </Stack>

      <form onSubmit={handleSubmit}>
        <Grid templateColumns="1fr 1fr" gap={6}>
          <Box w="full">
            <Fieldset.Content>
              <Field label="Nama">
                <Input
                  name="Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>

              <Field label="Deskripsi">
                <Input
                  name="Deskripsi"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Field>

              <Field label="Brand">
                <Input
                  name="Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </Field>

              <Field label="Kategori">
                <NativeSelectRoot>
                  <NativeSelectField
                    name="Kategori"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
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

              <DialogRoot
                key="center"
                placement="center"
                motionPreset="slide-in-bottom"
              >
                <DialogTrigger asChild>
                  <Button variant="outline" mt="4">
                    Tambah kategori
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                  </DialogHeader>
                  <DialogBody>
                    <Stack gap="4">
                      <Field label="Category Name">
                        <Input
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          placeholder="Enter category name"
                        />
                      </Field>
                      <Field label="Description">
                        <Input
                          value={newCategoryDescription}
                          onChange={(e) =>
                            setNewCategoryDescription(e.target.value)
                          }
                          placeholder="Enter description"
                        />
                      </Field>
                    </Stack>
                  </DialogBody>

                  <DialogFooter>
                    <DialogActionTrigger asChild>
                      <Button variant="outline" mt="20">
                        Cancel
                      </Button>
                    </DialogActionTrigger>
                    <Button
                      mt="20"
                      onClick={async () => {
                        const newCategory = {
                          category_name: newCategoryName,
                          description: newCategoryDescription,
                        };

                        // Call the zustand store's addCategory function
                        await useCategoryStore
                          .getState()
                          .addCategory(newCategory);

                        // Optionally, reset the form or close the dialog after submission
                        setNewCategoryName(""); // Reset the category name
                        setNewCategoryDescription(""); // Reset the description
                        // Optionally close the dialog (add the logic to close)
                      }}
                    >
                      Save
                    </Button>
                  </DialogFooter>

                  <DialogCloseTrigger />
                </DialogContent>
              </DialogRoot>

              <Field label="Harga">
                <Input
                  name="Harga"
                  value={harga}
                  onChange={handleHargaChange}
                  type="text"
                  inputMode="numeric"
                  required
                />
              </Field>

              <Field label="Stok">
                <Input
                  name="Stok"
                  value={stok}
                  onChange={handleStokChange}
                  type="text"
                  inputMode="numeric"
                  required
                />
              </Field>
            </Fieldset.Content>
          </Box>

          <Box w="full">
            {!imageUploaded && (
              <FileUploadRoot onChange={handleImageUpload}>
                <FileUploadTrigger asChild>
                  <Button variant="outline" size="sm">
                    <HiCamera /> Upload New Image
                  </Button>
                </FileUploadTrigger>
                <FileUploadList />
              </FileUploadRoot>
            )}
            {image && (
              <Image
                src={image}
                alt="Uploaded Perfume Image"
                objectFit="cover"
                borderRadius="md"
                w="100%"
                h="auto"
              />
            )}
          </Box>
        </Grid>

        <Button type="submit" alignSelf="flex-start" mt={4}>
          Submit
        </Button>
      </form>
    </Fieldset.Root>
  );
}

export default TambahPerfume;
