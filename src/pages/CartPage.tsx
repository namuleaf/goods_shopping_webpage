/*
1. useLoaderData
cartPageLoader 가 미리 가져온 장바구니 목록을
useLoaderData() 로 꺼내서 초기값으로 사용

2. 커스텀 훅 (useCart)
useCart() 
이 컴포넌트는 화면에만 집중하고
장바구니 로직은 hooks/useCart.ts에 작성
*/

import React from "react";
import css from "./CartPage.module.css";
import { Link, useLoaderData } from "react-router-dom";
import type { CartItem } from "@/types";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/features";
import { ConfirmModal } from "@/components/ConfirmModal";

export const CartPage = () => {
  const cartList = useLoaderData() as CartItem[];

  const {
    items,
    totalCount,
    totalSum,
    increase,
    decrease,
    isModalOpen,
    handleDeleteClick,
    confirmDelete,
    closeModal,
  } = useCart(Array.isArray(cartList) ? cartList : []);

  return (
    <main className={css.container}>
      <h2 className={css.pageTitle}>Shopping cart</h2>
      {items.length === 0 ? (
        <div className={css.emptyCart}>
          <i className={`bi bi-cart-x ${css.emptyIcon}`}></i>
          <p>장바구니가 비었습니다.</p>
        </div>
      ) : (
        <>
          <p className={css.infoText}>
            장바구니 리스트는 {items.length} 개이고, 총 상품 갯수는 {totalCount}{" "}
            개 입니다.
          </p>
          <div className={css.cartList}>
            {items.map((item) => (
              <div key={item.id} className={css.cartItem}>
                {/* 이미지 */}
                <div className={css.imgWrap}>
                  <Link to={`/detail/${item.id}`}>
                    <img src={item.img} alt={item.title}></img>
                  </Link>
                </div>
                {/* 상품명 */}
                <Link
                  to={`/detail/${item.id}`}
                  className={css.productLink}
                >
                  <div className={css.itemInfo}>
                    <p className={css.itemTitle}>{item.title}</p>
                  </div>
                </Link>
                {/* 단가 */}
                <div className={css.unitPrice}>
                  {formatCurrency(item.price)}
                </div>
                {/* 수량 조절 */}
                <div className={css.countControl}>
                  <button onClick={() => decrease(item.id)}>-</button>
                  <span>{item.count}</span>
                  <button onClick={() => increase(item.id)}>+</button>
                </div>
                {/* 할인율 */}
                <div>할인율 : {item.discount}</div>
                {/* 합계 금액 */}
                <div className={css.totalPrice}>
                  {formatCurrency(
                    Math.round(
                      item.price *
                        item.count *
                        (1 - (item.discount || 0) / 100),
                    ),
                  )}
                </div>
                {/* 삭제 버튼 */}
                <button
                  className={css.deleteBtn}
                  onClick={() => handleDeleteClick(item.id)}
                  aria-label="삭제"
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            ))}
          </div>
          <div className={css.cartFooter}>
            <span>총금액 : </span>
            <strong className={css.finalPrice}>
              {formatCurrency(totalSum)}
            </strong>
          </div>
        </>
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        message="정말 장바구니에서 삭제하시겠습니까?"
        onConfirm={confirmDelete}
        onCancel={closeModal}
      />
    </main>
  );
};
