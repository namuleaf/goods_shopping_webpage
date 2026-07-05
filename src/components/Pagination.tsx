/*
페이지네이션 컴포넌트

1. useSearchParams : 현재 URL의 쿼리 파라미터 읽기
-> 현재 페이지 번호(_page)를 URL에서 직접 읽습니다

2. useNavigate : 페이지 번호 클릭 시 해당 URL로 이동
-> URL이 바뀌면 router의 loader가 다시 실행되어 새 데이터를 가져옵니다
-> navigate(`/shop/?_page=2`) 처럼 쿼리 파라미터를 포함해 이동합니다.
*/

import React from "react";
import css from "./Pagination.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { ShopLoaderData } from "@/types";

interface PaginationProps {
  initProductsData: ShopLoaderData;
}

export const Pagination = ({ initProductsData }: PaginationProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { first, last, prev, next, pages } = initProductsData.products;
  const currentPage = Number(searchParams.get("_page") || "1");

  const handlePageChange = (page: number | null) => {
    if (page === null || page === currentPage) return;
    const params = new URLSearchParams(searchParams);
    params.set("_page", String(page));
    navigate(`/shop/?${params}`);
  };

  const getPageNumbers = (): number[] => {
    const maxPageNumbers = 5;
    if (pages <= maxPageNumbers) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }

    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(pages, startPage + maxPageNumbers - 1);

    if (endPage > pages) {
      endPage = pages;
      startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={css.paginationArea}>
      <button
        onClick={() => handlePageChange(first)}
        disabled={currentPage === first}
      >
        처음
      </button>
      <button onClick={() => handlePageChange(prev)} disabled={prev === null}>
        ◁
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => handlePageChange(num)}
          className={num === currentPage ? css.active : undefined}
        >
          {num}
        </button>
      ))}
      <button onClick={() => handlePageChange(next)} disabled={next === null}>
        ▷
      </button>
      <button
        onClick={() => handlePageChange(last)}
        disabled={currentPage === last}
      >
        마지막
      </button>
    </div>
  );
};
