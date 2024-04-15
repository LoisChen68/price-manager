import { Flex } from "antd";
import AgeGroupPriceList from "./components/AgeGroupPriceList";
import { styled } from "styled-components";

const StyledContainer = styled(Flex)`
  margin: 50px 20px 50px 20px;
`;

export default function App() {
  return (
    <Flex justify="center">
      <StyledContainer vertical>
        <AgeGroupPriceList onChange={(result) => console.log(result)} />
      </StyledContainer>
    </Flex>
  );
}
