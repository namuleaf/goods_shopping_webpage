// cartPage용 loader
// loader의 개념은 productsLoader.ts 를 참고

import { getCartData } from "@/api/cartApi";
import type { CartItem } from "@/types";

export const cartPageLoader = async (): Promise<CartItem[]> => {
  try {
    const cartItems = await getCartData();
    if (!cartItems || cartItems.length === 0) {
      return [];
    }
    return cartItems;
  } catch (err) {
    console.log("Err", err);
    return [];
  }
};
