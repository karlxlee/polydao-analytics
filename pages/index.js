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
  Grid,
  GridItem,
  Text,
  Box,
} from "@chakra-ui/react";
import parser from "@/utils/parser";
import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("@/components/LineChart"), {
  ssr: false,
});

export default function Home(props) {
  return (
    <>
      <Nav />
      <Page>
        <Grid
          mt={10}
          h="200px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem
            colSpan={1}
            h={"192px"}
            borderWidth="1px"
            borderRadius="lg"
            p={6}
          >
            <Stat>
              <StatLabel>Number of votes</StatLabel>
              <StatNumber>{props.gov.count}</StatNumber>
              <StatHelpText></StatHelpText>
            </Stat>
          </GridItem>
          <GridItem
            colSpan={3}
            h={"440px"}
            borderWidth="1px"
            borderRadius="lg"
            p={6}
          >
            {" "}
            <Stat>
              <StatLabel>Holdings (in USD)</StatLabel>
            </Stat>
            <Box>
              <LineChart data={props.holdings} />
            </Box>
          </GridItem>
        </Grid>
      </Page>
    </>
  );
}

export async function getServerSideProps() {
  const gov = await fetch(
    "https://polydao-api.vercel.app/dao/compound/governance/votes"
  ).then((r) => parser(r));
  const holdings = await fetch(
    "https://polydao-api.vercel.app/dao/compound/governance/holdings"
  )
    .then((r) => parser(r))
    .then((r) => r.holdings);
  return { props: { gov, holdings } };
}
