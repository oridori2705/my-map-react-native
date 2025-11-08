import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constant/colors';

interface PaginationProps {
  pageParam: number;
  fetchPrevPage: () => void;
  fetchNextPage: () => void;
  goToPage: (page: number) => void;
  totalLength: number;
  pagesToShow?: number; // 표시할 페이지 번호 개수 (기본값: 5)
}

function Pagination({
  pageParam,
  fetchNextPage,
  fetchPrevPage,
  goToPage,
  totalLength,
  pagesToShow = 5,
}: PaginationProps) {
  const totalPages = Math.ceil(totalLength / pagesToShow);
  const halfPagesToShow = Math.floor(pagesToShow / 2);

  const calculateStartPage = () => {
    if (pageParam <= halfPagesToShow) {
      return 1;
    }
    if (pageParam + halfPagesToShow > totalPages) {
      return Math.max(totalPages - pagesToShow + 1, 1);
    }
    return Math.max(pageParam - halfPagesToShow, 1);
  };

  const calculateEndPage = (startPage: number) => {
    return Math.min(startPage + pagesToShow - 1, totalPages);
  };

  const startPage = calculateStartPage();
  const endPage = calculateEndPage(startPage);
  const pages = Array.from(
    {length: endPage - startPage + 1},
    (_, i) => startPage + i,
  );

  return (
    <View style={styles.container}>
      {/* 이전 페이지 버튼 */}
      <Pressable
        style={styles.pageButton}
        disabled={pageParam <= 1}
        onPress={fetchPrevPage}>
        <Ionicons
          name="chevron-back"
          size={15}
          color={pageParam > 1 ? colors.BLACK : colors.GRAY_300}
        />
        <Text style={pageParam > 1 ? styles.pageText : styles.disabledText}>
          이전
        </Text>
      </Pressable>

      {/* 페이지 번호들 */}
      <View style={styles.pageNumbersContainer}>
        {pages.map(page => {
          const isCurrentPage = page === pageParam;

          return (
            <Pressable
              key={page}
              style={[
                styles.pageNumberButton,
                isCurrentPage && styles.currentPageButton,
              ]}
              onPress={() => goToPage(page)}>
              <Text
                style={[
                  styles.pageNumberText,
                  isCurrentPage && styles.currentPageText,
                ]}>
                {page}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* 다음 페이지 버튼 */}
      <Pressable
        style={styles.pageButton}
        disabled={totalLength === 0}
        onPress={fetchNextPage}>
        <Text
          style={
            pageParam < totalPages ? styles.pageText : styles.disabledText
          }>
          다음
        </Text>
        <Ionicons
          name="chevron-forward"
          size={15}
          color={pageParam < totalPages ? colors.BLACK : colors.GRAY_300}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 32,
    paddingHorizontal: 8,
  },
  pageText: {
    fontSize: 14,
    color: colors.BLACK,
    fontWeight: '500',
  },
  disabledText: {
    fontSize: 14,
    color: colors.GRAY_300,
  },
  pageNumbersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pageNumberButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  currentPageButton: {
    backgroundColor: colors.BLACK,
  },
  pageNumberText: {
    fontSize: 14,
    color: colors.BLACK,
    fontWeight: '500',
  },
  currentPageText: {
    color: colors.WHITE,
    fontWeight: '700',
  },
});
export default Pagination;
