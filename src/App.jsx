import { Flex } from "antd";
import { styled } from "styled-components";
import AgeGroupSelect from "./components/AgeGroupSelect";
import PriceInput from "./components/PriceInput";

const StyledContainer = styled(Flex)`
  margin-top: 50px;
`;

export default function App() {
  return (
    <Flex justify="center">
      <StyledContainer>
        <AgeGroupSelect />
        <PriceInput />
      </StyledContainer>
    </Flex>
  );
}
