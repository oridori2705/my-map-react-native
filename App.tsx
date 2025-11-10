import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import RootNavigation from './src/navigations/RootNavigation';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import {toastConfig} from './src/component/common/toast';
import BootSplash from 'react-native-bootsplash';
import Toast from 'react-native-toast-message';

function App() {
  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    prepare().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
