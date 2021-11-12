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
const Treemap = dynamic(() => import("@/components/Treemap"), {
  ssr: false,
});
const Bar = dynamic(() => import("@/components/Bar"), {
  ssr: false,
});

export default function Home(props) {
  return (
    <>
      <Nav page={"compound"} />
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
              <StatHelpText>
                The value of the governance tokens held in the DAO reserve
              </StatHelpText>
            </Stat>
            <Box>
              <LineChart data={props.holdings} />
            </Box>
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
              <StatLabel>Token concentration</StatLabel>
              <StatHelpText>
                The number of tokens held by the top 20 addresses
              </StatHelpText>
            </Stat>
            <Box>
              <Bar
                data={props.concentration.data}
                categories={props.concentration.categories}
              />
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
    "https://polydao-api.vercel.app/dao/compound/governance/token/holdings"
  )
    .then((r) => parser(r))
    .then((r) => r.holdings);
  const concentrationRes = await fetch(
    "https://polydao-api.vercel.app/dao/compound/governance/token/concentration"
  )
    .then((r) => parser(r))
    .then((r) => r.concentration);
  const concentration = {
    data: concentrationRes
      .map(function (i) {
        return i[1];
      })
      .slice(0, 20),

    categories: concentrationRes
      .map(function (i) {
        return i[0];
      })
      .slice(0, 20),
  };
  // .then((r) =>
  //   r
  //     .map(function (i) {
  //       return { x: i[0], y: i[1] };
  //     })
  //     .slice(0, 20)
  // );
  console.log(concentration);
  return { props: { gov, holdings, concentration } };
}
