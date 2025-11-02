import {useRef} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import DrawerButton from '@/component/DrawerButton';
import {colors} from '@/constant/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {numbers} from '../../constant/number';
import useUserLocation from '../../hooks/useUserLocation';
import {showErrorToast} from '../../utils/toast';

const MapHomeScreen = () => {
  //노치 부분의 길이를 구하여서 그 길이만큼 맵을 밀어내기 위해 사용
  const inset = useSafeAreaInsets();

  const mapRef = useRef<MapView | null>(null);
  const {userLocation, isUserLocationError} = useUserLocation();

  const moveMapView = (coordinate: LatLng) => {
    //map을 이동시키는 로직
    mapRef.current?.animateToRegion({
      ...coordinate,
      ...numbers.INITIAL_DELTA,
    });
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      showErrorToast('위치 권한을 허용해주세요.');
      return;
    }

    moveMapView(userLocation);
  };

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, {top: inset.top + 10}]}
        color={colors.WHITE}
      />
      <MapView
        googleMapId="b5551905620617d6819d062f"
        style={styles.container}
        ref={mapRef}
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}
        provider={PROVIDER_GOOGLE}
      />
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <FontAwesome6
            name="location-crosshairs"
            iconStyle="solid"
            size={25}
            color={colors.WHITE}
          />
        </Pressable>
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
