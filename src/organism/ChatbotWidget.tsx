import { useState } from "react";
import css from "./ChatbotWidget.module.css";

type ChatbotWidgetProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

type TabKey = "ai" | "agent" | "history";

const tabs: Array<{ key: TabKey; label: string; caption: string }> = [
  { key: "ai", label: "AI 상담", caption: "빠른 안내" },
  { key: "agent", label: "상담원 문의", caption: "1:1 연결" },
  { key: "history", label: "문의 내역", caption: "최근 기록" },
];

export const ChatbotWidget = ({ isOpen = true, onClose = () => {} }: ChatbotWidgetProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>("ai");

  if (!isOpen) return null;

  return (
    <div className={css.widgetContainer}>
      <div className={css.widgetHeader}>
        <div>
          <h2>Dearly 고객센터</h2>
          <div className={css.badge}>AI</div>
          <p>AI 상담과 상담원 문의를 함께 확인할 수 있어요.</p>
        </div>
        <button type="button" className={css.closeButton} onClick={onClose} aria-label="상담창 닫기">
          <span className="bi bi-x-square"></span>
        </button>
      </div>

      <div className={css.tabList} role="tablist" aria-label="고객센터 탭">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={isActive ? `${css.tabButton} ${css.tabButtonActive}` : css.tabButton}
              onClick={() => setActiveTab(tab.key)}
            >
              <span>{tab.label}</span>
              <small>{tab.caption}</small>
            </button>
          );
        })}
      </div>

      {activeTab === "ai" && (
        <div className={css.panel}>
          <div className={css.messageRow}>
            <span className="bi bi-chat-dots"></span>
            <div className={css.chatbotBubble}>
              <p>
                안녕하세요. Dearly 상담사입니다.
                <br />
                <br />
                문의 내용을 입력해 주시면 주문, 배송, 결제, 교환/반품까지 빠르게 안내해 드릴게요.
                <br />
                <br />
                예시)
                <br />
                "배송 조회가 필요해요"
                <br />
                "주문 취소는 어떻게 하나요?"
              </p>
            </div>
          </div>

          <div className={css.moment}>
            <span className="bi bi-info-circle" />
            <p>AI 답변은 참고용이며, 상세한 확인이 필요한 경우 상담원 문의로 이어갈 수 있어요.</p>
          </div>

          <div className={css.quickChipGrid}>
            <button type="button" className={css.quickChip}>
              주문 확인
            </button>
            <button type="button" className={css.quickChip}>
              배송 조회
            </button>
            <button type="button" className={css.quickChip}>
              결제 문의
            </button>
            <button type="button" className={css.quickChip}>
              교환/반품
            </button>
          </div>

          <div className={css.inputSection}>
            <input type="text" placeholder="질문을 입력해보세요" />
            <button type="button" aria-label="상담 전송">
              <span className="bi bi-send"></span>
            </button>
          </div>

          <div className={css.agentBar}>
            <p>찾으시는 내용이 없으면 상담원에게 바로 연결해 보세요.</p>
            <span>상담원 문의</span>
          </div>
        </div>
      )}

      {activeTab === "agent" && (
        <div className={css.panel}>
          <div className={css.card}>
            <h3>상담원 연결 안내</h3>
            <p>영업시간 내에는 더 빠르게 답변받을 수 있어요.</p>
            <div className={css.helpBadge}>
              <span>상품 문의</span>
              <span>배송 일정</span>
              <span>주문 변경</span>
              <span>교환/반품</span>
            </div>
          </div>

          <div className={css.selfServiceCon}>
            <h3>빠른 상담 분류</h3>
            <p>원하는 항목을 먼저 선택하면 안내가 더 정확해져요.</p>
            <div className={css.helpBadge}>
              <span>주문/배송</span>
              <span>상품</span>
              <span>결제</span>
              <span>쿠폰/혜택</span>
              <span>환불</span>
              <span>회원 정보</span>
            </div>
          </div>

          <div className={css.agentBarSecond}>
            <p>상담 연결 가능 시간은 평일 10:00 - 18:00 입니다.</p>
            <span>상담원 문의</span>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className={css.panel}>
          <div className={css.card}>
            <h3>문의 내역</h3>
            <p>최근 문의와 주문 관련 기록을 함께 확인할 수 있어요.</p>
            <div className={css.historyList}>
              <article className={css.historyItem}>
                <strong>주문 배송 문의</strong>
                <span>2026-07-06 · 답변 완료</span>
              </article>
              <article className={css.historyItem}>
                <strong>교환 가능 여부</strong>
                <span>2026-07-04 · 상담 대기</span>
              </article>
            </div>
          </div>

          <div className={css.helpInput}>
            <h3>문의 검색</h3>
            <p>최근 등록한 문의를 빠르게 확인해 보세요.</p>
            <input type="text" placeholder="최근 문의 내역을 검색하세요." />
          </div>

          <div className={css.orderInput}>
            <h3>주문 번호 확인</h3>
            <p>주문 번호나 휴대폰 번호로 확인할 수 있어요.</p>
            <input type="text" placeholder="주문 번호를 입력하세요." />
          </div>

          <div className={css.agentBarThird}>
            <p>문의 내역은 고객센터에서 계속 이어서 확인할 수 있어요.</p>
            <span>상담원 문의</span>
          </div>
        </div>
      )}
    </div>
  );
};
