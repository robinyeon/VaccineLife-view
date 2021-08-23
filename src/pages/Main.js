import React from "react";
import theme from "../styles/theme";
import { useSelector } from "react-redux";
import { isMobileOnly } from "react-device-detect";
import styled from "styled-components";
import Login from "./Login";
import Alert from "../components/popup/Alert";
import Intro from "../components/Intro";
import Grid from "../elements/Grid";

import Map from "../components/Map";
import MainTo from "../components/MainTo";
import MainPopular from "../components/MainPopular";
import MainNivoBar from "../components/MainNivoBar";
import { useEffect } from "react";
import NavModal from "../components/mobile/NavModal";
import ModifySurvey from "../components/ModifySurvey";

const Main = () => {
  // Main페이지에서도 로그인모달창이 뜨게 함
  const modal_status = useSelector((state) => state.modal.visible);
  const navModal_status = useSelector((state) => state.modal.navVisible);
  const surveyModal_status = useSelector((state) => state.modal.surveyVisible);
  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isMobileOnly) {
    return (
      <>
        {navModal_status && <NavModal />}
        {modal_status && <Login />}
        {alert_status && <Alert />}
        <div
          style={{ margin: `${theme.headerHeight} auto 0 auto`, width: "100%" }}
        >
          <Intro />
          <Map />
          <MainNivoBar />
          <MainTo />
          <MainPopular />
        </div>
      </>
    );
  }

  return (
    <>
      {modal_status && <Login />}
      {alert_status && <Alert />}
      {surveyModal_status && <ModifySurvey />}
      <Intro />
      <MapAndChart>
        <Map />
        <MainNivoBar />
      </MapAndChart>
      <MainTo />
      <MainPopular board="vaccine" />
    </>
  );
};

const MapAndChart = styled.div`
  display: flex;
  justify-content: center;
  margin: 80px auto 60px auto;
`;

export default Main;
