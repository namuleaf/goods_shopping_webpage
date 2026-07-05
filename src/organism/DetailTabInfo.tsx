/* 
상품 상세 탭 컴포넌트 입니다
 organism 인 이유는? 해당 탭 컴포넌트 자체가 레이아웃 일정 부분 자체를 차지하기 때문

 탭  UI의 핵심은 "어떤 탭이 선택되었는가"를 숫자(인덱스)로 관리하는 것입니다.
*/
import React, { useState } from "react";
import css from "./DetailTabInfo.module.css";

export const DetailTabInfo = () => {
  // 현재 선택된 탭의 인덱스 (0: 상품정보, 1: 리뷰, 2: 배송)
  const [activeTab, setActiveTab] = useState(0);
  const tabTitles = [
    "상세정보",
    "사이즈",
    "이미지 배경 제거",
    "유의사항",
    "배송/교환/반품",
    "이용후기",
  ];
  return (
    <div className={css.container}>
      {/* 탭 헤더: 클릭하면 activeTab 변경 */}
      <div className={css.tabHeader}>
        {tabTitles.map((title, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`${css.tabBtn} ${activeTab === i ? css.active : ""}`}
          >
            {title}
          </button>
        ))}
      </div>

      {/* 탭 내용: activeTab 값에 따라 해당 내용만 렌더링 */}
      <div className={css.content}>
        {activeTab === 0 && (
          <div className={css.tabPane}>
            <h3>상세정보</h3>
            <p>
              본 상품에 대한 정보는 이하 내용을 확인하세요.
              <br />
              <br />
              (여기에 상세 이미지나 구체적인 스펙이 들어갑니다)
            </p>
          </div>
        )}

        {activeTab === 1 && (
          <div className={css.tabPane}>
            <h3>사이즈</h3>
            <p className={css.emptyText}>상품의 사이즈를 확인하세요.</p>
          </div>
        )}

        {activeTab === 2 && (
          <div className={css.tabPane}>
            <h3>이미지 변경 Tip</h3>
            <p className={css.emptyText}>이미지 변경 및 배경 제거에 관련된 안내입니다.</p>
          </div>
        )}

        {activeTab === 3 && (
          <div className={css.tabPane}>
            <h3>유의사항</h3>
            <p className={css.emptyText}>유의사항을 꼭 읽어주세요!.</p>
          </div>
        )}

        {activeTab === 4 && (
          <div className={css.tabPane}>
            <h3>배송/교환/반품 안내</h3>
            <div className={css.guideList}>
              <li>
                배송 기간: 주문 제작 상품으로 주말/공휴일 제외 7~10일 소요
              </li>
              <li>
                교환/반품 : 상품 수령 후 7일 이내(단, 주문 제작 상품은 단순 변심
                반품 불가)
              </li>
              <li>A/S : 구매일로부터 1년 무상 수리</li>
            </div>
          </div>
        )}
        {activeTab === 5 && (
          <div className={css.tabPane}>
            <h3>이용 후기</h3>
            <p>전체 후기</p>
            <p>포토 후기</p>
            <button>이용 후기 작성</button>
            <div className={css.reviewList}>
              <li>
                배송 기간: 주문 제작 상품으로 주말/공휴일 제외 7~10일 소요
              </li>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
