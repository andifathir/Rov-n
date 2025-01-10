import {
  Button,
  Fieldset,
  Input,
  NativeSelectField,
  NativeSelectRoot,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Field } from "../ui/field";
import { useStore } from "../../Store/Category";

function TambahPerfume() {
  const { categories, isLoading, error, fetchCategories } = useStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field label="Nama">
          <Input name="Nama" />
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
      </Fieldset.Content>

      <Field label="Harga">
        <Input name="Harga" />
      </Field>

      <Field label="Stok">
        <Input name="Stok" />
      </Field>

      <Button type="submit" alignSelf="flex-start">
        Submit
      </Button>
    </Fieldset.Root>
  );
}

export default TambahPerfume;
