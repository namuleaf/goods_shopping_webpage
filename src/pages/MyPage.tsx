import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import css from "./MyPage.module.css";
import type { CartItem, Product } from "@/types";
import { addProduct, deleteProduct, getProductsData } from "@/api/productsApi";
import { getCartData } from "@/api/cartApi";
import { formatCurrency } from "@/utils/features";
import { ConfirmModal } from "@/components/ConfirmModal";

type AdminPanelId = "product" | "delivery";

type ProductFormState = {
  title: string;
  price: string;
  discount: number;
  category: string;
  section: string;
  bannerItemCat: string;
  phoneCategory: string;
  phoneCategoryLabel: string;
  img: string;
};

const adminPanels: Array<{ id: AdminPanelId; label: string; description: string }> = [
  {
    id: "product",
    label: "상품 등록 관리",
    description: "상품을 추가하고 기존 등록 상품을 관리합니다.",
  },
  {
    id: "delivery",
    label: "주문 배송 일정 관리",
    description: "최근 주문의 배송 일정과 희망일을 관리합니다.",
  },
];

const sectionOptions = [
  { value: "phone", label: "폰 악세사리" },
  { value: "sticker", label: "스티커" },
  { value: "photo", label: "포토" },
  { value: "acrylic", label: "아크릴" },
  { value: "living", label: "리빙" },
  { value: "calendar", label: "달력" },
];

const categoryOptions = [
  { value: "new", label: "신상품" },
  { value: "top", label: "인기상품" },
  { value: "recommend", label: "추천상품" },
  { value: "discount", label: "할인상품" },
];

const formatDate = (value?: string) => {
  if (!value) return "미정";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString("ko-KR");
};

