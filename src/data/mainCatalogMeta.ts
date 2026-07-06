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
  | "wall"
  | "other";

export type SectionKind = {
  id: MainKindId | "all";
  label: string;
};

type SectionMeta = {
  id: "all" | MainSectionId;
  label: string;
  description: string;
};

export const mainSections: SectionMeta[] = [
  {
    id: "all",
    label: "전체 상품",
    description: "모든 카테고리 상품을 한 번에 볼 수 있어요.",
  },
  {
    id: "phone",
    label: "폰 악세사리",
    description: "폰 케이스와 함께 쓰는 실용적인 아이템",
  },
  {
    id: "sticker",
    label: "스티커",
    description: "꾸미기, 다이어리, 캐릭터 스티커 모음",
  },
  {
    id: "photo",
    label: "포토",
    description: "사진 감성을 살려주는 포토 상품",
  },
  {
    id: "acrylic",
    label: "아크릴",
    description: "투명감이 매력적인 아크릴 굿즈",
  },
  {
    id: "living",
    label: "리빙",
    description: "실용성과 감성을 함께 담은 생활 굿즈",
  },
  {
    id: "calendar",
    label: "달력",
    description: "계절마다 보기 좋은 캘린더 굿즈",
  },
];

export const sectionKindMap: Record<"all" | MainSectionId, SectionKind[]> = {
  all: [{ id: "all", label: "전체" }],
  phone: [
    { id: "all", label: "전체" },
    { id: "item", label: "폰 아이템" },
    { id: "accessory", label: "폰 악세사리" },
    { id: "other", label: "기타" },
  ],
  sticker: [
    { id: "all", label: "전체" },
    { id: "basic", label: "기본" },
    { id: "custom", label: "커스텀" },
    { id: "other", label: "기타" },
  ],
  photo: [
    { id: "all", label: "전체" },
    { id: "card", label: "포토 카드" },
    { id: "poster", label: "포토 포스터" },
    { id: "other", label: "기타" },
  ],
  acrylic: [
    { id: "all", label: "전체" },
    { id: "stand", label: "아크릴 스탠드" },
    { id: "keyring", label: "아크릴 키링" },
    { id: "other", label: "기타" },
  ],
  living: [
    { id: "all", label: "전체" },
    { id: "desk", label: "리빙 데스크" },
    { id: "home", label: "리빙 소품" },
    { id: "other", label: "기타" },
  ],
  calendar: [
    { id: "all", label: "전체" },
    { id: "table", label: "캘린더 테이블" },
    { id: "wall", label: "캘린더 벽걸이" },
    { id: "other", label: "기타" },
  ],
};

const allowedKindMap: Record<MainSectionId, Exclude<MainKindId, "other">[]> = {
  phone: ["item", "accessory"],
  sticker: ["basic", "custom"],
  photo: ["card", "poster"],
  acrylic: ["stand", "keyring"],
  living: ["desk", "home"],
  calendar: ["table", "wall"],
};

export const resolveSectionKind = (
  section: MainSectionId,
  kind?: string | null,
): MainKindId => {
  if (!kind || kind === "all") {
    return "other";
  }

  const allowedKinds = allowedKindMap[section];
  return allowedKinds.includes(kind as Exclude<MainKindId, "other">)
    ? (kind as Exclude<MainKindId, "other">)
    : "other";
};
