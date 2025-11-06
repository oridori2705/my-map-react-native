import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {ActionSheet} from '@/component/common/ActionSheet';
import {useNavigation} from '@react-navigation/native';
import useMutateDeletePost from '@/hooks/queries/useMutateDeletePost';

interface FeedDetailActionSheetProps {
  id: number;
  isVisible: boolean;
  hideAction: () => void;
}

function FeedDetailActionSheet({
  id,
  isVisible,
  hideAction,
}: FeedDetailActionSheetProps) {
  const navigation = useNavigation();
  const deletePost = useMutateDeletePost();

  const handleDeletePost = () => {
    Alert.alert('삭제하시겠습니까?', '피드와 지도에서 모두 삭제됩니다.', [
      {
        text: '삭제',
        onPress: () =>
          deletePost.mutate(id, {
            onSuccess: () => {
              hideAction();
              navigation.goBack();
            },
          }),
        style: 'destructive',
      },
      {
        text: '취소',
        style: 'cancel',
      },
    ]);
  };
  return (
    <ActionSheet isVisible={isVisible} hideAction={hideAction}>
      <ActionSheet.Container>
        <ActionSheet.Button isDanger onPress={handleDeletePost}>
          삭제하기
        </ActionSheet.Button>
        <ActionSheet.Divider />
        <ActionSheet.Button>수정하기</ActionSheet.Button>
      </ActionSheet.Container>
      <ActionSheet.Container>
        <ActionSheet.Button onPress={hideAction}>취소</ActionSheet.Button>
      </ActionSheet.Container>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({});

export default FeedDetailActionSheet;
