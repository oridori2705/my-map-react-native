import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import useAppState from './useAppState';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComeback} = useAppState();
  const [isLoadingLocation, setIsLoadingLocation] = useState(true); // ✅ 추가

  // 위치 가져오는 로직을 함수로 분리
  const fetchUserLocation = () => {
    setIsLoadingLocation(true); // ✅ 요청 시작 시 true

    Geolocation.getCurrentPosition(
      info => {
        setUserLocation({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
        setIsUserLocationError(false);
        setIsLoadingLocation(false); // ✅ 성공 시 false
      },
      () => {
        setIsUserLocationError(true);
        setIsLoadingLocation(false); // ✅ 실패 시도 false
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  };

  // 최초 마운트 시 위치 가져오기
  useEffect(() => {
    fetchUserLocation();
  }, []); // 빈 배열로 최초 1회만 실행

  // 앱이 백그라운드에서 돌아올 때 위치 업데이트
  useEffect(() => {
    if (isComeback) {
      fetchUserLocation();
    }
  }, [isComeback]);

  return {userLocation, isUserLocationError, isLoading: isLoadingLocation};
};

export default useUserLocation;
