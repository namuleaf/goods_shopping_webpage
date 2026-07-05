/*
에러 페이지

router.tsx 에서 errorElement: <NotFound/> 로 등록
에러가 발생하는 두 가지 경우 모두 이 컴포넌트가 렌더링
1. 존재하지 않는 경로로 접속 -> React Router 가 자동으로 404으로 에러 생성
2. loader 함수 안에서 throw new Response (...) => 해당 에러 전달

useRouterError() 는 errorElement 안에서만 쓸 수 있는 훅입니다

-> 에러 종류에 따라 다른 메시지를 보여주기 위함
*/
import React from "react";
import { Link, useRouteError } from "react-router-dom";
import css from "./NotFound.module.css";

export const NotFound = () => {
  // errorElement 안에서 발생한 에러 정보를 꺼냅니다
  // any 타입을 쓰는 이유 :  React Router 에러 형태가 상황마다 달라서
  const error = useRouteError() as any;

  const status: number = error?.status || 404;
  const errorMessage: string | null = error?.data || error?.message || null;

  return (
    <div className={css.container}>
      <div className={css.content}>
        <h1 className={css.errorCode}>{status}</h1>
        <h2 className={css.title}>
          {status === 404 ? "페이지를 찾을 수 없습니다" : "오류가 발생했습니다"}
        </h2>
        <p className={css.desc}>
          {errorMessage ||
            (status === 404
              ? "요청하신 페이지가 사라졌거나 잘못된 경로입니다"
              : "예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해주세요")}
        </p>
        <Link to="/" className={css.homeBtn}>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};
