import css from "../UserPage.module.css";
import type { BenefitTier } from "../userpageData";

type BenefitModalProps = {
  tier: BenefitTier | null;
  onClose: () => void;
};

export const BenefitModal = ({ tier, onClose }: BenefitModalProps) => {
  if (!tier) return null;

  return (
    <div className={css.benefitModalBackdrop} onClick={onClose}>
      <div className={css.benefitModal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={css.benefitModalClose} onClick={onClose}>
          <i className="bi bi-x-lg" aria-hidden="true"></i>
        </button>
        <span className={css.benefitModalBadge}>다음 등급 안내</span>
        <h3>{tier.name}</h3>
        <p className={css.benefitModalSubtitle}>{tier.subtitle}</p>
        <ul className={css.tierList}>
          {tier.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
