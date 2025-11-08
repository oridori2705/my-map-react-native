import React, {useState} from 'react';
import {ActivityIndicator, Keyboard, StyleSheet, View} from 'react-native';
import useUserLocation from '../../hooks/useUserLocation';
import useSearchLocation from '../../hooks/useSearchLocation';
import SearchInput from '../../component/map/SearchInput';
import SearchRegionResult from '../../component/map/SearchRegionResult';
import Pagination from '../../component/map/Pagination';

const SearchLocationScreen = () => {
  const [keyword, setKeyword] = useState('');
  const {userLocation} = useUserLocation();
  const [pageParam, setPageParam] = useState(1);

  const {regionInfo, isLoading, totalLength, searchLocation} =
    useSearchLocation();

  const fetchNextPage = () => {
    setPageParam(prev => prev + 1);
    searchLocation(keyword, userLocation, pageParam + 1);
  };

  const fetchPrevPage = () => {
    setPageParam(prev => prev - 1);
    searchLocation(keyword, userLocation, pageParam - 1);
  };

  const fetchPage = (page: number) => {
    setPageParam(page);
    searchLocation(keyword, userLocation, page);
  };

  const handleSubmitKeyword = () => {
    searchLocation(keyword, userLocation);
    setPageParam(1);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={setKeyword}
        onSubmit={handleSubmitKeyword}
        placeholder="검색할 장소를 입력해주세요."
      />
      {isLoading && <ActivityIndicator />}
      <SearchRegionResult regionInfo={regionInfo} />
      <Pagination
        goToPage={fetchPage}
        pageParam={pageParam}
        fetchNextPage={fetchNextPage}
        fetchPrevPage={fetchPrevPage}
        totalLength={totalLength}
      />
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
