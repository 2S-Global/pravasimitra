'use client'

import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react"

const ListHomes = () => {
  const { category } = useParams()
  const router = useRouter()

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showSubcategories, setShowSubcategories] = useState(false)

  const categories = ["All", "Rent", "Lease", "Purchase"]

  const subcategories = {
    Rent: ["Rooms", "Apartments", "Villa"],
    Lease: ["Rooms", "Apartments", "Villa"],
    Purchase: ["Rooms", "Apartments", "Villa"]
  }

  const properties = [
    {
      title: "3 Bedroom House For Rent - E3 4QH",
      desc: "Robert Alan Homes - Hackney & Barnet Estate Agent.",
      price: "$49.99",
      image: "/assets/rent-lease/1.jpg",
      imagesCount: 3
    },
    {
      title: "Luxury Flats and Houses",
      desc: "Luxury Flats and Houses to Rent in West London - Domus Nova.",
      price: "$49.99",
      image: "/assets/rent-lease/2.jpg",
      imagesCount: 4
    }
  ]

  useEffect(() => {
    setSelectedCategory(category)
    setShowSubcategories(category !== "all")
  }, [category])

  return (
    <>
      <Header />
      <OtherBanner page_title={category} banner_image="/assets/images/bg/rent.jpg" />

      <div className="tm-section tm-login-register-area bg-white tm-padding-section">
        <div className="container">
          <div className="row col-md-12">
            <div className="profile-info col-md-12">

              {/* Category Buttons */}
              <div className="category-scroll d-flex gap-3 overflow-auto py-2 px-3 mb-4">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    className="btn btn-outline-secondary btn-sm text-nowrap"
                    style={{
                      whiteSpace: 'nowrap',
                      borderRadius: '20px',
                      padding: '6px 16px',
                      backgroundColor: cat.toLowerCase() === category ? '#c12020' : '',
                      color: cat.toLowerCase() === category ? '#fff' : '',
                      borderColor: cat.toLowerCase() === category ? '#c12020' : ''
                    }}
                    onClick={() => router.push(`/rent-lease/${cat.toLowerCase()}`)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Panel */}
              <div className="container mb-4">
                <div className="card shadow-sm border-0 p-4">
                  <h5 className="mb-3 fw-bold">Search Properties</h5>
                  <form className="row g-3">
                    <div className="col-md-4">
                      <label htmlFor="location" className="form-label">Location</label>
                      <input type="text" className="form-control" id="location" placeholder="Enter city or area" />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="priceRange" className="form-label">Price Range</label>
                      <select className="form-select" id="priceRange">
                        <option value="">Select</option>
                        <option value="0-500">$0 - $500</option>
                        <option value="500-1000">$500 - $1000</option>
                        <option value="1000+">$1000+</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
                      <select className="form-select" id="bedrooms">
                        <option value="">Any</option>
                        <option value="1">1 Bedroom</option>
                        <option value="2">2 Bedrooms</option>
                        <option value="3">3+ Bedrooms</option>
                      </select>
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                      <button type="submit" className="btn btn-primary w-100" style={{
                        background: '#c12020',
                        color: '#fff',
                        border: '#c12020'
                      }}>
                        <i className="bi bi-search me-2" />
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Subcategory Buttons */}
              {showSubcategories && subcategories[category.charAt(0).toUpperCase() + category.slice(1)] && (
                <div className="subcategory-scroll d-flex gap-2 overflow-auto py-1 px-3 mb-4">
                  {subcategories[category.charAt(0).toUpperCase() + category.slice(1)].map((sub, idx) => (
                    <button key={idx} className="btn btn-outline-dark btn-sm text-nowrap rounded-pill">
                      {sub}
                    </button>
                  ))}
                </div>
              )}

              {/* Property Listings */}
              <div className="container my-5">
                <div className="row g-4">
                  {properties.map((property, idx) => (
                    <div className="col-md-4" key={idx}>
                      <div className="card h-100 shadow-sm border-0 position-relative">
                        <div style={{ position: 'relative' }}>
                          <img
                            src={property.image}
                            className="card-img-top"
                            alt={property.title}
                            style={{ height: '250px', objectFit: 'cover' }}
                          />
                          <div
                            className="badge bg-dark text-white position-absolute"
                            style={{ top: 10, left: 10, padding: "5px 10px", borderRadius: "12px" }}
                          >
                            {property.imagesCount} Images
                          </div>
                        </div>
                        <div className="card-body text-center">
                          <h5 className="card-title">{property.title}</h5>
                          <p>City | State</p>
                          <p className="card-text text-muted">{property.desc}</p>
                          <p className="fw-bold text-primary fs-5">{property.price}</p>
                          <button className="btn btn-outline-primary btn-sm" onClick={() => router.push('/rent-lease/details')} style={{
                            background: '#c12020',
                            color: '#fff',
                            border: '#c12020'
                          }}>View Details</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating SOS Button */}
              <button
                className="btn btn-danger rounded-circle position-fixed"
                style={{ bottom: 20, right: 20, width: 50, height: 50 }}
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

export default ListHomes
