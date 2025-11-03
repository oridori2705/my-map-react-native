import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {MapStackParamList} from '@/types/navigation';
import CustomInput from '@/component/CustomInput';
import CustomButton from '@/component/CustomButton';
import useForm from '@/hooks/useForm';
import {validateAddPost} from '@/utils/validation';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

function AddLocationScreen({route}: Props) {
  const {location} = route.params;

  const postForm = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomInput />
      <CustomButton variant="outlined" label="날짜 선택" />
      <CustomInput
        placeholder="제목을 입력하세요."
        error={postForm.errors.title}
        touched={postForm.touched.title}
        {...postForm.getTextInputProps('title')}
      />
      <CustomInput
        multiline
        placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
        error={postForm.errors.description}
        touched={postForm.touched.description}
        {...postForm.getTextInputProps('description')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
});

export default AddLocationScreen;
