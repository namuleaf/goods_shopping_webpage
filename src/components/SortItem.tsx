/*
정렬 옵션 항목 컴포넌트

classNames 배열에 기본 클래스를 넣고,
조건이 맞으면 active 클래스를 push 한 뒤 join 으로 합칩니다
*/

import React from "react";
import css from "./SortItem.module.css";

interface SortItemProps {
  option: string;
  handleSort: (option: string) => void;
  currentSort: string | null;
  label: string;
}

export const SortItem = ({
  option,
  handleSort,
  currentSort,
  label,
}: SortItemProps) => {
  // 현재 정렬 옵션과 일치하거나, 정렬이 없을 때 기본값 ("id")이면 active
  const isActive = currentSort === option || (!currentSort && option === "id");
  // 템플릿 리터럴 말고 배열 방식으로 css를 isActive 상태에 따라 넣음
  const classnames = [css.list];
  if (isActive) {
    classnames.push(css.active);
  }
  return (
    <li className={classnames.join(" ")} onClick={() => handleSort(option)}>
      {label}
    </li>
  );
};
