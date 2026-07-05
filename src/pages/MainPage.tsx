import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import css from "./MainPage.module.css";
import { HeroSlider } from "@/organism/HeroSlider";
import { ProductCard } from "@/components/ProductCard";
import { mainCatalogProducts, mainSections } from "@/data/mainCatalog";

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionParam = searchParams.get("section");
  const [selectedSection, setSelectedSection] = useState(() => {
    return sectionParam || localStorage.getItem("mainSection") || "phone";
  });
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading] = useState(false);

  const currentSection =
    mainSections.find((section) => section.id === selectedSection) ??
    mainSections[0];

  const currentProducts = useMemo(
    () => mainCatalogProducts.filter((product) => product.section === selectedSection),
    [selectedSection],
  );

  const visibleProducts = showAll ? currentProducts : currentProducts.slice(0, 4);

  useEffect(() => {
    const nextSection =
      sectionParam && mainSections.some((section) => section.id === sectionParam)
        ? sectionParam
        : localStorage.getItem("mainSection") || "phone";

    setSelectedSection(nextSection);
    localStorage.setItem("mainSection", nextSection);
  }, [sectionParam]);

  useEffect(() => {
    setShowAll(false);
    setCurrentIndex(0);
  }, [selectedSection]);

  useEffect(() => {
    if (visibleProducts.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visibleProducts.length);
    }, 2200);

    return () => clearInterval(timer);
  }, [visibleProducts.length]);

  if (loading) {
    return (
      <main className={css.mainContainer}>
        <p className={css.loading}>로딩 중...</p>
      </main>
    );
  }

  return (
    <main className={css.mainContainer}>
      <HeroSlider />

      <section className={css.productSection}>
        <div className={css.sectionHeader}>
          <div>
            <h3 className={css.sectionTitle}>{currentSection.label}</h3>
            <p className={css.sectionDesc}>{currentSection.description}</p>
          </div>

          <button
            type="button"
            className={css.viewAllLink}
            onClick={() => {
              setCurrentIndex(0);
              setShowAll((prev) => !prev);
            }}
          >
            {showAll ? "카드 접기" : "전체 상품 보기"}
          </button>
        </div>

        <div className={css.sectionTabs}>
          {mainSections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={
                section.id === selectedSection
                  ? `${css.sectionChip} ${css.sectionChipActive}`
                  : css.sectionChip
              }
              onClick={() => {
                setSearchParams({ section: section.id });
                setSelectedSection(section.id);
                setCurrentIndex(0);
                localStorage.setItem("mainSection", section.id);
              }}
            >
              {section.label}
            </button>
          ))}
        </div>

        {visibleProducts.length === 0 ? (
          <p className={css.noProduct}>상품이 없습니다.</p>
        ) : (
          <div className={css.carouselViewport}>
            <div
              className={css.carouselTrack}
              style={{
                transform: `translateX(-${currentIndex * 320}px)`,
              }}
            >
              {visibleProducts.map((product) => (
                <div className={css.carouselItem} key={product.id}>
                  <ProductCard data={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={css.eventLinkWrap}>
          <Link to="/event" className={css.eventLink}>
            이벤트 보러 가기
          </Link>
        </div>
      </section>
    </main>
  );
};
