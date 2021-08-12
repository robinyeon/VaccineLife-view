import React, { useEffect } from "react";
import Login from "./Login";
import BoardInfo from "../components/detail/BoardInfo";
import Contents from "../components/detail/Contents";
import { Button, Grid } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import {
  actionDeleteEx,
  actionGetDetail,
  actionSetPrevNextPageQuar,
} from "../redux/modules/board";
import theme from "../styles/theme";
import Confirm from "../components/popup/Confirm";
import Alert from "../components/popup/Alert";
import CommentWrite from "../components/detail/CommentWrite";
import CommentList from "../components/detail/CommentList";
import { useParams } from "react-router-dom";
import logger from "../shared/logger";
import { actionGetLike } from "../redux/modules/like";
import { actionGetCommentList } from "../redux/modules/comment";
import Spinner from "../shared/Spinner";
import MetaScript from "../shared/MetaScript";
import styled from "styled-components";
import { history } from "../redux/configStore";

const QuarantineDetail = () => {
  const isLoading = useSelector((state) => state.isLoading.isLoading);
  const boardId_detail = useParams().id;
  const title = useSelector((state) => state.board.board.title);

  // 격리후기때는 MoveBox에 false 기입
  const modal_status = useSelector((state) => state.modal.visible);
  //confirm 창
  const confirm_status = useSelector((state) => state.popup.confirm);
  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);
  // 코멘트 리스트 불러오기
  const comment_list = useSelector((state) => state.comment.commentQuar);

  const boardType = false;

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(actionGetDetail("quarantine", boardId_detail));
    dispatch(actionGetCommentList("quarantine", boardId_detail));
    // dispatch(actionGetLike("quarantine"));
  }, []);
  const board_content = useSelector((state) => state.board.board);

  const handleDelete = () => {
    dispatch(actionDeleteEx("quarantine", board_content.boardId));
  };

  const handleMoveTotal = () => {
    history.push("/quarantine");
  };

  return (
    <Grid width={theme.detailWidth} margin="160px auto 120px auto">
      <MetaScript title={`슬기로운 백신생활 | ${title}`} />
      <BoardInfo
        board="quarantine"
        boardId={board_content.boardId}
        nickname={board_content.nickname}
        userId={board_content.userId}
        title={board_content.title}
        totalVisitors={board_content.totalVisitors}
        createdAt={board_content.createdAt}
        likeCount={board_content.likeCount}
      />

      <CenterLine />

      <Contents
        board="quarantine"
        boardId={board_content.boardId}
        contents={board_content.contents}
        likeCount={board_content.likeCount}
      />

      {confirm_status && (
        <Confirm
          confirmMessage="게시글을 삭제하시겠습니까?"
          activeFunction={handleDelete}
        />
      )}
      <Grid is_flex="space_row">
        <p
          style={{
            fontSize: `${theme.headTwoSize}`,
            lineHeight: `${theme.headTwoSize}`,
            textAlign: "start",
            fontWeight: "700",
            margin: "40px 0 40px 0",
          }}
        >
          댓글 {comment_list.length} 개
        </p>

        <TextDiv onClick={handleMoveTotal}>전체 게시글</TextDiv>
      </Grid>
      <CommentWrite board="quarantine" boardId={boardId_detail} />
      {comment_list?.map((each, index) => {
        return (
          <CommentList
            key={index}
            board="quarantine"
            commentId={each.id}
            boardId={each.quarBoardId}
            comment={each.quarcomment}
            createdAt={each.createdAt}
            userId={each.userId}
            nickname={each.nickname}
          />
        );
      })}
      {modal_status && <Login />}
      {alert_status && <Alert />}
      {isLoading && <Spinner />}
    </Grid>
  );
};

const TextDiv = styled.div`
  font-size: ${theme.bodyTwoSize};
  width: ${theme.totalButtonWidth};
  height: ${theme.mediumButtonHeight};
  display: flex;
  justify-content: flex-end;
  font-weight: 700;
  :hover {
    cursor: pointer;
    color: ${theme.typoGrey2};
  }
`;

const CenterLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.typoGrey3};
`;

export default QuarantineDetail;
