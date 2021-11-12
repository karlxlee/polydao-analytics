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
        <Tab>
          <Link href="/">Compound</Link>
        </Tab>
        <Tab>
          <Link href="/uniswap">Uniswap</Link>
        </Tab>
      </TabList>
    </Tabs>
  );
};

export default Nav;
