import {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import DrawerButton from '@/component/DrawerButton';
import {colors} from '@/constant/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {numbers} from '../../constant/number';
import useUserLocation from '../../hooks/useUserLocation';
import Toast from 'react-native-toast-message';
import useMoveMapView from '../../hooks/useMoveMapView';
import usePermission from '../../hooks/usePermission';
import CustomMarker from '../../component/CustomMarker';
import MapIconButton from '../../component/MapIconButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '../../types/navigation';

type Navigation = StackNavigationProp<MapStackParamList>;

const MapHomeScreen = () => {
  const navigation = useNavigation<Navigation>();
  //노치 부분의 길이를 구하여서 그 길이만큼 맵을 밀어내기 위해 사용
  const inset = useSafeAreaInsets();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();
  const {userLocation, isUserLocationError} = useUserLocation();
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();

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

  const handlePressMarker = (coordinate: LatLng) => {
    moveMapView(coordinate);
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      Alert.alert(
        '추가할 위치를 선택해주세요',
        '지도를 길게 누르면 위치가 선택됩니다.',
      );
      return;
    }

    //선택한 위치를 함께 전달
    navigation.navigate('AddLocation', {
      location: selectLocation,
    });
  };

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
        {[
          {
            id: 1,
            color: colors.PINK_400,
            score: 3,
            coordinate: {
              latitude: 37.5546032365118,
              longitude: 126.98989626020192,
            },
          },
          {
            id: 2,
            color: colors.BLUE_400,
            score: 5,
            coordinate: {
              latitude: 37.5216032365118,
              longitude: 126.98189626020192,
            },
          },
        ].map(marker => (
          <CustomMarker
            key={marker.id}
            color={marker.color}
            score={marker.score}
            coordinate={marker.coordinate}
            onPress={() => handlePressMarker(marker.coordinate)}
          />
        ))}
        {selectLocation && <Marker coordinate={selectLocation} />}
      </MapView>
      <View style={styles.buttonList}>
        <MapIconButton name="plus" onPress={handlePressAddPost} />
        <MapIconButton
          name="location-crosshairs"
          onPress={handlePressUserLocation}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default MapHomeScreen;
