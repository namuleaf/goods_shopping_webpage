import { useState } from "react";
import css from "../UserPage.module.css";
import { catalogCategories } from "../userpageData";
import { FallbackImage } from "@/components/FallbackImage";

export const CategoryCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState(catalogCategories[0].id);

  const currentCategory =
    catalogCategories.find((category) => category.id === selectedCategory) ??
    catalogCategories[0];

  return (
    <section className={css.catalogSection}>
      <div className={css.catalogHeader}>
        <div>
          <h3>카테고리별 주문 아이템</h3>
          <p>{currentCategory.description}</p>
        </div>

        <div className={css.catalogTabs} role="tablist" aria-label="상품 카테고리">
          {catalogCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`${css.catalogTab} ${
                selectedCategory === category.id ? css.catalogTabActive : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className={css.catalogGrid}>
        {currentCategory.items.map((item) => (
          <article key={item.id} className={css.catalogCard}>
            <div className={css.catalogImageWrap}>
              <span className={css.catalogBadge}>{item.badge}</span>
              <FallbackImage src={item.img} alt={item.title} className={css.catalogImage} />
            </div>
            <div className={css.catalogInfo}>
              <p className={css.catalogCategoryLabel}>{currentCategory.label}</p>
              <h4>{item.title}</h4>
              <p className={css.catalogSummary}>{item.summary}</p>
              <strong>{item.price.toLocaleString("ko-KR")}원</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
