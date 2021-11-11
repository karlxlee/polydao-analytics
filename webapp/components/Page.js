import React from "react";
import { Container, Stack } from "@chakra-ui/react";
const Page = ({ children }) => {
  return (
    <div>
      <Container maxW="container.lg">
        <Stack spacing={4}>{children}</Stack>
      </Container>
    </div>
  );
};

export default Page;
