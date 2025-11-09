import React, {Suspense} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FeedFavoriteList from '@/component/feed/FeedFavoriteList';
import Indicator from '@/component/common/Indicator';

const FeedFavoriteScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Suspense fallback={<Indicator size={'large'} />}>
        <FeedFavoriteList />
      </Suspense>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default FeedFavoriteScreen;
