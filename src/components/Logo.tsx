import React from "react";
import css from "./Logo.module.css";
import logoImage from "@/assets/logoImage.png";

const Logo = () => {
  return (
    <div className={css.logo}>
      <img
        src={logoImage}
        alt="logoImage"
        style={{ display: "block", width: "100%", height: "80%" }}
      />
    </div>
  );
};

export default Logo;
