import { InputNumber, Typography, Flex } from "antd";
import { styled } from "styled-components";
import { useState } from "react";

const { Text } = Typography;

const StyledText = styled(Text)`
  text-align: ${(props) => props.align};
`;

const StyledInputNumber = styled(InputNumber)`
  .ant-input-number {
    ${(props) => (props.verify === "error" ? `border-color: red;` : "")};
  }
`;

const StyledHightLightText = styled(Text)`
  background-color: ${(props) => (props.type === "danger" ? "#FED7D785" : "")};
  border-radius: 5px;
  padding: 2px 5px 2px 5px;
`;

function addComma(value) {
  let str = value.toString();
  let decimalPart = "";
  if (str.includes(".")) {
    [str, decimalPart] = str.split(".");
  }
  let result = str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (decimalPart) {
    result += "." + decimalPart;
  }
  if (!value) {
    result = "";
  }
  return result;
}

export default function PriceInput({ id, setAgeGroupPrice }) {
  const [price, setPrice] = useState(0);

  return (
    <Flex vertical>
      <Text type="secondary">入住費用（每人每晚）</Text>
      <StyledInputNumber
        defaultValue={price}
        addonBefore={<Text>TWD</Text>}
        placeholder="請輸入費用"
        formatter={(value) => addComma(value)}
        onChange={(value) => {
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
        }}
        verify={price === null ? "error" : ""}
        stringMode
        size="large"
      />
      {price === null && (
        <StyledHightLightText type="danger">不可以為空白</StyledHightLightText>
      )}
      <StyledText type="secondary" align="end">
        輸入 0 表示免費
      </StyledText>
    </Flex>
  );
}
