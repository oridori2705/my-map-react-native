// api/axios.ts
import axios from 'axios';
import {Platform} from 'react-native';
import {showErrorToast} from '../utils/toast';

export const baseUrls = {
  android: 'http://10.0.2.2:3030',
  ios: 'http://localhost:3030',
};

const axiosInstance = axios.create({
  baseURL: Platform.OS === 'android' ? baseUrls.android : baseUrls.ios,
  timeout: 5000,
  timeoutErrorMessage: '서버 연결에 실패했습니다.',
});

// Response Interceptor: 전역 에러 처리
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // 네트워크 에러인 경우
    if (!error.response) {
      showErrorToast(error);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
