import { useEffect, useMemo, useState } from "react";
import { Link, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import type { DetailLoaderData } from "@/types";
import { formatCurrency } from "@/utils/features";
import { FallbackImage } from "@/components/FallbackImage";
import css from "./DesignPage.module.css";

type FrameType = "square" | "round" | "flower";
type SignatureStyle = "script" | "stamp" | "simple";

const frameOptions: Array<{
  id: FrameType;
  label: string;
  description: string;
}> = [
  { id: "square", label: "사각형", description: "단정하고 선명한 인상" },
  { id: "round", label: "원형", description: "부드럽고 친근한 인상" },
  { id: "flower", label: "꽃모양", description: "장식적이고 포인트가 되는 형태" },
];

const signatureOptions: Array<{
  id: SignatureStyle;
  label: string;
  description: string;
}> = [
  { id: "script", label: "필기체", description: "자연스럽고 부드러운 느낌" },
  { id: "stamp", label: "도장 느낌", description: "뚜렷하고 개성 있는 느낌" },
  { id: "simple", label: "심플", description: "작고 깔끔하게 마무리" },
];

const shapeClassMap: Record<FrameType, string> = {
  square: css.shapeSquare,
  round: css.shapeRound,
  flower: css.shapeFlower,
};

const signatureClassMap: Record<SignatureStyle, string> = {
  script: css.signatureScript,
  stamp: css.signatureStamp,
  simple: css.signatureSimple,
};

export const DesignPage = () => {
  const { product } = useLoaderData() as DetailLoaderData;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedFrame, setSelectedFrame] = useState<FrameType>("square");
  const [selectedSignatureStyle, setSelectedSignatureStyle] =
    useState<SignatureStyle>("script");
  const [headline, setHeadline] = useState(product.title);
  const [subText, setSubText] = useState("사이즈는 상세페이지에서 고르고, 디자인은 여기서 완성해요.");
  const [signature, setSignature] = useState("Dearly");
  const [showSignature, setShowSignature] = useState(true);

  const selectedColor = searchParams.get("color") || "기본 색상";

  useEffect(() => {
    setHeadline(product.title);
  }, [product.title]);

  const previewShapeClass = useMemo(() => shapeClassMap[selectedFrame], [selectedFrame]);
  const signatureStyleClass = useMemo(
    () => signatureClassMap[selectedSignatureStyle],
    [selectedSignatureStyle],
  );

  return (
    <main className={css.page}>
      <section className={css.hero}>
        <div className={css.heroCopy}>
          <p className={css.eyebrow}>디자인 만들기</p>
          <h1>{product.title}</h1>
          <p className={css.lead}>
            상세페이지에서 고른 색상을 이어받아, 프레임 형태와 서명만으로 디자인 감도를 바꿀 수 있어요.
          </p>
          <div className={css.metaRow}>
            <span>{selectedColor}</span>
            <span>{formatCurrency(product.price)}</span>
          </div>

          <div className={css.noticeCard}>
            <strong>디자인 포인트</strong>
            <p>
              상세페이지에서는 색상과 옵션을 고르고, 이 화면에서는 프레임 모양, 문구, 서명
              표현을 다듬는 방식으로 나누면 더 자연스럽습니다.
            </p>
          </div>
        </div>

        <div className={css.previewCard}>
          <div className={css.previewTop}>
            <span>{product.section}</span>
            <strong>{selectedFrame}</strong>
          </div>

          <div className={`${css.previewCanvas} ${previewShapeClass}`}>
            <FallbackImage src={product.img} alt={product.title} />
            <div className={css.previewText}>
              <p>{headline}</p>
              <small>{subText}</small>
            </div>
            {showSignature && (
              <div className={`${css.signatureBadge} ${signatureStyleClass}`}>
                <span>{signature}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={css.editorGrid}>
        <section className={css.editorPanel}>
          <h2>프레임 형태</h2>
          <div className={css.shapeGrid}>
            {frameOptions.map((frame) => (
              <button
                key={frame.id}
                type="button"
                className={selectedFrame === frame.id ? css.optionActive : css.optionBtn}
                onClick={() => setSelectedFrame(frame.id)}
              >
                <strong>{frame.label}</strong>
                <span>{frame.description}</span>
              </button>
            ))}
          </div>
        </section>

        <section className={css.editorPanel}>
          <h2>서명 스타일</h2>
          <div className={css.shapeGrid}>
            {signatureOptions.map((style) => (
              <button
                key={style.id}
                type="button"
                className={selectedSignatureStyle === style.id ? css.optionActive : css.optionBtn}
                onClick={() => setSelectedSignatureStyle(style.id)}
              >
                <strong>{style.label}</strong>
                <span>{style.description}</span>
              </button>
            ))}
          </div>
          <label className={css.toggleRow}>
            <input
              type="checkbox"
              checked={showSignature}
              onChange={(e) => setShowSignature(e.target.checked)}
            />
            <span>서명 표시</span>
          </label>
        </section>

        <section className={css.editorPanel}>
          <h2>문구 편집</h2>
          <label className={css.field}>
            메인 문구
            <input value={headline} onChange={(e) => setHeadline(e.target.value)} />
          </label>
          <label className={css.field}>
            보조 문구
            <textarea value={subText} onChange={(e) => setSubText(e.target.value)} rows={3} />
          </label>
        </section>

        <section className={css.editorPanel}>
          <h2>서명 입력</h2>
          <label className={css.field}>
            서명 텍스트
            <input value={signature} onChange={(e) => setSignature(e.target.value)} />
          </label>

          <div className={css.actionRow}>
            <Link to={`/detail/${product.id}`} className={css.secondaryBtn}>
              상세페이지로
            </Link>
            <button
              type="button"
              className={css.primaryBtn}
              onClick={() =>
                navigate(
                  `/detail/${product.id}?color=${encodeURIComponent(selectedColor)}`,
                )
              }
            >
              디자인 저장 후 돌아가기
            </button>
          </div>
        </section>
      </section>
    </main>
  );
};
