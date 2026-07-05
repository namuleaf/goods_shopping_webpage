import React from "react";
import css from "./HomePage.module.css";

export const HomePage = () => {
  return <div className={css.container}>
    {/* 상단 상품 목록 스위퍼  */}
    <div className={css.swiperSlider}>
        <div>슬라이드 카드</div>
    </div>
    {/* 새로운 브랜드 */}
    <div className={css.newBrandSlider}>
        <div className={css.brandItemListCard}>
            <img></img>
            <ul>
                <li>폰케이스 인서트</li>
                <li>맥세이프 보조배터리</li>
                <li>핸드폰 보조배터리</li>
                <li>맥세이프 가죽 카드홀더</li>
                <li>반구원형 스마트톡</li>
                <li>아크릴 스마트톡/맥세이프톡</li>
            </ul>
        </div>

        <div className={css.ItemList}>
            <h2>상품 카테고리</h2>
            <p>상품 간략 설명</p>
            <div>상품 이미지 카드
                <h4>상품명</h4>
                <p>상품 소개 한줄</p>
            </div>
        </div>
    </div>


  </div>;
};
