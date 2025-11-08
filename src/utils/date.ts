// ✅ 주어진 날짜(Date 또는 string)에서 연, 월, 일을 추출하는 함수
const getDateDetails = (dateString: Date | string) => {
  // 문자열 또는 Date 객체를 Date 객체로 변환
  const date = new Date(dateString);

  // 연도, 월(0부터 시작하므로 +1), 일 추출
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 객체 형태로 반환
  return {year, month, day};
};

// ✅ 날짜를 구분자(separator)를 포함한 문자열 형태로 반환하는 함수
export const getDateWithSeparator = (
  dateString: Date | string,
  separator: string = '',
) => {
  // 연/월/일 정보 추출
  const {year, month, day} = getDateDetails(dateString);

  // 월, 일은 항상 2자리로 맞춤 (ex. 2025-03-07)
  return [
    year,
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join(separator); // 구분자를 기준으로 문자열 합침
};

// ✅ MonthYear 타입 정의
// 특정 월의 달력 정보를 표현하기 위한 구조
export type MonthYear = {
  month: number; // 월 (1~12)
  year: number; // 연도
  startDate: Date; // 해당 월의 1일을 나타내는 Date 객체
  firstDOW: number; // 해당 월의 1일이 무슨 요일인지 (0=일요일, 6=토요일)
  lastDate: number; // 해당 월의 마지막 날짜 (28~31)
};

// ✅ 주어진 날짜를 기준으로 해당 월의 세부 정보를 반환하는 함수
export const getMonthYearDetails = (initialDate: Date): MonthYear => {
  // 월(0부터 시작하므로 +1), 연도 추출
  const month = initialDate.getMonth() + 1;
  const year = initialDate.getFullYear();

  // 해당 월의 1일을 Date 객체로 생성
  const startDate = new Date(`${year}-${month}`);

  // 1일이 무슨 요일인지 계산 (0=일요일, 6=토요일)
  const firstDOW = startDate.getDay();

  // 해당 월의 마지막 날짜 구하기
  // 예: new Date(2025, 3 + 1, 0) → 2025년 3월의 마지막 날(31)
  const lastDateString = String(
    new Date(
      initialDate.getFullYear(),
      initialDate.getMonth() + 1,
      0,
    ).getDate(),
  );
  const lastDate = Number(lastDateString);

  // 월 관련 모든 정보 반환
  return {month, year, startDate, firstDOW, lastDate};
};

// ✅ 이전 MonthYear 데이터와 증감값을 기반으로 새로운 월 정보를 구하는 함수
export const getNewMonthYear = (prevData: MonthYear, increment: number) => {
  // 기존 startDate에서 월을 증가/감소시킨 새로운 날짜 생성
  // 예: increment = +1 → 다음 달, increment = -1 → 이전 달
  const newMonthYear = new Date(
    prevData.startDate.setMonth(prevData.startDate.getMonth() + increment),
  );

  // 새롭게 계산된 월의 세부 정보 반환
  return getMonthYearDetails(newMonthYear);
};

export const isSameAsCurrentDate = (
  year: number,
  month: number,
  date: number,
) => {
  const currentDate = getDateWithSeparator(new Date());
  const inputDate = `${year}${String(month).padStart(2, '0')}${String(
    date,
  ).padStart(2, '0')}`;

  return currentDate === inputDate;
};
