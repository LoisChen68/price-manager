import { Flex } from "antd";
import { styled } from "styled-components";
import AgeGroupSelect from "./AgeGroupSelect";

const StyledContainer = styled.div`
  margin-top: 50px;
`;

export default function App() {
  return (
    <Flex justify="center">
      <StyledContainer>
        <AgeGroupSelect />
      </StyledContainer>
    </Flex>
  );
}
