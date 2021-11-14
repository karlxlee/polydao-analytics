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

import StatCard from "@/components/StatCard";
import parser from "@/utils/parser";
import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("@/components/LineChart"), {
  ssr: false,
});
const SparkLineChart = dynamic(() => import("@/components/SparkLineChart"), {
  ssr: false,
});
const Bar = dynamic(() => import("@/components/Bar"), {
  ssr: false,
});
const DonutChart = dynamic(() => import("@/components/DonutChart"), {
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
          {/* <StatCard
            label="Number of votes"
            stat={props.gov.count}
            description={""}
          /> */}
          <GridItem
            p={0}
            colSpan={2}
            h={"220px"}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Stat p={6} pb={0}>
              <StatLabel>Number of votes</StatLabel>
              <StatHelpText></StatHelpText>
            </Stat>
            <Box>
              <SparkLineChart data={props.votes} />
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
              <StatLabel>Holdings (in USD)</StatLabel>
              <StatHelpText>
                The value of the governance tokens held in the DAO reserve
              </StatHelpText>
            </Stat>
            <Box>
              <LineChart data={props.holdings} />
            </Box>
          </GridItem>
          <StatCard
            label="Holdings"
            stat={"$" + props.holdings[0][1]}
            description={""}
          />
          <GridItem
            colSpan={3}
            h={"440px"}
            borderWidth="1px"
            borderRadius="lg"
            p={6}
          >
            {" "}
            <Stat>
              <StatLabel>Top token holders</StatLabel>
              <StatHelpText>
                The number of governance tokens held by the top 10 addresses
              </StatHelpText>
            </Stat>
            <Box>
              <Bar
                data={props.concentration.data.slice(0, 10)}
                categories={props.concentration.categories.slice(0, 10)}
              />
            </Box>
          </GridItem>{" "}
          <GridItem
            colSpan={3}
            h={"540px"}
            borderWidth="1px"
            borderRadius="lg"
            p={6}
          >
            {" "}
            <Stat>
              <StatLabel>Token distribution</StatLabel>
              <StatHelpText>
                The distribution of governance tokens across all holders
              </StatHelpText>
            </Stat>
            <Box>
              <DonutChart
                data={props.concentration.data}
                labels={props.concentration.categories}
              />
            </Box>
          </GridItem>
        </Grid>
      </Page>
    </>
  );
}

export async function getServerSideProps() {
  const votes = await fetch(
    "https://polydao-api.vercel.app/dao/compound/governance/votes"
  )
    .then((r) => parser(r))
    .then((r) => r.votes);
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
    data: concentrationRes.map(function (i) {
      return i[1];
    }),

    categories: concentrationRes.map(function (i) {
      return i[0];
    }),
  };
  console.log(votes);
  return { props: { votes, holdings, concentration } };
}
