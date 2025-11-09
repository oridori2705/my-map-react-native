import {useQueryErrorResetBoundary} from '@tanstack/react-query';
import React, {PropsWithChildren} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from './CustomButton';
import {colors} from '@/constant/colors';
import useThemeStore, {Theme} from '../../store/theme';

const ErrorFallback = ({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>잠시 후 다시 시도해주세요.</Text>
      <Text style={styles.descriptionText}>
        요청 사항을 처리하는데 실패했습니다.
      </Text>
      <CustomButton
        label="다시 시도"
        variant="outlined"
        onPress={resetErrorBoundary}
        style={{width: '50%'}}
      />
    </View>
  );
};

function RetryErrorBoundary({children}: PropsWithChildren) {
  const {reset} = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      backgroundColor: colors[theme].WHITE,
    },
    titleText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors[theme].BLACK,
    },
    descriptionText: {
      fontSize: 15,
      color: colors[theme].GRAY_500,
    },
  });

export default RetryErrorBoundary;
