// 공통 유틸리티 함수 모음

// 숫자를 통화 형식으로 변환
// ex) 456845 -> 456,845 원

// toLocaleString() :숫자를 현재 지역 형식에 맞게 문자열로 변환
export const formatCurrency = (number: number): string => {
  return number.toLocaleString() + "원";
};
