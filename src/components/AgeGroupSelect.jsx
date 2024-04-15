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

const StyledHightLightText = styled(Text)`
  background-color: ${(props) => (props.type === "danger" ? "#FED7D785" : "")};
  border-radius: 5px;
  padding: 2px 5px 2px 5px;
`;

const StyledAgeGroupSelectContainer = styled(Flex)`
  margin-bottom: 20px;
`;

function splitNumberIntervals(arr) {
  const numberIntervals = [];
  let start = arr[0];
  let end = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === end + 1) {
      end = arr[i];
    } else {
      numberIntervals.push([start, end]);
      start = arr[i];
      end = arr[i];
    }
  }
  numberIntervals.push([start, end]);
  return numberIntervals;
}

function getNumberIntervals(arr) {
  const numberRangerArr = [];
  const numberSet = new Set();
  const duplicateSet = new Set();

  arr.map((arr) => {
    const start = arr[0];
    const end = arr[1] + 1;
    for (let i = start; i < end; i++) {
      numberRangerArr.push(i);
    }
    return false;
  });
  numberRangerArr.forEach((value) => {
    numberSet.has(value) ? duplicateSet.add(value) : numberSet.add(value);
  });
  const maxNumber = Math.max(...numberSet);
  const numberArr = [];
  for (let i = 0; i < maxNumber + 1; i++) {
    numberArr.push(i);
  }

  const numbers = Array.from(numberSet);
  const duplicates = Array.from(duplicateSet);
  const filterNumberRepeat = numberArr.filter((v) => !numbers.includes(v));
  const overlay = splitNumberIntervals(duplicates);
  const noIncludes = splitNumberIntervals(filterNumberRepeat);
  return { overlay, noIncludes };
}

export default function AgeGroupSelect({
  id,
  setAgeGroupPrice,
  ageGroupPrice,
}) {
  const [startAge, setStartAge] = useState(0);
  const [endAge, setEndAge] = useState(0);
  const [startAgeOptions, setStartAgeOptions] = useState(ageOptions);
  const [endAgeOptions, setEndAgeOptions] = useState(ageOptions);
  const ageGroup = ageGroupPrice.map((v) =>
    !!v.ageGroup ? v.ageGroup : [0, 0]
  );
  const overlay = getNumberIntervals(ageGroup).overlay;
  const isOverlay = overlay.flat().some((v) => v !== undefined);

  return (
    <StyledAgeGroupSelectContainer vertical>
      <Flex vertical>
        <Text type="secondary">年齡</Text>
        <Space.Compact size="large">
          <StyledSelect
            verify={!!isOverlay ? "error" : ""}
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
              setAgeGroupPrice((pre) => {
                const exist = pre.some((p) => p.id === id);
                if (exist) {
                  return pre.map((p) =>
                    p.id === id ? { ...p, ageGroup: [value, endAge] } : p
                  );
                } else {
                  return [...pre, { id, ageGroup: [value, endAge] }];
                }
              });
            }}
          />
          <StyledInput className="site-input-split" placeholder="～" disabled />
          <StyledSelect
            verify={!!isOverlay ? "error" : ""}
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
              setAgeGroupPrice((pre) => {
                const exist = pre.some((p) => p.id === id);
                if (exist) {
                  return pre.map((p) =>
                    p.id === id ? { ...p, ageGroup: [startAge, value] } : p
                  );
                } else {
                  return [...pre, { id, ageGroup: [startAge, value] }];
                }
              });
            }}
          />
        </Space.Compact>
      </Flex>
      {!!isOverlay && (
        <StyledHightLightText type="danger">
          年齡區間不可重疊
        </StyledHightLightText>
      )}
    </StyledAgeGroupSelectContainer>
  );
}
