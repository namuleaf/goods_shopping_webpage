/*
카테고리 필터 버튼 컴포넌트

현재 선택된 카테고리와 이 버튼의 카테고리가 일치하면 active 클래스를 추가합니다
isActive ? css.active 더해주겠다

Props로 상태(currentCategory)와 핸들러(handleCategoryFilter)를 받아
부모(shopPage)의 상태를 변경합니다
-> 상태는 부모가 관리하고, 자식은 이벤트만 전달하는 패턴
*/
import React from "react";
import css from "./CategoryButton.module.css";

interface CategoryButtonProps {
  cate: string;
  label: string;
  icon: string;
  handleCategoryFilter: (cate: string) => void;
  currentCategory: string | null;
}

export const CategoryButton = ({
  cate,
  label,
  icon,
  handleCategoryFilter,
  currentCategory,
}: CategoryButtonProps) => {
  // '전체상품' 버튼 (cate="")은 파라미터가 없을 때(null) active
  // 나머지 버튼 cate 값이 currentCategory 와 일치할 때 active

  const isActive =
    (cate === "" && currentCategory === null) || cate === currentCategory;

  return (
    <button
      type="button"
      className={isActive ? `${css.active} ${css.btn}` : css.btn}
      onClick={() => handleCategoryFilter(cate)}
    >
      <i className={`bi ${icon}`}> </i>
      {label}
    </button>
  );
};
