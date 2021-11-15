import Link from "next/link";
import { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
const Nav = (props) => {
  const mapping = {
    compound: 0,
    uniswap: 1,
  };

  return (
    <Tabs defaultIndex={mapping[props.page]} align="center">
      <TabList>
        <Link href="/">
          <a>
            <Tab>Compound</Tab>
          </a>
        </Link>
        <Link href="/uniswap">
          <a>
            <Tab>Uniswap</Tab>
          </a>
        </Link>
        {/* <Link href="/aave">
          <a>
            <Tab>Aave</Tab>
          </a>
        </Link> */}
      </TabList>
    </Tabs>
  );
};

export default Nav;
