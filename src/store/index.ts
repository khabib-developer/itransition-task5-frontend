import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "./app";

const rootreducer = combineReducers({
  app: appReducer,
});

export const store = createStore(rootreducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootreducer>;
