import React from "react";
import css from "./SimilarProducts.module.css";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types";

interface SimilarProductsProps {
  relatedProducts: Product[];
}

export const SimilarProducts = ({ relatedProducts }: SimilarProductsProps) => {
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }
  return (
    <div className={css.container}>
      <h3 className={css.title}>유사 상품 추천</h3>
      <div className={css.productList}>
        {relatedProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
