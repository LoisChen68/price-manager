import { Typography } from "antd";
import { styled } from "styled-components";

const { Text } = Typography;

const StyledHightLightText = styled(Text)`
  background-color: ${(props) => (props.type === "danger" ? "#FED7D785" : "")};
  border-radius: 5px;
  padding: 2px 5px 2px 5px;
`;

export default function HightLightText({ type, text }) {
  return <StyledHightLightText type={type}>{text}</StyledHightLightText>;
}
