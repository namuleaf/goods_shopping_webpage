/*
axios : 브라우저에서 HTTP 요청을 보내는 라이브러리
브라우저 기본 fetch 보다 에러 처리와 응답 파싱이 편리

async/await : 비동기 함수를 마치 동기 코드처럼 순서대로 작성할 수 있음
await 앞에서 잠시 멈추고, 응답이 오면 다음 줄로 내려감

try/catch : 에러가 발생할 수 있는 코드를 try 안에 넣고,
에러 발생 시 catch 블록에서 처리
-> 앱이 에러로 완전히 멈추는 것을 방지

요청 흐름
1. axios.get('/api/banners/') 로 GET 요청 전송
2. vite.config.ts 의 proxy 설정이 /api/* json-server(3000포트)로 전달
3. json-server 가 db.json 의 banners 배열을 응답
4. res.data로 응답 데이터를 꺼냄
*/
import axios from "axios";
import type { Banner } from "@/types";

export const getBannerData = async (): Promise<Banner[]> => {
  try {
    const res = await axios.get<Banner[]>(`/api/banners/`);
    return res.data;
  } catch (err) {
    console.log("bannerApi : getBannerData -err", err);
    return [];
  }
};
