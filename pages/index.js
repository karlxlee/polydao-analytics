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

import parser from "@/utils/parser";

export default function Home(props) {
  return (
    <>
      <Nav />
      <Page>
        <SimpleGrid mt={10} columns={4} spacing="40px">
          <Box h={"192px"} borderWidth="1px" borderRadius="lg" p={6}>
            <Stat>
              <StatLabel>Number of votes</StatLabel>
              <StatNumber>{props.gov.count}</StatNumber>
              <StatHelpText></StatHelpText>
            </Stat>
          </Box>
        </SimpleGrid>
      </Page>
    </>
  );
}

export async function getServerSideProps() {
  const gov = await fetch(
    "https://polydao-api.vercel.app/dao/compound/governance/votes"
  ).then((r) => parser(r));
  return { props: { gov } };
}
