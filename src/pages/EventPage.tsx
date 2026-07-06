import React from "react";
import css from "./EventPage.module.css";
import { FallbackImage } from "@/components/FallbackImage";

// 블로그 포스트 타입 정의
interface EventPost {
  id: number;
  category: string;
  title: string;
  date: string;
  desc: string;
  img: string;
}

export const EventPage = () => {
  // 임시 이벤트 더미 데이터
  const eventPosts: EventPost[] = [
    {
      id: 1,
      category: "STYLING TIP",
      title: "판촉물 주문 가이드",
      date: "2024. 03. 15",
      desc: "판촉물/굿즈 대량 구매가 처음이라면?",
      img: "/img/product01.jpg",
    },
    {
      id: 2,
      category: "CARE GUIDE",
      title: "특별 주문 이벤트",
      date: "2024. 03. 10",
      desc: "주문 이벤트 배너를 확인하세요",
      img: "/img/product02.jpg",
    },
    {
      id: 3,
      category: "NEW ARRIVAL",
      title: "올해의 Goods Collection 런칭",
      date: "2024. 02. 28",
      desc: "대다수의 이용자가 추천한 히트 굿즈들을 확인하고 올해의 대표작 선정 이벤트에 참여하세요 ",
      img: "/img/product03.jpg",
    },
    {
      id: 4,
      category: "GIFT GUIDE",
      title: "선물하기 좋은 굿즈 BEST 5",
      date: "2024. 02. 14",
      desc: "행사 또는 기념일을 위한 굿즈를 찾으시나요? 만족도 높은 굿즈 추천 리스트를 확인하세요.",
      img: "/img/product04.jpg",
    },
  ];
  return (
    <main className={css.container}>
      {/* 페이지 헤더 */}
      <section className={css.header}>
        <h2 className={css.title}>Dearly Event</h2>
        <p className={css.subtitle}>
          다양한 굿즈 포트폴리오와 이벤트를 확인해보세요
        </p>
      </section>
      {/* 블로그 포스트 그리드 */}
      <section className={css.eventGrid}>
        {eventPosts.map((post) => (
          <article key={post.id} className={css.card}>
            <div className={css.imgWrap}>
              <FallbackImage src={post.img} alt={post.title} />
            </div>
            <div className={css.textWrap}>
              <span className={css.category}>{post.category}</span>
              <h3 className={css.postTitle}>{post.title}</h3>
              <p className={css.postDesc}>{post.desc}</p>
              <span className={css.date}>{post.date}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};
