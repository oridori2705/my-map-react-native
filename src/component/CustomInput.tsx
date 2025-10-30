import {colors} from '@/constant/colors';
import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

interface CustomInputProps extends TextInputProps {
  error?: string;
  touched?: boolean;
}

const CustomInput = ({error, touched, ...props}: CustomInputProps) => {
  return (
    <View>
      <TextInput
        style={[styles.input, Boolean(error) && styles.inputError]}
        {...props}
      />
      {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.BLACK,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});

export default CustomInput;
