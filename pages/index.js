import Head from "next/head";
import Image from "next/image";
import Page from "@/components/Page";
import Nav from "@/components/Nav";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  SimpleGrid,
  Text,
  Box,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Nav />
      <Page>
        <SimpleGrid mt={10} columns={4} spacing="40px">
          <Box
            h={"192px"}
            borderWidth="1px"
            borderRadius="lg"
            spacing={4}
          ></Box>
        </SimpleGrid>
      </Page>
    </>
  );
}
