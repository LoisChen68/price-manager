import { InputNumber, Typography, Flex } from "antd";
import { styled } from "styled-components";
import { useState } from "react";
import HightLightText from "./ui/HightLightText";
import Utils from "../utils";

const { Text } = Typography;

const StyledText = styled(Text)`
  text-align: ${(props) => props.align};
`;

const StyledInputNumber = styled(InputNumber)`
  .ant-input-number {
    ${(props) => (props.verify === "error" ? `border-color: red;` : "")};
  }
`;

export default function PriceInput({ id, setAgeGroupPrice }) {
  const [price, setPrice] = useState(0);

  const handleChange = (value) => {
    setPrice(value);
    setAgeGroupPrice((pre) => {
      const exist = pre.some((p) => p.id === id);
      if (exist) {
        return pre.map((p) =>
          p.id === id ? { ...p, price: Number(value) } : p
        );
      } else {
        return [...pre, { id, price: Number(value) }];
      }
    });
  };

  return (
    <Flex vertical>
      <Text type="secondary">入住費用（每人每晚）</Text>
      <StyledInputNumber
        defaultValue={price}
        addonBefore={<Text>TWD</Text>}
        placeholder="請輸入費用"
        formatter={(value) => Utils.addComma(value)}
        onChange={(value) => handleChange(value)}
        verify={price === null ? "error" : ""}
        stringMode
        size="large"
      />
      {price === null && <HightLightText type="danger" text="不可以為空白" />}
      <StyledText type="secondary" align="end">
        輸入 0 表示免費
      </StyledText>
    </Flex>
  );
}
