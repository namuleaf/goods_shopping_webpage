import { useMemo, useState, type RefObject } from "react";
import css from "../UserPage.module.css";

type DeliveryScheduleCardProps = {
  orderDateInputRef: RefObject<HTMLInputElement>;
};

const addBusinessDays = (baseDate: Date, businessDays: number) => {
  const nextDate = new Date(baseDate);
  let addedDays = 0;

  while (addedDays < businessDays) {
    nextDate.setDate(nextDate.getDate() + 1);
    const day = nextDate.getDay();

    if (day !== 0 && day !== 6) {
      addedDays += 1;
    }
  }

  return nextDate;
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).format(date);

export const DeliveryScheduleCard = ({ orderDateInputRef }: DeliveryScheduleCardProps) => {
  const [orderDate, setOrderDate] = useState("");

  const deliveryInfo = useMemo(() => {
    if (!orderDate) return null;

    const selectedDate = new Date(`${orderDate}T00:00:00`);
    const earliest = addBusinessDays(selectedDate, 7);
    const latest = addBusinessDays(selectedDate, 10);

    return {
      order: formatDate(selectedDate),
      earliest: formatDate(earliest),
      latest: formatDate(latest),
    };
  }, [orderDate]);

  return (
    <section className={css.deliveryCard} id="delivery-schedule" tabIndex={-1}>
      <h2>예상 배송 일정</h2>
      <p className={css.description}>
        주문 날짜를 선택하면 예상 배송 가능 기간을 바로 확인할 수 있어요.
      </p>

      <label className={css.label} htmlFor="order-date">
        주문 날짜
      </label>
      <input
        id="order-date"
        className={css.dateInput}
        type="date"
        value={orderDate}
        ref={orderDateInputRef}
        onChange={(e) => setOrderDate(e.target.value)}
      />

      {deliveryInfo ? (
        <div className={css.resultBox}>
          <p>주문일: {deliveryInfo.order}</p>
          <p>예상 출고/배송 시작: {deliveryInfo.earliest}</p>
          <p>예상 배송 완료: {deliveryInfo.latest}</p>
          <small>주말은 제외하고 계산했어요. 실제 일정은 출고 상황에 따라 달라질 수 있어요.</small>
        </div>
      ) : (
        <div className={css.resultBox}>
          <p>날짜를 선택하면 배송 일정을 보여드려요.</p>
        </div>
      )}
    </section>
  );
};
