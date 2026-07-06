import { useEffect, useState } from "react";
import { getCartData } from "@/api/cartApi";
import type { CartItem } from "@/types";
import css from "../UserPage.module.css";

const formatLabelDate = (value?: string) => {
  if (!value) return "미정";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(parsed);
};

export const RecentOrderDelivery = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    let mounted = true;

    getCartData()
      .then((data) => {
        if (mounted) setItems(data);
      })
      .catch(() => {
        if (mounted) setItems([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const recentItems = items.slice(0, 3);

  return (
    <section className={css.deliveryCard}>
      <h2>최근 주문 배송 확인</h2>
      <p className={css.description}>
        장바구니에 담긴 상품 기준으로 주문일과 배송 희망일을 확인할 수 있어요.
      </p>

      {recentItems.length > 0 ? (
        <div className={css.recentDeliveryList}>
          {recentItems.map((item) => (
            <article key={item.id} className={css.recentDeliveryItem}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.selectedOptionLabel || "기본 옵션"}</p>
              </div>
              <div className={css.recentDeliveryMeta}>
                <p>
                  주문일: <strong>{formatLabelDate(item.orderDate)}</strong>
                </p>
                <p>
                  배송 희망일: <strong>{formatLabelDate(item.preferredDeliveryDate)}</strong>
                </p>
                <p>
                  배송 일정:{" "}
                  <strong>
                    {formatLabelDate(item.deliveryStartDate)}
                    {item.deliveryEndDate
                      ? ` ~ ${formatLabelDate(item.deliveryEndDate)}`
                      : ""}
                  </strong>
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={css.resultBox}>
          <p>현재 확인할 주문이 없습니다.</p>
        </div>
      )}
    </section>
  );
};
