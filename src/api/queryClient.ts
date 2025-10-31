import {QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    // 기본적으로 요청에 실패하면 3번의 요청을 한다. 우리는 사용자에게 즉각적인 피드백을 위해 비활성화
    queries: {
      retry: false,
      staleTime: 60 * 1000,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
