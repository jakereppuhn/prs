export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber?: string;
}

export interface IUpdateUserDTO {
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  phoneNumber?: string;
}
