import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import useUserLocation from '../../hooks/useUserLocation';
import useSearchLocation from '../../hooks/useSearchLocation';
import SearchInput from '../../component/map/SearchInput';
import SearchRegionResult from './SearchRegionResult';

const SearchLocationScreen = () => {
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const {userLocation} = useUserLocation();
  const {regionInfo, isLoading, searchLocation} = useSearchLocation();

  const handleSubmitKeyword = () => {
    searchLocation(keyword, userLocation);
  };

  return (
    <View style={styles.container}>
      <SearchInput
        value={keyword}
        onChangeText={setKeyword}
        onSubmit={handleSubmitKeyword}
        placeholder="검색할 장소를 입력해주세요."
      />
      {isLoading && <ActivityIndicator />}
      <SearchRegionResult regionInfo={regionInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
});

export default SearchLocationScreen;
