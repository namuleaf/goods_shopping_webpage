import React from "react";
import css from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        {/* 상단 영역: 브랜드 정보 & 고객센터 */}
        <div className={css.top}>
          {/* 브랜드 소개 */}
          <div className={css.brand}>
            <h2 className={css.logo}>Dearly</h2>
            <p className={css.desc}>
              특별한 굿즈가 탄생하는 공간
              <br />
              다양한 아이디어를 공유하고 굿즈로 만들어보세요
            </p>
          </div>
          {/* 고객센터 정보 */}
          <div className={css.contact}>
            <h4>Customer Center</h4>
            <p className={css.phone}>02-0000-0000</p>
            <p className={css.info}>
              평일 10 : 00 - 17 : 00 (주말/공휴일 휴무)
              <br />
              help@dearly.com
            </p>
          </div>
        </div>
        {/* 하단 영역 : 저작권 & 소셜 아이콘 */}
        <div className={css.bottom}>
          <p className={css.copyright}>
            &copy; {new Date().getFullYear()} Dealy. All rights reserved.
          </p>
          <div className={css.socials}>
            <a href="#" aria-label="FaceBook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="bi bi-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
