/*

장바구니 API

REST API 는 URL + HTTP 메서드 조합으로 동작을 정의

GET /api/cart/ -> 장바구니 목록 조회
POST /api/cart/ -> 장바구니에 새 아이템 추가
PUT /api/cart/:id -> 특정 아이템 전체 수정
DELETE /api/cart/:id -> 특정 아이템 삭제

axios. get/post/put/delete 메서드가 각각 위에 해당
*/
import axios from "axios";
import type { CartItem } from "@/types";

// [GET] 장바구니 목록 가져오기
export const getCartData = async (): Promise<CartItem[]> => {
  try {
    const res = await axios.get<CartItem[]>(`/api/cart/`);
    return res.data;
  } catch (err) {
    console.log("err", err);
    return [];
  }
};

// POST / PUT 장바구니에 상품 추가
// 이미 담긴 상품이면 수량만 늘리고(PUT), 없으면 새로 추가(POST
export const addToCart = async (
  cartItem: CartItem,
): Promise<CartItem | undefined> => {
  try {
    const cart = await getCartData();
    const existingItem = cart.find((item) => item.id === cartItem.id);

    if (existingItem) {
      // 이미 있으면 수량만 증가 (PUT : 기존 데이터 수정)
      const updateItem: CartItem = {
        ...existingItem,
        count: existingItem.count + cartItem.count,
      };
      const res = await axios.put<CartItem>(
        `/api/cart/${existingItem.id}`,
        updateItem,
      );
      return res.data;
    } else {
      // 없으면 새로 추가 (POST : 새 데이터 생성)
      const res = await axios.post<CartItem>(`/api/cart/`, cartItem);
      return res.data;
    }
  } catch (err) {
    console.log("Err", err);
  }
};

// PUT 장바구니 수량 업데이트
export const updateCartItemCount = async (
  id: string,
  count: number,
): Promise<CartItem | undefined> => {
  try {
    const cartItem = await axios.get<CartItem>(`/api/cart/${id}`);
    const updateItem: CartItem = { ...cartItem.data, count };
    const res = await axios.put<CartItem>(`/api/cart/${id}`, updateItem);
    return res.data;
  } catch (err) {
    console.log("Err", err);
  }
};

// DELETE 장바구니에서 상품 삭제
// DELETE는 응답 본문이 없으므로 반환값이 void 입니다
export const removeFromCart = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/api/cart/${id}`);
  } catch (err) {
    console.log("Err", err);
  }
};
