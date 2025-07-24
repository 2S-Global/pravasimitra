"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import OtherBanner from "@/app/components/OtherBanner";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import AlertService from "@/app/components/alertService";

const BuySellCategoryPage = () => {
  const router = useRouter();
  const { category, id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(id || "");
  const [allCategories, setAllCategories] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [gridLoading, setGridLoading] = useState(false);

  const fetchProducts = async (categoryId = "") => {
    try {
      setGridLoading(true);
      const productsRes = await axios.get("/api/product/categorywise-list", {
        params: { id: categoryId },
      });
      setAllItems(productsRes.data.productList || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setGridLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const catRes = await axios.get("/api/product/category-list");
      const categories = catRes.data.categories || [];
      setAllCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  

  useEffect(() => {
    fetchCategories();
    fetchProducts(id);
  }, [id]);

  const handleSearch = async () => {
    try {
      setGridLoading(true);
      const res = await axios.get("/api/product/search-items", {
        params: {
          categoryId: selectedCategory,
          keyword: searchTerm,
        },
      });
      setAllItems(res.data?.itemList || []);
    } catch (error) {
      console.error("Error searching products:", error);
      AlertService.error("Failed to search products.");
    } finally {
      setGridLoading(false);
    }
  };

  const handleClear = async () => {
    try {
      setSearchTerm("");
      await fetchProducts(selectedCategory);
    } catch (error) {
      console.error("Error clearing filters:", error);
    }
  };

  const handleClick = (categoryName, categoryId) => {
    const slug = encodeURIComponent(categoryName.toLowerCase().replace(/\s+/g, "-"));
    const scrollY = window.scrollY;

    // Update state and fetch products
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);

    // Use router.replace to avoid adding to history stack
      //  router.replace(`/buy-sell/${slug}/${categoryId}`, { scroll: false });

    // Restore scroll position
    window.scrollTo(0, scrollY);
  };

  // Memoize the category buttons to prevent re-rendering
  const categoryButtons = useMemo(() => {
    return allCategories.length > 0 ? (
      allCategories.map((cat) => (
        <button
          key={cat.id}
          className={`btn btn-sm px-4 py-2 ${
            selectedCategory === cat.id ? "btn-danger" : "btn-outline-danger"
          } shadow-sm`}
          onClick={() => handleClick(cat.name, cat.id)}
        >
          {cat.name}
        </button>
      ))
    ) : (
      <button className="btn btn-sm px-4 py-2 btn-outline-danger shadow-sm" disabled>
        Loading Categories...
      </button>
    );
  }, [allCategories, selectedCategory]);

  return (
    <>
      <Header />
      <OtherBanner
        page_title={category || "All Furniture"}
        banner_image="/assets/images/bg/furniture_banner.jpg"
      />
      <div className="tm-section tm-login-register-area bg-white tm-padding-section">
        <div className="container">
          <div className="row col-md-12">
            <div className="profile-info col-md-12">
              {/* 📂 Main Category Filter */}
              <div className="mb-4 text-center">
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {categoryButtons}
                </div>
              </div>

              {/* 🔍 Search Box */}
              <div className="search-panel p-4 mb-3 rounded shadow-sm border bg-light">
                <div className="row g-3 align-items-center">
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2">
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-danger w-50"
                        type="button"
                        onClick={handleSearch}
                        disabled={!searchTerm.trim()}
                      >
                        Search
                      </button>
                      <button
                        className="btn btn-outline-secondary w-50"
                        type="button"
                        onClick={handleClear}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 🪑 Product Grid */}
              <div className="container my-5">
                {gridLoading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "300px" }}
                  >
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading products...</span>
                    </div>
                  </div>
                ) : (
                  <div className="row g-4">
                    {allItems.length === 0 ? (
                      <div className="col-12">
                        <div className="text-center p-5 rounded border shadow-sm bg-light">
                          <img
                            src="/assets/images/empty-box.png"
                            alt="No Records"
                            className="mx-auto d-block"
                            style={{ width: "120px", opacity: 0.5, marginBottom: "20px" }}
                          />
                          <h4 className="fw-bold text-muted">No Items Found</h4>
                          <p className="text-secondary">
                            Sorry, we couldn't find any items in this category.
                          </p>
                        </div>
                      </div>
                    ) : ( 
                      allItems.map((item, index) => (
                        <div className="col-md-4" key={index}>
                          <div className="card h-100 shadow-sm border-0 position-relative">
                            <img
                              src={item.image}
                              className="card-img-top"
                              alt={item.title}
                              style={{ height: "250px", objectFit: "cover" }}
                            />
                            {item.gallery && item.gallery.length > 1 && (
                              <span
                                className="badge bg-dark position-absolute top-0 end-0 m-2"
                                style={{ padding: "7px" }}
                              >
                                {item.gallery.length} More Photos
                              </span>
                            )}
                            <div className="card-body text-center">
                              <h5 className="card-title">
                                {item.title.length > 30
                                  ? item.title.slice(0, 30) + "..."
                                  : item.title}
                              </h5>
                              <p className="card-text text-muted">
                                {item.city} | {item.state}
                              </p>
                              <p className="card-text text-muted">
                                {item.shortDesc
                                  ? item.shortDesc
                                      .split(" ")
                                      .slice(0, 10)
                                      .join(" ") +
                                    (item.shortDesc.split(" ").length > 10 ? "..." : "")
                                  : ""}
                              </p>
                              <p className="fw-bold text-primary fs-5">${item.price}</p>
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => router.push(`/buy-sell/details/${item.id}`)}
                                style={{ background: "#c12020", color: "#fff", border: "#c12020" }}
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* 🚨 Floating SOS Button */}
              <button
                className="btn btn-danger rounded-circle position-fixed"
                style={{ bottom: 20, right: 20, width: 50, height: 50 }}
              >
                <img src="/assets/images/icon-sos.png" alt="SOS" style={{ maxWidth: 25 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BuySellCategoryPage;