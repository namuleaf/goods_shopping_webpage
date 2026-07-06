import { useMemo, useState } from "react";
import type { Product } from "@/types";
import css from "./DetailTabInfo.module.css";

type ReviewItem = {
  id: number;
  title: string;
  author: string;
  score: number;
  date: string;
  category: string;
  sections: Product["section"][];
  phoneCategories?: Array<NonNullable<Product["phoneCategory"]>>;
  content: string;
};

const reviewData: ReviewItem[] = [
  {
    id: 1,
    title: "실물 색감이 사진이랑 거의 같아요",
    author: "민지",
    score: 5,
    date: "2026.07.02",
    category: "폰 악세사리",
    sections: ["phone"],
    phoneCategories: ["accessory", "item"],
    content:
      "배송도 빠르고 포장도 깔끔했어요. 화면에서 본 색감이랑 크게 다르지 않아서 선택한 옵션이 만족스러웠습니다.",
  },
  {
    id: 2,
    title: "그립감이 좋아서 자주 쓰게 돼요",
    author: "준호",
    score: 5,
    date: "2026.06.29",
    category: "폰 악세사리",
    sections: ["phone"],
    phoneCategories: ["accessory"],
    content:
      "폰 액세서리 쪽 상품인데 마감이 좋고 손에 쥐었을 때 느낌도 안정적이에요. 옵션 확인도 편해서 재구매할 것 같아요.",
  },
  {
    id: 3,
    title: "폰 아이템이랑 같이 두면 더 예뻐요",
    author: "서연",
    score: 4,
    date: "2026.06.25",
    category: "폰 아이템",
    sections: ["phone"],
    phoneCategories: ["item"],
    content:
      "데스크 위에 두고 쓰기 좋고, 다른 폰 아이템이랑 같이 배치하면 분위기가 잘 맞아요. 품질도 무난하게 만족합니다.",
  },
  {
    id: 4,
    title: "스티커는 재질이 생각보다 탄탄해요",
    author: "하린",
    score: 5,
    date: "2026.06.22",
    category: "스티커",
    sections: ["sticker"],
    content:
      "붙였을 때 색이 잘 살아 있고, 얇아서 금방 뜨는 느낌도 없어요. 캐릭터 상품이랑 같이 사기 좋았습니다.",
  },
  {
    id: 5,
    title: "달력은 책상에 두기 딱 좋은 크기예요",
    author: "지우",
    score: 5,
    date: "2026.06.18",
    category: "달력",
    sections: ["calendar"],
    content:
      "탁상 위에 놓기 적당한 크기라 실용적이에요. 디자인도 깔끔해서 사무용으로도 잘 어울립니다.",
  },
  {
    id: 6,
    title: "아크릴 제품은 조립 후 만족도가 높아요",
    author: "태윤",
    score: 4,
    date: "2026.06.15",
    category: "아크릴",
    sections: ["acrylic"],
    content:
      "조립이 어렵지 않고 완성했을 때 존재감이 있어요. 선물용으로도 괜찮을 것 같습니다.",
  },
  {
    id: 7,
    title: "생활 소품으로 쓰기 편해요",
    author: "수아",
    score: 5,
    date: "2026.07.04",
    category: "리빙",
    sections: ["living"],
    content:
      "실사용성이 좋아서 데일리로 쓰기 편합니다. 색감도 무난하고 다른 소품과도 잘 어울려요.",
  },
  {
    id: 8,
    title: "옵션 선택한 내용이 그대로 보여서 좋아요",
    author: "현우",
    score: 5,
    date: "2026.07.01",
    category: "폰 악세사리",
    sections: ["phone"],
    phoneCategories: ["accessory"],
    content:
      "상세페이지에서 고른 옵션이 장바구니에도 그대로 남아서 구매 전에 다시 확인하기 좋았습니다.",
  },
  {
    id: 9,
    title: "리뷰가 많은 이유를 알겠어요",
    author: "지민",
    score: 4,
    date: "2026.06.30",
    category: "스티커",
    sections: ["sticker"],
    content:
      "퀄리티가 안정적이고 무난하게 실패 없는 제품이에요. 옵션이 다양해서 고르기도 편했습니다.",
  },
  {
    id: 10,
    title: "달력 선물용으로도 좋아요",
    author: "도윤",
    score: 5,
    date: "2026.06.27",
    category: "달력",
    sections: ["calendar"],
    content:
      "포장도 깔끔하고 선물하기 좋습니다. 실제로 받아보니 화면보다 더 예쁜 느낌이 있었어요.",
  },
];

const starText = (score: number) => "★".repeat(score) + "☆".repeat(5 - score);

