import { Button, Input, Stack } from "@chakra-ui/react";
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
import { Field } from "@/components/ui/field";
import { HStack } from "@chakra-ui/react";

const Test = () => {
  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot
        key="center"
        placement="center"
        motionPreset="slide-in-bottom"
        // Ensure that aria-hidden or inert is not applied directly to the root dialog element.
      >
        <DialogTrigger asChild>
          <Button variant="outline" mt="20">
            Open Dialog (center)
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Stack gap="4">
              <Field label="Category Name">
                <Input placeholder="Enter category name" />
              </Field>
              <Field label="Description">
                <Input placeholder="Enter description" />
              </Field>
            </Stack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline" mt="20">
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button mt="20">Save</Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
};

export default Test;
