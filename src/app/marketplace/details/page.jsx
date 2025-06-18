"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import OtherBanner from "@/app/components/OtherBanner";
import { useRouter } from "next/navigation";

const ProductDetails = () => {
  const router = useRouter();
  const images = [
    "/assets/marketplace/hi-kolkata.webp",
    "https://thumbs.dreamstime.com/z/selective-focus-illish-hilsa-fish-cooking-mustard-seed-famous-india-bangladesh-hilsa-fish-oily-species-318939598.jpg?ct=jpeg",
    "https://thumbs.dreamstime.com/z/sorshe-illish-hilsa-fish-cooking-mustard-seed-famous-bengali-food-cooked-green-chili-poppy-seeds-over-white-299291513.jpg?ct=jpeg",
    "https://thumbs.dreamstime.com/z/illish-succulent-fish-distinct-taste-popular-bengali-cuisine-often-cooked-mustard-sauce-selective-focus-hilsa-314659423.jpg?ct=jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKRRQa7Lr27aCcFRMN4HxS45HLTORjIdQ0Fg&s",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <>
      <Header />
      <OtherBanner
        page_title="Product Details"
        banner_image="/assets/images/bg/marketplace.png"
      />

      <div className="tm-section tm-login-register-area bg-white tm-padding-section">
        <div className="container my-5">
          <div className="row g-5 align-items-start">
            {/* Image Section */}
            <div className="col-md-6">
              <div className="shadow-sm rounded overflow-hidden mb-3">
                <img
                  src={selectedImage}
                  alt="Product"
                  className="img-fluid w-100 object-fit-cover"
                  style={{ height: "450px", borderRadius: "12px" }}
                />
              </div>

              {/* Thumbnails with Prev/Next */}
              <div className="position-relative mt-3">
                {/* Prev Button */}
                <button
                  type="button"
                  className="btn btn-light position-absolute top-50 start-0 translate-middle-y shadow"
                  style={{ zIndex: 1 }}
                  onClick={() => {
                    const el = document.getElementById("thumbnail-scroll");
                    el.scrollBy({ left: -120, behavior: "smooth" });
                  }}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>

                {/* Scrollable Thumbnails */}
                <div
                  id="thumbnail-scroll"
                  className="d-flex gap-2 overflow-auto px-5"
                  style={{
                    scrollBehavior: "smooth",
                    scrollSnapType: "x mandatory",
                  }}
                >
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index}`}
                      className={`img-thumbnail ${
                        selectedImage === img ? "border border-danger" : ""
                      }`}
                      style={{
                        height: "80px",
                        width: "100px",
                        objectFit: "cover",
                        cursor: "pointer",
                        scrollSnapAlign: "center",
                        flex: "0 0 auto",
                      }}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  className="btn btn-light position-absolute top-50 end-0 translate-middle-y shadow"
                  style={{ zIndex: 1 }}
                  onClick={() => {
                    const el = document.getElementById("thumbnail-scroll");
                    el.scrollBy({ left: 120, behavior: "smooth" });
                  }}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="col-md-6">
              <h2 className="fw-bold mb-2">Bhapa Ilish</h2>
              <p className="text-secondary mb-1">
                Category: <strong className="text-dark">Cooked Food</strong>
              </p>
              <div className="d-flex align-items-center mb-3">
                <span className="badge bg-success me-2">In Stock</span>
                <span className="text-warning fw-semibold fs-5">★★★★☆</span>
                <small className="ms-2 text-muted">(112 reviews)</small>
              </div>
              <h3 className="text-primary fw-bold mb-4">$149.00</h3>
              <p className="text-muted mb-4">
                Bhapa Ilish is prepared by marinating fresh hilsa fillets in a
                paste of mustard seeds, green chilies, turmeric, salt, and
                mustard oil. The marinated fish is then wrapped in banana leaves
                or placed in a sealed container and steamed to perfection. The
                result is a melt-in-the-mouth dish with a pungent mustard aroma,
                a slightly spicy kick, and the rich, buttery taste of hilsa
                shining through.
              </p>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary px-4"
                  style={{ background: "#c12020", border: "#c12020" }}
                  onClick={() => router.push("/cart")}
                >
                  <i className="bi bi-cart-plus me-2"></i> Add to Cart
                </button>
                <button
                  className="btn btn-outline-secondary px-4"
                  style={{
                    background: "#c12020",
                    color: "#fff",
                    border: "#c12020",
                  }}
                >
                  <i className="bi bi-heart me-2"></i> Wishlist
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="row mt-5">
            <div className="col-12">
              <ul className="nav nav-pills mb-3" id="productTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="desc-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#desc"
                    type="button"
                    role="tab"
                    style={{
                      background: "#c12020",
                      color: "#fff",
                      border: "#c12020",
                    }}
                  >
                    Description
                  </button>
                </li>
                {/*  <li className="nav-item" role="presentation">
                  <button className="nav-link" id="reviews-tab" data-bs-toggle="pill" data-bs-target="#reviews" type="button" role="tab">
                    Reviews (112)
                  </button>
                </li> */}
              </ul>
              <div
                className="tab-content border rounded p-4 shadow-sm bg-light"
                id="productTabContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="desc"
                  role="tabpanel"
                >
                  <p className="text-muted">
                    Bhapa Ilish is a signature Bengali dish where Hilsa fish is
                    gently steamed in a creamy mustard and green chili paste,
                    enriched with a splash of mustard oil. This slow steaming
                    process enhances the natural flavors of the fish while
                    infusing it with the bold, tangy taste of mustard. Each bite
                    offers a perfect balance of heat, sharpness, and richness,
                    with the soft, flaky hilsa melting in the mouth. Simple yet
                    deeply flavorful, Bhapa Ilish is a true celebration of
                    Bengal’s culinary heritage.
                  </p>
                </div>
                <div className="tab-pane fade" id="reviews" role="tabpanel">
                  <p className="text-muted">
                    No reviews yet. Be the first to review this product!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SOS Floating Button */}
          <button
            className="btn btn-danger rounded-circle position-fixed"
            style={{ bottom: 20, right: 20, width: 50, height: 50 }}
          >
            <img
              src="/assets/images/icon-sos.png"
              alt="SOS"
              style={{ maxWidth: 25 }}
            />
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
