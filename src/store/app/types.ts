import { IMessage, IUser } from "../../interfaces";

export enum AppActionTypes {
  APP_USER = "APP_USER",
  APP_USERS = "APP_USERS",
  APP_LOADING = "APP_LOADING",
  APP_SENTMESSAGES = "APP_SENTMESSAGES",
  APP_RECEIVEDMESSAGES = "APP_RECEIVEDMESSAGES",
  APP_ERROR = "APP_ERROR",
  APP_WARNING = "APP_WARNING",
  APP_INFO = "APP_INFO",
  APP_SUCCESS = "APP_SUCCESS",
  APP_TAB = "AOO_TAB",
}

export interface AppUserAction {
  type: AppActionTypes.APP_USER;
  payload: IUser;
}

export interface AppUsersAction {
  type: AppActionTypes.APP_USERS;
  payload: IUser[];
}

export interface AppLoadingAction {
  type: AppActionTypes.APP_LOADING;
  payload: boolean;
}

export interface AppErrorAction {
  type: AppActionTypes.APP_ERROR;
  payload: string | null;
}

export interface AppInfoAction {
  type: AppActionTypes.APP_INFO;
  payload: string | null;
}

export interface AppSuccessAction {
  type: AppActionTypes.APP_SUCCESS;
  payload: string | null;
}

export interface AppWarningAction {
  type: AppActionTypes.APP_WARNING;
  payload: string | null;
}

export interface AppTabAction {
  type: AppActionTypes.APP_TAB;
  payload: number;
}

export interface AppReceivedMessages {
  type: AppActionTypes.APP_RECEIVEDMESSAGES;
  payload: IMessage[];
}

export interface AppSentMessages {
  type: AppActionTypes.APP_SENTMESSAGES;
  payload: IMessage[];
}

export type AppAction =
  | AppTabAction
  | AppWarningAction
  | AppUserAction
  | AppLoadingAction
  | AppErrorAction
  | AppInfoAction
  | AppSentMessages
  | AppReceivedMessages
  | AppUsersAction
  | AppSuccessAction;
