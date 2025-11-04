import {getMarkers} from '@/api/marker';

import {UseQueryCustomOptions} from '@/types/api';
import {Marker} from '@/types/domain';
import {useQuery} from '@tanstack/react-query';
import {queryKeys} from '@/constant/key';

const useGetMarkers = (queryOptions?: UseQueryCustomOptions<Marker[]>) => {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
  });
};

export default useGetMarkers;
