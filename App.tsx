import React from 'react';
import {StyleSheet} from 'react-native';
import RootNavigation from './src/navigations/RootNavigation';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
