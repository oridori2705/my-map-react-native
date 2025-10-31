import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

/**
 * 서버에서 발생하는 에러 응답 타입을 정의
 * AxiosError 제네릭의 형태로, 서버가 다음과 같은 형식의 에러 응답을 보낸다고 가정:
 * {
 *   statusCode: number; // HTTP 상태 코드 (ex: 400, 401, 404)
 *   message: string;    // 에러 메시지
 *   error: string;      // 에러 타입 또는 이름
 * }
 */
type ResponseError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

/**
 * React Query의 useMutation 훅에서 사용할 커스텀 옵션 타입
 *
 * - UseMutationOptions 기본 제네릭 구조:
 *   UseMutationOptions<TData, TError, TVariables, TContext>
 *
 * - 여기서는:
 *   • TError를 Axios 기반의 ResponseError로 고정
 *   • mutationFn은 useMutation 훅 내부에서 직접 지정하므로 제외(Omit)
 *
 * 즉, "mutationFn 제외 + ResponseError 고정"된 옵션 타입을 만든 것
 *
 * 예: useMutation({ mutationFn: postLogin }) 사용할 때
 *     옵션 객체의 타입을 자동으로 추론하면서 에러 타입은 ResponseError로 고정됨
 */
type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

/**
 * React Query의 useQuery 훅에서 사용할 커스텀 옵션 타입
 *
 * - UseQueryOptions 기본 제네릭 구조:
 *   UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
 *
 * - 여기서는:
 *   • TError를 ResponseError로 고정 (Axios 기반 서버 에러)
 *   • queryKey는 훅 내부에서 지정하므로 제외(Omit)
 *
 * 즉, "queryKey 제외 + ResponseError 고정"된 옵션 타입을 만든 것
 *
 * 예: useQuery({
 *       queryKey: ['user', 'profile'],
 *       queryFn: getProfile,
 *       onSuccess: ...
 *     })
 *     이런 구조에서 queryKey는 내부에서 정해지므로, 타입 정의에선 제외
 */
type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryKey'
>;

/**
 * export:
 *  - ResponseError: Axios 기반 에러 응답 타입
 *  - UseMutationCustomOptions: mutationFn을 제외한 useMutation 옵션 타입
 *  - UseQueryCustomOptions: queryKey를 제외한 useQuery 옵션 타입
 */
export type {ResponseError, UseMutationCustomOptions, UseQueryCustomOptions};
