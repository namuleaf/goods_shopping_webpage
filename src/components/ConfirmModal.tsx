/*
삭제를 위한 확인 / 취소 모달 컴포넌트

조건부 렌더링으로 모달 열고 닫기
isOpen 이 false 면 렌더링 X
isOpen 이 True 면 렌더링

이벤트 버블링 stopPropagation
클릭 이벤트는 자식 -> 부모 방향으로 전파됩니다. (이벤트 버블링)
오버레이(배경)클릭시 onCancel 이 실행되어 모달이 닫힘
그런데 이때 모달 박스를 클릭해도 이벤트가 오버레이까지 전파되어 닫혀버립니다.
e.stopPropagation() 으로 모달 박스에서 이벤트 전달을 막아 이를 방지함
*/

import React from "react";
import css from "./ConfirmModal.module.css";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    // 오버레이(배경)클릭시 모달 닫기
    <div className={css.modalOverlay} onClick={onCancel}>
      {/* 모달 박스 클릭 시 이벤트가 오버레이까지 전파되지 않도록 막음 */}
      <div className={css.modalBox} onClick={(e) => e.stopPropagation()}>
        <p className={css.message}>{message}</p>
        <div className={css.btnGroup}>
          <button className={css.cancelBtn} onClick={onCancel}>
            취소
          </button>
          <button className={css.deleteBtn} onClick={onConfirm}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};