type DetailTabInfoProps = {
  product: Product;
};

const getReviewSummary = (product: Product) => {
  if (product.section === "phone") {
    const label = product.phoneCategory === "accessory" ? "폰 악세사리" : "폰 아이템";
    return {
      subtitle: `${label} 기준 리뷰`,
      tags: ["옵션 만족", "색감 정확", "마감 좋아요", "재구매 의사"],
    };
  }

  const sectionTagMap: Record<string, string[]> = {
    sticker: ["재질 만족", "색감 예쁨", "배송 빨라요", "재구매 의사"],
    photo: ["인쇄 선명", "선물용 추천", "실물 만족", "다시 살래요"],
    acrylic: ["조립 쉬움", "퀄리티 좋아요", "존재감 확실", "선물용 추천"],
    living: ["실사용 편함", "디자인 만족", "마감 깔끔", "재구매 의사"],
    calendar: ["사이즈 적당", "책상에 잘 맞음", "선물용 좋아요", "재구매 의사"],
  };

  return {
    subtitle: `${product.section} 상품 기준 리뷰`,
    tags: sectionTagMap[product.section] ?? ["배송 빨라요", "실물 만족", "재구매 의사", "선물용 추천"],
  };
};

export const DetailTabInfo = ({ product }: DetailTabInfoProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabTitles = useMemo(
    () => ["상세정보", "이미지 가이드", "주의사항", "이용후기"],
    [],
  );

  const filteredReviews = useMemo(() => {
    return reviewData.filter((review) => {
      if (!review.sections.includes(product.section)) return false;

      if (product.section !== "phone") return true;

      if (!review.phoneCategories || review.phoneCategories.length === 0) return true;

      return review.phoneCategories.includes(product.phoneCategory ?? "item");
    });
  }, [product.phoneCategory, product.section]);

  const reviewSummary = getReviewSummary(product);

  return (
    <div className={css.container}>
      <div className={css.tabHeader}>
        {tabTitles.map((title, i) => (
          <button
            key={title}
            onClick={() => setActiveTab(i)}
            className={`${css.tabBtn} ${activeTab === i ? css.active : ""}`}
            type="button"
          >
            {title}
          </button>
        ))}
      </div>

      <div className={css.content}>
        {activeTab === 0 && (
          <div className={css.tabPane}>
            <h3>상세정보</h3>
            <p>
              상품의 이미지와 구성, 옵션 정보를 한눈에 볼 수 있도록 정리한 영역입니다.
              실제 구매 전에 색상과 구성을 다시 확인해보세요.
            </p>
          </div>
        )}

        {activeTab === 1 && (
          <div className={css.tabPane}>
            <h3>이미지 가이드</h3>
            <p className={css.emptyText}>
              상세 이미지는 상품 유형에 맞춰 구성되어 있으며, 실제 상품은 카테고리별
              구성에 따라 다르게 보일 수 있습니다.
            </p>
          </div>
        )}

        {activeTab === 2 && (
          <div className={css.tabPane}>
            <h3>주의사항</h3>
            <ul className={css.guideList}>
              <li>모니터 환경에 따라 색상 차이가 있을 수 있습니다.</li>
              <li>주문 제작 상품은 안내된 일정 이후 출고될 수 있습니다.</li>
              <li>상품 특성상 단순 변심에 의한 반품이 제한될 수 있습니다.</li>
            </ul>
          </div>
        )}

        {activeTab === 3 && (
          <div className={css.tabPane}>
            <div className={css.reviewHeader}>
              <div>
                <h3>이용 후기</h3>
                <p>{reviewSummary.subtitle}</p>
              </div>
              <button type="button" className={css.reviewWriteBtn}>
                이용 후기 작성
              </button>
            </div>

            <div className={css.reviewSummary}>
              <div className={css.reviewScoreBox}>
                <strong>4.8</strong>
                <span>평균 만족도</span>
              </div>
              <div className={css.reviewTagBox}>
                {reviewSummary.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className={css.reviewList}>
              {filteredReviews.map((review) => (
                <article key={review.id} className={css.reviewCard}>
                  <div className={css.reviewTop}>
                    <div>
                      <p className={css.reviewCategory}>{review.category}</p>
                      <h4>{review.title}</h4>
                    </div>
                    <div className={css.reviewMeta}>
                      <span>{review.author}</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                  <div className={css.reviewStar}>{starText(review.score)}</div>
                  <p className={css.reviewContent}>{review.content}</p>
                </article>
              ))}
              {filteredReviews.length === 0 && (
                <p className={css.emptyText}>현재 상품 유형에 맞는 리뷰가 아직 없습니다.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
