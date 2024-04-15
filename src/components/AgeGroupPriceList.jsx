import AgeGroupSelect from "./AgeGroupSelect";
import PriceInput from "./PriceInput";
import { Flex, Typography, Button, Row, Col } from "antd";
import { Fragment, useEffect, useState } from "react";
import { v4 } from "uuid";
import { styled } from "styled-components";
import { Divider } from "antd";
import Utils from "../utils";

const groupInitId = v4();
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

const StyledTitleGroupButton = styled(Flex)`
  margin-bottom: 20px;
`;

export default function AgeGroupPriceList({ onChange }) {
  const [ageGroupPrice, setAgeGroupPrice] = useState([
    { id: groupInitId, ageGroup: [0, 0], price: 0 },
  ]);
  const ageGroup = ageGroupPrice.map((v) => v.ageGroup);
  const { overlap, notInclude } = Utils.getNumberIntervals(ageGroup);
  const isOverlap = overlap.length !== 0;
  const isNotInclude = !isOverlap && notInclude.length === 0;

  useEffect(() => {
    const result = ageGroupPrice.map((v) => ({
      ageGroup: v.ageGroup,
      price: v.price,
    }));
    onChange(result);
  }, [onChange, ageGroupPrice]);

  const handleRemoveAgeGroupPriceClick = (item) => {
    const filterAgeGroupPrice = ageGroupPrice.filter(
      (ageGroupPrice) => ageGroupPrice.id !== item.id
    );
    setAgeGroupPrice(filterAgeGroupPrice);
  };

  const handleAddAgeGroupPriceClick = () => {
    setAgeGroupPrice([
      ...ageGroupPrice,
      { id: v4(), ageGroup: [0, 0], price: 0 },
    ]);
  };
  return (
    <>
      {ageGroupPrice.map((item, index) => (
        <Fragment key={item.id}>
          <StyledTitleGroupButton justify="space-between" align="center">
            <StyledTitle level={5}>{`價格設定 - ${index + 1}`}</StyledTitle>
            {index !== 0 && (
              <StyledButton
                type="text"
                color="red"
                onClick={() => handleRemoveAgeGroupPriceClick(item)}
              >
                X 移除
              </StyledButton>
            )}
          </StyledTitleGroupButton>
          <Row gutter={[8, 8]}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <AgeGroupSelect
                id={item.id}
                setAgeGroupPrice={setAgeGroupPrice}
                ageGroupPrice={ageGroupPrice}
                isOverlap={isOverlap}
              />
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <PriceInput id={item.id} setAgeGroupPrice={setAgeGroupPrice} />
            </Col>
          </Row>
          {index !== ageGroupPrice.length - 1 && <Divider />}
        </Fragment>
      ))}
      <StyledButton
        type="text"
        color="#08979c"
        onClick={handleAddAgeGroupPriceClick}
        disabled={isNotInclude}
      >
        + 新增價格設定
      </StyledButton>
    </>
  );
}
