import React, {Suspense} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import FeedList from '@/component/feed/FeedList';
import Indicator from '@/component/common/Indicator';
import RetryErrorBoundary from '@/component/common/RetryErrorBoundary';

const FeedListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RetryErrorBoundary>
        <Suspense fallback={<Indicator size={'large'} />}>
          <FeedList />
        </Suspense>
      </RetryErrorBoundary>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default FeedListScreen;
