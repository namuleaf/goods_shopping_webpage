import type { MainSectionId } from "@/data/mainCatalog";

export type MainKindId =
  | "item"
  | "accessory"
  | "basic"
  | "custom"
  | "card"
  | "poster"
  | "stand"
  | "keyring"
  | "desk"
  | "home"
  | "table"
  | "wall";

export type SectionKind = {
  id: MainKindId | "all";
  label: string;
};

export const mainSections: Array<
  { id: "all"; label: string; description: string } |
  { id: MainSectionId; label: string; description: string }
> = [
  {
    id: "all",
    label: "전체 상품",
    description: "모든 카테고리 상품을 한 번에 볼 수 있어요",
  },
  {
    id: "phone",
    label: "폰 액세서리",
    description: "핸드폰과 함께 쓰기 좋은 데일리 아이템",
  },
  {
    id: "sticker",
    label: "스티커",
    description: "꾸미는 재미가 있는 스티커 모음",
  },
  {
    id: "photo",
    label: "포토",
    description: "사진 감성을 살려주는 인화 상품",
  },
  {
    id: "acrylic",
    label: "아크릴",
    description: "투명감이 매력적인 아크릴 굿즈",
  },
  {
    id: "living",
    label: "리빙",
    description: "실용성과 감성을 함께 챙기는 생활 소품",
  },
  {
    id: "calendar",
    label: "캘린더",
    description: "계절마다 바꾸기 좋은 데스크 캘린더",
  },
];

export const sectionKindMap: Record<
  "all" | MainSectionId,
  SectionKind[]
> = {
  all: [{ id: "all", label: "전체" }],
  phone: [
    { id: "all", label: "전체" },
    { id: "item", label: "폰케이스 아이템" },
    { id: "accessory", label: "폰케이스 악세사리" },
  ],
  sticker: [
    { id: "all", label: "전체" },
    { id: "basic", label: "기본형" },
    { id: "custom", label: "커스텀" },
  ],
  photo: [
    { id: "all", label: "전체" },
    { id: "card", label: "포토 카드" },
    { id: "poster", label: "포토 포스터" },
  ],
  acrylic: [
    { id: "all", label: "전체" },
    { id: "stand", label: "아크릴 스탠드" },
    { id: "keyring", label: "아크릴 키링" },
  ],
  living: [
    { id: "all", label: "전체" },
    { id: "desk", label: "리빙 데스크" },
    { id: "home", label: "리빙 소품" },
  ],
  calendar: [
    { id: "all", label: "전체" },
    { id: "table", label: "캘린더 테이블" },
    { id: "wall", label: "캘린더 벽걸이" },
  ],
};

export const sectionKindSequence: Record<
  MainSectionId,
  MainKindId[]
> = {
  phone: ["accessory", "accessory", "item", "accessory"],
  sticker: ["basic", "custom", "custom", "basic"],
  photo: ["card", "card", "poster", "poster"],
  acrylic: ["stand", "stand", "stand", "keyring"],
  living: ["desk", "desk", "home", "home"],
  calendar: ["table", "wall", "table", "wall"],
};

