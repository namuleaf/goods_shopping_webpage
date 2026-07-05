/*
앱 진입점

이전까지는 BrowserRouter 를 사용했다

이번에에는 Data API 방식
createBrowserRouter 로 만든 router 객체를
RouterProvider 에 연결
이 방식을 쓰는이유는 이후에 loader, errorElement 기능을 사용하기 위함이다
*/

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
// 부트스트랩 css
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
