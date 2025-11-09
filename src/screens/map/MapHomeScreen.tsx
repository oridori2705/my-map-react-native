import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import DrawerButton from '@/component/common/DrawerButton';
import {colors} from '@/constant/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {numbers} from '@/constant/number';
import useUserLocation from '@/hooks/useUserLocation';
import Toast from 'react-native-toast-message';
import useMoveMapView from '@/hooks/useMoveMapView';
import usePermission from '@/hooks/usePermission';
import CustomMarker from '@/component/common/CustomMarker';
import MapIconButton from '@/component/map/MapIconButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '@/types/navigation';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import useModal from '@/hooks/useModal';
import MarkerModal from '@/component/map/MarkerModal';
import useLocationStore from '@/store/location';
import useFilterStore from '@/store/filter';
import MarkerFilterAction from '../../component/map/MarkerFilertAction';

type Navigation = StackNavigationProp<MapStackParamList>;

const MapHomeScreen = () => {
  const navigation = useNavigation<Navigation>();
  //노치 부분의 길이를 구하여서 그 길이만큼 맵을 밀어내기 위해 사용
  const inset = useSafeAreaInsets();

  //마커 필터링 전역 상태
  const {filters} = useFilterStore();

  // 필터가 하나라도 비활성화되어 있으면 true 반환
  const isFilterActive = Object.values(filters).some(value => !value);

  //선택한 위치 상태
  const {selectLocation, setSelectLocation} = useLocationStore();

  //사용자 위치 가져오기
  const {userLocation, isUserLocationError, isLoading} = useUserLocation();

  //지도 이동 훅
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();

  //마커 데이터 불러오기
  const {data: markers = []} = useGetMarkers({
    select: data =>
      data.filter(
        marker =>
          filters[marker.color] === true &&
          filters[String(marker.score)] === true,
      ),
  });

  //마커 모달 상태(마커 클릭 시 모달)
  const markerModal = useModal();

  //마커 필터링 모달 상태
  const filterAction = useModal();

  //선택한 마커 ID 상태
  const [markerId, setSetMarkerId] = useState<number>();

  const isFocused = useIsFocused();

  //위치 권한 요청
  usePermission('LOCATION');

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해주세요.',
        position: 'bottom',
      });
      return;
    }
    moveMapView(userLocation);
  };
  const handlePressMarker = (id: number, coordinate: LatLng) => {
    setSetMarkerId(id);
    moveMapView(coordinate);
    markerModal.show();
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      Alert.alert(
        '추가할 위치를 선택해주세요',
        '지도를 길게 누르면 위치가 선택됩니다.',
      );
      return;
    }
    navigation.navigate('AddLocation', {
      location: selectLocation,
    });
    setSelectLocation(null);
  };

  if (!isFocused || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.PINK_700} />
      </View>
    );
  }

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, {top: inset.top + 10}]}
        color={colors.WHITE}
      />
      <MapView
        googleMapId="f397ec96980a97c3c96a731d"
        style={styles.container}
        ref={mapRef}
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}
        provider={PROVIDER_GOOGLE}
        onRegionChangeComplete={handleChangeDelta}
        onLongPress={({nativeEvent}) =>
          setSelectLocation(nativeEvent.coordinate)
        }>
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            score={score}
            coordinate={coordinate}
            onPress={() => handlePressMarker(id, coordinate)}
          />
        ))}

        {selectLocation && <Marker coordinate={selectLocation} />}
      </MapView>
      <View style={styles.buttonList}>
        <View>
          <MapIconButton name="filter" onPress={filterAction.show} />
          {isFilterActive && <View style={styles.filterBadge} />}
        </View>

        <MapIconButton
          name="magnifying-glass"
          onPress={() => navigation.navigate('SearchLocation')}
        />
        <MapIconButton name="plus" onPress={handlePressAddPost} />
        <MapIconButton
          name="location-crosshairs"
          onPress={handlePressUserLocation}
        />
      </View>
      <MarkerModal
        isVisible={markerModal.isVisible}
        markerId={Number(markerId)}
        hide={markerModal.hide}
      />
      <MarkerFilterAction
        isVisible={filterAction.isVisible}
        hideAction={filterAction.hide}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 45,
    width: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
  },
  filterBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 4,
    backgroundColor: colors.GREEN_400,
  },
});

export default MapHomeScreen;
