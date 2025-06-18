'use client'
import { useState } from "react"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"

const RentLeaseDetails = () => {
  const images = [
    "https://lid.zoocdn.com/u/1200/900/6a618a847a92bcb165bc77b7d9567f3b1e0e1b91.jpg:p",
    "https://lid.zoocdn.com/u/1200/900/2960a330eea12120776a10898e76a7d85394cc74.jpg:p",
    "https://lid.zoocdn.com/u/1200/900/dc36795b6e1c231e5a1749eeb7a2f68774a80d38.jpg:p",
    "https://lid.zoocdn.com/u/1200/900/8b33bfb7401e957d4b99595a593fdd364ce9f5a4.jpg:p",
    "https://lid.zoocdn.com/u/1200/900/f2d9e42799a66420fa042631968cf43d72fd974a.jpg:p",
    "https://lid.zoocdn.com/u/1200/900/ea59d5b5275176b5348e0cab38ad3fd9ee03ff55.jpg:p",
    "https://lid.zoocdn.com/u/1200/900/6102c01fe431e928c8332575916a65504ec16297.jpg:p",
    "https://lid.zoocdn.com/u/1200/900/3876b4bef80347f8949a4bca7a100e85602a9c10.jpg:p",
  ]
  const [activeIndex, setActiveIndex] = useState(0)

  const handleThumbnailClick = (index) => {
    setActiveIndex(index)
  }

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <Header />
      <OtherBanner page_title="Property Details" banner_image="/assets/images/bg/rent.jpg" />

      <div className="tm-section bg-white tm-padding-section">
        <div className="container">
          <div className="row col-md-12">
            <div className="profile-info col-md-12">
              <div className="property-detail shadow-sm p-4 bg-light rounded">

                {/* Title & Price */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h2 className="fw-bold mb-1">Luxury - Domus Nova in West London.</h2>
                    <p className="text-muted">Sector 21, West London</p>
                  </div>
                  <h3 className="text-primary fw-bold">$1,250 / month</h3>
                </div>

                {/* 🖼️ Image Carousel with Arrows */}
                <div className="mb-4 position-relative">
                  <img
                    src={images[activeIndex]}
                    alt="Main"
                    className="img-fluid w-100 rounded shadow-sm"
                    style={{ maxHeight: "500px", objectFit: "cover" }}
                  />

                  {/* ⬅️ Prev Arrow */}
                  <button
                    className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
                    style={{ zIndex: 10 }}
                    onClick={handlePrev}
                  >
                    <i className="bi bi-chevron-left fs-4" />
                  </button>

                  {/* ➡️ Next Arrow */}
                  <button
                    className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
                    style={{ zIndex: 10 }}
                    onClick={handleNext}
                  >
                    <i className="bi bi-chevron-right fs-4" />
                  </button>
                </div>

                {/* 🔍 Thumbnail Navigation */}
                <div className="d-flex flex-wrap mt-3 gap-2">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      onClick={() => handleThumbnailClick(i)}
                      alt={`thumb-${i}`}
                      className={`img-thumbnail ${i === activeIndex ? "border-primary" : ""}`}
                      style={{
                        width: "100px",
                        height: "75px",
                        objectFit: "cover",
                        cursor: "pointer"
                      }}
                    />
                  ))}
                </div>

                {/* 🚪 Property Features */}
                <div className="row mb-4 mt-4">
                  <div className="col-md-3 col-6"><div className="border p-3 text-center rounded bg-white"><h6 className="text-muted mb-1">Bedrooms</h6><strong>3</strong></div></div>
                  <div className="col-md-3 col-6"><div className="border p-3 text-center rounded bg-white"><h6 className="text-muted mb-1">Bathrooms</h6><strong>2</strong></div></div>
                  <div className="col-md-3 col-6 mt-3 mt-md-0"><div className="border p-3 text-center rounded bg-white"><h6 className="text-muted mb-1">Area</h6><strong>1,450 sqft</strong></div></div>
                  <div className="col-md-3 col-6 mt-3 mt-md-0"><div className="border p-3 text-center rounded bg-white"><h6 className="text-muted mb-1">Furnished</h6><strong>Yes</strong></div></div>
                </div>

                {/* 📞 Contact Buttons */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <button className="btn btn-success"><i className="bi bi-telephone me-2" />Contact Owner</button>
                  <button className="btn btn-outline-secondary"><i className="bi bi-heart me-2" />Save to Wishlist</button>
                </div>

                {/* 🧾 Tabs */}
                <ul className="nav nav-tabs mb-3" id="propertyTabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="desc-tab" data-bs-toggle="tab" data-bs-target="#desc" type="button" role="tab">Description</button>
                  </li>
{/*                   <li className="nav-item" role="presentation">
                    <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button" role="tab">Reviews (12)</button>
                  </li> */}
                </ul>

                <div className="tab-content border rounded p-4 bg-white">
                  <div className="tab-pane fade show active" id="desc" role="tabpanel">
                    <p>This premium 3BHK apartment offers luxurious living in the heart of Gurgaon. Featuring spacious rooms, modern interiors, and a fully furnished setup, it's ideal for families or working professionals.</p>
                  </div>
                  <div className="tab-pane fade" id="reviews" role="tabpanel">
                    <p>No reviews yet. Be the first to review this property!</p>
                  </div>
                </div>

                {/* 🆘 SOS Button */}
                <button
                  className="btn btn-danger rounded-circle position-fixed"
                  style={{ bottom: 20, right: 20, width: 50, height: 50, zIndex: 1000 }}
                >
                  <img src="/assets/images/icon-sos.png" alt="" style={{ maxWidth: 25 }} />
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default RentLeaseDetails
