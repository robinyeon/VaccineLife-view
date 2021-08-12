import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import theme from "../../styles/theme";

const UserInfo = (props) => {
  const board_list = useSelector((state) => state.board.board);
  const { type, gender, age, disease, degree, afterEffect } = board_list;
  const typeChanger = (type) => {
    if (type === "아스트라제네카") {
      return "AZ";
    } else if (type === "아스트라제네카 + 화이자") {
      return "AZ + PF";
    } else {
      return type;
    }
  };

  return (
    <Wrapper>
      <Table>
        <thead>
          <TableTr>
            <Th>백신종류</Th>
            <Th>차수</Th>
            <Th>연령대</Th>
            <Th>성별</Th>
            <Th>기저질환</Th>
          </TableTr>
        </thead>
        <tbody>
          <TableTr>
            <Th>{typeChanger(type)}</Th>
            <Th>{degree} 차</Th>
            <Th>{age}</Th>
            <Th>{gender}</Th>
            <Th>{disease}</Th>
          </TableTr>
        </tbody>
        <tfoot>
          <TableTr>
            <ThSm>후유증</ThSm>
            <ThLg colSpan="4">{afterEffect}</ThLg>
          </TableTr>
        </tfoot>
      </Table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
`;

const Table = styled.table`
  width: 100%;
  border-top: 1px solid ${theme.typoGrey3};
  border-collapse: collapse;
  color: ${theme.typoGrey3};
  font-size: ${theme.bodyTwoSize};
  line-height: ${theme.bodyTwoHeight};
`;

const TableTr = styled.tr`
  border-bottom: 1px solid ${theme.typoGrey3};
  height: 40px;
`;

const Th = styled.th`
  text-align: center;
  line-height: 40px;
  vertical-align: center;
`;

const ThSm = styled.th`
  text-align: center;
  line-height: 40px;
  vertical-align: center;
  border-right: 1px solid ${theme.typoGrey3};
`;
const ThLg = styled.th`
  text-align: left;
  line-height: 40px;
  vertical-align: center;
  padding-left: 10px;
`;

export default UserInfo;
