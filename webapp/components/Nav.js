import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
const Nav = () => {
  return (
    <Tabs align="center">
      <TabList>
        <Tab>Compound</Tab>
        <Tab>Aave</Tab>
        <Tab>Maker</Tab>
      </TabList>
    </Tabs>
  );
};

export default Nav;
