import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStaticNavigation} from '@react-navigation/native';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import {colors} from '../constant/colors';
import {FeedStack} from './FeedNavigation';
import {MapStack} from './MapNavigation';
import DrawerButton from '../component/DrawerButton';
import CustomDrawerContent from '../component/CustomDrawerContent';

const MainDrawer = createDrawerNavigator({
  screenOptions: {
    drawerStyle: {
      width: '60%',
      backgroundColor: colors.WHITE,
    },
    drawerLabelStyle: {
      fontWeight: '600',
    },
    drawerItemStyle: {
      borderRadius: 5,
    },
    drawerType: 'front',
    drawerActiveTintColor: colors.WHITE,
    drawerInactiveTintColor: colors.GRAY_500,
    drawerActiveBackgroundColor: colors.PINK_700,
    drawerInactiveBackgroundColor: colors.GRAY_100,
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
  },
  screens: {
    Map: {
      screen: MapStack,
      options: {
        title: '홈',
        headerShown: false,
      },
    },
    Feed: {
      screen: FeedStack,
      options: {
        title: '피드',
        headerShown: false,
      },
    },
    Calendar: {
      screen: CalendarScreen,
      options: {
        title: '캘린더',
        headerLeft: () => <DrawerButton />,
      },
    },
  },
  drawerContent: props => <CustomDrawerContent {...props} />,
});

const DrawerNavigation = createStaticNavigation(MainDrawer);

export default DrawerNavigation;
