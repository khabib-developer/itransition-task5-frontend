// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IMessage, IUser } from "../../interfaces";
import { AppActionTypes } from "./types";

export const setUser = (payload: IUser | null) => {
  !payload
    ? localStorage.removeItem("username")
    : localStorage.setItem("username", payload.username);
  return {
    type: AppActionTypes.APP_USER,
    payload,
  };
};

export const setUsers = (payload: IUser[]) => {
  return {
    type: AppActionTypes.APP_USERS,
    payload,
  };
};

export const setReceivedMessages = (payload: IMessage[]) => {
  return {
    type: AppActionTypes.APP_RECEIVEDMESSAGES,
    payload,
  };
};

export const setSentMessages = (payload: IMessage[]) => {
  return {
    type: AppActionTypes.APP_SENTMESSAGES,
    payload,
  };
};

export const setLoading = (payload: boolean) => {
  return {
    type: AppActionTypes.APP_LOADING,
    payload,
  };
};

export const setTab = (payload: number) => {
  localStorage.setItem("tab", payload.toString());
  return {
    type: AppActionTypes.APP_TAB,
    payload,
  };
};

export const setError = (payload: string | null) => {
  return {
    type: AppActionTypes.APP_ERROR,
    payload,
  };
};

export const setInfo = (payload: string | null) => {
  return {
    type: AppActionTypes.APP_INFO,
    payload,
  };
};

export const setWarning = (payload: string | null) => {
  return {
    type: AppActionTypes.APP_WARNING,
    payload,
  };
};

export const setSuccess = (payload: string | null) => {
  return {
    type: AppActionTypes.APP_SUCCESS,
    payload,
  };
};
