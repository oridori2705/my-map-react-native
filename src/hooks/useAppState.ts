import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

/**
 * 앱의 포그라운드/백그라운드 전환 상태를 감지하는 커스텀 훅
 * - 앱이 백그라운드 → 다시 활성화(포그라운드)될 때 `isComeback`을 true로 설정
 * - 앱이 활성화 → 백그라운드로 갈 때 `isComeback`을 false로 설정
 */
const useAppState = () => {
  // 현재 앱 상태를 저장할 ref (초기값: AppState.currentState)
  // AppState.currentState는 'active', 'background', 'inactive' 중 하나의 문자열
  const appState = useRef(AppState.currentState);

  // comeback 상태를 저장 (true면 앱이 다시 돌아왔음을 의미)
  const [isComeback, setIsComeback] = useState(false);

  useEffect(() => {
    // AppState 변경 감지 이벤트 등록
    const subscription = AppState.addEventListener('change', nextAppState => {
      /**
       * appState.current는 이전 상태, nextAppState는 새 상태
       *
       * 예시 흐름:
       *  - 앱이 백그라운드에 있다가(active|inactive|background 중) 다시 실행되면 nextAppState === 'active'
       *  - 이 경우 "복귀"로 판단하고 setIsComeback(true)
       */
      if (
        appState.current.match(/inactive|background/) && // 이전 상태가 비활성 상태였고
        nextAppState === 'active' // 현재 상태가 활성 상태라면
      ) {
        setIsComeback(true);
      }

      /**
       * 반대로 앱이 현재 활성 상태에서 백그라운드로 가면
       * 다시 false로 설정하여 comeback 상태를 리셋
       */
      if (appState.current.match(/active/) && nextAppState === 'background') {
        setIsComeback(false);
      }

      // 최신 앱 상태를 ref에 저장
      appState.current = nextAppState;
    });

    // cleanup: 이벤트 리스너 제거
    return () => {
      subscription.remove();
    };
  }, []);

  // comeback 여부를 반환
  return {isComeback};
};

export default useAppState;
