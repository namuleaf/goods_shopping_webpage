import css from "./ChatbotWidget.module.css";

type ChatbotWidgetProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ChatbotWidget = ({ isOpen, onClose }: ChatbotWidgetProps) => {
  if (!isOpen) return null;

  return (
    <div className={css.widgetContainer}>
      <div className={css.widgetHeader}>
        <div>
          <h2>Dearly 고객센터</h2>
          <div className={css.badge}>AI</div>
          <p>AI 상담 중</p>
        </div>
        <button type="button" className={css.closeButton} onClick={onClose}>
          <span className="bi bi-x-square"></span>
        </button>
      </div>

      <div className={css.widgetTabSection}>
        <div>AI 챗봇</div>
      </div>
      <div className={css.messageRow}>
        <span className="bi bi-chat-dots"></span>
        <div className={css.chatbotBubble}>
          <p>
            안녕하세요! Dearly 상담사입니다.
            <br />
            <br />
            문의 내용을 입력해주시면 최대한 빠르게 답변드릴게요.
            <br />
            <br />
            예시)
            <br />
            "배송 조회가 안 돼요"
            <br />
            "주문 취소는 어떻게 하나요?"
          </p>
        </div>
      </div>

      <div className={css.moment}>
        <span className="bi bi-info-circle">
          AI 답변은 참고용이며, 정확한 안내는 고객센터를 확인해주세요.
        </span>
      </div>

      <div className={css.inputSection}>
        <input type="text" placeholder="질문을 입력해보세요" />
        <button type="submit">
          <span className="bi bi-send"></span>
        </button>
      </div>
      <div className={css.agentBar}>
        <p>찾으시는 내용이 없으신가요?</p>
        <span>상담원 문의</span>
      </div>
    </div>
  );
};
