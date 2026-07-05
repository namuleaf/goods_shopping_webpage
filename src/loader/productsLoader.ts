/*
React Router Data API - loader

loader

지금까지는 useEffect 로 컴포넌트가 화면에 그려진 후 데이터를 가져왔습니다
 흐름 : 컴포넌트 렌더링 -> useEffect 실행 -> API 호출 -> 화면 업데이트
        이 과정에서 잠깐 '빈 화면' 또는 '로딩 중' 화면이 깜빡입니다

loader는 페이지 이동 전에 먼저 데이터를 가져옵니다
흐름 : URL 이동 감지 -> loader 실행 -> 데이터 준비 완료 -> 컴포넌트 렌더링
        처음부터 데이터가 있는 상태로 화면이 그려집니다

loader 함수는 router.tsx 의 각 라우트에 등록하고,
컴포넌트 안에서 useLoaderData() 로 결과를 꺼내 씀

TypeScript 의 경우
LoaderFunctionArgs - React Router 가 loader에 넘겨주는 인자 타입
{ request , params }를 명시적으로 타입 지정
*/
import type { LoaderFunctionArgs } from "react-router-dom";
import {
  getProductsByCategory,
  getProductsById,
  getProductsData,
} from "@/api/productsApi";
import React from "react";
import type { DetailLoaderData, ShopLoaderData } from "@/types";

// ShopPage loader
export const shopPageLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<ShopLoaderData> => {
  // URL 에서 쿼리 파라미터 읽기
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("_page") || 1);
  const per_page = Number(url.searchParams.get("_per_page") || 12);
  const category = url.searchParams.get("category") || "";
  const sort = url.searchParams.get("_sort") || "";
  const q = url.searchParams.get("q") || "";

  //   axios params 객체 생성
  const params: Record<string, string | number> = {};

  // 카테고리 필터 추가
  if (category) {
    params.category = category;
  }

  // 정렬 옵션 추가
  if (sort) {
    params._sort = sort;
  }
  // 검색은 클라이언트 사이드에서 처리하므로 서버에서 모든 데이터 가져오기
  // 페이지네이션도 클라이언트 처리
  try {
    // 모든 상품 데이터 가져오기 (검색어 필터링 전)
    const allProducts = await getProductsData(params);
    // getProductsData 는 배열을 반환하므로 배열로 처리
    const productsArray = Array.isArray(allProducts) ? allProducts : [];

    // 검색어로 필터링 - 클라이언트 사이드 처리
    let filteredData = productsArray;
    if (q && q.trim()) {
      const searchTerm = q.trim().toLowerCase();
      filteredData = filteredData.filter(
        (product) =>
          product.title && product.title.toLowerCase().includes(searchTerm),
      );
    }

    // 페이지네이션 처리
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / per_page);
    const startIndex = (page - 1) * per_page;
    const endIndex = startIndex + per_page;
    const paginationData = filteredData.slice(startIndex, endIndex);

    // json-server 형식에 맞춰 반환

    const products = {
      data: paginationData,
      total: totalItems,
      pages: totalPages,
      first: page === 1 ? null : 1,
      last: totalPages,
      prev: page > 1 ? page - 1 : null,
      next: page < totalPages ? page + 1 : null,
    };

    return { products, per_page };
  } catch (err: any) {
    console.log("err---- productsLoader.ts", err);
    throw new Response("상품 데이터를 가져오는 중 오류 발생", {
      status: err.status || 500,
    });
  }
};

// DetailPage Loader
export const detailPageLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<DetailLoaderData> => {
  try {
    // 상품 ID로 상세정보 가져오기
    // prams.productId!: !는 : 이 값은 undefined가 아님을 Typescript에 알림
    const product = await getProductsById(params.productId!);
    if (!product) {
      throw new Response("상품이 존재하지 않습니다.", {
        status: 404,
      });
    }
    // 같은 카테고리의 다른 상품들 가져오기
    const relatedProducts = await getProductsByCategory(product.category, 10);

    //현재 상품 제외
    const filteredRelatedProducts = relatedProducts.filter(
      (p) => p.id !== product.id,
    );
    return { product, filteredRelatedProducts };
  } catch (err: any) {
    console.log("err ---- productLoader.js", err);
    throw new Response("상품 데이터를 가져오는 중 오류 발생", {
      status: err.status || 500,
    });
  }
};
