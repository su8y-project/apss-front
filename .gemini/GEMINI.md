# My Coding Principles
- 모든 UI는 Tailwind CSS의 다크 모드를 기본으로 한다.
- 상태 관리는 최대한 단순하게 유지하며, 복잡한 로직은 별도의 Hook으로 분리한다.
- 에러 로그는 무조건 Loki 포맷으로 남기며, 민감 정보는 자동으로 마스킹한다.
- 주석은 한국어로 작성하되, 기술 용어는 영어를 사용한다.
- 컴포넌트는 작게, 명확한 책임 하나만
- 스타일은 “예쁘게”보다 일관되게
- 상태는 최소한만, 파생 상태는 계산으로
- UI는 항상 데이터 → 뷰 단방향
- “나중에 고치자”라는 가정은 금지

## React 컴포넌트 설계 규칙

- 한 컴포넌트 파일은 200줄 이하
- props가 5개를 넘으면 구조를 잘못 짠 것
- useEffect는 반드시:
    - 왜 필요한지 주석으로 명시
    - dependency array 생략 금지
- 이벤트 핸들러는 JSX 안에서 익명 함수로 작성 금지
- render 로직 안에 비즈니스 로직 금지

## 상태 관리 규칙
- useState는 UI 상태만
- 서버 데이터는 반드시:
    - React Query / SWR / 전용 fetch layer
- boolean 상태가 3개 이상이면 구조 리디자인
- derived state는 state로 저장하지 말고 계산


## Tailwind CSS 사용 규칙
- 임의의 색상값 사용 금지
- spacing은 반드시 디자인 토큰 기준
- class가 8줄을 넘으면:
    - 컴포넌트 분리
    - 또는 cn() 유틸 사용
- 조건부 스타일은 삼항 연산자 대신 class 병합 유틸 사용


## 폴더 구조 규칙 
```
src/
 ├ components/      // 재사용 UI
 ├ features/        // 도메인 단위
 ├ hooks/
 ├ lib/
 ├ styles/
 └ pages/
```

## 네이밍 규칙
- 컴포넌트: PascalCase
- hook: useXxx
- boolean: is / has / can
- 이벤트 핸들러: handleXxx

에러 & 로딩 처리

모든 async UI는:

loading

empty

error
상태를 명시적으로 가질 것

try/catch 없는 async 함수 금지

사용자에게 보이지 않는 에러는 로그라도 남길 것

9. 성능 관련 최소 기준

map 내부에서 key index 사용 금지

무거운 연산은 useMemo / useCallback

불필요한 re-render 발생 시 구조부터 의심

10. AI 출력 검증 지침 (중요)

AI는 반드시 다음을 만족해야 함:

“왜 이렇게 설계했는지” 한 줄 설명

임시 코드 / TODO 주석 금지

타입 추론에 의존하지 말고 명시

11. 바이브코딩 특칙 (현실 룰)

첫 버전은 완벽하지 않아도 구조는 완벽해야 함

디자인은 바뀔 수 있지만:

컴포넌트 경계는 바뀌면 안 됨

고치기 쉬운 코드 > 지금 예쁜 코드

12. AI에게 주는 마지막 명령
너는 데모를 만드는 게 아니라
"나중에 다른 사람이 이어서 개발할 코드"를 작성한다.