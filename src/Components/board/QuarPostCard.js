import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import theme from "../../styles/theme";
import { history } from "../../redux/configStore";
import displayedAt from "../../shared/displayedAt";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import LikeIconChanger from "../LikeIconChanger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faEye } from "@fortawesome/free-regular-svg-icons";
import { isMobileOnly } from "react-device-detect";

// 사용시 props에 board 타입줄것 (true or false)
const QuarPostCard = (props) => {
  const {
    title,
    board,
    contents,
    likeCount,
    totalVisitors,
    commentCount,
    createdAt,
    boardId,
  } = props;

  /* 로그인 했을때 isHeart 구현*/

  const handleMoveDetail = () => {
    history.push(`/quarantinedetail/${boardId}`);
  };

  if (isMobileOnly) {
    return (
      <Grid
        margin="0"
        width="380px"
        height="200px"
        border={`1px solid ${theme.typoLightGrey2}`}
        padding="24px 24px 0 24px"
        _onClick={handleMoveDetail}
        bg={theme.white}
      >
        <InfoWrapperM></InfoWrapperM>

        <TitleWrapperM>{title}</TitleWrapperM>

        <ContentWrapperM
          dangerouslySetInnerHTML={{ __html: contents }}
        ></ContentWrapperM>

        <Grid
          height={theme.headOneSize}
          is_flex="space_row"
          margin="10px 0 0 0"
        >
          <Text
            color={theme.typoGrey2}
            size={theme.bodyfourSize}
            lineHeight={theme.bodyfourHeight}
          >
            {displayedAt(createdAt)}
          </Text>

          <TextDiv>
            <Grid is_flex="center" margin="0 0 0 11px">
              <LikeIconChanger board={board} boardId={boardId} />
              <p
                style={{
                  fontSize: `${theme.bodyfourSize}`,
                  marginLeft: "5.55px",
                  color: `${theme.typoGrey2}`,
                }}
              >
                {likeCount}
              </p>
            </Grid>
            <Grid is_flex="center" margin="0 0 0 11px" color={theme.typoGrey2}>
              <FontAwesomeIcon icon={faCommentAlt} />
              <p
                style={{
                  fontSize: `${theme.bodyfourSize}`,
                  marginLeft: "5.55px",
                  color: `${theme.typoGrey2}`,
                }}
              >
                {commentCount}
              </p>
            </Grid>
            <Grid is_flex="center" margin="0 0 0 11px" color={theme.typoGrey2}>
              <FontAwesomeIcon icon={faEye} />
              <p
                style={{
                  fontSize: `${theme.bodyfourSize}`,
                  marginLeft: "5.55px",
                  color: `${theme.typoGrey2}`,
                }}
              >
                {totalVisitors}
              </p>
            </Grid>
          </TextDiv>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      margin="0"
      width={theme.popularCardWidth}
      height={theme.popularCardHeight}
      border={`1px solid ${theme.typoLightGrey2}`}
      padding="32px"
      hover
      _onClick={handleMoveDetail}
      bg="white"
    >
      <InfoWrapper></InfoWrapper>

      <TitleWrapper>{title}</TitleWrapper>

      <ContentWrapper
        dangerouslySetInnerHTML={{ __html: contents }}
      ></ContentWrapper>

      <Grid height={theme.headOneSize} is_flex="space_row" margin="72px 0 0 0">
        <Text
          color={theme.typoGrey2}
          size={theme.bodyThreeSize}
          lineHeight={theme.bodyThreeHeight}
        >
          {displayedAt(createdAt)}
        </Text>

        <TextDiv>
          <Grid is_flex="center" margin="0 0 0 19px">
            <LikeIconChanger board={board} boardId={boardId} />
            <p style={{ marginLeft: "5.55px", color: `${theme.typoGrey2}` }}>
              {likeCount}
            </p>
          </Grid>
          <Grid is_flex="center" margin="0 0 0 19px" color={theme.typoGrey2}>
            <FontAwesomeIcon icon={faCommentAlt} />
            <p style={{ marginLeft: "5.55px", color: `${theme.typoGrey2}` }}>
              {commentCount}
            </p>
          </Grid>
          <Grid is_flex="center" margin="0 0 0 19px" color={theme.typoGrey2}>
            <FontAwesomeIcon icon={faEye} />
            <p style={{ marginLeft: "5.55px", color: `${theme.typoGrey2}` }}>
              {totalVisitors}
            </p>
          </Grid>
        </TextDiv>
      </Grid>
    </Grid>
  );
};

QuarPostCard.defaultProps = {
  vacBoardId: -1,
  quarBoardId: -1,
};

const InfoWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
`;
const InfoWrapperM = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const InfoDiv = styled.div`
  width: 63px;
  height: 32px;
  font-size: ${theme.SubHeadTwoSize};
  line-height: ${theme.SubHeadTwoHeight};
  font-weight: 700;
  background-color: ${theme.bg2};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-overflow: ellipsis;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 60px;
  font-size: ${theme.headTwoSize};
  line-height: ${theme.headTwoHeight};
  font-weight: 700;
  text-overflow: ellipsis;
  text-align: start;
  margin-bottom: 16px;
`;

const TitleWrapperM = styled.div`
  width: 100%;
  font-size: ${theme.SubHeadTwoSize};
  line-height: ${theme.SubHeadTwoHeight};
  font-weight: 700;

  text-overflow: ellipsis;
  text-align: start;
  margin-bottom: 8px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 72px;
  font-size: ${theme.bodyThreeSize};
  line-height: ${theme.bodyThreeHeight};
  color: ${theme.typoGrey2};
  font-weight: 700;
  overflow: hidden;
  text-align: start;
`;

const ContentWrapperM = styled.div`
  width: 100%;
  height: 44px;
  font-size: ${theme.bodyfourSize};
  line-height: ${theme.bodyfourHeight};
  color: ${theme.typoGrey2};
  font-weight: 700;
  overflow: hidden;
  text-align: start;
`;

const TextDiv = styled.div`
  display: flex;
  color: ${theme.typoGrey2};
  font-size: ${theme.bodyThreeSize};
  line-height: ${theme.bodyThreeHeight};
`;

export default QuarPostCard;
