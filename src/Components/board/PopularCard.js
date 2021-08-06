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

// 사용시 props에 board 타입줄것 (true or false)
const PopularCard = (props) => {
  const {
    board,
    title,
    contents,
    likeCount,
    totalVisitors,
    commentCount,
    createdAt,
    user,
    boardId,
  } = props;

  /* 로그인 했을때 isHeart 구현*/

  const storedState = convertFromRaw(JSON.parse(contents));
  const editorState = EditorState.createWithContent(storedState);

  const handleMoveDetail = () => {
    if (board === "vaccine") {
      history.push(`/detail/${boardId}`);
    } else {
      history.push(`/quarantinedetail/${boardId}`);
    }
  };

  return (
    <Grid
      width={theme.popularCardWidth}
      height={theme.popularCardHeight}
      padding="32px"
      hover
      _onClick={handleMoveDetail}
      bg="white"
    >
      {board === "vaccine" && (
        <InfoWrapper>
          <InfoDiv>{user.type && user.type}</InfoDiv>
        </InfoWrapper>
      )}
      <TitleWrapper>{title}</TitleWrapper>

      <ContentWrapper>
        <Editor editorState={editorState} readOnly={true} />
      </ContentWrapper>

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
            <LikeIconChanger isHeart={true} />
            <p style={{ marginLeft: "5.55px" }}>{likeCount}</p>
          </Grid>
          <Grid is_flex="center" margin="0 0 0 19px">
            <FontAwesomeIcon icon={faCommentAlt} />
            <p style={{ marginLeft: "5.55px" }}>{commentCount}</p>
          </Grid>
          <Grid is_flex="center" margin="0 0 0 19px">
            <FontAwesomeIcon icon={faEye} />
            <p style={{ marginLeft: "5.55px" }}>{totalVisitors}</p>
          </Grid>
        </TextDiv>
      </Grid>
    </Grid>
  );
};

PopularCard.defaultProps = {
  vacBoardId: -1,
  quarBoardId: -1,
};

const InfoWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
`;
const InfoDiv = styled.div`
  width: 60px;
  height: 24px;
  font-size: ${theme.SubHeadTwoSize};
  line-height: ${theme.SubHeadTwoHeight};
  font-weight: 700;
  background-color: ${theme.bg2};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TitleWrapper = styled.div`
  width: 100%;
  height: 60px;
  font-size: ${theme.headTwoSize};
  line-height: ${theme.headTwoHeight};
  font-weight: 700;
  line-height: 30px;
  text-overflow: ellipsis;
  text-align: start;
  margin-bottom: 16px;
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

const TextDiv = styled.div`
  display: flex;
  color: ${theme.typoGrey2};
  font-size: ${theme.bodyThreeSize};
  line-height: ${theme.bodyThreeHeight};
`;

export default PopularCard;
