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
const SparkLineChart = dynamic(() => import("@/components/SparkLineChart"), {
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
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem
            p={0}
            colSpan={2}
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
  const holdings = await fetch(
    "https://polydao-api.vercel.app/dao/" +
      params.dao +
      "/governance/token/holdings"
  )
    .then((r) => parser(r))
    .then((r) => r.holdings);
  return { props: { votes, holdings, dao: params.dao } };
}
