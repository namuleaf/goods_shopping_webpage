import React from 'react'
import css from "./ChatbotWidget.module.css"

export const ChatbotWidget = () => {
  return (
    <div className={css.widgetContainer}>
        <div className={css.widgetHeader}>
            <h2>Dearly 고객센터</h2>
            <div className={css.badge}>AI</div>
            <p>AI 상담 중</p>
            <span className="bi bi-x-square"></span>
        </div>

        <div className={css.widgetTabSection}>
            <div>AI 챗봇</div>
        </div>
        <div className={css.messageRow}>
            <span className="bi bi-chat-dots"></span>
            <div className={css.chatbotBubble}>
                <p>안녕하세요! Dearly 상담사입니다. 
                    <br />
                    <br />
                    문의 내용을 입력해 주시면 도와드리겠습니다. 
                    <br />
                    <br />
                    (예: "배송 조회는 어떻게 하나요?", 
                    "주문을 취소하고 싶어요", "반품 신청 하는 방법이 궁금해요")
                </p>
            </div>
        </div>

        <div className={css.moment}>
            <span className="bi bi-info-circle">
                AI 답변은 참고용으로, 부정확할 수 있어요.
            </span>
        </div>

        <div className={css.inputSection}>
            <input type="string" placeholder="질문을 입력하세요"/>
            <button type="submit">
                <span className="bi bi-send"></span>
            </button>
        </div>
        <div className="agent-bar">
            <p>찾으시는 내용이 없으신가요?</p>
            <span>상담원 문의</span>
        </div>

    </div>
  )
}
