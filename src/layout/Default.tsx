// 공통 레이아웃 컴포넌트

/*
router.tsx 에서 / 경로의 element 로 <Default/>를 지정하고,
그 안에 children 라우트들을 넣습니다

<Outlet/>은 자식 라우트이 페이지 컴포넌트가 여기에 들어옵니다
라는 자리표시자

결과:
/ 접속 -> Default 레이아웃 안에 MainPage 렌더링
/shop -> Default 레이아웃 안에 ShopPage 렌더링
-> Header와 Footer는 모든 페이지에서 공통으로 유지됩니다
*/
import React from "react";
import { Header } from "../organism/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Footer } from "../organism/Footer";
import { QuickEtcHover } from "@/organism/QuickEtcHover";
import { ChatbotWidget } from "@/organism/ChatbotWidget";

export const Default = () => {
  return (
    <div>
      {/* 페이지 이동 시 스크롤이 최상단으로 이동 */}
      <ScrollRestoration />
      <Header />
      {/* 자식 페이지가 Outlet에 들어옵니다 */}
      <QuickEtcHover/>
      <ChatbotWidget/>
      <Outlet />
      <Footer />
    </div>
  );
};
