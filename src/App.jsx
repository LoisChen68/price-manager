import {
  Flex,
  Layout,
  Typography,
  Button,
  Row,
  Col,
  Dropdown,
  Space,
} from "antd";
import AgeGroupPriceList from "./components/AgeGroupPriceList";
import { styled } from "styled-components";
import { IoChevronDownSharp } from "react-icons/io5";
import { v4 } from "uuid";

const { Header } = Layout;

const items = [
  {
    key: v4(),
    label: (
      <a
        href="https://github.com/LoisChen68/price-manager"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    ),
  },
  {
    key: v4(),
    label: (
      <a
        href="https://www.cakeresume.com/LoisChen68"
        target="_blank"
        rel="noreferrer"
      >
        Resume
      </a>
    ),
  },
];

const StyledContainer = styled(Flex)`
  margin: 70px 20px 30px 20px;
`;

const StyledLayout = styled(Layout)`
  background-color: #ffffff;
  height: 100vh;
`;

const StyledHeader = styled(Header)`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  z-index: 2;
  padding: 0 20px;
`;

const StyledTitle = styled(Typography.Title)`
  &.ant-typography {
    margin: 0;
  }
`;

const StyledMenuItemContainer = styled(Row)`
  display: none;
  @media screen and (min-width: 480px) {
    display: flex;
  }
`;

const StyledDropdownMenu = styled(Dropdown)`
  display: flex;
  align-items: center;
  @media screen and (min-width: 480px) {
    display: none;
  }
`;

export default function App() {
  return (
    <StyledLayout>
      <StyledLayout>
        <StyledHeader>
          <StyledTitle level={3}>Price Manager</StyledTitle>
          <StyledMenuItemContainer>
            {items.map((item) => (
              <Col key={item.key}>
                <Button type="link">{item.label}</Button>
              </Col>
            ))}
          </StyledMenuItemContainer>
          <StyledDropdownMenu menu={{ items }}>
            <Button type="link" onClick={(e) => e.preventDefault()}>
              <Space>Menu</Space>
              <IoChevronDownSharp />
            </Button>
          </StyledDropdownMenu>
        </StyledHeader>
        <Flex justify="center">
          <StyledContainer vertical>
            <AgeGroupPriceList onChange={(result) => console.log(result)} />
          </StyledContainer>
        </Flex>
      </StyledLayout>
    </StyledLayout>
  );
}
