import { alova, bussinessPost, post, type ResponseBody } from '..';
import { type AxiosResponse } from 'axios';

interface LoginOption {
  account: string;
  password: string;
}

export interface LoginResult {
  userName: string;
  avatar: string;
  token: string;
  account: string;
}

export const login = (params: LoginOption) =>
  bussinessPost<LoginResult, LoginOption>('/login', params);
