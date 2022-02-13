export interface IUserRequestData {
  name: string,
  email: string,
  password: string
}

export interface IUserCreds {
  email: string,
  password: string
}

export interface ILoginResponseData {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string
}
