import {SafeAreaView, StyleSheet, View} from 'react-native';

import CustomButton from '@/component/CustomButton';
import CustomInput from '@/component/CustomInput';
import useForm from '@/hooks/useForm';
import {validateSignup} from '../../utils/validation';

function SignupScreen() {
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <CustomInput
          placeholder="이메일"
          touched={signup.touched.email}
          error={signup.values.email && signup.errors.email}
          {...signup.getTextInputProps('email')}
        />
        <CustomInput
          secureTextEntry
          textContentType="oneTimeCode"
          placeholder="비밀번호"
          touched={signup.touched.password}
          error={signup.values.password && signup.errors.password}
          {...signup.getTextInputProps('password')}
        />
        <CustomInput
          secureTextEntry
          placeholder="비밀번호 확인"
          touched={signup.touched.passwordConfirm}
          error={signup.values.passwordConfirm && signup.errors.passwordConfirm}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" variant="filled" size="large" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default SignupScreen;
