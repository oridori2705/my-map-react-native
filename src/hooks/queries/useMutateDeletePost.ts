import {useMutation} from '@tanstack/react-query';
import {deletePost} from '@/api/post';
import queryClient from '@/api/queryClient';
import {UseMutationCustomOptions} from '@/types/api';
import {queryKeys} from '@/constant/key';

const useMutateDeletePost = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
    },
    ...mutationOptions,
  });
};

export default useMutateDeletePost;
