'use client'

import { useState } from "react"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"

const ProductDetails = () => {
  const images = [
  "https://m.media-amazon.com/images/I/81XyzQdrIzL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/61G8u5hZGWL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/61poLzUc02L._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/61M3pnVHYFL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/6134eBUxIvL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/61c3FkwHznL._SL1500_.jpg",

  ]

  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <>
      <Header />
      <OtherBanner page_title="Product Details" banner_image="/assets/images/bg/furniture_banner.jpg" />

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
                  style={{ height: '450px', borderRadius: '12px' }}
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
                    const el = document.getElementById('thumbnail-scroll');
                    el.scrollBy({ left: -120, behavior: 'smooth' });
                  }}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>

                {/* Scrollable Thumbnails */}
                <div
                  id="thumbnail-scroll"
                  className="d-flex gap-2 overflow-auto px-5"
                  style={{ scrollBehavior: 'smooth', scrollSnapType: 'x mandatory' }}
                >
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index}`}
                      className={`img-thumbnail ${selectedImage === img ? 'border border-danger' : ''}`}
                      style={{
                        height: '80px',
                        width: '100px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        scrollSnapAlign: 'center',
                        flex: '0 0 auto',
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
                    const el = document.getElementById('thumbnail-scroll');
                    el.scrollBy({ left: 120, behavior: 'smooth' });
                  }}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="col-md-6">
              <h2 className="fw-bold mb-2">Wood Bed With Side Storage</h2>
              <p className="text-secondary mb-1">Category: <strong className="text-dark">Furniture</strong></p>
              <div className="d-flex align-items-center mb-3">
                <span className="badge bg-success me-2">In Stock</span>
                <span className="text-warning fw-semibold fs-5">★★★★☆</span>
                <small className="ms-2 text-muted">(112 reviews)</small>
              </div>
              <h3 className="text-primary fw-bold mb-4">$149.00</h3>
           <p className="text-muted mb-4">
  Maximize your bedroom space with this elegant wood bed featuring built-in side storage. Its timeless design blends functionality with classic charm.
</p>


              <div className="d-flex gap-2">
                <button className="btn btn-primary px-4" style={{ background: '#c12020', border: '#c12020' }}>
                  <i className="bi bi-cart-plus me-2"></i> Contact Seller
                </button>
                <button className="btn btn-outline-secondary px-4" style={{ background: '#c12020', color: '#fff', border: '#c12020' }}>
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
                  <button className="nav-link active" id="desc-tab" data-bs-toggle="pill" data-bs-target="#desc" type="button" role="tab"
                    style={{ background: '#c12020', color: '#fff', border: '#c12020' }}>
                    Description
                  </button>
                </li>
{/*                 <li className="nav-item" role="presentation">
                  <button className="nav-link" id="reviews-tab" data-bs-toggle="pill" data-bs-target="#reviews" type="button" role="tab">
                    Reviews (112)
                  </button>
                </li> */}
              </ul>
              <div className="tab-content border rounded p-4 shadow-sm bg-light" id="productTabContent">
                <div className="tab-pane fade show active" id="desc" role="tabpanel">
                  <p className="text-muted">
                    Upgrade your living space with this modern L-shaped sofa set, combining style and comfort. Its sleek design fits perfectly in any corner, maximizing space while offering ample seating. Crafted with premium materials, it's ideal for contemporary homes.
                  </p>
                </div>
                <div className="tab-pane fade" id="reviews" role="tabpanel">
                  <p className="text-muted">No reviews yet. Be the first to review this product!</p>
                </div>
              </div>
            </div>
          </div>

          {/* SOS Floating Button */}
          <button
            className="btn btn-danger rounded-circle position-fixed"
            style={{ bottom: 20, right: 20, width: 50, height: 50 }}
          >
            <img src="/assets/images/icon-sos.png" alt="SOS" style={{ maxWidth: 25 }} />
          </button>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ProductDetails
