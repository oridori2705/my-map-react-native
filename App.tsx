import React from 'react';
import {StyleSheet} from 'react-native';
import RootNavigation from './src/navigations/RootNavigation';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import {toastConfig} from './src/component/toast';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
