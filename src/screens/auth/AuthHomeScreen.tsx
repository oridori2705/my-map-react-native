import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Pressable, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthStackParamList} from '../../types/navigation';

type Navigation = StackNavigationProp<AuthStackParamList>;

function AuthHomeScreen() {
  const navigation = useNavigation<Navigation>();

  return (
    <SafeAreaView>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text>로그인으로 이동</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // (선택) 배경색 지정
    paddingTop: 0, // SafeAreaView가 상태바 높이를 자동으로 확보함
  },
});

export default AuthHomeScreen;
