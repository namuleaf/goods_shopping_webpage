import css from "./CartPage.module.css";
import { Link, useLoaderData } from "react-router-dom";
import type { CartItem } from "@/types";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/features";
import { ConfirmModal } from "@/components/ConfirmModal";
import { FallbackImage } from "@/components/FallbackImage";

const toDateLabel = (value?: string) => {
  if (!value) return "미정";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("ko-KR");
};

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
            장바구니 리스트는 {items.length}개이고, 총 상품 개수는 {totalCount}개입니다.
          </p>
          <div className={css.cartList}>
            {items.map((item) => (
              <div key={item.id} className={css.cartItem}>
                <div className={css.imgWrap}>
                  <Link to={`/detail/${item.productId || item.id}`}>
                    <FallbackImage src={item.img} alt={item.title} />
                  </Link>
                </div>
                <Link
                  to={`/detail/${item.productId || item.id}`}
                  className={css.productLink}
                >
                  <div className={css.itemInfo}>
                    <p className={css.itemTitle}>{item.title}</p>
                    <p className={css.itemOption}>
                      {item.selectedOptionLabel || "기본 옵션"}
                    </p>
                    <p className={css.itemOption}>
                      {item.selectedSizeLabel || "기본 사이즈"}
                    </p>
                  </div>
                </Link>
                <div className={css.unitPrice}>{formatCurrency(item.price)}</div>
                <div className={css.countControl}>
                  <button type="button" onClick={() => decrease(item.id)}>
                    -
                  </button>
                  <span>{item.count}</span>
                  <button type="button" onClick={() => increase(item.id)}>
                    +
                  </button>
                </div>
                <div className={css.totalPrice}>
                  {formatCurrency(
                    Math.round(
                      item.price *
                        item.count *
                        (1 - (item.discount || 0) / 100),
                    ),
                  )}
                </div>
                <div className={css.actionColumn}>
                  <div className={css.scheduleInfo}>
                    <p>
                      주문일: <strong>{toDateLabel(item.orderDate)}</strong>
                    </p>
                    {item.preferredDeliveryDate && (
                      <p>
                        배송 희망일:{" "}
                        <strong>{toDateLabel(item.preferredDeliveryDate)}</strong>
                      </p>
                    )}
                    <p>
                      배송 일정: <strong>{toDateLabel(item.deliveryStartDate)}</strong>
                      {item.deliveryEndDate
                        ? ` ~ ${toDateLabel(item.deliveryEndDate)}`
                        : ""}
                    </p>
                  </div>
                  <button
                    className={css.deleteBtn}
                    onClick={() => handleDeleteClick(item.id)}
                    aria-label="삭제"
                    type="button"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={css.cartFooter}>
            <span>총금액: </span>
            <strong className={css.finalPrice}>{formatCurrency(totalSum)}</strong>
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
