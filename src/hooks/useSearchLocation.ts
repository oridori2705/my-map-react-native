import axios from 'axios';
import {useCallback, useState} from 'react';
import Config from 'react-native-config';
import {LatLng} from 'react-native-maps';

type Meta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
  same_name: {
    region: string[];
    keyword: string;
    selected_region: string;
  };
};

export type RegionInfo = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

type RegionResponse = {
  meta: Meta;
  documents: RegionInfo[];
};

const useSearchLocation = () => {
  const [regionInfo, setRegionInfo] = useState<RegionInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalLength, setTotalLength] = useState(0);

  const searchLocation = useCallback(
    async (keyword: string, location: LatLng, page = 1) => {
      // 빈 키워드는 검색하지 않음
      if (!keyword.trim()) {
        setRegionInfo([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const {data} = await axios.get<RegionResponse>(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&y=${location.latitude}&x=${location.longitude}&page=${page}`,
          {
            headers: {
              Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
            },
          },
        );
        setTotalLength(data.meta.pageable_count);
        setRegionInfo(data.documents);
      } catch (err) {
        setRegionInfo([]);
        setError('검색 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    regionInfo,
    isLoading,
    error,
    searchLocation,
    totalLength,
  };
};

export default useSearchLocation;
