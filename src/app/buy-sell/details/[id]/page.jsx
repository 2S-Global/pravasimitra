"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import OtherBanner from "@/app/components/OtherBanner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect,useRef } from "react";
import { useAuthStore } from "@/app/store/authStore";
import AlertService from "@/app/components/alertService";

const ProductDetails = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
const [selectedImage, setSelectedImage] = useState("");
const [item, setItem] = useState({});
  const { id } = useParams();
  const thumbnailRefs = useRef([]);
  const [contactLoading, setContactLoading] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleContactSeller = async () => {
    if (!isLoggedIn) {
      AlertService.error("Please login first to contact the seller.");
      return;
    }

    if (!item?.id || !item?.createdBy?._id) {
      AlertService.error("Invalid product or seller information.");
      return;
    }

    try {
      setContactLoading(true);

      const contactSeller = await axios.post("/api/product/contact-seller", {
        productId: item.id,
        sellerId: item.createdBy._id,
      });
      AlertService.success(contactSeller.data.msg);
    } catch (error) {
      // console.error(error);
      AlertService.error("Failed to contact the seller. Please try again.");
    } finally {
      setContactLoading(false);

    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      // alert("hello");
      try {
        setLoading(true);
        const productDetails = await axios.get("/api/product/product-details", {
          params: { id },
        });
        // console.log(productDetails.data.item);
        setSelectedImage(productDetails.data.item.image);

        setItem(productDetails.data.item);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);


useEffect(() => {
  if (item?.gallery && selectedImage) {
    const index = item.gallery.indexOf(selectedImage);
    setSelectedImageIndex(index);
  }
}, [selectedImage, item.gallery]);


  useEffect(() => {
    const currentThumb = thumbnailRefs.current[selectedImageIndex];
    if (currentThumb) {
      currentThumb.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedImageIndex]);
  const handlePrevImage = () => {
    if (selectedImageIndex > 0) {
      const newIndex = selectedImageIndex - 1;
      setSelectedImage(item.gallery[newIndex]);
      setSelectedImageIndex(newIndex);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex < item.gallery.length - 1) {
      const newIndex = selectedImageIndex + 1;
      setSelectedImage(item.gallery[newIndex]);
      setSelectedImageIndex(newIndex);
    }
  };
  return (
    <>
      <Header />
      <OtherBanner
        page_title="Product Details"
        banner_image="/assets/images/bg/furniture_banner.jpg"
      />

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="tm-section tm-login-register-area bg-white tm-padding-section">
          <div className="container my-5">
            <div className="row g-5 align-items-start">
              {/* Image Section */}
              <div className="col-md-6">
                <div className="shadow-sm rounded overflow-hidden mb-3">
                  <img
                    src={selectedImage || item.image}
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
                    onClick={handlePrevImage}
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
               {item.gallery.map((img, index) => (
  <img
    key={index}
    ref={(el) => (thumbnailRefs.current[index] = el)}
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
    onClick={() => {
      setSelectedImage(img);
      setSelectedImageIndex(index);
    }}
  />
))}
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    className="btn btn-light position-absolute top-50 end-0 translate-middle-y shadow"
                    style={{ zIndex: 1 }}
                    onClick={handleNextImage}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="col-md-6">
                <h2 className="fw-bold mb-2">{item.title}</h2>
                <p className="text-secondary mb-1">
                  Category:{" "}
                  <strong className="text-dark">{item.category.name}</strong>
                </p>
                {/* <div className="d-flex align-items-center mb-3">
                <span className="badge bg-success me-2">In Stock</span>
                <span className="text-warning fw-semibold fs-5">★★★★☆</span>
                <small className="ms-2 text-muted">(112 reviews)</small>
              </div> */}
                <h3 className="text-primary fw-bold mb-4">${item.price}</h3>
                <p className="text-muted mb-4" style={{ textAlign:"justify" }}>{item.shortDesc}</p>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary px-4"
                    style={{ background: "#c12020", border: "#c12020" }}
                    onClick={handleContactSeller}
                    disabled={contactLoading}
                  >
                    {contactLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Contacting...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-cart-plus me-2"></i> Contact Seller
                      </>
                    )}
                  </button>
           
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="row mt-5">
              <div className="col-12">
                <ul
                  className="nav nav-pills mb-3"
                  id="productTab"
                  role="tablist"
                >
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
                  {/*                 <li className="nav-item" role="presentation">
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
                    <p className="text-muted" style={{ textAlign: "justify" }}>
                      {item.description}
                    </p>
                  </div>
                  {/* <div className="tab-pane fade" id="reviews" role="tabpanel">
                    <p className="text-muted">
                      No reviews yet. Be the first to review this product!
                    </p>
                  </div> */}
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
      )}
      <Footer />
    </>
  );
};

export default ProductDetails;
