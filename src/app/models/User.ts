// Type
export type Signup = {
  userId: number;
  emailId: string;
  password: string;
  fullName: string;
  mobileNo: string;
};

export type Login = {
  emailId: string;
  password: string;
};

// InterFace
export interface IUserInfo {
  userId: number;
  emailId: string;
  password: string;
  createdDate: string;
  projectName: string;
  fullName: string;
  mobileNo: string;
  extraId: number;
}
