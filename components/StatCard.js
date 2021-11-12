import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const StatCard = (props) => {
  return (
    <GridItem colSpan={1} h={"192px"} borderWidth="1px" borderRadius="lg" p={6}>
      <Stat>
        <StatLabel>{props.label}</StatLabel>
        <StatNumber>{props.stat}</StatNumber>
        <StatHelpText>{props.description}</StatHelpText>
      </Stat>
    </GridItem>
  );
};

export default StatCard;
