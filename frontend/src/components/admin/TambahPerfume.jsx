import { Box, Button, Input, Stack } from "@chakra-ui/react";
import React from "react";
import { Field } from "../ui/field";

function TambahPerfume() {
  return (
    <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }}>
      <Field orientation="horizontal" label="Category">
        <Input placeholder="John Doe" flex="1" />
      </Field>
      <Field orientation="horizontal" label="Name">
        <Input placeholder="me@example.com" flex="1" />
      </Field>
      <Field orientation="horizontal" label="Brand">
        <Input placeholder="me@example.com" flex="1" />
      </Field>
      <Field orientation="horizontal" label="Description">
        <Input placeholder="me@example.com" flex="1" />
      </Field>
      <Field orientation="horizontal" label="Price">
        <Input placeholder="me@example.com" flex="1" />
      </Field>
      <Field orientation="horizontal" label="Stock">
        <Input placeholder="me@example.com" flex="1" />
      </Field>
    </Stack>
  );
}

export default TambahPerfume;
