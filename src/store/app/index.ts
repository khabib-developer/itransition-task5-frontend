import { IMessage, IUser } from "../../interfaces";
import { AppAction, AppActionTypes } from "./types";

interface appState {
  server: string;
  user: IUser | null;
  users: IUser[];
  receivedMessages: IMessage[];
  sentMessages: IMessage[];
  loading: boolean;
  tab: number;
  info: string | null;
  success: string | null;
  error: string | null;
}

const initialState: appState = {
  server: "http://localhost:4000",
  user: null,
  sentMessages: [],
  receivedMessages: [],
  users: [],
  loading: false,
  tab: Number(localStorage.getItem("tab")) || 1,
  success: null,
  info: null,
  error: null,
};

export const appReducer = (
  state = initialState,
  action: AppAction
): appState => {
  switch (action.type) {
    case AppActionTypes.APP_USER:
      return { ...state, user: action.payload };
    case AppActionTypes.APP_USERS:
      return { ...state, users: action.payload };
    case AppActionTypes.APP_LOADING:
      return { ...state, loading: action.payload };

    case AppActionTypes.APP_TAB:
      return { ...state, tab: action.payload };

    case AppActionTypes.APP_INFO:
      return { ...state, info: action.payload };

    case AppActionTypes.APP_SENTMESSAGES:
      return { ...state, sentMessages: action.payload };
    case AppActionTypes.APP_RECEIVEDMESSAGES:
      return { ...state, receivedMessages: action.payload };

    case AppActionTypes.APP_SUCCESS:
      return { ...state, success: action.payload };
    case AppActionTypes.APP_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
