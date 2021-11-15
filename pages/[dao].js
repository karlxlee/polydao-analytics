import Page from "@/components/Page";
import Nav from "@/components/Nav";
import {
  Stat,
  StatLabel,
  StatHelpText,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";
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

export default function Dao(props) {
  return (
    <>
      <Nav page={props.dao} />
      <Page>
        <Grid
          mt={10}
          h="200px"
          templateRows="repeat(6, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem
            p={0}
            rowStart={1}
            colStart={1}
            rowSpan={1}
            colSpan={{ sm: 5, md: 5, lg: 2 }}
            h={"220px"}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Stat p={6} pb={0}>
              <StatLabel>Number of votes</StatLabel>
              <StatHelpText>The number of votes cast each day</StatHelpText>
            </Stat>
            <Box>
              <SparkLineChart data={props.votes} />
            </Box>
          </GridItem>
          <GridItem
            p={0}
            rowStart={2}
            colSpan={{ sm: 5, md: 5, lg: 2 }}
            h={"220px"}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Stat p={6} pb={0}>
              <StatLabel>Number of proposals</StatLabel>
              <StatHelpText>
                The number of proposals created each day
              </StatHelpText>
            </Stat>
            <Box>
              <SparkLineChart data={props.proposals} />
            </Box>
          </GridItem>
          <GridItem
            colSpan={{ sm: 5, lg: 3 }}
            colStart={{ sm: 1, lg: 3 }}
            rowSpan={2}
            h={{ sm: "500px", lg: "auto" }}
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
            p={6}
            colSpan={5}
            h={"440px"}
            borderWidth="1px"
            borderRadius="lg"
          >
            {" "}
            <Stat>
              <StatLabel>Voting power</StatLabel>
              <StatHelpText>
                The number of the votes delegated to and held by addresses
              </StatHelpText>
            </Stat>
            <Bar data={props.power.data} categories={props.power.categories} />
          </GridItem>
          {props.concentration && (
            <>
              <GridItem
                colSpan={{ sm: 5, lg: 2 }}
                h={"540px"}
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
              </GridItem>
              <GridItem
                colSpan={{ sm: 5, lg: 3 }}
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
            </>
          )}
        </Grid>
      </Page>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const votes = await fetch(
    "https://polydao-api.vercel.app/dao/" + params.dao + "/governance/votes"
  )
    .then((r) => parser(r))
    .then((r) => r.count);
  const powerRes = await fetch(
    "https://polydao-api.vercel.app/dao/" + params.dao + "/governance/power"
  )
    .then((r) => parser(r))
    .then((r) => r.power);
  const power = {
    data: powerRes.map((i) => i[2]),
    categories: powerRes.map((i) => i[0]),
  };

  const proposals = await fetch(
    "https://polydao-api.vercel.app/dao/" + params.dao + "/governance/proposals"
  )
    .then((r) => parser(r))
    .then((r) => r.count);

  const holdings = await fetch(
    "https://polydao-api.vercel.app/dao/" +
      params.dao +
      "/governance/token/holdings"
  )
    .then((r) => parser(r))
    .then((r) => r.holdings);

  const concentrationRes = await fetch(
    "https://polydao-api.vercel.app/dao/" +
      params.dao +
      "/governance/token/concentration"
  )
    .then((r) => parser(r))
    .then((r) => (!r.error ? r.concentration : false));
  const concentration = concentrationRes
    ? {
        data: concentrationRes.map(function (i) {
          return i[1];
        }),

        categories: concentrationRes.map(function (i) {
          return i[0];
        }),
      }
    : false;
  return {
    props: {
      votes,
      power,
      proposals,
      holdings,
      concentration,
      dao: params.dao,
    },
  };
}
