import AgeGroupSelect from "./AgeGroupSelect";
import PriceInput from "./PriceInput";
import { Flex, Typography, Button } from "antd";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { styled } from "styled-components";
import { Divider } from "antd";

const groupIds = [{ id: v4() }];
const StyledButton = styled(Button)`
  width: fit-content;
  color: ${(props) => props.color};
  padding-left: 0px;
  padding-right: 0px;
`;

const StyledTitle = styled(Typography.Title)`
  &.ant-typography {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

export default function AgeGroupPriceList({ onChange }) {
  const [ageGroupPriceIds, setAgeGroupPriceIds] = useState(groupIds);
  const [ageGroupPrice, setAgeGroupPrice] = useState([]);

  useEffect(() => {
    const result = ageGroupPrice.map((v) => ({
      ageGroup: v.ageGroup,
      price: !v.price ? 0 : v.price,
    }));
    onChange(result);
  }, [onChange, ageGroupPrice]);

  return (
    <>
      {ageGroupPriceIds.map((item, index) => (
        <div key={item.id}>
          <Flex justify="space-between" align="center">
            <StyledTitle level={5}>{`價格設定 - ${index + 1}`}</StyledTitle>
            {index !== 0 && (
              <StyledButton
                type="text"
                color="red"
                onClick={() => {
                  const filterAgeGroupPriceIds = ageGroupPriceIds.filter(
                    (ageGroupPrice) => ageGroupPrice.id !== item.id
                  );
                  setAgeGroupPriceIds(filterAgeGroupPriceIds);
                }}
              >
                X 移除
              </StyledButton>
            )}
          </Flex>
          <Flex>
            <AgeGroupSelect id={item.id} setAgeGroupPrice={setAgeGroupPrice} />
            <PriceInput id={item.id} setAgeGroupPrice={setAgeGroupPrice} />
          </Flex>
          {index !== ageGroupPriceIds.length - 1 && <Divider />}
        </div>
      ))}
      <StyledButton
        type="text"
        color="#08979c"
        onClick={() => setAgeGroupPriceIds([...ageGroupPriceIds, { id: v4() }])}
      >
        + 新增價格設定
      </StyledButton>
    </>
  );
}
