import type { LoaderFunctionArgs } from "react-router-dom";
import {
  getProductsByCategory,
  getProductsById,
  getProductsData,
} from "@/api/productsApi";
import type { DetailLoaderData, ShopLoaderData } from "@/types";

export const shopPageLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<ShopLoaderData> => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("_page") || 1);
  const per_page = Number(url.searchParams.get("_per_page") || 12);
  const category = url.searchParams.get("category") || "";
  const section = url.searchParams.get("section") || "";
  const kind = url.searchParams.get("kind") || "";
  const sort = url.searchParams.get("_sort") || "";
  const q = url.searchParams.get("q") || "";

  const params: Record<string, string | number> = {};

  if (category) {
    params.category = category;
  }
  if (section && section !== "all") {
    params.section = section;
  }
  if (kind && kind !== "all") {
    params.phoneCategory = kind;
  }
  if (sort) {
    params._sort = sort;
  }

  try {
    const allProducts = await getProductsData(params);
    const productsArray = Array.isArray(allProducts) ? allProducts : [];

    let filteredData = productsArray;
    if (q && q.trim()) {
      const searchTerm = q.trim().toLowerCase();
      filteredData = filteredData.filter(
        (product) =>
          product.title && product.title.toLowerCase().includes(searchTerm),
      );
    }

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / per_page);
    const startIndex = (page - 1) * per_page;
    const endIndex = startIndex + per_page;
    const paginationData = filteredData.slice(startIndex, endIndex);

    return {
      products: {
        data: paginationData,
        total: totalItems,
        pages: totalPages,
        first: page === 1 ? null : 1,
        last: totalPages,
        prev: page > 1 ? page - 1 : null,
        next: page < totalPages ? page + 1 : null,
      },
      per_page,
    };
  } catch (err: any) {
    console.log("err---- productsLoader.ts", err);
    throw new Response("상품 데이터를 불러오는 중 오류가 발생했습니다", {
      status: err.status || 500,
    });
  }
};

export const detailPageLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<DetailLoaderData> => {
  try {
    const product = await getProductsById(params.productId!);
    if (!product) {
      throw new Response("상품을 찾을 수 없습니다.", { status: 404 });
    }

    const sameSectionProducts = await getProductsData({
      section: product.section,
    });
    const sameCategoryProducts = await getProductsByCategory(product.category);

    const sameKindProducts = sameSectionProducts.filter(
      (item) =>
        item.id !== product.id &&
        product.phoneCategory &&
        item.phoneCategory === product.phoneCategory,
    );

    const sameSectionOnlyProducts = sameSectionProducts.filter(
      (item) => item.id !== product.id,
    );

    const mergedProducts = [
      ...sameKindProducts,
      ...sameSectionOnlyProducts,
      ...sameCategoryProducts.filter((item) => item.id !== product.id),
    ];

    const filteredRelatedProducts = Array.from(
      new Map(mergedProducts.map((item) => [item.id, item])).values(),
    );

    return { product, filteredRelatedProducts };
  } catch (err: any) {
    console.log("err ---- productLoader.js", err);
    throw new Response("상품 데이터를 불러오는 중 오류가 발생했습니다", {
      status: err.status || 500,
    });
  }
};
