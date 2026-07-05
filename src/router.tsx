/*
router.tsx 라우터 설정 = React Router Data API 방식

createBrowserRouter : 라우트 배열을 받아 라우터 객체를 만듭니다

errorElement : 에러 발생 시(존재하지 않는 경로, loader 에러 등) 보여줄 컴포넌트

children : 중첩 라우트 - Default 레이아웃 안에서 각 페이지가 교체됩니다

loader : 페이지 렌더링 전에 데이터를 미리 가져오는 함수
    -> 페이지 컴포넌트에서 useLoaderDate() 로 받아서 사용

:productId : URL 파라미터 - detail/1 처럼 동적 경로를 처리
    -> 페이지 컴포넌트에서 useParams() 로 받아서 사용
*/
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Default } from "./layout/Default";
import { NotFound } from "./pages/NotFound";
import { MainPage } from "./pages/MainPage";
import { AboutPage } from "./pages/AboutPage";
import { EventPage } from "./pages/EventPage";
import { ShopPage } from "./pages/ShopPage";
import { detailPageLoader, shopPageLoader } from "./loader/productsLoader";
import { CartPage } from "./pages/CartPage";
import { cartPageLoader } from "./loader/cartLoader";
import { DetailPage } from "./pages/DetailPage";
import { MyPage } from "./pages/MyPage";
import { HomePage } from "./pages/HomePage";
import { JoinPage } from "./pages/JoinPage";
import { PhoneItemPage } from "./pages/PhoneItemPage";
import { QuickEtcHover } from "./organism/QuickEtcHover";
import { UserPage } from "./pages/UserPage";
import { ChatbotWidget } from "./organism/ChatbotWidget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/event", element: <EventPage /> },
      { path: "/shop", element: <ShopPage />, loader: shopPageLoader },
      { path: "/cart", element: <CartPage />, loader: cartPageLoader },
      {
        path: "/detail/:productId",
        element: <DetailPage />,
        loader: detailPageLoader,
      },

      // 카테고리아이템 쇼핑목록(일단 폰만)
      {
        path: "/phonePage",
        element: <PhoneItemPage />,
      },

      { path: "/userpage", element: <UserPage /> },
      { path: "/mypage", element: <MyPage /> },
      { path: "/homepage", element: <HomePage /> },
      { path: "/join", element: <JoinPage /> },
      { path: "/hover", element: <QuickEtcHover /> },
      { path: "/chatbot", element: <ChatbotWidget /> },
    ],
  },
]);

export default router;
