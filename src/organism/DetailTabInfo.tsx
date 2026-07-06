import { useMemo, useState } from "react";
import css from "./DetailTabInfo.module.css";

const reviewData = [
  {
    id: 1,
    title: "실물 색감이 사진이랑 거의 같아요",
    author: "김지은",
    score: 5,
    date: "2026.07.02",
    category: "포토 후기",
    content:
      "배송도 빠르고 포장도 깔끔했어요. 화면에서 보던 색감이랑 실제 색감 차이가 거의 없어서 만족했습니다. 선물용으로도 무난하게 좋을 것 같아요.",
  },
  {
    id: 2,
    title: "폰케이스가 생각보다 훨씬 탄탄해요",
    author: "박민호",
    score: 5,
    date: "2026.06.29",
    category: "전체 후기",
    content:
      "가볍게 끼우는 느낌일 줄 알았는데 잡아주는 힘이 좋아서 안정감이 있어요. 버튼 누르는 느낌도 괜찮고, 맥세이프 제품이랑 같이 써도 불편하지 않았습니다.",
  },
  {
    id: 3,
    title: "스티커 세트 구성이 알차네요",
    author: "이서연",
    score: 4,
    date: "2026.06.25",
    category: "포토 후기",
    content:
      "다꾸용으로 샀는데 시트 구성이 다양해서 여기저기 붙이기 좋았어요. 접착력도 적당하고, 얇아서 겹쳐 붙여도 크게 튀지 않아서 마음에 들었습니다.",
  },
  {
    id: 4,
    title: "리뷰 보고 샀는데 실용성 좋아요",
    author: "정우성",
    score: 5,
    date: "2026.06.22",
    category: "전체 후기",
    content:
      "책상 위에 두고 쓰기 좋은 크기라 만족합니다. 데일리로 쓰기 부담 없고, 포장도 꼼꼼해서 선물하기에도 괜찮겠어요.",
  },
  {
    id: 5,
    title: "아크릴 재질이 깔끔하고 투명해요",
    author: "최하린",
    score: 4,
    date: "2026.06.18",
    category: "포토 후기",
    content:
      "인쇄가 뭉개지지 않고 깔끔하게 들어와서 좋았어요. 빛 받으면 더 예쁘게 보여서 데스크 위에 올려두니 분위기가 살아납니다.",
  },
  {
    id: 6,
    title: "배송 예정일보다 조금 빨리 왔어요",
    author: "한도윤",
    score: 5,
    date: "2026.06.15",
    category: "전체 후기",
    content:
      "선물하려고 주문했는데 예상보다 빨리 받아서 일정 맞추기 좋았어요. 상품 퀄리티도 무난 이상이라 재구매할 것 같습니다.",
  },
];

const starText = (score: number) => "★".repeat(score) + "☆".repeat(5 - score);

export const DetailTabInfo = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabTitles = useMemo(
    () => ["상세정보", "이미지 가이드", "주의사항", "이용후기"],
    [],
  );

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
              상품은 이미지에 보이는 구성과 동일한 방향으로 준비되어 있습니다. 
              실제 구매 전에는 옵션, 색감, 제작 방식, 배송 일정까지 함께 확인해
              주세요.
            </p>
          </div>
        )}

        {activeTab === 1 && (
          <div className={css.tabPane}>
            <h3>이미지 가이드</h3>
            <p className={css.emptyText}>
              상세 이미지와 썸네일은 상품 이해를 돕기 위한 예시이며, 실제 상품은
              카테고리별 구성에 따라 다를 수 있습니다.
            </p>
          </div>
        )}

        {activeTab === 2 && (
          <div className={css.tabPane}>
            <h3>주의사항</h3>
            <ul className={css.guideList}>
              <li>모니터 해상도에 따라 색상 차이가 있을 수 있습니다.</li>
              <li>인쇄형 상품은 이미지 비율에 따라 여백이 달라질 수 있습니다.</li>
              <li>제작 상품은 주문 이후 취소가 제한될 수 있습니다.</li>
            </ul>
          </div>
        )}

        {activeTab === 3 && (
          <div className={css.tabPane}>
            <div className={css.reviewHeader}>
              <div>
                <h3>이용 후기</h3>
                <p>총 6개의 더미 리뷰</p>
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
                <span>배송 빨라요</span>
                <span>색감 좋아요</span>
                <span>포장 깔끔해요</span>
                <span>선물용 추천</span>
              </div>
            </div>

            <div className={css.reviewList}>
              {reviewData.map((review) => (
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
