import {MutationFunction, useMutation, useQuery} from '@tanstack/react-query';
import queryClient from '@/api/queryClient';
import {removeEncryptStorage, setEncryptStorage} from '@/utils/encryptStorage';
import {useEffect} from 'react';
import {Profile} from '@/types/domain';
import {
  appleLogin,
  editProfile,
  getAccessToken,
  getProfile,
  kakaoLogin,
  logout,
  postLogin,
  postSignup,
  ResponseToken,
} from '@/api/auth';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/api';
import {removeHeader, setHeader} from '@/utils/header';
import {numbers} from '@/constant/number';
import {queryKeys, storageKeys} from '../../constant/key';
import Toast from 'react-native-toast-message';

/**
 * 회원가입 훅
 * - React Query의 useMutation을 이용해 postSignup API 호출
 * - mutationOptions를 인자로 받아 커스터마이징 가능
 */
const useSignup = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postSignup, // 회원가입 요청 함수
    throwOnError: error => Number(error.response?.status) >= 500, // 500번대 에러는 throw
    onError: error => {
      Toast.show({
        type: 'error',
        text1: error.response?.data?.message || '회원가입에 실패했습니다.',
        position: 'bottom',
      });
    },
    ...mutationOptions, // 외부에서 전달된 옵션 병합
  });
};

/**
 * 로그인 훅
 * - 로그인 성공 시 accessToken을 헤더에 설정
 * - refreshToken을 안전하게 로컬 스토리지(EncryptStorage)에 저장
 * - 로그인 이후 accessToken 자동 갱신 쿼리를 강제 실행
 */
const useLogin = <T>(
  loginAPI: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: async ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      await setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
    },
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
};

function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(postLogin, mutationOptions);
}

function useKakaoLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(kakaoLogin, mutationOptions);
}
function useAppleLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(appleLogin, mutationOptions);
}

/**
 * refreshToken을 이용해 주기적으로 accessToken을 갱신하는 훅
 * - 일정 시간마다(getAccessToken API를) 호출해 accessToken 재발급
 * - 성공 시 헤더와 EncryptStorage에 토큰 갱신
 * - 실패 시 저장된 토큰 제거 (로그아웃 상태로 간주)
 */
const useGetRefreshToken = () => {
  const {data, isSuccess, isError} = useQuery({
    queryKey: ['auth', 'getAccessToken'], // accessToken 갱신용 쿼리 키
    queryFn: getAccessToken, // refreshToken으로 accessToken 재발급 API
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME, // 토큰 유효 시간 동안은 재요청 안 함
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME, // 주기적으로 자동 재요청
  });

  // 토큰 갱신 성공 시: 새 accessToken & refreshToken 설정
  useEffect(() => {
    (async () => {
      if (isSuccess) {
        setHeader('Authorization', `Bearer ${data.accessToken}`);
        await setEncryptStorage('refreshToken', data.refreshToken);
      }
    })();
  }, [isSuccess, data]);

  // 갱신 실패 시: 헤더 및 저장된 토큰 삭제 (로그아웃 처리)
  useEffect(() => {
    (async () => {
      if (isError) {
        removeHeader('Authorization');
        await removeEncryptStorage('refreshToken');
      }
    })();
  }, [isError]);

  return {isSuccess, isError};
};

/**
 * 사용자 프로필 정보를 가져오는 훅
 * - accessToken이 유효한 상태에서 getProfile API를 호출
 * - 로그인 성공 이후 유저 정보를 불러오는 데 사용
 */
const useGetProfile = (queryOptions?: UseQueryCustomOptions<Profile>) => {
  return useQuery({
    queryFn: getProfile, // 프로필 조회 API
    queryKey: ['auth', 'getProfile'], // 캐싱용 쿼리 키
    ...queryOptions, // 옵션 병합 (enabled 등)
  });
};

//로그아웃
const useLogout = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: logout,
    onError: error => {
      Toast.show({
        type: 'error',
        text1: error.response?.data?.message || '로그아웃에 실패했습니다.',
        position: 'bottom',
      });
    },
    onSuccess: async () => {
      removeHeader('Authorization');
      await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      //쿼리를 처음 상태로 되돌리고, 다음에 다시 호출되면 새로 데이터를 가져와라.
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
};

//프로필 수정

const useUpdateProfile = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
};

const useAuth = () => {
  const signupMutation = useSignup();
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const appleLoginMutation = useAppleLogin();
  const refreshTokenQuery = useGetRefreshToken();
  const {data, isSuccess: isLogin} = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const logoutMutation = useLogout();
  const profileMutation = useUpdateProfile();

  return {
    auth: {
      id: data?.id || '',
      nickname: data?.nickname || '',
      email: data?.email || '',
      imageUri: data?.imageUri || '',
    },
    signupMutation,
    loginMutation,
    kakaoLoginMutation,
    appleLoginMutation,
    isLogin,
    logoutMutation,
    profileMutation,
  };
};

export default useAuth;
