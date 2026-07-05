/* 
상품 등록을 위한 페이지

이미지는 보통 업로드를 사용. 다만 이 프로젝트에서는 json-server를 사용하기 때문에 기존에 DB에 있는 이미지만 사용

*/

import React, { useEffect, useState } from "react";
import css from "./MyPage.module.css";
import type { Product, ProductFormData } from "@/types";
import { addProduct, deleteProduct, getProductsData } from "@/api/productsApi";
import { formatCurrency } from "@/utils/features";
import { ConfirmModal } from "@/components/ConfirmModal";

export const MyPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    price: "",
    discount: 0,
    category: "new",
    img: "",
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await getProductsData();
      setProducts(Array.isArray(data) ? data : []);
    };
    loadData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "discount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.img) {
      alert("상품명, 가격, 이미지 파일명은 필수입니다.");
      return;
    }

    const newProduct: Product = {
      id: String(Date.now()),
      title: formData.title,
      price: Number(formData.price),
      discount: formData.discount,
      category: formData.category,
      img: formData.img,
    };

    try {
      const savedItem = await addProduct(newProduct);
      setProducts((prev) => [...prev, savedItem]);
      setFormData({
        title: "",
        price: "",
        discount: 0,
        category: "new",
        img: "",
      });
      alert("상품이 등록되었습니다");
    } catch (err) {
      alert("등록 실패!");
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
      alert("삭제 실패!");
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
      <div className={css.header}>
        <h2 className={css.title}>상품 관리(Admin) </h2>
      </div>
      <section className={css.formSection}>
        <h3>새 상품 등록</h3>
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.inputGroup}>
            <label>상품명</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              placeholder="예: 14k 골드 링"
              onChange={handleChange}
            />
          </div>
          <div className={css.row}>
            <div className={css.inputGroup}>
              <label>가격(원)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                placeholder="숫자만 입력"
                onChange={handleChange}
              />
            </div>
            <div className={css.inputGroup}>
              <label>할인율</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                placeholder="0"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={css.row}>
            <div className={css.inputGroup}>
              <label>카테고리</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="new">신상품 (new) </option>
                <option value="top">인기상품 (top) </option>
                <option value="">일반 </option>
              </select>
            </div>
            <div className={css.inputGroup}>
              <label>이미지 파일명</label>
              <input
                type="text"
                name="img"
                value={formData.img}
                placeholder="예: image1.jpg (public/img 폴더 내)"
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className={css.submitBtn}>
            상품 등록하기
          </button>
        </form>
      </section>

      <div className={css.divider}></div>
      <h3 className={css.listTitle}>등록된 상품 목록 ({products.length})</h3>
      <div className={css.grid}>
        {products.map((item) => (
          <div key={item.id} className={css.card}>
            <div className={css.imgWrap}>
              <img
                src={
                  item.img.startsWith("http") ? item.img : `/img/${item.img}`
                }
                alt={item.title}
                // 이미지 에러가 날 경우 임시 이미지
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "http://via.placeholder.com/150";
                }}
              ></img>
              {item.discount > 0 && (
                <span className={css.badge}>{item.discount}</span>
              )}
            </div>
            <div className={css.info}>
              <h4 className={css.productTitle}>{item.title}</h4>
              <p className={css.price}>{formatCurrency(item.price)}</p>
              <button
                className={css.deleteBtn}
                onClick={() => handleDeleteClick(item.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        message="정말 이 상품을 삭제하시겠습니까?"
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
      />
    </main>
  );
};
