'use client'

import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
import Sidebar from "@/app/components/Sidebar"

const RentLeaseDetails = () => {
  return (
    <>
      <Header />
      <OtherBanner page_title="Property Details"  banner_image="/assets/images/bg/rent.jpg" />

      <div className="tm-section bg-white tm-padding-section">
        <div className="container">
          <div className="row col-md-12">
            {/* <Sidebar /> */}

            <div className="profile-info col-md-12">
              <div className="property-detail shadow-sm p-4 bg-light rounded">
                {/* Property Title & Price */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h2 className="fw-bold mb-1">Luxury - Domus Nova in West London.</h2>
                    <p className="text-muted">Sector 21, West London</p>
                  </div>
                  <h3 className="text-primary fw-bold">$1,250 / month</h3>
                </div>

                {/* Property Image */}
                <div className="mb-4">
                  <img
                    src="/assets/rent-lease/2.jpg"
                    alt="Property"
                    className="img-fluid w-100 rounded shadow-sm"
                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                  />
                </div>

                {/* Features */}
                <div className="row mb-4">
                  <div className="col-md-3 col-6">
                    <div className="border p-3 text-center rounded bg-white">
                      <h6 className="text-muted mb-1">Bedrooms</h6>
                      <strong>3</strong>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className="border p-3 text-center rounded bg-white">
                      <h6 className="text-muted mb-1">Bathrooms</h6>
                      <strong>2</strong>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 mt-3 mt-md-0">
                    <div className="border p-3 text-center rounded bg-white">
                      <h6 className="text-muted mb-1">Area</h6>
                      <strong>1,450 sqft</strong>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 mt-3 mt-md-0">
                    <div className="border p-3 text-center rounded bg-white">
                      <h6 className="text-muted mb-1">Furnished</h6>
                      <strong>Yes</strong>
                    </div>
                  </div>
                </div>

                {/* Contact & Action Buttons */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <button className="btn btn-success">
                    <i className="bi bi-telephone me-2" />
                    Contact Owner
                  </button>
                  <button className="btn btn-outline-secondary">
                    <i className="bi bi-heart me-2" />
                    Save to Wishlist
                  </button>
                </div>

                {/* Tabs for Description and Reviews */}
                <ul className="nav nav-tabs mb-3" id="propertyTabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="desc-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#desc"
                      type="button"
                      role="tab"
                    >
                      Description
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="reviews-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#reviews"
                      type="button"
                      role="tab"
                    >
                      Reviews (12)
                    </button>
                  </li>
                </ul>

                <div className="tab-content border rounded p-4 bg-white">
                  <div className="tab-pane fade show active" id="desc" role="tabpanel">
                    <p>
                      This premium 3BHK apartment offers luxurious living in the heart of Gurgaon.
                      Featuring spacious rooms, modern interiors, and a fully furnished setup,
                      it's ideal for families or working professionals.
                      Close to metro, markets, and schools.
                    </p>
                  </div>
                  <div className="tab-pane fade" id="reviews" role="tabpanel">
                    <p>No reviews yet. Be the first to review this property!</p>
                  </div>
                </div>
              </div>

              {/* Floating SOS Button */}
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

      <Footer />
    </>
  )
}

export default RentLeaseDetails
