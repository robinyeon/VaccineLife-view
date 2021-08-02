import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import { connectRouter } from "connected-react-router";
import user from "./modules/user";
import comment from "./modules/comment";

import board from "./modules/board";
import modal from "./modules/modal";
import map from "./modules/map";


export const history = createBrowserHistory();

const middlewares = [
  thunk.withExtraArgument({
    history,
  }),
];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  board: board.reducer,
  user: user.reducer,
  comment: comment.reducer,
  modal: modal.reducer,
  map: map.reducer,
  router: connectRouter(history),
});

const store = configureStore({
  reducer,
  middleware: middlewares,
});

export default store;
