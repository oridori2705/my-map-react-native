import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MapHomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text>MapHomeScreen</Text>
      <Pressable onPress={() => navigation.navigate('Feed')}>
        <Text>Feed</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default MapHomeScreen;
