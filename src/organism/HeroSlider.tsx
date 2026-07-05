/*
메인 페이지의 배너 슬라이드 컴포넌트

useEffect를 통해서 
1. API 에서 배너 데이터를 가져옵니다
2. 배너가 로드 된 직후 자동으로 슬라이드 타이머를 시작한다
-> 슬라이드 자동으로 넘김

setInterval : 일정 시간마다 콜백을 반복 실행합니다 (여기서는 3초마다 슬라이드 전환)

클린업
컴포넌트가 화면에서 사라져도 타이머가 계속 실행되는 메모리 누수가 발생하기 때문에,
컴포넌트가 사라질 때 자동으로 클린업을 실행하여 인터벌을 멈춰 메모리 누수를 방지합니다.
*/

import React, { useEffect, useState } from "react";
import type { Banner } from "../types";
import { getBannerData } from "../api/bannerApi";
import css from "./HeroSlider.module.css";

export const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0); //현재 보여줄 배너 인덱스
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  // 첫 번째 useEffect : 마운트 시 배너 데이터 1회 로드
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBannerData();
        setBanners(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  //   두 번째 useEffect : 배너 로드 완료 후 자동 슬라이드 타이머 시작
  useEffect(() => {
    if (banners.length === 0) return;
    // 3초마다 다음 배너로 이동 (마지막이면 처음으로 돌아옴)
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    //   클린업 함수 : 컴포넌트가 언마운트 되거나 배너의 길이가 바뀔 때 기존 타이머 제거
    return () => clearInterval(timer);
  }, [banners.length]);

  if (loading || banners.length === 0) {
    return (
      <section
        className={css.mainSlider}
        style={{ backgroundColor: "#3498db" }}
      >
        <p>로딩 중...</p>
      </section>
    );
  }

  const currentBanner = banners[currentIndex];

  return (
    <section className={css.mainSlider}>
      {/* 배경 이미지 */}
      <img
        src={currentBanner.img}
        alt={currentBanner.title}
        className={css.bannerImage}
      ></img>

      {/* 슬라이드 텍스트 */}
      <div className={css.slideContent}>
        <h2 className={css.title}>{currentBanner.title}</h2>
        <p className={css.description}>{currentBanner.description}</p>
      </div>

      <div key={currentIndex} aria-hidden="true" className={css.progressBar}>
        <span className={css.progressFill} />
      </div>

      {/* 인디케이터 : 클릭하면 해당 배너로 바로 이동 */}
      <div className={css.indicatorContainer}>
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`${css.indicatorButton} ${currentIndex === index ? css.active : ""}`}
          ></button>
        ))}
      </div>
    </section>
  );
};
