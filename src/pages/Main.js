import React from "react";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import Login from "./Login";
import Alert from "../components/popup/Alert";
import Intro from '../components/Intro';

import Map from "../components/Map";
import { Grid } from '../elements';
import MainTo from "../components/MainTo";
import MainPopular from "../components/MainPopular";
import MainNivoBar from "../components/MainNivoBar";
import { useEffect } from "react";

const Main = () => {
  // Main페이지에서도 로그인모달창이 뜨게 함
  const modal_status = useSelector((state) => state.modal.visible);
  //alert 창
  const alert_status = useSelector((state) => state.popup.alert);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  if (isMobile) {
    return (
      <Grid margin={`160px auto 120px auto`}>
        {modal_status && <Login />}
        {alert_status && <Alert />}
        <Intro />
        <MapAndChart>
          <Map />
          <MainNivoBar />
        </MapAndChart>
        <MainTo />
        <MainPopular board="vaccine" />
      </Grid>
    );
  }


  return (
    <>
      {modal_status && <Login />}
      {alert_status && <Alert />}
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
