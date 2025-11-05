import {useMutation} from '@tanstack/react-query';

import {createPost} from '@/api/post';
import {UseMutationCustomOptions} from '@/types/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constant/key';
import {Marker} from '../../types/domain';

const useMutateCreatePost = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      console.log('Post created successfully:', newPost);

      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        existingMarkers => {
          const newMarker = {
            id: newPost.id,
            latitude: newPost.latitude,
            longitude: newPost.longitude,
            color: newPost.color,
            score: newPost.score,
          };
          console.log(
            existingMarkers ? [...existingMarkers, newMarker] : [newMarker],
          );
          return existingMarkers
            ? [...existingMarkers, newMarker]
            : [newMarker];
        },
      );
    },
    ...mutationOptions,
  });
};

export default useMutateCreatePost;
