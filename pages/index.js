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
import daoList from "../dao.json";
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

export async function getServerSideProps() {
  let dao = Object.keys(daoList)[0];
  console.log(dao);
  const gov = await fetch(
    "https://api.covalenthq.com/v1/1/events/address/0xc0Da02939E1441F497fd74F78cE7Decb17B66529/?starting-block=12115107&ending-block=12240004&key=ckey_5de627364f574dde947de753b67"
  );
  const res = await gov.json().then((r) => r.data);
  console.log(res);
  return { props: {} };
}
