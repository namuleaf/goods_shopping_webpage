/*
상품 목록 페이지

1. useLoaderData
이 페이지의 loader (shopPageLoader) 가 미리 가져온 데이터를 꺼내는 훅
loader 없이 useEffect 로 fetch 하면 화면이 먼저 그려지고 데이터가 나중에 들어옴
loader 방식은 데이터가 준비된 후 화면을 그리므로 로딩 깜빡임이 없다

2. useSearchParams
URL의 쿼리 파라미터를 읽고 쓰는 훅
setSearchParams 로 URL 을 바꾸면 브라우저 주소창이 얻데이트 되고
뒤로가기/앞으로가기도 정상 작동
-> 필터, 정렬 상태를 URL에 저장하므로 공유/북마크 가능

3.useNavigate
카테고리 필터나 정렬을 변경할 때 URl을 업데이트하고
해당 URL 로 이동(= loader 재실행 = 새 데이터 fetch)
*/
import { ProductCard } from "@/components/ProductCard";
import css from "./ShopPage.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import type { ShopLoaderData } from "@/types";
import { CategoryButton } from "@/components/CategoryButton";
import { SortItem } from "@/components/SortItem";
import { Pagination } from "@/components/Pagination";

export const ShopPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDown, setIsDown] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const toggleLike = (id: string) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  //   검색어 상태
  const [searchTerm, setSearchTerm] = useState("");

  //   Typescript 을 사용하기 위한 타입 선언
  const initProductsData = useLoaderData() as ShopLoaderData;
  const currentCategory = searchParams.get("category");
  const sortCase = searchParams.get("_sort");

  //   URL 의 'q' 파라미터가 있으면 검색어 상태에 반영
  const currentQuery = searchParams.get("q");
  const shouldFocus = searchParams.get("focus") === "true";

  useEffect(() => {
    if (currentQuery) {
      setSearchTerm(currentQuery);
    } else {
      setSearchTerm("");
    }
  }, [currentQuery]);

  //   Focus 파라미터가 있으면 검색창에 포커스
  useEffect(() => {
    if (shouldFocus && searchInputRef.current) {
      searchInputRef.current.focus();
      const params = new URLSearchParams(searchParams);
      params.delete("focus");
      setSearchParams(params, { replace: true });
    }
  }, [shouldFocus, searchParams, setSearchParams]);

  const data = initProductsData.products.data;
  const { per_page } = initProductsData;

  //   검색 핸들러 함수 이벤트 발생 대상도 타입지정이 필수 ts
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    params.set("_page", "1"); //검색 시 1페이지로 초기화
    params.set("_per_page", String(per_page));

    if (searchTerm.trim()) {
      params.set("q", searchTerm.trim()); // 검색어 설정
    } else {
      params.delete("q"); //검색어 없으면 제거
    }
    navigate(`/shop/?${params}`);
  };

  const handleCategoryFilter = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("_page", "1");
    params.set("_per_page", String(per_page));
    category ? params.set("category", category) : params.delete("category");
    navigate(`/shop/?${params}`);
  };

  const handleSort = (sortOption: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("_page", "1");
    params.set("_sort", sortOption);
    setIsDown(false);
    navigate(`/shop/?${params}`);
  };

  const sortTextMap: Record<string, string> = {
    id: "등록순",
    price: "낮은 가격순",
    "-price": "높은 가격순",
    discount: "낮은 할인순",
    "-discount": "높은 할인순",
  };

  const getSortText = () =>
    (sortCase ? sortTextMap[sortCase] : "등록순") || "등록순";

  const sortOptions = [
    { option: "id", label: "등록순" },
    { option: "price", label: "낮은 가격순" },
    { option: "-price", label: "높은 가격순" },
    { option: "discount", label: "낮은 할인순" },
    { option: "-discount", label: "높은 할인순" },
  ];

  const categories = [
    { id: "", label: "전체상품", icon: "bi-grid" },
    { id: "new", label: "신상품", icon: "bi-stars" },
    { id: "top", label: "인기상품", icon: "bi-fire" },
    { id: "discount", label: "할인 상품", icon: "bi-percent" },
    { id: "recommend", label: "추천 상품", icon: "bi-hand-thumbs-up-fill" },
  ];

  return (
    <main>
      <section className={css.shopPage}>
        <h2>Shop Page</h2>
        <div className={css.searchFn}>
          {/* 검색 입력창 영역 */}
          <form className={css.searchForm} onSubmit={handleSearch}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="상품명 검색..."
              value={searchTerm}
              className={css.searchInput}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <button type="submit" className={css.searchBtn}>
              <i className="bi bi-search"></i>
            </button>
          </form>
          {/* 카테고리 & 정렬 선택 영역 */}
          <div className={css.category}>
            {categories.map((cate) => (
              <CategoryButton
                key={cate.id}
                cate={cate.id}
                label={cate.label}
                icon={cate.icon}
                handleCategoryFilter={handleCategoryFilter}
                currentCategory={
                  currentCategory === null && cate.id === ""
                    ? null
                    : currentCategory
                }
              />
            ))}
          </div>
          <div className={`${css.sort} ${isDown ? css.active : ""}`}>
            <button
              type="button"
              className={css.sortHeader}
              onClick={() => setIsDown((prev) => !prev)}
              aria-expanded={isDown}
            >
              {getSortText()}
              <i aria-hidden="true">{isDown ? "▲" : "▼"}</i>
            </button>
            <ul role="menu" aria-label="정렬 옵션">
              {sortOptions.map((sortOpt) => (
                <SortItem
                  key={sortOpt.option}
                  option={sortOpt.option}
                  handleSort={handleSort}
                  currentSort={sortCase}
                  label={sortOpt.label}
                />
              ))}
            </ul>
          </div>
        </div>
        {/* 상품 리스트 영역 */}
        <div className={css.productList}>
          {data.length === 0 ? (
            <p className={css.noResult}>상품이 없습니다.</p>
          ) : (
            <>
              <div className={css.list}>
                {data.map((product) => (
                  <ProductCard
                    key={product.id}
                    data={product}
                    liked={likedIds.includes(product.id)}
                    onToggleLike={() => toggleLike(product.id)}
                  />
                ))}
              </div>
              <Pagination initProductsData={initProductsData} />
            </>
          )}
        </div>
      </section>
    </main>
  );
};
