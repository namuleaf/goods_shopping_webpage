/*
소개 페이지

스켈레톤 UI
-> 콘텐츠가 로딩 중일 때 실제 레이아웃과 비슷한 회색 블록을 먼저 보여주는 기법
-> 사용자에게 데이터를 불러오는 중 임을 시각적으로 알려주고
-> 단순한 로딩중... 보다 레이아웃 변화가 자연스럽게 전환

구현 방법 : 
loading 상태가 true 이면 스켈레톤 블록을 렌더링하고,
false 가 되면 실제 콘텐츠로 교체합니다
-> 스켈레톤과 실제 콘텐츠의 레이아웃(크기, 위치)을 최대한 비슷하게 맞추는것이 핵심

이 파일에서는 학습용으로 delay를 넘어서 스켈레톤 효과를 확인
*/

import React, { useEffect, useState } from "react";
import css from "./AboutPage.module.css";

// delay 함수 : ms 밀리초 동안 기다리는 Promise 를 반환
// 학습용임
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const AboutPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const wait = async () => {
      try {
        await delay(3000);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    wait();
  }, []);

  return (
    <main className={css.container}>
      <section className={css.header}>
        <h2 className={css.title}>About Dearly</h2>
        <p className={css.subtitle}>
          나만의 스토리와 감성을 담은 굿즈로 특별한 기분을 더해보세요
        </p>
      </section>

      <section className={css.storySection}>
        {loading ? (
          // 로딩 중: 실제 콘텐츠와 동일한 레이아웃의 스켈레톤 블록
          <>
            <div className={`${css.imgWrap} ${css.skeleton}`}></div>
            <div className={css.textWrap}>
              {/* 제목 크기 스켈레톤 */}
              <div
                className={css.skeleton}
                style={{ width: "60%", height: "35px", marginBottom: "20px" }}
              ></div>
              {/* 본문 줄 스켈레톤*/}
              <div
                className={css.skeleton}
                style={{ width: "100%", height: "18px", marginBottom: "10px" }}
              ></div>
              <div
                className={css.skeleton}
                style={{ width: "95%", height: "18px", marginBottom: "10px" }}
              ></div>
              <div
                className={css.skeleton}
                style={{ width: "80%", height: "18px", marginBottom: "10px" }}
              ></div>
            </div>
          </>
        ) : (
          //   로딩 완료 : 실제 콘텐츠
          <>
            <div className={css.imgWrap}>
              <img src="/img_PhoneItem/imgWrap1.jpg" alt="Brand Story"></img>
            </div>
            <div className={css.textWrap}>
              <h3>More Special Goods</h3>
              <p>
                Dearly는 단순한 상품 제작에 그치지 않고, 그 안에
                추억과 스토리를 담아내는 굿즈 제작 플랫폼입니다.
              </p>
              <p>
                섬세한 제작과 신속한 배송을 통해 
                원하시는 그 모습 그대로의 굿즈를 전달합니다.
                일상에 특별함을 더해줄, 오직 당신만을 위한 
                컬렉션, Dearly와 빛나는 순간을 함께해보세요.
              </p>
            </div>
          </>
        )}
      </section>

      <section className={css.valueSection}>
        <div className={css.valueItem}>
          <i className="bi bi-gem"></i>
          <h4>Premium Quality</h4>
          <p>
            고객님의 요청사항을 꼼꼼히 살펴
            <br />
            원하시는 퀄리티를 보장합니다.
          </p>
        </div>
        <div className={css.valueItem}>
          <i className="bi bi-hammer"></i>
          <h4>Handcrafted</h4>
          <p>
            공정 과정을 철저하게 관리하여
            <br />
            완성도 높은 상품을 제작합니다.
          </p>
        </div>
        <div className={css.valueItem}>
          <i className="bi bi-heart"></i>
          <h4>Customer Care</h4>
          <p>
            구매 후에도 지속적인 관리 서비스와 더불어
            <br />
            다양한 혜택을 제공합니다.
          </p>
        </div>
      </section>
    </main>
  );
};
