import { Typography, Space, Select, Input, Flex } from "antd";
import { styled } from "styled-components";
import { useState } from "react";
import HightLightText from "./ui/HightLightText";
import Utils from "../utils";

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
  isOverlap,
}) {
  const [startAge, setStartAge] = useState(0);
  const [endAge, setEndAge] = useState(0);
  const [startAgeOptions, setStartAgeOptions] = useState(Utils.ageOptions);
  const [endAgeOptions, setEndAgeOptions] = useState(Utils.ageOptions);

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
            value={startAge}
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
            value={endAge}
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
