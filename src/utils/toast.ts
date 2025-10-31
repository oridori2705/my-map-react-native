// utils/toast.ts
import {Alert} from 'react-native';
import axios from 'axios';

const errorMessages: Record<string, string> = {
  400: '잘못된 요청입니다.',
  401: '인증에 실패했습니다.',
  403: '권한이 없습니다.',
  404: '요청한 리소스를 찾을 수 없습니다.',
  409: '이미 존재하는 데이터입니다.',
  500: '서버 오류가 발생했습니다.',
};

export function showErrorToast(error: any) {
  // axios 네트워크 에러 체크
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      // 서버 응답이 없는 경우 (서버 다운, 네트워크 오류 등)
      Alert.alert(
        '연결 오류',
        '서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.',
      );
      return;
    }

    // 일반적인 서버 응답 에러
    const status = error.response.status;
    const message =
      error.response.data?.message ||
      errorMessages[status] ||
      '오류가 발생했습니다.';

    Alert.alert('오류', message);
    return;
  }

  // axios 에러가 아닌 일반 에러
  Alert.alert('오류', error?.message || '알 수 없는 오류가 발생했습니다.');
}
