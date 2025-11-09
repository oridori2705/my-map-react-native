import DrawerButton from '@/component/common/DrawerButton';
import {colors} from '@/constant/colors';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import useThemeStore from '../store/theme';

const Stack = createStackNavigator();

export const SettingStack = () => {
  const {theme} = useThemeStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: colors[theme].BLACK,
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: colors[theme].GRAY_500,
        },
        headerTitleStyle: {
          fontSize: 16,
        },
      }}>
      <Stack.Screen
        name="SettingHome"
        component={SettingHomeScreen}
        options={{
          title: '설정',
          headerLeft: () => <DrawerButton />,
          cardStyle: {
            backgroundColor: colors[theme].GRAY_100,
          },
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: '프로필 수정',
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        }}
      />
    </Stack.Navigator>
  );
};
