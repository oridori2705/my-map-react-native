import {NavigatorScreenParams} from '@react-navigation/native';
import {LatLng} from 'react-native-maps';

export type MapStackParamList = {
  MapHome: undefined;
  AddLocation: {location: LatLng};
  SearchLocation: undefined;
};

export type AuthStackParamList = {
  AuthHome: undefined;
  Login: undefined;
  Signup: undefined;
  KakaoLogin: undefined;
};

export type FeedStackParamList = {
  FeedList: undefined;
  FeedDetail: {id: number};
  FeedFavorite: undefined;
  ImageZoom: {id?: number; index: number};
  EditLocation: {id: number};
};

export type SettingStackParamList = {
  SettingHome: undefined;
  EditProfile: undefined;
};

export type MainDrawerParamList = {
  Map: NavigatorScreenParams<MapStackParamList>;
  Feed: NavigatorScreenParams<FeedStackParamList>;
  Calendar: undefined;
  Setting: undefined;
};

declare global {
  namespace ReactNavigation {
    //React Navigation의 내부에서는 RootParamList 인터페이스를 전역적으로 참조
    //“현재 네비게이션 트리의 모든 가능한 경로와 파라미터 타입”을 알아낸다.
    //그리고 MainDrawerParamList타입을 상속시켜서 확장
    interface RootParamList extends MainDrawerParamList {}
  }
}
