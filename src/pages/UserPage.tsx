import { useMemo, useState } from "react";
import css from "./UserPage.module.css";

type CatalogItem = {
  id: string;
  title: string;
  img: string;
  price: number;
  badge: string;
  summary: string;
};

type CatalogCategory = {
  id: string;
  label: string;
  description: string;
  items: CatalogItem[];
};

const addBusinessDays = (baseDate: Date, businessDays: number) => {
  const nextDate = new Date(baseDate);
  let addedDays = 0;

  while (addedDays < businessDays) {
    nextDate.setDate(nextDate.getDate() + 1);
    const day = nextDate.getDay();

    if (day !== 0 && day !== 6) {
      addedDays += 1;
    }
  }

  return nextDate;
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).format(date);

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ko-KR").format(price);

const catalogCategories: CatalogCategory[] = [
  {
    id: "phone",
    label: "폰 액세서리",
    description: "핸드폰과 함께 쓰기 좋은 데일리 액세서리",
    items: [
      {
        id: "phone-1",
        title: "맥세이프 파워뱅크",
        img: "/img_PhoneItem/pd_magsafe_powerbank.png",
        price: 186978,
        badge: "BEST",
        summary: "외출할 때 가장 많이 찾는 충전 아이템",
      },
      {
        id: "phone-2",
        title: "에어팟 선물 세트",
        img: "/img_PhoneItem/pd_gift_airpods2.jpg",
        price: 364786,
        badge: "GIFT",
        summary: "선물용으로도 인기 많은 실용 아이템",
      },
      {
        id: "phone-3",
        title: "폰 인테리어 데코",
        img: "/img_PhoneItem/pd_phone_iner_deco.png",
        price: 227569,
        badge: "NEW",
        summary: "책상 위 분위기를 바꿔주는 포인트 제품",
      },
      {
        id: "phone-4",
        title: "보조배터리",
        img: "/img_PhoneItem/pd_powerbank.png",
        price: 15059,
        badge: "HOT",
        summary: "가볍게 들고 다니기 좋은 필수 배터리",
      },
    ],
  },
  {
    id: "sticker",
    label: "스티커",
    description: "꾸미는 재미가 있는 스티커 모음",
    items: [
      {
        id: "sticker-1",
        title: "매트 진주 스티커",
        img: "/img_StickerItem/pd_matte_pearl_sticker.png",
        price: 9800,
        badge: "SET",
        summary: "빛 반사가 은은한 감성 스티커",
      },
      {
        id: "sticker-2",
        title: "PVC 팝 스티커",
        img: "/img_StickerItem/pd_pvc_pop_sticker.png",
        price: 12800,
        badge: "POP",
        summary: "노트북과 폰 케이스에 잘 어울리는 타입",
      },
      {
        id: "sticker-3",
        title: "키스컷 스티커",
        img: "/img_StickerItem/pd_kisscut_sticker_free.png",
        price: 8900,
        badge: "DIY",
        summary: "자유롭게 잘라 쓰기 좋은 맞춤형 스티커",
      },
      {
        id: "sticker-4",
        title: "증명사진 스티커",
        img: "/img_StickerItem/pd_idphoto_sticker.png",
        price: 11000,
        badge: "PHOTO",
        summary: "작은 사진을 귀엽게 꾸미기 좋은 아이템",
      },
    ],
  },
  {
    id: "photo",
    label: "포토",
    description: "사진 감성을 살려주는 인화 상품들",
    items: [
      {
        id: "photo-1",
        title: "홀로그램 포토카드",
        img: "/img_PhotoItem/pd_photocard_hologram.png",
        price: 13800,
        badge: "GLOW",
        summary: "빛에 따라 반짝이는 포토카드",
      },
      {
        id: "photo-2",
        title: "슬로건 포스트카드",
        img: "/img_PhotoItem/pd_postcard_slogan.png",
        price: 12000,
        badge: "CARD",
        summary: "전시용으로도 활용하기 좋은 엽서",
      },
      {
        id: "photo-3",
        title: "미니 포스터",
        img: "/img_PhotoItem/pd_small_poster.png",
        price: 18000,
        badge: "POSTER",
        summary: "벽에 붙이면 분위기가 살아나는 포스터",
      },
      {
        id: "photo-4",
        title: "초대장",
        img: "/img_PhotoItem/pd_invitation.png",
        price: 16000,
        badge: "EVENT",
        summary: "행사와 모임에 잘 어울리는 초대장",
      },
    ],
  },
  {
    id: "acrylic",
    label: "아크릴",
    description: "반짝이는 투명감이 매력인 아크릴 굿즈",
    items: [
      {
        id: "acrylic-1",
        title: "아크릴 디오라마",
        img: "/img_AcrylicItem/pd_gift_acrylic_diorama.png",
        price: 24900,
        badge: "3D",
        summary: "책상 위 작은 전시 공간을 만드는 아이템",
      },
      {
        id: "acrylic-2",
        title: "아크릴 스탠드",
        img: "/img_AcrylicItem/pd_acrylic_stand_v2.png",
        price: 21900,
        badge: "STAND",
        summary: "캐릭터를 세워두기 좋은 기본형 제품",
      },
      {
        id: "acrylic-3",
        title: "모니터 아크릴 스탠드",
        img: "/img_AcrylicItem/pd_monitor_acrylic_stand.png",
        price: 29800,
        badge: "DESK",
        summary: "모니터 주변을 꾸미는 실용적인 구조",
      },
      {
        id: "acrylic-4",
        title: "카 키링",
        img: "/img_AcrylicItem/pd_gift_car_keyring.png",
        price: 13900,
        badge: "KEY",
        summary: "가볍게 달기 좋은 투명 키링",
      },
    ],
  },
  {
    id: "living",
    label: "리빙",
    description: "실용성과 감성을 함께 챙기는 생활 소품",
    items: [
      {
        id: "living-1",
        title: "텀블러",
        img: "/img_LivingItem/pd_gift_tumbler2.png",
        price: 28900,
        badge: "DAILY",
        summary: "매일 쓰기 좋은 미니멀 텀블러",
      },
      {
        id: "living-2",
        title: "메모패드",
        img: "/img_LivingItem/pd_memopad.png",
        price: 7900,
        badge: "NOTE",
        summary: "책상 위 메모 습관을 만들어주는 제품",
      },
      {
        id: "living-3",
        title: "핸드미러",
        img: "/img_LivingItem/pd_hand_mirror.png",
        price: 12900,
        badge: "MIRROR",
        summary: "가볍고 휴대하기 좋은 손거울",
      },
      {
        id: "living-4",
        title: "파우치",
        img: "/img_LivingItem/pd_button_pouch.png",
        price: 15900,
        badge: "POUCH",
        summary: "작은 소품을 정리하기 좋은 파우치",
      },
    ],
  },
  {
    id: "calendar",
    label: "캘린더",
    description: "계절마다 바꾸기 좋은 데스크 캘린더",
    items: [
      {
        id: "calendar-1",
        title: "테이블 캘린더",
        img: "/img_CalandarItem/pd_clnd_table.png",
        price: 16900,
        badge: "TABLE",
        summary: "책상 위 포인트가 되는 기본형 캘린더",
      },
      {
        id: "calendar-2",
        title: "빅 월 캘린더",
        img: "/img_CalandarItem/pd_clnd_bigwall_large.png",
        price: 23900,
        badge: "WALL",
        summary: "공간감 있게 걸어두는 대형 달력",
      },
      {
        id: "calendar-3",
        title: "미니 캘린더",
        img: "/img_CalandarItem/pd_clnd_mini.png",
        price: 9900,
        badge: "MINI",
        summary: "작은 공간에 잘 맞는 미니 사이즈",
      },
      {
        id: "calendar-4",
        title: "우드와이드 캘린더",
        img: "/img_CalandarItem/pd_clnd_woodwide.png",
        price: 21900,
        badge: "WOOD",
        summary: "따뜻한 톤의 우드 감성 캘린더",
      },
    ],
  },
];

