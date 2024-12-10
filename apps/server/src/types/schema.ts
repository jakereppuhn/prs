import { WSMessageType } from "./enums";

export interface IQueryParams {
  filter?: Record<string, any>;
  sort?: string;
  page?: number;
  pageSize?: number;
  fields?: string[];
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWSMessage {
  type: WSMessageType;
  payload: any;
  timestamp: Date;
}
