import {getEncryptStorage} from '@/utils/encryptStorage';
import axiosInstance from './axios';
import {Profile} from '@/types/domain';

type RequsetUser = {
  email: string;
  password: string;
};

export const postSignup = async ({
  email,
  password,
}: RequsetUser): Promise<void> => {
  await axiosInstance.post('/auth/signup', {email, password});
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

export const postLogin = async ({
  email,
  password,
}: RequsetUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });

  return data;
};

export const getProfile = async (): Promise<Profile> => {
  const {data} = await axiosInstance.get('/auth/me');

  return data;
};

export const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');

  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

export const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

type RequestProfile = Pick<Profile, 'nickname' | 'imageUri'>;

export const editProfile = async (body: RequestProfile): Promise<Profile> => {
  const {data} = await axiosInstance.patch('/auth/me', body);

  return data;
};
