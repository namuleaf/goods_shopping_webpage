/* 
장바구니 추가 확인 모달
Link 컴포넌트는 TSX 안에서 클릭으로 이동할 떄 사용
useNavigate 는 '코드로' 페이지 이동시킬 때 사용

여기서는 장바구니 추가 API 호출 후
navigate(/cart)로 장바구니 페이지로 이동
다만 사용자 경험에 따라 선택사항
ex) 그 페이지에 그대로 남거나, 상품 목록으로 이동, 혹은 이동할 모달을 띄워줌
*/

import type { Product } from "@/types";
import css from "./Modal.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "@/api/cartApi";

interface ModalProps {
  product: Product;
  count: number;
  onClose: () => void;
}

export const Modal = ({ product, count, onClose }: ModalProps) => {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const cartItem = {
      productId: product.id,
      title: product.title,
      img: product.img,
      price: product.price,
      discount: product.discount,
      category: product.category,
      count,
    };
    await addToCart(cartItem);
    onClose();
    navigate("/cart");
  };

  return (
    <div className={`${css.modal} ${css.active}`} onClick={onClose}>
      <div className={css.container} onClick={(e) => e.stopPropagation()}>
        {/* 닫기 버튼 */}
        <button className={css.btnClose} onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>
        {/* 모달 내용 */}
        <span className={css.check}>
          <i className="bi bi-check-circle"></i>
        </span>
        <div className={css.content}>
          <h3 id="cart-modal-title" className={css.modalTitle}>
            장바구니에 추가하시겠습니까?
          </h3>
          {/* 상품 정보 요약 */}
          <div className={css.productSummary}>
            <p className={css.productTitle}>{product.title}</p>
            <p className={css.countText}>수량: {count} 개</p>
          </div>
        </div>
        {/* 하단 버튼 그룹 */}
        <div className={css.btnGroup}>
          <button className={css.cancelBtn} onClick={onClose}>
            취소
          </button>
          <button className={css.confirmBtn} onClick={handleAddToCart}>
            장바구니 추가
          </button>
        </div>
      </div>
    </div>
  );
};
