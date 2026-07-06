export type CatalogItem = {
  id: string;
  title: string;
  img: string;
  price: number;
  badge: string;
  summary: string;
};

export type CatalogCategory = {
  id: string;
  label: string;
  description: string;
  items: CatalogItem[];
};

export type BenefitTier = {
  name: string;
  subtitle: string;
  points: string[];
};

export const catalogCategories: CatalogCategory[] = [
  {
    id: "phone",
    label: "폰 악세사리",
    description: "폰케이스, 보조배터리, 데스크 소품까지 한 번에 보는 섹션입니다.",
    items: [
      {
        id: "phone-1",
        title: "맥세이프 파워뱅크",
        img: "/img_PhoneItem/pd_magsafe_powerbank.png",
        price: 186978,
        badge: "BEST",
        summary: "외출할 때 가장 많이 찾는 충전 아이템입니다.",
      },
      {
        id: "phone-2",
        title: "에어팟 기프트 세트",
        img: "/img_PhoneItem/pd_gift_airpods2.jpg",
        price: 364786,
        badge: "GIFT",
        summary: "선물용으로도 좋고 데일리로 쓰기 편한 구성입니다.",
      },
      {
        id: "phone-3",
        title: "테이블 데코 아이템",
        img: "/img_PhoneItem/pd_phone_iner_deco.png",
        price: 227569,
        badge: "NEW",
        summary: "책상 분위기를 바꿔주는 데스크 포인트 상품입니다.",
      },
      {
        id: "phone-4",
        title: "휴대용 보조배터리",
        img: "/img_PhoneItem/pd_powerbank.png",
        price: 15059,
        badge: "HOT",
        summary: "가볍게 들고 다니기 좋은 실속형 보조배터리입니다.",
      },
    ],
  },
  {
    id: "sticker",
    label: "스티커",
    description: "다꾸, 포장, 캐릭터 스티커를 모아둔 카테고리입니다.",
    items: [
      {
        id: "sticker-1",
        title: "매트 진주 스티커",
        img: "/img_StickerItem/pd_matte_pearl_sticker.png",
        price: 9800,
        badge: "SET",
        summary: "은은한 광택이 매력적인 고급형 스티커입니다.",
      },
      {
        id: "sticker-2",
        title: "PVC 팝 스티커",
        img: "/img_StickerItem/pd_pvc_pop_sticker.png",
        price: 12800,
        badge: "POP",
        summary: "컬러가 또렷해서 캐릭터 상품과 잘 어울립니다.",
      },
      {
        id: "sticker-3",
        title: "kiss cut 스티커",
        img: "/img_StickerItem/pd_kisscut_sticker_free.png",
        price: 8900,
        badge: "DIY",
        summary: "자유롭게 꾸미기 좋은 데코용 스티커입니다.",
      },
      {
        id: "sticker-4",
        title: "증명사진 스티커",
        img: "/img_StickerItem/pd_idphoto_sticker.png",
        price: 11000,
        badge: "PHOTO",
        summary: "작은 사진을 감성 있게 활용할 수 있습니다.",
      },
    ],
  },
  {
    id: "photo",
    label: "포토",
    description: "포토카드, 엽서, 포스터를 중심으로 보는 섹션입니다.",
    items: [
      {
        id: "photo-1",
        title: "홀로그램 포토카드",
        img: "/img_PhotoItem/pd_photocard_hologram.png",
        price: 13800,
        badge: "GLOW",
        summary: "빛에 따라 반짝이는 포인트가 있는 포토카드입니다.",
      },
      {
        id: "photo-2",
        title: "포스트카드 슬로건",
        img: "/img_PhotoItem/pd_postcard_slogan.png",
        price: 12000,
        badge: "CARD",
        summary: "진열과 선물용으로 활용하기 좋은 엽서 타입입니다.",
      },
      {
        id: "photo-3",
        title: "미니 포스터",
        img: "/img_PhotoItem/pd_small_poster.png",
        price: 18000,
        badge: "POSTER",
        summary: "벽면에 붙여두면 분위기를 살려주는 미니 포스터입니다.",
      },
      {
        id: "photo-4",
        title: "초대장 카드",
        img: "/img_PhotoItem/pd_invitation.png",
        price: 16000,
        badge: "EVENT",
        summary: "이벤트나 기념일에 잘 어울리는 카드형 상품입니다.",
      },
    ],
  },
  {
    id: "acrylic",
    label: "아크릴",
    description: "아크릴 스탠드, 디오라마, 키링을 모아둔 섹션입니다.",
    items: [
      {
        id: "acrylic-1",
        title: "아크릴 디오라마",
        img: "/img_AcrylicItem/pd_gift_acrylic_diorama.png",
        price: 24900,
        badge: "3D",
        summary: "입체감이 살아 있어 전시용으로 좋습니다.",
      },
      {
        id: "acrylic-2",
        title: "아크릴 스탠드",
        img: "/img_AcrylicItem/pd_acrylic_stand_v2.png",
        price: 21900,
        badge: "STAND",
        summary: "책상 위에 세워두기 좋은 기본형 아크릴 상품입니다.",
      },
      {
        id: "acrylic-3",
        title: "모니터 아크릴 스탠드",
        img: "/img_AcrylicItem/pd_monitor_acrylic_stand.png",
        price: 29800,
        badge: "DESK",
        summary: "데스크 셋업에 잘 어울리는 실용형 구성입니다.",
      },
      {
        id: "acrylic-4",
        title: "차 키링",
        img: "/img_AcrylicItem/pd_gift_car_keyring.png",
        price: 13900,
        badge: "KEY",
        summary: "가볍게 들고 다니기 좋은 아크릴 키링입니다.",
      },
    ],
  },
  {
    id: "living",
    label: "리빙",
    description: "데일리로 쓰기 좋은 생활 소품 카테고리입니다.",
    items: [
      {
        id: "living-1",
        title: "텀블러",
        img: "/img_LivingItem/pd_gift_tumbler2.png",
        price: 28900,
        badge: "DAILY",
        summary: "매일 쓰기 좋은 실용적인 텀블러입니다.",
      },
      {
        id: "living-2",
        title: "메모패드",
        img: "/img_LivingItem/pd_memopad.png",
        price: 7900,
        badge: "NOTE",
        summary: "책상 위에 두고 쓰기 좋은 메모용 상품입니다.",
      },
      {
        id: "living-3",
        title: "핸드미러",
        img: "/img_LivingItem/pd_hand_mirror.png",
        price: 12900,
        badge: "MIRROR",
        summary: "가볍고 실속 있는 생활 소품입니다.",
      },
      {
        id: "living-4",
        title: "버튼 파우치",
        img: "/img_LivingItem/pd_button_pouch.png",
        price: 15900,
        badge: "POUCH",
        summary: "작은 물건을 정리하기 좋은 파우치입니다.",
      },
    ],
  },
  {
    id: "calendar",
    label: "달력",
    description: "탁상달력, 벽걸이달력, 미니달력을 확인할 수 있습니다.",
    items: [
      {
        id: "calendar-1",
        title: "탁상 달력",
        img: "/img_CalendarItem/pd_clnd_table.png",
        price: 16900,
        badge: "TABLE",
        summary: "책상 위에 두기 좋은 기본형 달력입니다.",
      },
      {
        id: "calendar-2",
        title: "벽걸이 달력",
        img: "/img_CalendarItem/pd_clnd_bigwall_large.png",
        price: 23900,
        badge: "WALL",
        summary: "공간을 넓게 활용할 수 있는 벽걸이형입니다.",
      },
      {
        id: "calendar-3",
        title: "미니 달력",
        img: "/img_CalendarItem/pd_clnd_mini.png",
        price: 9900,
        badge: "MINI",
        summary: "작은 공간에도 잘 맞는 미니 사이즈입니다.",
      },
      {
        id: "calendar-4",
        title: "우드 와이드 달력",
        img: "/img_CalendarItem/pd_clnd_woodwide.png",
        price: 21900,
        badge: "WOOD",
        summary: "우드 톤이 더해진 감성형 달력입니다.",
      },
    ],
  },
];

export const benefitTiers: BenefitTier[] = [
  {
    name: "comet",
    subtitle: "처음 만난 혜택이 가장 가볍고 빠르게 와닿는 등급",
    points: ["배송 일정 확인", "주문 정보 확인", "회원 전용 안내"],
  },
  {
    name: "moon",
    subtitle: "조금 더 가까워지면 체감되는 실속형 등급",
    points: ["구매 이력 요약", "우선 배송 안내", "이벤트 소식"],
  },
  {
    name: "mars",
    subtitle: "자주 찾는 고객에게 더 넓게 열리는 등급",
    points: ["구매 혜택 확대", "특별 사은품", "전용 상담 안내"],
  },
  {
    name: "sun",
    subtitle: "가장 밝고 따뜻한 VIP 혜택을 주는 최상위 등급",
    points: ["프리미엄 사은품", "우선 배송", "한정 이벤트 초대"],
  },
];

export const currentBenefitTierIndex = 0;
