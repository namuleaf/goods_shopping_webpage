// 프로젝트 전역 타입 정의
// 원래는 설계할때 미리 타입도 지정해서 명세서 보면서 작성하면 됨
// Typescript에서는 데이터의 형태(구조)를 미리 정의해야 합니다
// interface 로 정의한 타입은 여러 파일에서 import 해서 재사용합니다.

// 상품 한 개의 구조
export interface Product {
  id: string;
  title: string;
  price: number;
  img: string;
  category: string;
  discount: number;
  liked?: boolean;
  bannerItemCat: string;
  section : string;
  phoneCategory?: "item" | "accessory";
  phoneCategoryLabel?: string;

}

// 장바구니 아이템 = 상품 + 수량
// extends 로 Product 의 모든 필드를 상속받고 count 필드를 추가
export interface CartItem extends Product {
  count: number;
}

// 배너 한 개의 구조
export interface Banner {
  id: string;
  img: string;
  title: string;
  description: string;
  link: string;
}

// ShopPage loader 가 반환하는 페이지네이션 정보
export interface ProductsPage {
  data: Product[];
  total: number;
  pages: number;
  first: number | null;
  last: number | null;
  prev: number | null;
  next: number | null;
}

// ShopPageLoader 전체 반환값
export interface ShopLoaderData {
  products: ProductsPage;
  per_page: number;
}

// detailPageLoader 전체 반환값
export interface DetailLoaderData {
  product: Product;
  filteredRelatedProducts: Product[];
}

// MyPage에서 상품 등록 폼 입력값
// price는 input에서는 string이지만 서버 전송 시 number로 변환
export interface ProductFormData {
  title: string;
  price: number | string;
  discount: number;
  category: string;
  img: string;
}
