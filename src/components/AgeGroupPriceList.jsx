import AgeGroupSelect from "./AgeGroupSelect";
import PriceInput from "./PriceInput";
import { Flex, Typography, Button, Row, Col } from "antd";
import { Fragment, useEffect, useState } from "react";
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

const StyledTitleGroupButton = styled(Flex)`
  margin-bottom: 20px;
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

  const handleRemoveClick = (item) => {
    const filterAgeGroupPriceIds = ageGroupPriceIds.filter(
      (ageGroupPrice) => ageGroupPrice.id !== item.id
    );
    const filterAgeGroupPrice = ageGroupPrice.filter(
      (ageGroupPrice) => ageGroupPrice.id !== item.id
    );
    setAgeGroupPriceIds(filterAgeGroupPriceIds);
    setAgeGroupPrice(filterAgeGroupPrice);
  };

  const handleAddAgeGroupPriceIdClick = () => {
    setAgeGroupPriceIds([...ageGroupPriceIds, { id: v4() }]);
  };
  return (
    <>
      {ageGroupPriceIds.map((item, index) => (
        <Fragment key={item.id}>
          <StyledTitleGroupButton justify="space-between" align="center">
            <StyledTitle level={5}>{`價格設定 - ${index + 1}`}</StyledTitle>
            {index !== 0 && (
              <StyledButton
                type="text"
                color="red"
                onClick={() => handleRemoveClick(item)}
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
              />
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <PriceInput id={item.id} setAgeGroupPrice={setAgeGroupPrice} />
            </Col>
          </Row>
          {index !== ageGroupPriceIds.length - 1 && <Divider />}
        </Fragment>
      ))}
      <StyledButton
        type="text"
        color="#08979c"
        onClick={handleAddAgeGroupPriceIdClick}
      >
        + 新增價格設定
      </StyledButton>
    </>
  );
}
