import { Typography, Space, Select, Input, Flex } from "antd";
import { styled } from "styled-components";
import { useState } from "react";

const maxAge = 20;
const ageOptions = [];
for (let i = 0; i < maxAge + 1; i++) {
  ageOptions.push({ value: i });
}

const { Text } = Typography;

const StyledSelect = styled(Select)`
  width: 40%;
`;

const StyledInput = styled(Input)`
  width: 15%;
  border-left: 0;
  border-right: 0;
  pointer-events: none;
  text-align: center;
`;

export default function AgeGroupSelect() {
  const [startAgeOptions, setStartAgeOptions] = useState(ageOptions);
  const [endAgeOptions, setEndAgeOptions] = useState(ageOptions);
  return (
    <Flex vertical>
      <Text type="secondary">年齡</Text>
      <Space.Compact block>
        <StyledSelect
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
          }}
        />
        <StyledInput className="site-input-split" placeholder="～" disabled />
        <StyledSelect
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
          }}
        />
      </Space.Compact>
    </Flex>
  );
}