const benefitTiers = [
  {
    name: "commet",
    subtitle: "처음 만나면 반짝이는 입문 등급",
    points: ["배송 일정 확인", "주문 정보 확인", "회원 전용 안내"],
  },
  {
    name: "moon",
    subtitle: "조금 더 가까워진 단골 등급",
    points: ["구매 내역 요약", "혜택 알림", "이벤트 우선 소식"],
  },
  {
    name: "mars",
    subtitle: "꾸준히 구매하는 핵심 등급",
    points: ["구매 적립 혜택", "우선 배송 안내", "전용 상담 안내"],
  },
  {
    name: "sun",
    subtitle: "가장 밝게 빛나는 VIP 등급",
    points: ["특별 사은품", "프리미엄 배송", "한정 이벤트 초대"],
  },
];

const DateCal = () => {
  const [orderDate, setOrderDate] = useState("");

  const deliveryInfo = useMemo(() => {
    if (!orderDate) return null;

    const selectedDate = new Date(`${orderDate}T00:00:00`);
    const earliest = addBusinessDays(selectedDate, 7);
    const latest = addBusinessDays(selectedDate, 10);

    return {
      order: formatDate(selectedDate),
      earliest: formatDate(earliest),
      latest: formatDate(latest),
    };
  }, [orderDate]);

  return (
    <section className={css.deliveryCard}>
      <h2>배송 일정 확인</h2>
      <p className={css.description}>
        주문 날짜를 선택하면 예상 배송 가능 기간을 바로 확인할 수 있어요.
      </p>

      <label className={css.label} htmlFor="order-date">
        주문 날짜
      </label>
      <input
        id="order-date"
        className={css.dateInput}
        type="date"
        value={orderDate}
        onChange={(e) => setOrderDate(e.target.value)}
      />

      {deliveryInfo ? (
        <div className={css.resultBox}>
          <p>주문일: {deliveryInfo.order}</p>
          <p>예상 출고/배송 시작: {deliveryInfo.earliest}</p>
          <p>예상 배송 완료: {deliveryInfo.latest}</p>
          <small>주말은 제외해서 계산했고, 공휴일은 별도로 반영하지 않았어요.</small>
        </div>
      ) : (
        <div className={css.resultBox}>
          <p>날짜를 선택하면 배송 일정을 보여드려요.</p>
        </div>
      )}
    </section>
  );
};

const CategoryCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState(catalogCategories[0].id);

  const currentCategory =
    catalogCategories.find((category) => category.id === selectedCategory) ??
    catalogCategories[0];

  return (
    <section className={css.catalogSection}>
      <div className={css.catalogHeader}>
        <div>
          <h3>카테고리별 아이템</h3>
          <p>{currentCategory.description}</p>
        </div>

        <div className={css.catalogTabs} role="tablist" aria-label="상품 카테고리">
          {catalogCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`${css.catalogTab} ${
                selectedCategory === category.id ? css.catalogTabActive : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className={css.catalogGrid}>
        {currentCategory.items.map((item) => (
          <article key={item.id} className={css.catalogCard}>
            <div className={css.catalogImageWrap}>
              <span className={css.catalogBadge}>{item.badge}</span>
              <img src={item.img} alt={item.title} className={css.catalogImage} />
            </div>
            <div className={css.catalogInfo}>
              <p className={css.catalogCategoryLabel}>{currentCategory.label}</p>
              <h4>{item.title}</h4>
              <p className={css.catalogSummary}>{item.summary}</p>
              <strong>{formatPrice(item.price)}원</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export const UserPage = () => {
  return (
    <main className={css.container}>
      <aside className={css.userPageCat}>
        <h2>마이페이지</h2>
        <ul>
          <li>배송 일정 확인</li>
          <li>주문 정보</li>
          <li>결제 내역</li>
          <li>회원 정보</li>
          <li>고객센터</li>
        </ul>
      </aside>

      <section className={css.content}>
        <div className={css.banner}>
          <DateCal />

          <section className={css.profileSection}>
            <div className={css.basicProfile}>
              <img
                src="/userpageImage/useraccountImage_delBg.png"
                alt="Dearly 프로필 이미지"
                className={css.profileImage}
              />
              <div>
                <h2>Dearly 회원님, 반가워요!</h2>
                <p>현재 등급: 혜성</p>
                <p>주문과 배송 정보를 한눈에 확인해보세요.</p>
              </div>
            </div>

            <div className={css.gradeBasicBanner}>
              <div className={css.gradeCard}>
                <h3>혜성 등급</h3>
                <p>배송 일정 확인</p>
                <p>주문 정보 확인</p>
                <p>회원 전용 안내</p>
              </div>
              <div className={css.gradeCard}>
                <h3>달 등급</h3>
                <p>구매 내역 요약</p>
                <p>혜택 알림</p>
                <p>이벤트 우선 소식</p>
              </div>
            </div>
          </section>

          <CategoryCatalog />

          <section className={css.benefitSection}>
            <h3>등급별 혜택 안내</h3>
            <div className={css.benefitGrid}>
              {benefitTiers.map((tier, index) => (
                <article key={tier.name} className={css.benefitCard}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h4>{tier.name}</h4>
                  <p className={css.tierSubtitle}>{tier.subtitle}</p>
                  <ul className={css.tierList}>
                    {tier.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};
