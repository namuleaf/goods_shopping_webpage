import { useRef } from "react";
import css from "./UserPage.module.css";
import { CategoryCatalog } from "./userpage/CategoryCatalog";
import { DeliveryScheduleCard } from "./userpage/DeliveryScheduleCard";
import { RecentOrderDelivery } from "./userpage/RecentOrderDelivery";
import { benefitTiers, currentBenefitTierIndex } from "./userpageData";

const gradeCards = [
  {
    current: "comet",
    next: "moon",
    currentTitle: "현재 등급",
    nextTitle: "다음 등급 안내",
    currentPoints: ["구매 이력 요약", "주문 정보 확인", "회원 전용 안내"],
  }
];

export const UserPage = () => {
  const orderDateInputRef = useRef<HTMLInputElement>(null);
  const deliverySectionRef = useRef<HTMLDivElement>(null);
  const currentGradeIndex = currentBenefitTierIndex;
  const currentGrade = gradeCards[currentGradeIndex] ?? gradeCards[0];

  const focusOrderDate = () => {
    deliverySectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      orderDateInputRef.current?.focus();
    }, 250);
  };

  return (
    <main className={css.container}>
      <aside className={css.userPageCat}>
        <h2>마이페이지</h2>
        <ul>
          <li>주문 정보</li>
          <li>결제 내역</li>
          <li>회원 정보 수정</li>
          <li>최근 주문 배송 확인</li>
          <li>
            <button type="button" className={css.sideAction} onClick={focusOrderDate}>
              <i className="bi bi-truck" aria-hidden="true"></i>
              배송 일정 확인
            </button>
          </li>
        </ul>
      </aside>

      <section className={css.content}>
        <section className={css.profileSection}>
          <div className={css.basicProfile}>
            <img
              src="/userpageImage/useraccountImage_delBg.png"
              alt="프로필 이미지"
              className={css.profileImage}
            />
            <div className={css.gradeBasicBanner}>
              <h2>Dearly 회원님 반가워요!</h2>
            <div >
              <div className={css.gradeCard}>
                <span>{currentGrade.currentTitle}</span>
                <h3>{currentGrade.current}</h3>
                {currentGrade.currentPoints.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>
            </div>

            <section className={css.benefitSection}>
              <div className={css.benefitHeader}>
                <h3>등급별 혜택 안내</h3>
              </div>
              <div className={css.benefitGrid}>
                {benefitTiers.map((tier, index) => (
                  <article key={tier.name} className={css.benefitCard}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h4>{tier.name}</h4>
                    <p className={css.tierSubtitle}>{tier.subtitle}</p>
                    <ul className={css.tierList}>
                      {tier.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
            </div>
           
          </div>

       
        </section>

        <CategoryCatalog />

        

        <RecentOrderDelivery />
      </section>
    </main>
  );
};
