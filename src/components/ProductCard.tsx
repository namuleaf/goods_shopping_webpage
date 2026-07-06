/*
상품 카드 컴포넌트

loading ="lazy" : 뷰포트 밖의 이미지는 스크롤할 때 로드
-> 초기 로딩 속도와 네트워크 절약 효과가 있습니다
-> 브라우저 기본 지원 기능이라 별도 라이브러리 필요 없음
*/

import { Link } from "react-router-dom";
import type { Product } from "@/types";
import css from "./ProductCard.module.css";
import { formatCurrency } from "@/utils/features";
import { FallbackImage } from "@/components/FallbackImage";

interface ProductCardProps {
  data: Product;
  liked?: boolean;
  onToggleLike?: () => void;
}

export const ProductCard = ({
  data,
  liked = false,
  onToggleLike,
}: ProductCardProps) => {
  return (
    <Link to={`/detail/${data.id}`} className={css.cardLink}>
      <div className={css.card}>
        <div className={css.imgWrap}>
          {data.discount > 0 && (
            <div className={css.discountBadge}>{data.discount}%</div>
          )}

          <button
            type="button"
            className={css.likeBadge}
            disabled={!onToggleLike}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleLike?.();
            }}
          >
            <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`}></i>
          </button>
          <FallbackImage src={data.img} alt={data.title} className={css.productImage} />
        </div>
        <h4 className={css.title}>{data.title}</h4>
        <p className={css.price}>{formatCurrency(data.price)}</p>
      </div>
    </Link>
  );
};
