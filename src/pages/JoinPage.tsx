import React from "react";
import css from "./JoinPage.module.css";

export const JoinPage = () => {
  return (
    <div className={css.joinWrap}>
      <div className={css.joinContainer}>
        <h2>회원가입 혜택</h2>
        <div className={css.joinBenefitGrid}>
          <div className={css.benefitCard}>
            <h3>회원가입 축하</h3>
            <span className={css.amount}>2,000원 적립</span>
            <p>가입 즉시 지급되는 웰컴 적립금</p>
          </div>
          <div className={css.benefitCard}>
            <h3>마케팅 수신 </h3>
            <span className={css.amount}>1,000원 적립</span>
            <p>이벤트 알림 동의 시 즉시 지급</p>
          </div>
          <div className={css.benefitCard}>
            <h3>구매 적립 혜택</h3>
            <span className={css.amount}>구매금액의 1%</span>
            <p>예치금처럼 사용하거나 포인트몰에서 활용!</p>
          </div>
        </div>
        <div className={css.joinDesc}>
          <p>
            구매금액의 1% 적립금 지급 시
            <br />
            적립금 사용액 및 별도 할인 금액은 제외됩니다
            <br /> 적립금 사용 기한은 지급일로부터 1년입니다.
          </p>
        </div>
      </div>
      {/* 소셜 네트워크 로그인 */}
      <div className={css.snsBtnSection}>
        <div className={css.btn_kakao}>
          <p>카카오 로그인</p>
        </div>
        <div className={css.btn_naver}>
          <p>네이버 로그인</p>
        </div>
      </div>
      {/* 이용 약관 동의 */}
      <div className={css.agreementSection}>
        <h2>이용 약관 동의</h2>
        <label className={css.allCheck}>
          모든 약관을 확인하고 전체 동의합니다.
        </label>
        <div className={css.checkItem}>
          <>(필수) 이용약관 동의</>
          <span className={css.btnViewDetail}>전문보기</span>
        </div>
        <div className={css.checkItem}>
          <label>(필수)개인정보 수집 및 이용 동의</label>
          <span className={css.btnViewDetail}>전문보기</span>
        </div>
        <div className={css.checkItem}>
          <label>(필수)마케팅 정보 수신 동의</label>
          <span className={css.btnViewDetail}>전문보기</span>
        </div>
      </div>
      <button className={css.nextBtn}>다음 단계로</button>
    </div>
  );
};
