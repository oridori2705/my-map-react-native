# 🗺️ 위치 기반 장소 기록 앱

> React Native로 개발한 구글 맵 기반 장소 기록 및 관리 애플리케이션

## 📋 목차
- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [핵심 구현 사항](#-핵심-구현-사항)
- [성능 최적화](#-성능-최적화)
- [트러블슈팅](#-트러블슈팅)

## 📱 프로젝트 소개

사용자가 방문한 장소를 지도에 마커로 표시하고, 사진과 함께 기록을 남길 수 있는 모바일 애플리케이션입니다. 
구글 맵 API와 카카오 맵 API를 활용하여 실제 장소 검색과 위치 기반 서비스를 제공하며, 
직관적인 UI/UX로 누구나 쉽게 자신만의 장소 컬렉션을 만들 수 있습니다.

## ✨ 주요 기능

### 🔐 인증
- **소셜 로그인**: 카카오 로그인 연동
- **자체 회원가입/로그인**: 이메일 기반 인증
- **자동 토큰 갱신**: TanStack Query를 활용한 accessToken 자동 갱신 (만료 3분 전)

<img width="408" height="905" alt="로그인 화면" src="https://github.com/user-attachments/assets/109f1985-b166-4a0f-bc3e-df89e1803604" />


### 🗺️ 메인 맵 화면
- **구글 맵 통합**: 실시간 위치 기반 지도 표시
- **장소 등록**: 지도 길게 누르기로 마커 생성 및 장소 정보 입력
- **마커 필터링**: 점수별, 색상별 필터링 기능
- **마커 클러스터링**: `react-native-map-clustering`으로 마커 그룹화
- **마커 모달**: 마커 클릭 시 간단한 정보 표시 및 상세 페이지 이동

<img width="404" height="912" alt="메인 화면" src="https://github.com/user-attachments/assets/4951d60e-52e2-444a-987e-45692309bad5" />

https://github.com/user-attachments/assets/213df6ab-19fd-4eb7-ba94-5a654d12bbcd


https://github.com/user-attachments/assets/3d6e897f-018c-4d6c-b57e-c212151dcf09



### 🔍 검색 화면
- **카카오 맵 API 연동**: 실제 장소 검색 기능
- **페이지네이션**: 검색 결과 효율적 로드
- **원클릭 장소 등록**: 검색 결과 클릭 시 메인 화면 이동 및 장소 등록 지원

https://github.com/user-attachments/assets/85f09f03-b0f7-489a-a9aa-c419cbdb456f


### 📝 피드 관리
- **피드 리스트**: 등록한 모든 장소 목록 조회
- **피드 상세**: 장소 정보, 사진, 메모 등 상세 정보 표시
- **이미지 캐러셀**: 여러 장의 사진 슬라이드 뷰
- **즐겨찾기**: 별표 아이콘으로 중요한 장소 북마크


https://github.com/user-attachments/assets/acd68586-f0ba-49f7-be50-85a57380562a



### 📅 캘린더
- **날짜별 장소 조회**: 등록한 날짜 기준 장소 목록
- **빠른 날짜 이동**: "오늘" 버튼으로 현재 날짜 이동
- **맵 연동**: 장소 클릭 시 메인 화면 지도로 이동



https://github.com/user-attachments/assets/3e82f4dc-8a1c-4bf3-8870-dccc1b4fd0f9



### 🌓 다크 모드
- **테마 전환**: 라이트/다크 모드 지원
- **일관된 디자인**: 전체 화면에 통일된 테마 적용



https://github.com/user-attachments/assets/bce7da85-5558-4b9a-808f-c2a80352bea3



## 🛠 기술 스택

### Frontend
- **React Native 0.79.4** - 크로스 플랫폼 모바일 프레임워크
- **TypeScript 5.0.4** - 타입 안정성 보장

### 상태 관리 & 서버 통신
- **TanStack Query (React Query) 5.90.5** - 서버 상태 관리 및 캐싱
- **Zustand 5.0.8** - 경량 클라이언트 전역 상태 관리
- **Axios** - HTTP 클라이언트

### 지도 & 위치
- **react-native-maps** - 구글 맵 통합
- **react-native-map-clustering** - 마커 클러스터링
- **@react-native-community/geolocation** - 위치 서비스
- **Kakao Map API** - 장소 검색

### 인증 & 보안
- **react-native-encrypted-storage** - 안전한 토큰 저장
- **Kakao Login** - 소셜 로그인

### UI/UX
- **React Navigation** - 화면 네비게이션 (Drawer, Stack)
- **react-native-fast-image** - 이미지 로딩 최적화

### 권한 관리
- **react-native-permissions** - 위치/사진 권한 처리

### 미디어 & 파일

- **react-native-image-crop-picker** - 이미지 선택 및 크롭
- **react-native-webview** - 웹뷰 통합 (카카오 로그인)

## 💡 핵심 구현 사항

### 1. TanStack Query 기반 인증 시스템

React Query를 활용하여 효율적인 토큰 관리와 자동 갱신 로직을 구현했습니다.

#### 🔄 자동 토큰 갱신
```typescript
// accessToken 만료 3분 전 자동 갱신
const ACCESS_TOKEN_REFRESH_TIME = 1000 * 60 * 30 - 1000 * 60 * 3;

function useGetRefreshToken() {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['auth', 'getAccessToken'],
    queryFn: getAccessToken,
    staleTime: ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: ACCESS_TOKEN_REFRESH_TIME, // 주기적 갱신
  });
  
  // 성공 시 토큰 헤더 및 스토리지 업데이트
  // 실패 시 로그아웃 처리
}
```

#### 🔐 통합 인증 훅
```typescript
function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const refreshTokenQuery = useGetRefreshToken();
  const { data, isSuccess: isLogin } = useGetProfile({
    enabled: refreshTokenQuery.isSuccess, // 토큰 갱신 성공 시에만 프로필 조회
  });
  const logoutMutation = useLogout();

  return { auth, signupMutation, loginMutation, isLogin, logoutMutation };
}
```

#### 🚪 네비게이션 분기
```typescript
function RootNavigation() {
  const { isLogin } = useAuth();
  
  // 로그인 상태에 따라 네비게이션 자동 전환
  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
}
```

**핵심 특징:**
- ✅ accessToken 만료 전 자동 갱신으로 끊김 없는 사용자 경험
- ✅ refreshToken을 암호화 저장소에 안전하게 보관
- ✅ 로그아웃 시 Query 캐시 초기화로 메모리 관리
- ✅ 커스텀 타입 정의로 타입 안정성 확보

### 2. 합성 컴포넌트 패턴의 ActionSheet

다양한 화면에서 반복적으로 사용되는 액션 시트를 **합성 컴포넌트 패턴**으로 설계하여 재사용성과 유연성을 극대화했습니다.

#### 🎯 설계 의도
- 다크모드 설정, 게시글 수정/삭제, 마커 필터링 등에서 공통된 UI 패턴 발견
- 각 화면마다 다른 구성을 유연하게 조립할 수 있도록 컴포넌트 분리

#### 📦 구조
```typescript
// 합성 컴포넌트 패턴 적용
export const ActionSheet = Object.assign(ActionMain, {
  Container,  // 버튼들을 감싸는 컨테이너
  Button,     // 개별 액션 버튼
  Title,      // 상단 제목
  Divider,    // 구분선
});
```

#### 💻 사용 예시
```tsx
// 다크모드 설정
<ActionSheet isVisible={visible} hideAction={hide}>
  <ActionSheet.Title>테마 설정</ActionSheet.Title>
  <ActionSheet.Container>
    <ActionSheet.Button>라이트 모드</ActionSheet.Button>
    <ActionSheet.Divider />
    <ActionSheet.Button isChecked={isDark}>다크 모드</ActionSheet.Button>
  </ActionSheet.Container>
</ActionSheet>

// 게시글 관리
<ActionSheet isVisible={visible} hideAction={hide}>
  <ActionSheet.Container>
    <ActionSheet.Button>수정</ActionSheet.Button>
    <ActionSheet.Divider />
    <ActionSheet.Button isDanger>삭제</ActionSheet.Button>
  </ActionSheet.Container>
</ActionSheet>
```

#### 🎨 주요 특징
- **유연성**: 필요한 컴포넌트만 선택적으로 조합
- **일관성**: 동일한 디자인 시스템 유지
- **확장성**: 새로운 타입의 버튼이나 옵션 추가 용이
- **타입 안정성**: TypeScript로 props 타입 체크

#### 🔍 이벤트 처리
```typescript
// Android 백버튼 대응
onRequestClose={hideAction}

// 배경 터치 시 닫기
const onPressOutSide = (event) => {
  if (event.target === event.currentTarget) {
    hideAction();
  }
};
```

### 3. 앱 권한 관리 시스템

사용자 경험을 해치지 않으면서도 필수 권한을 안전하게 처리하는 시스템을 구축했습니다.

#### 📱 `usePermission` - 권한 요청 및 설정 유도
```typescript
function usePermission(type: 'LOCATION' | 'PHOTO') {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid ? androidPermissions : iosPermissions;
      const checked = await check(permissionOS[type]);

      switch (checked) {
        case RESULTS.DENIED:
          // Android: Alert로 설정 유도
          // iOS: 시스템 팝업으로 직접 요청
          break;
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          // 설정 화면으로 이동 유도
          showPermissionAlert();
          break;
      }
    })();
  }, []);
}
```

#### 🔄 `useAppState` - 앱 복귀 감지
설정 화면에서 권한을 변경하고 돌아왔을 때를 감지하여 후처리를 수행합니다.

```typescript
function useAppState() {
  const appState = useRef(AppState.currentState);
  const [isComeback, setIsComeback] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      // 백그라운드 → 포그라운드 전환 감지
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsComeback(true);
      }
      
      // 다시 백그라운드로 가면 리셋
      if (appState.current.match(/active/) && nextAppState === 'background') {
        setIsComeback(false);
      }

      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  return { isComeback };
}
```

#### 🗺️ 실제 사용 예시 - 위치 권한 처리
```typescript
function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({...});
  const { isComeback } = useAppState();

  useEffect(() => {
    if (!isComeback) return;

    // 앱 복귀 시 위치 정보 다시 가져오기
    Geolocation.getCurrentPosition(
      info => setUserLocation(info.coords),
      () => setIsUserLocationError(true),
      { enableHighAccuracy: true }
    );
  }, [isComeback]);

  return { userLocation, isUserLocationError };
}
```

#### ✅ 권한 처리 흐름
1. **앱 실행 시**: `usePermission`으로 권한 상태 체크
2. **거부 시**: Alert로 설정 화면 이동 유도
3. **설정 후 복귀**: `useAppState`로 앱 복귀 감지
4. **자동 재시도**: 권한 허용 시 자동으로 기능 활성화

이를 통해 사용자가 권한을 변경한 후 앱을 다시 실행하지 않아도 즉시 반영되는 매끄러운 UX를 제공합니다.

## ⚡ 성능 최적화

### 이미지 로딩 최적화
피드에 다수의 이미지가 로드될 때 발생하는 깜빡임 문제를 해결하기 위해 `react-native-fast-image` 라이브러리를 도입했습니다.

**도입 효과:**
- ✅ 이미지 캐싱으로 재로딩 시 즉시 표시
- ✅ 우선순위 기반 로딩으로 사용자 경험 개선
- ✅ 메모리 사용량 최적화

**호환성 처리:**
```bash
npm install react-native-fast-image --legacy-peer-deps
```
> React 19 버전 호환성 문제는 `--legacy-peer-deps` 옵션으로 해결

### 마커 클러스터링
대량의 마커를 효율적으로 표시하기 위해 `react-native-map-clustering`을 사용하여 줌 레벨에 따라 마커를 그룹화했습니다.

## 🔧 트러블슈팅

### Issue 1: Drawer Navigation 사용 시 지도 언마운트 문제

**문제 상황:**
- Custom Drawer를 열고 닫을 때마다 메인 화면의 구글 맵이 언마운트/마운트 반복
- 잦은 재렌더링으로 인한 앱 크래시 발생

https://github.com/user-attachments/assets/153e308a-abcf-401d-8460-bc9231fb818b

**원인 분석:**
- React Navigation 7.x 최신 버전과 React Native 0.80의 호환성 이슈

**해결 방법:**
React Navigation 버전을 안정화된 버전으로 다운그레이드
```json
{
  "@react-navigation/drawer": "7.5.2",
  "@react-navigation/native": "7.1.14",
  "@react-navigation/stack": "7.4.2"
}
```

**결과:**
- ✅ 지도 컴포넌트가 불필요하게 재생성되지 않음
- ✅ Drawer 사용 시 부드러운 애니메이션 유지
- ✅ 앱 안정성 확보

https://github.com/user-attachments/assets/a312dae9-877a-4c5c-92fc-e6a6698c2879


### Issue 2: React Native Fast Image 호환성

**문제:** React 19 버전과의 react-native-fast-image 버전 충돌

react 19버전에서 react-native-fast-image가 설치안되는 이슈

https://github.com/DylanVann/react-native-fast-image/issues/1073

**해결:**
해당 라이브러리를 fork하여 관리하고있는 라이브러리를 설치 후 사용
https://www.npmjs.com/package/@d11/react-native-fast-image


## 🚀 향후 개선 계획

[] 장소 공유 기능 추가
[] 오프라인 모드 지원
[] 소셜 기능 강화 (친구 추가, 피드 공유)

## 🔗 관련 블로그 링크
- [버전 충돌 문제 해결](https://ydoag2003.tistory.com/537)
- [안드로이드는 SafeAreaView를 사용하면 안돼?](https://ydoag2003.tistory.com/528)
- [React Native 환경 변수 설정하기 물론 에러를 해결하며](https://ydoag2003.tistory.com/529)

