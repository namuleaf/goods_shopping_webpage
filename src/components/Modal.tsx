import { useNavigate } from "react-router-dom";
import type { Product } from "@/types";
import { addToCart } from "@/api/cartApi";
import css from "./Modal.module.css";

interface ModalProps {
  product: Product;
  count: number;
  selectedOption?: string;
  selectedSize?: string;
  preferredDeliveryDate?: string;
  onClose: () => void;
}

const formatDate = (date: Date) => date.toISOString().slice(0, 10);

const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

export const Modal = ({
  product,
  count,
  selectedOption,
  selectedSize,
  preferredDeliveryDate,
  onClose,
}: ModalProps) => {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const optionValue = selectedOption || "default";
    const sizeValue = selectedSize || "default-size";
    const deliveryValue = preferredDeliveryDate || "default-date";
    const today = new Date();
    const orderDate = formatDate(today);
    const deliveryStartDate = formatDate(addDays(today, 2));
    const deliveryEndDate = formatDate(addDays(today, 4));

    const cartItem = {
      id: `${product.id}-${optionValue}-${sizeValue}-${deliveryValue}`,
      productId: product.id,
      title: product.title,
      img: product.img,
      price: product.price,
      discount: product.discount,
      category: product.category,
      count,
      selectedOption: optionValue,
      selectedOptionLabel: selectedOption ? `색상: ${selectedOption}` : "기본 옵션",
      selectedSize: sizeValue,
      selectedSizeLabel: selectedSize ? `사이즈: ${selectedSize}` : "기본 사이즈",
      orderDate,
      preferredDeliveryDate,
      deliveryStartDate,
      deliveryEndDate,
    };

    await addToCart(cartItem);
    onClose();
    navigate("/cart");
  };

  return (
    <div className={`${css.modal} ${css.active}`} onClick={onClose}>
      <div className={css.container} onClick={(e) => e.stopPropagation()}>
        <button className={css.btnClose} onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>
        <span className={css.check}>
          <i className="bi bi-check-circle"></i>
        </span>
        <div className={css.content}>
          <h3 id="cart-modal-title" className={css.modalTitle}>
            장바구니에 추가하시겠습니까?
          </h3>
          <div className={css.productSummary}>
            <p className={css.productTitle}>{product.title}</p>
            <p className={css.countText}>
              {selectedOption ? `색상: ${selectedOption}` : "기본 옵션"}
            </p>
            <p className={css.countText}>
              {selectedSize ? `사이즈: ${selectedSize}` : "기본 사이즈"}
            </p>
            {preferredDeliveryDate && (
              <p className={css.countText}>배송 희망일: {preferredDeliveryDate}</p>
            )}
            <p className={css.countText}>수량: {count}개</p>
          </div>
        </div>
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
