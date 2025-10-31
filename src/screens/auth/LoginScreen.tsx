import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';

import CustomButton from '@/component/CustomButton';
import CustomInput from '@/component/CustomInput';
import useForm from '@/hooks/useForm';
import {validateLogin} from '../../utils/validation';
import useAuth from '../../hooks/queries/useAuth';

function LoginScreen() {
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });
  const passwordRef = useRef<TextInput | null>(null);

  const {loginMutation} = useAuth();

  const handleSubmit = () => {
    loginMutation.mutate(login.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <CustomInput
          autoFocus
          placeholder="이메일"
          submitBehavior="submit"
          returnKeyType="next"
          inputMode="email"
          onSubmitEditing={() => passwordRef.current?.focus()}
          touched={login.touched.email}
          error={login.values.email && login.errors.email}
          {...login.getTextInputProps('email')}
        />
        <CustomInput
          ref={passwordRef}
          secureTextEntry
          textContentType="oneTimeCode"
          placeholder="비밀번호"
          returnKeyType="join"
          maxLength={20}
          onSubmitEditing={handleSubmit}
          touched={login.touched.password}
          error={login.values.password && login.errors.password}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
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

export default LoginScreen;
