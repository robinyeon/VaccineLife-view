import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Medical from "../pages/Medical";
import Vaccine from "../pages/Vaccine";
import Write from "../pages/Write";
import "./App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import QuarantineDetail from "../pages/QuarantineDetail";
import Detail from "../pages/Detail";
import styled from "styled-components";
import Modify from "../pages/Modify";
import Quarantine from "../pages/Quarantine";

function App() {
  return (
    <Wrapper className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/vaccine" component={Vaccine} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/vaccineboard/write" component={Write} />
        <Route exact path="/modify/:id" component={Modify} />
        <Route exact path="/quarantine" component={Quarantine} />
        <Route
          exact
          path="/quarantinedetail/:id"
          component={QuarantineDetail}
        />
        <Route exact path="/quarantineboard/write" component={Write} />
        <Route exact path="/quarantinemodify/:id" component={Modify} />
        <Route exact path="/medical" component={Medical} />
        <Redirect from="*" to="/" />
      </Switch>
      <Banner />
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export default App;
