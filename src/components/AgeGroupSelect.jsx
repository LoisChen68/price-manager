import { Typography, Space, Select, Input, Flex } from "antd";
import { styled } from "styled-components";
import { useState } from "react";
import HightLightText from "./ui/HightLightText";
import Utils from "../utils";

const maxAge = 20;
const ageOptions = [];
for (let i = 0; i < maxAge + 1; i++) {
  ageOptions.push({ value: i });
}

const { Text } = Typography;

const StyledSelect = styled(Select)`
  width: 45%;
  &.ant-select > .ant-select-selector {
    ${(props) => (props.verify === "error" ? "border-color: red;" : "")};
  }
`;

const StyledInput = styled(Input)`
  width: 15%;
  border-left: 0;
  border-right: 0;
  pointer-events: none;
  text-align: center;
`;

const StyledAgeGroupSelectContainer = styled(Flex)`
  margin-bottom: 20px;
`;

export default function AgeGroupSelect({
  id,
  setAgeGroupPrice,
  ageGroupPrice,
}) {
  const [startAge, setStartAge] = useState(0);
  const [endAge, setEndAge] = useState(0);
  const [startAgeOptions, setStartAgeOptions] = useState(ageOptions);
  const [endAgeOptions, setEndAgeOptions] = useState(ageOptions);
  const ageGroup = ageGroupPrice.map((v) => v.ageGroup);
  const overlap = Utils.getNumberIntervals(ageGroup).overlap;
  const isOverlap = overlap.flat().some((v) => v !== undefined);

  const updateAgeGroupPrice = (newAgeGroup) => {
    const exist = ageGroupPrice.some((p) => p.id === id);
    if (exist) {
      const updateAgeGroup = ageGroupPrice.map((p) =>
        p.id === id ? { ...p, ageGroup: newAgeGroup } : p
      );
      setAgeGroupPrice(updateAgeGroup);
    } else {
      setAgeGroupPrice([...ageGroupPrice, { id, ageGroup: newAgeGroup }]);
    }
  };

  return (
    <StyledAgeGroupSelectContainer vertical>
      <Flex vertical>
        <Text type="secondary">年齡</Text>
        <Space.Compact size="large">
          <StyledSelect
            verify={!!isOverlap ? "error" : ""}
            defaultValue="0"
            options={startAgeOptions}
            onChange={(value) => {
              const options = endAgeOptions.map((option) => {
                if (option.value < value) {
                  return { ...option, disabled: true };
                } else {
                  return { ...option, disabled: false };
                }
              });
              setEndAgeOptions(options);
              setStartAge(value);
              updateAgeGroupPrice([value, endAge]);
            }}
          />
          <StyledInput className="site-input-split" placeholder="～" disabled />
          <StyledSelect
            verify={!!isOverlap ? "error" : ""}
            defaultValue="0"
            options={endAgeOptions}
            onChange={(value) => {
              const options = startAgeOptions.map((option) => {
                if (option.value > value) {
                  return { ...option, disabled: true };
                } else {
                  return { ...option, disabled: false };
                }
              });
              setStartAgeOptions(options);
              setEndAge(value);
              updateAgeGroupPrice([startAge, value]);
            }}
          />
        </Space.Compact>
      </Flex>
      {!!isOverlap && <HightLightText type="danger" text="年齡區間不可重疊" />}
    </StyledAgeGroupSelectContainer>
  );
}
