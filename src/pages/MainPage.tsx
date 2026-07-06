import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import css from "./MainPage.module.css";
import { HeroSlider } from "@/organism/HeroSlider";
import { ProductCard } from "@/components/ProductCard";
import { getProductsData } from "@/api/productsApi";
import {
  mainSections,
  sectionKindMap,
} from "@/data/mainCatalogMeta";
import type { Product } from "@/types";

type CatalogProduct = Product & {
  kind: string;
  kindLabel: string;
};

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionParam = searchParams.get("section");
  const kindParam = searchParams.get("kind");
  const [catalogProducts, setCatalogProducts] = useState<CatalogProduct[]>([]);
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedKind, setSelectedKind] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCarouselTransitionEnabled, setIsCarouselTransitionEnabled] =
    useState(true);

  const snapCarouselToStart = () => {
    setIsCarouselTransitionEnabled(false);
    setCurrentIndex(0);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsCarouselTransitionEnabled(true);
      });
    });
  };

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      const products = await getProductsData();
      if (!isMounted) return;

      setCatalogProducts(
        products.map((product) => {
          const kind =
            product.phoneCategory ?? (product.section === "phone" ? "item" : "all");
          const kindLabel =
            sectionKindMap[product.section as keyof typeof sectionKindMap]?.find(
              (item) => item.id === kind,
            )?.label ?? product.phoneCategoryLabel ?? "전체";

          return {
            ...product,
            kind,
            kindLabel,
          };
        }),
      );
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentSection =
    mainSections.find((section) => section.id === selectedSection) ??
    mainSections[0];
  const currentKindList =
    sectionKindMap[selectedSection as keyof typeof sectionKindMap] ??
    sectionKindMap.all;

  const currentProducts = useMemo(() => {
    const sectionFiltered =
      selectedSection === "all"
        ? catalogProducts
        : catalogProducts.filter((product) => product.section === selectedSection);

    if (selectedKind === "all") {
      return sectionFiltered;
    }

    return sectionFiltered.filter((product) => product.kind === selectedKind);
  }, [catalogProducts, selectedSection, selectedKind]);

  const visibleProducts =
    selectedSection === "all" || showAll
      ? currentProducts
      : currentProducts.slice(0, 4);

  useEffect(() => {
    const nextSection =
      sectionParam &&
      mainSections.some((section) => section.id === sectionParam)
        ? sectionParam
        : "all";

    setSelectedSection(nextSection);
  }, [sectionParam]);

  useEffect(() => {
    const nextKind =
      selectedSection === "all"
        ? "all"
        : kindParam &&
            currentKindList.some((kind) => kind.id === kindParam)
          ? kindParam
          : "all";

    setSelectedKind(nextKind);
  }, [selectedSection, kindParam, currentKindList]);

  useEffect(() => {
    setShowAll(false);
  }, [selectedSection, selectedKind]);

  useEffect(() => {
    snapCarouselToStart();
  }, [selectedSection, selectedKind]);

  useEffect(() => {
    if (visibleProducts.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visibleProducts.length);
    }, 2200);

    return () => clearInterval(timer);
  }, [visibleProducts.length]);

  const handleSectionChange = (sectionId: string) => {
    snapCarouselToStart();
    setSelectedSection(sectionId);
    setSelectedKind("all");
    setShowAll(false);

    const params = new URLSearchParams();
    if (sectionId !== "all") {
      params.set("section", sectionId);
    }
    setSearchParams(params, { replace: true });
  };

  const handleKindChange = (kindId: string) => {
    snapCarouselToStart();
    setSelectedKind(kindId);
    setShowAll(false);

    const params = new URLSearchParams();
    if (selectedSection !== "all") {
      params.set("section", selectedSection);
    }
    if (kindId !== "all") {
      params.set("kind", kindId);
    }
    setSearchParams(params, { replace: true });
  };

  return (
    <main className={css.mainContainer}>
      <HeroSlider />

      <section className={css.productSection}>
        <div className={css.sectionHeader}>
          <div>
            <h3 className={css.sectionTitle}>{currentSection.label}</h3>
            <p className={css.sectionDesc}>{currentSection.description}</p>
          </div>
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
              onClick={() => handleSectionChange(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className={css.kindTabs}>
          {currentKindList.map((kind) => (
            <button
              key={kind.id}
              type="button"
              className={
                kind.id === selectedKind
                  ? `${css.kindChip} ${css.kindChipActive}`
                  : css.kindChip
              }
              onClick={() => handleKindChange(kind.id)}
            >
              {kind.label}
            </button>
          ))}
        </div>

        {visibleProducts.length === 0 ? (
          <p className={css.noProduct}>상품이 없습니다.</p>
        ) : (
          <div className={css.carouselViewport}>
            <div
              className={
                isCarouselTransitionEnabled
                  ? css.carouselTrack
                  : `${css.carouselTrack} ${css.carouselTrackNoTransition}`
              }
              style={{
                transform: `translateX(calc(var(--carousel-step) * -${currentIndex}))`,
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
