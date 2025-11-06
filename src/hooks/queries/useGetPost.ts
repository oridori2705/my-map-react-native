import {getPost} from '@/api/post';
import {queryKeys} from '@/constant/key';
import {UseQueryCustomOptions} from '@/types/api';
import {Post} from '@/types/domain';
import {useQuery} from '@tanstack/react-query';

const useGetPost = (
  id?: number,
  queryOptions?: UseQueryCustomOptions<Post>,
) => {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id),
    ...queryOptions,
  });
};

export default useGetPost;
