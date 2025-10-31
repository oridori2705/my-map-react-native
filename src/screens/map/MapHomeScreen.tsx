import React from 'react';
import {StyleSheet, Text} from 'react-native';

import DrawerButton from '@/component/DrawerButton';
import useAuth from '@/hooks/queries/useAuth';
import {SafeAreaView} from 'react-native-safe-area-context';

function MapHomeScreen() {
  const {logoutMutation} = useAuth();

  return (
    <SafeAreaView>
      <Text>MapHomeScreen</Text>
      <DrawerButton />
      <Text onPress={() => logoutMutation.mutate(null)}>로그아웃</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default MapHomeScreen;
