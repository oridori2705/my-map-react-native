import {createStackNavigator} from '@react-navigation/stack';
import FeedListScreen from '@/screens/feed/FeedListScreen';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import EditLocationScreen from '@/screens/feed/EditLocationScreen';
import {colors} from '@/constant/colors';
import DrawerButton from '@/component/common/DrawerButton';
import ImageZoomScreen from '@/screens/feed/ImageZoomScreen';
import {Pressable} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

export const FeedStack = createStackNavigator({
  screenOptions: {
    headerTitleAlign: 'center',
    headerBackButtonDisplayMode: 'minimal',
    headerTintColor: colors.BLACK,
    headerStyle: {
      backgroundColor: colors.WHITE,
      shadowColor: colors.GRAY_500,
    },
    headerTitleStyle: {
      fontSize: 16,
    },
    cardStyle: {
      backgroundColor: colors.WHITE,
    },
  },
  screens: {
    FeedList: {
      screen: FeedListScreen,
      options: ({navigation}) => ({
        title: '피드',
        headerLeft: () => <DrawerButton />,
        headerRight: () => (
          <Pressable
            style={{paddingHorizontal: 12}}
            onPress={() => navigation.navigate('FeedFavorite')}>
            <Ionicons name="star" size={25} color={colors.PINK_700} />
          </Pressable>
        ),
      }),
    },
    FeedDetail: {
      screen: FeedDetailScreen,
      options: {
        headerShown: false,
      },
    },
    FeedFavorite: {
      screen: FeedFavoriteScreen,
      options: ({navigation}) => ({
        title: '즐겨찾기',
        headerLeft: () => (
          <Ionicons
            name="chevron-back"
            size={30}
            color={colors.BLACK}
            onPress={() => navigation.navigate('FeedList')}
          />
        ),
      }),
    },
    EditLocation: {
      screen: EditLocationScreen,
      options: {
        title: '장소 수정',
      },
    },
    ImageZoom: {
      screen: ImageZoomScreen,
      options: {
        headerShown: false,
      },
    },
  },
});
