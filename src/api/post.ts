import {Post} from '@/types/domain';
import axiosInstance from './axios';

export const createPost = async (body: Omit<Post, 'id'>): Promise<Post> => {
  const {data} = await axiosInstance.post('/posts', body);
  console.log(data);
  return data;
};

export const getPost = async (id: number): Promise<Post> => {
  const {data} = await axiosInstance.get(`/posts/${id}`);

  return data;
};

export const getPosts = async (page = 1): Promise<Post[]> => {
  const {data} = await axiosInstance.get(`/posts?page=${page}`);

  return data;
};

export const deletePost = async (id: number) => {
  const {data} = await axiosInstance.delete(`/posts/${id}`);

  return data;
};
