import React from "react";
import css from "./QuickEtcHover.module.css";

export const QuickEtcHover = () => {

  // 클릭 시 맨 위로 올라가게
  const scrollTop = () => {
     window.scrollTo({top: 0, behavior:"smooth"})
  }



  return (
    <div className={css.hoverContainer}>
      <button type="button" className={css.quick}>
        <i className="bi bi-box-seam-fill"></i>
      </button>
      <button type="button" className={css.chatbot}>
         <i className="bi bi-headset"></i>
      </button>
      <button type="button" className={css.goTop} 
          onClick={scrollTop}
        >
          <i className="bi bi-arrow-up"></i>
      </button>
    </div>
  );
};
