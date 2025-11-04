import {Post} from '@/types/domain';
import axiosInstance from './axios';

export const createPost = async (body: Omit<Post, 'id'>): Promise<Post> => {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
};
