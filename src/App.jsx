import { Flex } from "antd";
import AgeGroupPriceList from "./components/AgeGroupPriceList";
import { styled } from "styled-components";

const StyledContainer = styled(Flex)`
  margin-top: 50px;
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
