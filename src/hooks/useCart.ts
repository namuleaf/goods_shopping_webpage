/*
커스텀 훅 - 장바구니 상태 & 로직

커스텀 훅은 기존에 사용했던 useState,useEffect 등을 조합해서 만든 훅

핵심 규칙 : 
1. 함수 이름이 반드시 "use" 로 시작해야 함
2. 내부에서 다른 내장 훅(useState,useEffect) 을 자유롭게 쓸 수 있다
3. 값을 객체로 반환해 컴포넌트에서 꺼내 씀

장점
- CartPage에서는 화면 구성(TSX)구성에만 집중 가능
- 장바구니 로직을 다른 컴포넌트에서 재사용 가능
*/

import { removeFromCart, updateCartItemCount } from "@/api/cartApi";
import type { CartItem } from "@/types";
import React, { useState } from "react";

export const useCart = (initialItems: CartItem[]) => {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // 총 수량 계산
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  // 총 금액 계산 (할인율 고려)
  const totalSum = items.reduce(
    (sum, item) =>
      sum +
      Math.round(item.price * item.count * (1 - (item.discount || 0) / 100)),
    0,
  );

  //   수량 증가
  const increase = (id: string) => {
    const currentItem = items.find((item) => item.id === id);
    if (!currentItem) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      ),
    );
    updateCartItemCount(id, currentItem.count + 1).catch((err) =>
      console.log("err", err),
    );
  };

  //   수량 감소 (1 미만으로 내려가지 않도록)
  const decrease = (id: string) => {
    const currentItem = items.find((item) => item.id === id);
    if (!currentItem || currentItem.count <= 1) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item,
      ),
    );
    updateCartItemCount(id, currentItem.count - 1).catch((err) =>
      console.log("err", err),
    );
  };

  //   삭제 버튼 클릭 -> 모달 열기
  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  //   모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };
  //   모달에서 "삭제" 확인 -> 실제 삭제 실행
  const confirmDelete = () => {
    if (deleteId) {
      setItems((prev) => prev.filter((item) => item.id !== deleteId));
      removeFromCart(deleteId).catch((err) => console.log("Err", err));
    }
    closeModal();
  };

  return {
    items,
    totalCount,
    totalSum,
    increase,
    decrease,
    isModalOpen,
    handleDeleteClick,
    confirmDelete,
    closeModal,
  };
};
