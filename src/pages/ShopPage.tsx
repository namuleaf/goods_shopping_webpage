import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import type { ShopLoaderData } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import { SortItem } from "@/components/SortItem";
import css from "./ShopPage.module.css";

const sectionOptions = [
  { id: "all", label: "전체 상품" },
  { id: "phone", label: "폰 액세서리" },
  { id: "sticker", label: "스티커" },
  { id: "photo", label: "포토" },
  { id: "acrylic", label: "아크릴" },
  { id: "living", label: "리빙" },
  { id: "calendar", label: "캘린더" },
];

const kindOptions: Record<string, Array<{ id: string; label: string }>> = {
  all: [{ id: "all", label: "전체" }],
  phone: [
    { id: "all", label: "전체" },
    { id: "item", label: "폰케이스 아이템" },
    { id: "accessory", label: "폰 액세서리" },
  ],
  sticker: [
    { id: "all", label: "전체" },
    { id: "basic", label: "기본" },
    { id: "custom", label: "커스텀" },
  ],
  photo: [
    { id: "all", label: "전체" },
    { id: "card", label: "포토 카드" },
    { id: "poster", label: "포스터" },
  ],
  acrylic: [
    { id: "all", label: "전체" },
    { id: "stand", label: "스탠드" },
    { id: "keyring", label: "키링" },
  ],
  living: [
    { id: "all", label: "전체" },
    { id: "desk", label: "데스크" },
    { id: "home", label: "홈" },
  ],
  calendar: [
    { id: "all", label: "전체" },
    { id: "table", label: "탁상" },
    { id: "wall", label: "벽걸이" },
  ],
};

export const ShopPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDown, setIsDown] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const initProductsData = useLoaderData() as ShopLoaderData;
  const sortCase = searchParams.get("_sort");
  const currentCategory = searchParams.get("category");
  const currentSection = searchParams.get("section") || "all";
  const currentKind = searchParams.get("kind") || "all";
  const currentQuery = searchParams.get("q");
  const shouldFocus = searchParams.get("focus") === "true";
  const data = initProductsData.products.data;
  const { per_page } = initProductsData;

  const toggleLike = (id: string) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    setSearchTerm(currentQuery ?? "");
  }, [currentQuery]);

  useEffect(() => {
    if (shouldFocus && searchInputRef.current) {
      searchInputRef.current.focus();
      const params = new URLSearchParams(searchParams);
      params.delete("focus");
      setSearchParams(params, { replace: true });
    }
  }, [searchParams, setSearchParams, shouldFocus]);

  const updateQuery = (next: Record<string, string | null | undefined>) => {
    const params = new URLSearchParams(searchParams);
    params.set("_page", "1");
    params.set("_per_page", String(per_page));

    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    navigate(`/shop/?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateQuery({
      q: searchTerm.trim() || null,
      section: currentSection,
      kind: currentKind,
      _sort: sortCase,
    });
  };

  const handleSectionFilter = (section: string) => {
    updateQuery({
      section,
      kind: "all",
      q: currentQuery,
      _sort: sortCase,
    });
  };

  const handleKindFilter = (kind: string) => {
    updateQuery({
      section: currentSection,
      kind,
      q: currentQuery,
      _sort: sortCase,
    });
  };

  const handleSort = (sortOption: string) => {
    setIsDown(false);
    updateQuery({
      section: currentSection,
      kind: currentKind,
      q: currentQuery,
      _sort: sortOption,
    });
  };

  const sortTextMap: Record<string, string> = {
    id: "등록순",
    price: "낮은 가격순",
    "-price": "높은 가격순",
    discount: "낮은 할인순",
    "-discount": "높은 할인순",
  };

  const sortOptions = [
    { option: "id", label: "등록순" },
    { option: "price", label: "낮은 가격순" },
    { option: "-price", label: "높은 가격순" },
    { option: "discount", label: "낮은 할인순" },
    { option: "-discount", label: "높은 할인순" },
  ];

  const getSortText = () => sortTextMap[sortCase ?? ""] || "등록순";
  const activeKinds = kindOptions[currentSection] ?? kindOptions.all;

  return (
    <main className={css.shopPage}>
      <h2>Shop Page</h2>

      <aside className={css.searchFn}>
        <form className={css.searchForm} onSubmit={handleSearch}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="상품명 검색..."
            value={searchTerm}
            className={css.searchInput}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className={css.searchBtn}>
            <i className="bi bi-search" />
          </button>
        </form>

        <div className={`${css.sort} ${isDown ? css.active : ""}`}>
          <button
            type="button"
            className={css.sortHeader}
            onClick={() => setIsDown((prev) => !prev)}
            aria-expanded={isDown}
          >
            <span className={css.sortLabel}>{getSortText()}</span>
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
      </aside>

      <section className={css.content}>
        <div className={css.filterPanel}>
          <div className={css.sectionTabs}>
            {sectionOptions.map((section) => {
              const isActive = currentSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  className={
                    isActive
                      ? `${css.sectionChip} ${css.sectionChipActive}`
                      : css.sectionChip
                  }
                  onClick={() => handleSectionFilter(section.id)}
                >
                  {section.label}
                </button>
              );
            })}
          </div>

          <div className={css.kindTabs}>
            {activeKinds.map((kind) => {
              const isActive = currentKind === kind.id;
              return (
                <button
                  key={kind.id}
                  type="button"
                  className={
                    isActive
                      ? `${css.kindChip} ${css.kindChipActive}`
                      : css.kindChip
                  }
                  onClick={() => handleKindFilter(kind.id)}
                >
                  {kind.label}
                </button>
              );
            })}
          </div>
        </div>

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