export const MyPage = () => {
  const [activePanel, setActivePanel] = useState<AdminPanelId>("product");
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductFormState>({
    title: "",
    price: "",
    discount: 0,
    category: "new",
    section: "phone",
    bannerItemCat: "phone",
    phoneCategory: "item",
    phoneCategoryLabel: "폰 아이템",
    img: "",
  });

  useEffect(() => {
    const loadData = async () => {
      const [productData, cartData] = await Promise.all([
        getProductsData(),
        getCartData(),
      ]);
      setProducts(Array.isArray(productData) ? productData : []);
      setCartItems(Array.isArray(cartData) ? cartData : []);
    };

    loadData();
  }, []);

  const deliverySummary = useMemo(() => {
    const total = cartItems.length;
    const withSchedule = cartItems.filter((item) => item.deliveryStartDate).length;
    const needReview = cartItems.filter((item) => !item.deliveryEndDate).length;
    return { total, withSchedule, needReview };
  }, [cartItems]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "discount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.img) {
      alert("상품명, 가격, 이미지 경로는 필수입니다.");
      return;
    }

    const newProduct: Product = {
      id: String(Date.now()),
      title: formData.title,
      price: Number(formData.price),
      discount: formData.discount,
      category: formData.category,
      img: formData.img,
      bannerItemCat: formData.bannerItemCat,
      section: formData.section,
      phoneCategory: formData.section === "phone" ? formData.phoneCategory : undefined,
      phoneCategoryLabel:
        formData.section === "phone" ? formData.phoneCategoryLabel : undefined,
    };

    try {
      const savedItem = await addProduct(newProduct);
      setProducts((prev) => [...prev, savedItem]);
      setFormData({
        title: "",
        price: "",
        discount: 0,
        category: "new",
        section: "phone",
        bannerItemCat: "phone",
        phoneCategory: "item",
        phoneCategoryLabel: "폰 아이템",
        img: "",
      });
      alert("상품이 등록되었습니다.");
    } catch (err) {
      alert("등록에 실패했습니다.");
      console.log(err);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteProduct(deleteTargetId);
      setProducts((prev) => prev.filter((item) => item.id !== deleteTargetId));
    } catch (err) {
      alert("삭제에 실패했습니다.");
      console.log(err);
    }
    setIsDeleteModalOpen(false);
    setDeleteTargetId(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteTargetId(null);
  };

  return (
    <main className={css.container}>
      <aside className={css.sidebar}>
        <div className={css.sidebarHeader}>
          <p>Admin</p>
          <h2>MyPage 관리</h2>
        </div>

        <nav className={css.menu}>
          {adminPanels.map((panel) => (
            <button
              key={panel.id}
              type="button"
              className={`${css.menuBtn} ${activePanel === panel.id ? css.menuBtnActive : ""}`}
              onClick={() => setActivePanel(panel.id)}
            >
              <strong>{panel.label}</strong>
              <span>{panel.description}</span>
            </button>
          ))}
        </nav>
      </aside>

      <section className={css.content}>
        {activePanel === "product" && (
          <>
            <section className={css.panelCard}>
              <div className={css.panelHeader}>
                <h3>상품 등록 관리</h3>
              </div>

              <form className={css.form} onSubmit={handleSubmit}>
                <div className={css.row}>
                  <label className={css.inputGroup}>
                    상품명
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      placeholder="상품명을 입력하세요"
                      onChange={handleChange}
                    />
                  </label>
                  <label className={css.inputGroup}>
                    가격
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      placeholder="숫자만 입력"
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className={css.row}>
                  <label className={css.inputGroup}>
                    할인율
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      placeholder="0"
                      onChange={handleChange}
                    />
                  </label>
                  <label className={css.inputGroup}>
                    이미지 경로
                    <input
                      type="text"
                      name="img"
                      value={formData.img}
                      placeholder="/img_PhoneItem/..."
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className={css.row}>
                  <label className={css.inputGroup}>
                    섹션
                    <select name="section" value={formData.section} onChange={handleChange}>
                      {sectionOptions.map((section) => (
                        <option key={section.value} value={section.value}>
                          {section.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={css.inputGroup}>
                    배너 카테고리
                    <input
                      type="text"
                      name="bannerItemCat"
                      value={formData.bannerItemCat}
                      onChange={handleChange}
                      placeholder="phone, sticker..."
                    />
                  </label>
                </div>

                <div className={css.row}>
                  <label className={css.inputGroup}>
                    상품 카테고리
                    <select name="category" value={formData.category} onChange={handleChange}>
                      {categoryOptions.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={css.inputGroup}>
                    폰 카테고리
                    <input
                      type="text"
                      name="phoneCategory"
                      value={formData.phoneCategory}
                      onChange={handleChange}
                      placeholder="item / accessory"
                      disabled={formData.section !== "phone"}
                    />
                  </label>
                </div>

                <label className={css.inputGroup}>
                  폰 카테고리 라벨
                  <input
                    type="text"
                    name="phoneCategoryLabel"
                    value={formData.phoneCategoryLabel}
                    onChange={handleChange}
                    disabled={formData.section !== "phone"}
                    placeholder="폰 아이템"
                  />
                </label>

                <button type="submit" className={css.submitBtn}>
                  상품 등록하기
                </button>
              </form>
            </section>

            <section className={css.panelCard}>
              <div className={css.panelHeader}>
                <h3>등록된 상품</h3>
                <p>현재 {products.length}개의 상품이 등록되어 있어요.</p>
              </div>

              <div className={css.grid}>
                {products.map((item) => (
                  <article key={item.id} className={css.card}>
                    <div className={css.imgWrap}>
                      <img
                        src={item.img.startsWith("http") ? item.img : item.img}
                        alt={item.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "http://via.placeholder.com/150";
                        }}
                      />
                      {item.discount > 0 && <span className={css.badge}>{item.discount}%</span>}
                    </div>
                    <div className={css.info}>
                      <h4 className={css.productTitle}>{item.title}</h4>
                      <p className={css.meta}>
                        {item.section} · {item.category}
                      </p>
                      <p className={css.price}>{formatCurrency(item.price)}</p>
                      <button
                        className={css.deleteBtn}
                        onClick={() => handleDeleteClick(item.id)}
                        type="button"
                      >
                        삭제
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {activePanel === "delivery" && (
          <section className={css.panelCard}>
            <div className={css.panelHeader}>
              <h3>주문 배송 일정 관리</h3>
            </div>

            <div className={css.summaryGrid}>
              <article className={css.summaryCard}>
                <span>주문 수</span>
                <strong>{deliverySummary.total}</strong>
              </article>
              <article className={css.summaryCard}>
                <span>일정 입력 완료</span>
                <strong>{deliverySummary.withSchedule}</strong>
              </article>
              <article className={css.summaryCard}>
                <span>검토 필요</span>
                <strong>{deliverySummary.needReview}</strong>
              </article>
            </div>

            <div className={css.tableWrap}>
              <table className={css.table}>
                <thead>
                  <tr>
                    <th>상품</th>
                    <th>옵션</th>
                    <th>사이즈</th>
                    <th>주문일</th>
                    <th>배송 희망일</th>
                    <th>배송 일정</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.selectedOptionLabel || "기본 옵션"}</td>
                      <td>{item.selectedSizeLabel || "기본 사이즈"}</td>
                      <td>{formatDate(item.orderDate)}</td>
                      <td>{formatDate(item.preferredDeliveryDate)}</td>
                      <td>
                        {formatDate(item.deliveryStartDate)}
                        {item.deliveryEndDate ? ` ~ ${formatDate(item.deliveryEndDate)}` : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </section>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        message="정말 상품을 삭제하시겠습니까?"
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
      />
    </main>
  );
};
