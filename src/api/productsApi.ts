/*
상품 데이터 API

axios.params (쿼리 파라미터)

axios.get(url,{params}) 를 사용하면 URL 뒤에 쿼리 파라미터를 자동으로 붙여줌
ex) params: {category: "new", _limit:6}
-> GET /api/products/?category=new&_limit=6

json-server 는 이 파라미터를 읽어 자동으로 필터링/정렬해서 응답합니다
_limit : 최대 개수, _sort: 정렬 기준, category : 카테고리 필터
*/
import axios from "axios";
import type { Product } from "@/types";

// [GET] 전체 상품 목록 (쿼리 파라미터로 필터/정렬 가능)
export const getProductsData = async (params = {}): Promise<Product[]> => {
  try {
    const res = await axios.get<Product[]>("/api/products", { params });
    if (Array.isArray(res.data)) {
      return res.data;
    }
    return res.data;
  } catch (err) {
    console.log("productsApi : getProductsData -err", err);
    return [];
  }
};

// [GET] 특정 상품 ID로 단일 상품 조회
// URL 파라미터(:id) 방식

export const getProductsById = async (id: string): Promise<Product | null> => {
  try {
    const res = await axios.get<Product>(`/api/products/${id}`);
    return res.data;
  } catch (err) {
    console.log("productAPI: getProductById -err", err);
    return null;
  }
};

// [GET] 카테고리별 상품 조회ㅏ
export const getProductsByCategory = async (
  category: string,
  //limit = 10,
): Promise<Product[]> => {
  try {
    const res = await axios.get<Product[]>(`/api/products`, {
      params: {
        category,
        //_limit: limit,
        //_per_page:limit
      },
    });
    return res.data;
  } catch (err) {
    console.log("productApi: getProductsByCategory -err", err);
    return [];
  }
};

//[POST] 새 상품 등록
// 두 번째 인자로 전송할 데이터를 넘김
// json-server가 받아서 db.json의 products 배열에 추가합니다.

export const addProduct = async (productData: Product): Promise<Product> => {
  try {
    const res = await axios.post<Product>("/api/products", productData);
    return res.data;
  } catch (err) {
    console.log("productApi: addProduct -err", err);
    throw err;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/api/products/${id}`);
  } catch (err) {
    console.log("productApi : deleteProduct -err", err);
    throw err;
  }
};
