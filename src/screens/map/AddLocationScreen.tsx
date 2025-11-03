import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {MapStackParamList} from '@/types/navigation';
import CustomInput from '@/component/CustomInput';
import CustomButton from '@/component/CustomButton';
import useForm from '@/hooks/useForm';
import {validateAddPost} from '@/utils/validation';
import useGetAddress from '@/hooks/useGetAddress';
import DatePicker from 'react-native-date-picker';
import {getDateWithSeparator} from '@/utils/date';
import MarkerColorInput from '@/component/MarkerColorInput';
import {colors} from '@/constant/colors';
import FixedBottomCTA from '@/component/FixedBottomCTA';
import StarRating from '../../component/StarRating';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

const AddLocationScreen = ({route}: Props) => {
  const {location} = route.params;
  const inset = useSafeAreaInsets();
  const address = useGetAddress(location);
  const postForm = useForm({
    initialValue: {
      title: '',
      description: '',
      date: new Date(),
      color: colors.PINK_400,
      score: 3,
    },
    validate: validateAddPost,
  });

  const [openDate, setOpenDate] = useState(false);

  const handleSubmit = () => {
    console.log('postForm.values', postForm.values);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {paddingBottom: inset.bottom + 100},
        ]}>
        <CustomInput disabled value={address} />
        <CustomButton
          variant="outlined"
          label={getDateWithSeparator(postForm.values.date, '. ')}
          onPress={() => setOpenDate(true)}
        />
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
        <MarkerColorInput
          color={postForm.values.color}
          onChangeColor={value => postForm.onChange('color', value)}
        />
        <StarRating
          score={postForm.values.score}
          onChangeScore={value => postForm.onChange('score', value)}
        />
        <DatePicker
          modal
          locale="ko"
          mode="date"
          title={null}
          cancelText="취소"
          confirmText="완료"
          date={postForm.values.date}
          open={openDate}
          onConfirm={date => {
            postForm.onChange('date', date);
            setOpenDate(false);
          }}
          onCancel={() => setOpenDate(false)}
        />
      </ScrollView>
      <FixedBottomCTA label="저장" onPress={handleSubmit} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
});

export default AddLocationScreen;
