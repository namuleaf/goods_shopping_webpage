import css from "./QuickEtcHover.module.css";

type QuickEtcHoverProps = {
  isChatOpen: boolean;
  onToggleChat: () => void;
};

export const QuickEtcHover = ({ isChatOpen, onToggleChat }: QuickEtcHoverProps) => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={css.hoverContainer}>
      <button type="button" className={css.quick}>
        <i className="bi bi-box-seam-fill"></i>
      </button>
      <button
        type="button"
        className={`${css.chatbot} ${isChatOpen ? css.active : ""}`}
        onClick={onToggleChat}
        aria-pressed={isChatOpen}
        aria-label="상담창 열기"
      >
        <i className="bi bi-headset"></i>
      </button>
      <button type="button" className={css.goTop} onClick={scrollTop}>
        <i className="bi bi-arrow-up"></i>
      </button>
    </div>
  );
};
