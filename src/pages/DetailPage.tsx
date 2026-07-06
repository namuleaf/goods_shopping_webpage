import { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Modal } from "@/components/Modal";
import type { DetailLoaderData } from "@/types";
import { formatCurrency } from "@/utils/features";
import { DetailTabInfo } from "@/organism/DetailTabInfo";
import { SimilarProducts } from "@/organism/SimilarProducts";
import css from "./DetailPage.module.css";

type SectionMeta = {
  label: string;
  description: string;
  subText: string;
  accent: string;
  colors: string[];
  sizeText: string;
  packaging: string;
  shipping: string;
  notes: string[];
  gallery: string[];
};

const sectionMetaMap: Record<string, SectionMeta> = {
  phone: {
    label: "폰 액세서리",
    description: "휴대성과 실용성을 함께 챙기는 데일리 아이템",
    subText: "케이스, 거치, 보조 배터리까지 한 번에 둘러보는 섹션",
    accent: "var(--accent)",
    colors: ["아이보리", "블랙", "스카이", "그린", "코랄"],
    sizeText: "기본 / 라지 / 커스텀",
    packaging: "개별 포장 + 선물용 패키지 옵션",
    shipping: "주문 후 순차 제작 및 출고",
    notes: [
      "기종에 따라 인쇄 위치와 컷팅 범위가 달라질 수 있어요.",
      "무선 충전, 맥세이프 호환 여부는 상세 옵션을 확인해 주세요.",
    ],
    gallery: [
      "/img_PhoneItem/pd_magsafe_powerbank.png",
      "/img_PhoneItem/pd_magsafe_leather_holder.png",
      "/img_PhoneItem/pd_gift_airpods2.jpg",
      "/img_PhoneItem/pd_gift_buds2.jpg",
      "/img_PhoneItem/pd_gift_diy_tok.png",
      "/img_PhoneItem/pd_dome_smarttok.png",
      "/img_PhoneItem/pd_powerbank.png",
      "/img_PhoneItem/imgWrap1.jpg",
    ],
  },
  sticker: {
    label: "스티커",
    description: "다꾸, 노트, 포장에 잘 어울리는 감성 스티커",
    subText: "반투명, 무광, 커스텀 타입을 함께 볼 수 있어요.",
    accent: "var(--accent-warm)",
    colors: ["화이트", "투명", "파스텔", "네이비"],
    sizeText: "소형 / 중형 / 세트 구성",
    packaging: "시트 포장 + 수량별 묶음 발송",
    shipping: "재고 상품은 빠른 출고 가능",
    notes: [
      "커스텀 타입은 업로드 이미지 품질에 따라 결과물이 달라질 수 있어요.",
      "실사용 위치에 따라 접착 강도가 다르게 느껴질 수 있어요.",
    ],
    gallery: [
      "/img_StickerItem/pd_matte_pearl_sticker.png",
      "/img_StickerItem/pd_pvc_pop_sticker.png",
      "/img_StickerItem/pd_kisscut_sticker_free.png",
      "/img_StickerItem/pd_idphoto_sticker.png",
    ],
  },
  photo: {
    label: "포토 / 엽서",
    description: "사진의 분위기를 살리는 인쇄형 포토 굿즈",
    subText: "포토카드, 엽서, 포스터, 안내 이미지까지 함께 확인해요.",
    accent: "#4f6b82",
    colors: ["라이트그레이", "화이트", "웜베이지", "블랙"],
    sizeText: "포토카드 / 엽서 / 포스터",
    packaging: "훼손 방지 포장 + 사이즈별 분리 포장",
    shipping: "인쇄 공정 포함으로 제작 기간이 필요해요.",
    notes: [
      "이미지 비율에 따라 여백이나 재단이 달라질 수 있어요.",
      "고해상도 원본을 사용하면 결과물이 더 선명해요.",
    ],
    gallery: [
      "/img_PhotoItem/photoItem_detail_order/1001_preview.jpg",
      "/img_PhotoItem/photoItem_detail_order/img1_1.jpg",
      "/img_PhotoItem/photoItem_detail_order/img2_1.jpg",
      "/img_PhotoItem/photoItem_detail_order/size_guide.jpg",
      "/img_PhotoItem/pd_photocard_hologram.png",
      "/img_PhotoItem/pd_postcard_slogan.png",
    ],
  },
  acrylic: {
    label: "아크릴",
    description: "선명한 프린트와 투명한 소재감이 살아있는 굿즈",
    subText: "스탠드, 키링, 배지형 구성이 고르게 준비되어 있어요.",
    accent: "#6b7d8f",
    colors: ["클리어", "스모크", "라이트퍼플", "샌드"],
    sizeText: "스탠드 / 키링 / 미니 타입",
    packaging: "보호 필름 + 완충재 포장",
    shipping: "스크래치 방지를 위해 꼼꼼히 포장해 보내드려요.",
    notes: [
      "투명 소재 특성상 빛 반사에 따라 느낌이 달라질 수 있어요.",
      "보호 필름 제거 후 사용해 주세요.",
    ],
    gallery: [
      "/img_AcrylicItem/pd_acrylic_stand_v2.png",
      "/img_AcrylicItem/pd_gift_acrylic_diorama.png",
      "/img_AcrylicItem/pd_gift_car_keyring.png",
      "/img_AcrylicItem/pd_monitor_acrylic_stand.png",
    ],
  },
  living: {
    label: "리빙",
    description: "실생활에서 자주 쓰는 감성 생활 소품",
    subText: "데스크, 홈 인테리어, 파우치류까지 편하게 둘러보세요.",
    accent: "#7d6b57",
    colors: ["내추럴", "브라운", "크림", "그레이"],
    sizeText: "데스크 / 홈 / 휴대용",
    packaging: "생활 소품에 맞춘 안정 포장",
    shipping: "구성에 따라 빠른 발송 상품이 섞여 있어요.",
    notes: [
      "소재에 따라 세탁 및 관리 방법이 달라질 수 있어요.",
      "실내 환경에 따라 색감 차이가 있을 수 있어요.",
    ],
    gallery: [
      "/img_LivingItem/pd_gift_tumbler2.png",
      "/img_LivingItem/pd_memopad.png",
      "/img_LivingItem/pd_hand_mirror.png",
      "/img_LivingItem/pd_button_pouch.png",
    ],
  },
  calendar: {
    label: "캘린더",
    description: "탁상과 벽걸이로 쓰기 좋은 시즌성 아이템",
    subText: "책상 위나 벽면에 바로 어울리는 구성으로 준비했어요.",
    accent: "#516a5f",
    colors: ["화이트", "우드", "모카", "그린"],
    sizeText: "탁상 / 벽걸이 / 대형",
    packaging: "휨 방지 보강 포장",
    shipping: "시즌 상품은 빠르게 소진될 수 있어요.",
    notes: [
      "종이 두께와 제본 방식에 따라 펼쳐짐이 다를 수 있어요.",
      "달력은 시즌 전후로 재입고가 달라질 수 있어요.",
    ],
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
  description: "구매 전 핵심 정보를 한 번에 확인해 보세요.",
  subText: "상세 정보, 옵션, 배송 안내를 묶어서 보여드립니다.",
  accent: "var(--accent)",
  colors: ["화이트", "블랙", "그레이"],
  sizeText: "기본 구성",
  packaging: "안전 포장",
  shipping: "순차 출고",
  notes: ["상품별 상세 안내를 확인해 주세요."],
  gallery: [],
};

const getImageSrc = (img: string): string => {
  if (!img) return "/img/product01.jpg";
  if (img.startsWith("data:") || img.startsWith("http")) return img;
  return img.startsWith("/") ? img.replace(/^\/public/, "") : `/img/${img}`.replace("//", "/");
};

export const DetailPage = () => {
  const { product, filteredRelatedProducts } =
    useLoaderData() as DetailLoaderData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const productId = product?.id ?? "";

  useEffect(() => {
    if (!product) return;
    setSelectedImageIndex(0);
    setSelectedColor("");
  }, [productId, product]);

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

  const decrease = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));
  const increase = () => setCount((prev) => prev + 1);
  const handleAddToCart = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
            <img src={activeImage} alt={product.title} className={css.mainImage} />
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
                <img src={image} alt={`${product.title} 미리보기 ${index + 1}`} />
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
              <h3>색상</h3>
              <span>선택형</span>
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
            <button type="button" className={css.addBtn} onClick={handleAddToCart}>
              장바구니 담기
            </button>
          </div>

          <button type="button" className={css.buyBtn} onClick={handleAddToCart}>
            바로 구매하기
          </button>
        </div>
      </section>

      <section className={css.detailInfoSection}>
        <DetailTabInfo />
      </section>

      <section className={css.recommendSection}>
        <SimilarProducts relatedProducts={filteredRelatedProducts} />
      </section>

      {isModalOpen && (
        <Modal product={product} count={count} onClose={closeModal} />
      )}
    </main>
  );
};
