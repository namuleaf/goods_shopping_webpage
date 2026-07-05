/* 
상품 상세 페이지

detailPageLoader를 만들기 : 이것이 상품 정보와 유사 상품 목록을 페이지 이동 전에 미리 가져온다.
useLoaderData() 로 꺼내 사용
*/
import { Modal } from "@/components/Modal";
import React, { useState } from "react";
import css from "./DetailPage.module.css";
import { useLoaderData } from "react-router-dom";
import type { DetailLoaderData } from "@/types";
import { formatCurrency } from "@/utils/features";
import { DetailTabInfo } from "@/organism/DetailTabInfo";
import { SimilarProducts } from "@/organism/SimilarProducts";

// 이미지 가져오는 함수
const getImageSrc = (img: string): string => {
  //이미지가 없을 때 나올 임시 이미지
  if (!img) return "/img/product01.jpg";
  if (img.startsWith("data:") || img.startsWith("http")) return img;
  return img.startsWith("/")
    ? img.replace(/^\/public/, "")
    : `/img/${img}`.replace("//", "/");
};

export const DetailPage = () => {
  const { product, filteredRelatedProducts } =
    useLoaderData() as DetailLoaderData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(1);

  if (!product) {
    return (
      <main>
        <p>상품을 찾을 수 없습니다.</p>
      </main>
    );
  }

  const decrease = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const increase = () => {
    setCount((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <section className={css.detailContainer}>
        <div className={css.imgWrap}>
          {product.discount > 0 && (
            <span className={css.discount}>{product.discount}% 할인</span>
          )}
          <img src={getImageSrc(product.img)} alt={product.title}></img>
        </div>
        <div className={css.infoWrap}>
          <p className={css.category}>{product.category}</p>

          <h2 className={css.title}>{product.title}</h2>
          <p className={css.price}>{formatCurrency(product.price)}</p>

          <div className={css.optionColor}>색상</div>
          <div className={css.size}>사이즈</div>
          <div className={css.boxing}>포장</div>
          <div className={css.makingOption}>
            <div className={css.selectCustom}>
              <button type="button">자유롭게 만들기</button>
            </div>
            <div className={css.selectDesign}>
              <button type="button">디자인 선택하기</button>
            </div>
          </div>


          <div className={css.btnWrap}>
            <div className={css.counterArea}>
              <button type="button" onClick={decrease}>
                -
              </button>
              <span>{count}</span>
              <button type="button" onClick={increase}>
                +
              </button>
            </div>
            <button
              type="button"
              className={css.addBtn}
              onClick={handleAddToCart}
            >
              장바구니 담기
            </button>
          </div>
        </div>
      </section>
      <DetailTabInfo />
      <SimilarProducts relatedProducts={filteredRelatedProducts} />
      {isModalOpen && (
        <Modal product={product} count={count} onClose={closeModal} />
      )}
    </main>
  );
};
