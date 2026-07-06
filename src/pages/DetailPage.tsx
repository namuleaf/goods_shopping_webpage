import { useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { Modal } from "@/components/Modal";
import type { DetailLoaderData } from "@/types";
import { formatCurrency } from "@/utils/features";
import { DetailTabInfo } from "@/organism/DetailTabInfo";
import { SimilarProducts } from "@/organism/SimilarProducts";
import { FallbackImage } from "@/components/FallbackImage";
import css from "./DetailPage.module.css";

type SectionMeta = {
  label: string;
  description: string;
  subText: string;
  colors: string[];
  sizes: string[];
  shipping: string;
  gallery: string[];
};

const sectionMetaMap: Record<string, SectionMeta> = {
  phone: {
    label: "폰 악세사리",
    description: "케이스, 거치대, 보조배터리까지 한 번에 확인하는 섹션입니다.",
    subText: "색상과 사이즈를 먼저 고른 뒤 디자인 만들기로 자연스럽게 이어집니다.",
    colors: ["아이보리", "블랙", "스카이", "그린", "크림"],
    sizes: ["S", "M", "L"],
    shipping: "주문 후 순차 출고",
    gallery: [
      "/img_PhoneItem/pd_magsafe_powerbank.png",
      "/img_PhoneItem/pd_magsafe_leather_holder.png",
      "/img_PhoneItem/pd_gift_airpods2.jpg",
      "/img_PhoneItem/pd_powerbank.png",
    ],
  },
  sticker: {
    label: "스티커",
    description: "다꾸, 포장, 캐릭터 스티커를 모아둔 섹션입니다.",
    subText: "재질과 활용 용도를 확인하고 취향에 맞는 아이템을 골라보세요.",
    colors: ["화이트", "핑크", "민트", "퍼플"],
    sizes: ["Mini", "Standard", "Large"],
    shipping: "재고 상품 즉시 출고",
    gallery: [
      "/img_StickerItem/pd_matte_pearl_sticker.png",
      "/img_StickerItem/pd_pvc_pop_sticker.png",
      "/img_StickerItem/pd_kisscut_sticker_free.png",
    ],
  },
  photo: {
    label: "포토",
    description: "포토카드, 엽서, 포스터를 중심으로 보는 섹션입니다.",
    subText: "이미지 크기와 인쇄 형태를 함께 확인하면 더 정확하게 선택할 수 있어요.",
    colors: ["화이트", "블루", "베이지", "블랙"],
    sizes: ["A5", "A4", "A3"],
    shipping: "제작 후 출고",
    gallery: [
      "/img_PhotoItem/photoItem_detail_order/1001_preview.jpg",
      "/img_PhotoItem/photoItem_detail_order/img1_1.jpg",
      "/img_PhotoItem/photoItem_detail_order/img2_1.jpg",
      "/img_PhotoItem/photoItem_detail_order/size_guide.jpg",
    ],
  },
  acrylic: {
    label: "아크릴",
    description: "아크릴 스탠드, 키링, 디오라마 상품을 모아둔 섹션입니다.",
    subText: "투명감과 조립 완성도를 중요하게 보는 상품들을 확인해보세요.",
    colors: ["투명", "화이트", "핑크", "스모크"],
    sizes: ["Mini", "Standard", "Wide"],
    shipping: "제작 후 안전 포장",
    gallery: [
      "/img_AcrylicItem/pd_acrylic_stand_v2.png",
      "/img_AcrylicItem/pd_gift_acrylic_diorama.png",
      "/img_AcrylicItem/pd_gift_car_keyring.png",
    ],
  },
  living: {
    label: "리빙",
    description: "데일리로 쓰기 좋은 생활 소품 카테고리입니다.",
    subText: "실사용성과 분위기를 함께 확인해보세요.",
    colors: ["베이지", "브라운", "그린", "그레이"],
    sizes: ["Compact", "Standard", "Plus"],
    shipping: "구성품 검수 후 발송",
    gallery: [
      "/img_LivingItem/pd_gift_tumbler2.png",
      "/img_LivingItem/pd_memopad.png",
      "/img_LivingItem/pd_button_pouch.png",
    ],
  },
  calendar: {
    label: "달력",
    description: "탁상달력, 벽걸이달력, 미니달력을 확인할 수 있습니다.",
    subText: "책상 위나 벽면에 잘 맞는 크기를 먼저 확인해보세요.",
    colors: ["화이트", "우드", "올리브", "그린"],
    sizes: ["Desktop", "Wall", "Large"],
    shipping: "시즌 상품 순차 출고",
    gallery: [
      "/img_CalendarItem/pd_clnd_table.png",
      "/img_CalendarItem/pd_clnd_mini.png",
      "/img_CalendarItem/pd_clnd_bigwall_large.png",
      "/img_CalendarItem/pd_clnd_woodwide.png",
    ],
  },
};

const defaultMeta: SectionMeta = {
  label: "상품",
  description: "선택한 상품 정보를 아래에서 확인해보세요.",
  subText: "옵션, 사이즈, 배송 희망일, 상세 정보를 함께 보여드립니다.",
  colors: ["기본"],
  sizes: ["Standard"],
  shipping: "기본 출고",
  gallery: [],
};

const getImageSrc = (img: string): string => {
  if (!img) return "/img/product01.jpg";
  if (img.startsWith("data:") || img.startsWith("http")) return img;
  return img.startsWith("/") ? img.replace(/^\/public/, "") : `/img/${img}`.replace("//", "/");
};

const formatDateInput = (date: Date) => date.toISOString().slice(0, 10);

const addBusinessDays = (baseDate: Date, businessDays: number) => {
  const nextDate = new Date(baseDate);
  let addedDays = 0;

  while (addedDays < businessDays) {
    nextDate.setDate(nextDate.getDate() + 1);
    const day = nextDate.getDay();
    if (day !== 0 && day !== 6) addedDays += 1;
  }

  return nextDate;
};

export const DetailPage = () => {
  const { product, filteredRelatedProducts } = useLoaderData() as DetailLoaderData;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(
    formatDateInput(addBusinessDays(new Date(), 3)),
  );

  useEffect(() => {
    if (!product) return;
    const queryColor = searchParams.get("color");
    const querySize = searchParams.get("size");
    setSelectedImageIndex(0);
    setSelectedColor(queryColor || sectionMetaMap[product.section]?.colors?.[0] || "기본");
    setSelectedSize(querySize || sectionMetaMap[product.section]?.sizes?.[0] || "Standard");
    setSelectedDeliveryDate(formatDateInput(addBusinessDays(new Date(), 3)));
  }, [product, searchParams]);

  if (!product) {
    return (
      <main className={css.page}>
        <p>상품을 찾을 수 없습니다.</p>
      </main>
    );
  }

  const sectionMeta = sectionMetaMap[product.section] ?? defaultMeta;
  const galleryImages = useMemo(() => {
    const images = [product.img, ...sectionMeta.gallery].map(getImageSrc);
    return Array.from(new Set(images));
  }, [product.img, sectionMeta.gallery]);

  const activeImage = galleryImages[selectedImageIndex] ?? getImageSrc(product.img);
  const discountPrice =
    product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

  const designQuery = new URLSearchParams({
    size: selectedSize,
    color: selectedColor,
  }).toString();

  const decrease = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));
  const increase = () => setCount((prev) => prev + 1);

  return (
    <main className={css.page}>
      <section className={css.heroSection}>
        <div className={css.galleryColumn}>
          <div className={css.mainImageCard}>
            <div className={css.badgeRow}>
              <span className={css.sectionBadge}>{sectionMeta.label}</span>
              <span className={css.kindBadge}>{product.category}</span>
            </div>
            {product.discount > 0 && (
              <span className={css.discountBadge}>{product.discount}% 할인</span>
            )}
            <FallbackImage src={activeImage} alt={product.title} className={css.mainImage} />
          </div>

          <div className={css.thumbGrid}>
            {galleryImages.map((image, index) => (
              <button
                key={image}
                type="button"
                className={
                  selectedImageIndex === index
                    ? `${css.thumbBtn} ${css.thumbBtnActive}`
                    : css.thumbBtn
                }
                onClick={() => setSelectedImageIndex(index)}
              >
                <FallbackImage src={image} alt={`${product.title} 미리보기 ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className={css.infoColumn}>
          <p className={css.breadcrumb}>홈 / {sectionMeta.label} / {product.title}</p>
          <p className={css.sectionName}>{sectionMeta.description}</p>
          <h1 className={css.title}>{product.title}</h1>
          <p className={css.summary}>{sectionMeta.subText}</p>

          <div className={css.priceBox}>
            {product.discount > 0 && (
              <span className={css.originalPrice}>{formatCurrency(product.price)}</span>
            )}
            <div className={css.priceRow}>
              <strong className={css.price}>{formatCurrency(discountPrice)}</strong>
              {product.discount > 0 && (
                <span className={css.priceChip}>{product.discount}% OFF</span>
              )}
            </div>
            <p className={css.shippingNote}>배송: {sectionMeta.shipping}</p>
          </div>

          <div className={css.optionSection}>
            <div className={css.optionHead}>
              <h3>색상 선택</h3>
              <span>원하는 색상을 골라주세요</span>
            </div>
            <div className={css.chipRow}>
              {sectionMeta.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={
                    selectedColor === color
                      ? `${css.optionChip} ${css.optionChipActive}`
                      : css.optionChip
                  }
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className={css.optionSection}>
            <div className={css.optionHead}>
              <h3>사이즈 선택</h3>
              <span>디자인 화면에 반영돼요</span>
            </div>
            <div className={css.chipRow}>
              {sectionMeta.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={
                    selectedSize === size
                      ? `${css.optionChip} ${css.optionChipActive}`
                      : css.optionChip
                  }
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className={css.optionSection}>
            <div className={css.optionHead}>
              <h3>배송 희망일</h3>
              <span>주문 전에 날짜를 선택</span>
            </div>
            <input
              className={css.deliveryDateInput}
              type="date"
              value={selectedDeliveryDate}
              min={formatDateInput(new Date())}
              onChange={(e) => setSelectedDeliveryDate(e.target.value)}
            />
            <p className={css.deliveryDateGuide}>
              선택한 배송 희망일은 장바구니와 마이페이지에서 확인할 수 있어요.
            </p>
          </div>

          <div className={css.quickBuy}>
            <div className={css.counterArea}>
              <button type="button" onClick={decrease}>
                -
              </button>
              <span>{count}</span>
              <button type="button" onClick={increase}>
                +
              </button>
            </div>
            <button type="button" className={css.addBtn} onClick={() => setIsModalOpen(true)}>
              장바구니 담기
            </button>
          </div>

          <button
            type="button"
            className={css.buyBtn}
            onClick={() => setIsModalOpen(true)}
          >
            바로 구매하기
          </button>

          <button
            type="button"
            className={css.designBtn}
            onClick={() => navigate(`/design/${product.id}?${designQuery}`)}
          >
            디자인 만들기
          </button>
        </div>
      </section>

      <section className={css.detailInfoSection}>
        <DetailTabInfo product={product} />
      </section>

      <section className={css.recommendSection}>
        <SimilarProducts relatedProducts={filteredRelatedProducts} />
      </section>

      {isModalOpen && (
        <Modal
          product={product}
          count={count}
          selectedOption={selectedColor}
          selectedSize={selectedSize}
          preferredDeliveryDate={selectedDeliveryDate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
};
