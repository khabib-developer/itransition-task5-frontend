export interface IUser {
  id: number;
  username: string;
  messages: IMessage[];
}

export interface IMessage {
  id?: number;
  text: string;
  title: string;
  sender: number;
  recipient: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface wsmsg {
  payload: string;
  type: string;
}

export enum type {
  connect = "connect",
  message = "message",
  newUser = "newUser",
}
