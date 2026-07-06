import { useState } from "react";
import css from "./Header.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../components/Logo";

type MenuItem = {
  id: string;
  label: string;
  to: string;
  icon: string;
  children: Array<{
    label: string;
    to: string;
  }>;
};

const bannerCategories: MenuItem[] = [
  {
    id: "sticker",
    label: "스티커",
    to: "/shop?section=sticker",
    icon: "bi-stickies",
    children: [
      { label: "전체보기", to: "/shop?section=sticker" },
      { label: "다꾸 스티커", to: "/shop?section=sticker&kind=diary" },
      { label: "캐릭터 스티커", to: "/shop?section=sticker&kind=character" },
      { label: "씰 스티커", to: "/shop?section=sticker&kind=sill" },
      { label: "에폭시 스티커", to: "/shop?section=sticker&kind=as" },
      { label: "패브릭 스티커", to: "/shop?section=sticker&kind=casdf" },
    ],
  },
  {
    id: "phone",
    label: "폰케이스",
    to: "/shop?section=phone",
    icon: "bi-phone",
    children: [
      { label: "전체보기", to: "/shop?section=phone" },
      { label: "하드 케이스", to: "/shop?section=phone&kind=hard" },
      { label: "범퍼 케이스", to: "/shop?section=phone&kind=bumper" },
      { label: "그립톡", to: "/shop?section=phone&kind=buase" },
      { label: "맥세이프", to: "/shop?section=phone&kind=baseadar" },
      { label: "보조배터리", to: "/shop?section=phone&kind=ader" },
    ],
  },
  {
    id: "calendar",
    label: "달력",
    to: "/shop?section=calendar",
    icon: "bi-calendar3",
    children: [
      { label: "전체보기", to: "/shop?section=calendar" },
      { label: "탁상달력", to: "/shop?section=calendar&kind=desk" },
      { label: "벽걸이달력", to: "/shop?section=calendar&kind=wall" },
      { label: "우드달력", to: "/shop?section=calendar&kind=sdfl" },
    ],
  },
  {
    id: "acrylic",
    label: "아크릴",
    to: "/shop?section=acrylic",
    icon: "bi-box",
    children: [
      { label: "전체보기", to: "/shop?section=acrylic" },
      { label: "아크릴 키링", to: "/shop?section=acrylic&kind=keyring" },
      { label: "아크릴 스탠드", to: "/shop?section=acrylic&kind=stand" },
      { label: "아크릴 명찰", to: "/shop?section=acrylic&kind=sfd" },
      { label: "아크릴 뱃지", to: "/shop?section=acrylic&kind=ssfnd" },
    ],
  },
  {
    id: "living",
    label: "리빙/잡화",
    to: "/shop?section=living",
    icon: "bi-house",
    children: [
      { label: "전체보기", to: "/shop?section=living" },
      { label: "테이블 소품", to: "/shop?section=living&kind=table" },
      { label: "수납/정리", to: "/shop?section=living&kind=storage" },
      { label: "홈/카페", to: "/shop?section=living&kind=ssfge" },
      { label: "팬시/문구", to: "/shop?section=living&kind=ssfage" },
    ],
  },
  {
    id: "photo",
    label: "포토/엽서",
    to: "/shop?section=photo",
    icon: "bi-image",
    children: [
      { label: "전체보기", to: "/shop?section=photo" },
      { label: "엽서", to: "/shop?section=photo&kind=postcard" },
      { label: "포토카드", to: "/shop?section=photo&kind=photo" },
      { label: "카드텍", to: "/shop?section=photo&kind=psfto" },
      { label: "포토북", to: "/shop?section=photo&kind=pasfo" },
    ],
  },
];

type BannerCategory = (typeof bannerCategories)[number];

export const Header = ({ onToggleChat }: { onToggleChat: () => void }) => {
  const [isOn, setIsOn] = useState(false);
  const [visibleCategory, setVisibleCategory] = useState<MenuItem | null>(null);
  const location = useLocation();

  const addClassOn = () => {
    setIsOn(!isOn);
  };

  const openDropdown = (item: MenuItem) => {
    setVisibleCategory(item);
  };

  const closeDropdown = () => {
    setVisibleCategory(null);
  };

  return (
    <header className={css.hd}>
      <div className={css.headerTopWrap}>
        <div className={css.headerTop}>
          <div className={css.topEtc}>
            <div className={css.joinEtc}>
            <Link to="/join">
              <div>로그인/회원가입</div>
            </Link>
            </div>
            <button type="button" onClick={onToggleChat}>고객센터</button>
            </div>
          </div>
      </div>

      <div className={css.con}>
        <div className={css.headerSecondWrap}>
          <h1 className={css.logo}>
            <Link to="/">
              <Logo />
            </Link>
          </h1>
          <div className={css.searchKey}>
            <CustomIconLink to="/shop" icon="bi-search" />
            <input type="text" placeholder="상품을 검색해보세요" />
          </div>
        </div>

        <div className={isOn ? `${css.gnb} ${css.on}` : css.gnb}>
          <nav>
            <CustomNavLink to="/shop" label="전체 상품" />
            <CustomNavLink to="/about" label="소개" />
            <CustomNavLink to="/event" label="이벤트" />
          </nav>
          <div className={css.icon}>
            <CustomIconLink to="/shop?focus=true" icon="bi-search" />
            <CustomIconLink to="/mypage" icon="bi-person-circle" />
            <CustomIconLink to="/cart" icon="bi-cart" />
          </div>
        </div>

        <i
          className={`${css.ham} bi bi-list`}
          title="전체메뉴 보기"
          onClick={addClassOn}
        ></i>
      </div>

      <div className={css.headerThirdWrap} onMouseLeave={closeDropdown}>
        <div className={css.bannerMenu}>
          <ul className={css.bannerNav}>
            {bannerCategories.map((item) => (
              <li
                key={item.id}
                className={css.bannerItem}
                onMouseEnter={() => openDropdown(item)}
              >
                <Link to={`/?section=${item.id}`}>
                  <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {visibleCategory && (
            <div className={css.bannerDropdownArea}>
              <div className={css.bannerDropdown}>
                <p className={css.bannerTitle}>{visibleCategory.label}</p>
                <ul className={css.bannerDropdownList}>
                  {visibleCategory.children.map((child) => (
                    <li key={child.to}>
                      <Link to={`/?section=${visibleCategory.id}`} onClick={closeDropdown}>
                        <span>{child.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

interface CustomNavLinkProps {
  to: string;
  label: string;
}

interface CustomIconLinkProps {
  to: string;
  icon: string;
}

const CustomNavLink = ({ to, label }: CustomNavLinkProps) => (
  <NavLink
    className={({ isActive }) => (isActive ? `${css.active}` : "")}
    to={to}
  >
    {label}
  </NavLink>
);

const CustomIconLink = ({ to, icon }: CustomIconLinkProps) => (
  <NavLink
    className={({ isActive }) => (isActive ? `${css.active}` : "")}
    to={to}
  >
    <i className={`bi ${icon}`}></i>
  </NavLink>
);
