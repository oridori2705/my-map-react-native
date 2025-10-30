import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FeedStackParamList} from '../../types/navigation';

type Props = StackScreenProps<FeedStackParamList, 'FeedDetail'>;

const FeedDetailScreen = ({route}: Props) => {
  const {id} = route.params;

  return (
    <SafeAreaView>
      <Text>FeedDetailScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default FeedDetailScreen;
