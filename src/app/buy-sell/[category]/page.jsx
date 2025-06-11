'use client'
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
import { useParams, useRouter } from 'next/navigation'
import { useState } from "react"

const JobCategory = () => {
  const router = useRouter()
  const { category } = useParams()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  // 🛒 All Items List
  const allItems = [
    {
      title: "Wood Bed With Side Storage",
      desc: "Buy Sofa Online 2+1+1+ Center table / Black",
      image: "/assets/buy-sell/bed1.webp",
      category: "Home Furniture"
    },
    {
      title: "Luxury Wood Bed with Storage",
      desc: "Short description of the product goes here.",
      image: "/assets/buy-sell/bed2.jpg",
      category: "Home Furniture"
    },
    {
      title: "Wooden Sofa Set - Solid Sheesham",
      desc: "Buy Sofa Online 2+1+1+ Center table / Black",
      image: "/assets/buy-sell/sofa1.jpg",
      category: "Home Furniture"
    },
    {
      title: "WOODEN SOFA SET (Teak)",
      desc: "Short description of the product goes here.",
      image: "/assets/buy-sell/sofa2.jpg",
      category: "Office Furniture"
    },
    {
      title: "L Shape Sofa Modern Sofa Set Design",
      desc: "Short description of the product goes here.",
      image: "/assets/buy-sell/sofa3.webp",
      category: "Office Furniture"
    },
    {
      title: "Buy Luxury Sofas Online",
      desc: "Short description of the product goes here.",
      image: "/assets/buy-sell/sofa4.jpg",
      category: "Electronics"
    }
  ]

  // 📂 Predefined Categories
  const allCategories = [
    "Home Furniture",
    "Office Furniture",
    "Electronics",
    "Clothing",
    "Vehicles",
    "House Holds"
  ]

  // 🧠 Filter Logic
  const filteredItems = allItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || item.category === selectedCategory)
  )

  return (
    <>
      <Header />
      <OtherBanner page_title={category || "All Furniture"} banner_image="/assets/images/bg/furniture_banner.jpg" />

      <div className="tm-section tm-login-register-area bg-white tm-padding-section">
        <div className="container">
          <div className="row col-md-12">
            <div className="profile-info col-md-12">

              {/* 🔍 Search Panel */}
              <div className="search-panel p-4 mb-4 rounded shadow-sm border bg-light">
                <div className="row g-3 align-items-center">
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search furniture items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 text-end">
                    <button
                      className="btn btn-danger w-100"
                      type="button"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategory("")
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* 📂 Category Filter Buttons */}
              <div className="mb-4 text-center">
                {allCategories.map(cat => (
                  <button
                    key={cat}
                    className={`btn me-2 mb-2 ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setSelectedCategory(cat === selectedCategory ? "" : cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* 🪑 Product Grid */}
              <div className="container my-5">
                <div className="row g-4">
                  {filteredItems.length === 0 ? (
                    <p className="text-center">No records found</p>
                  ) : (
                    filteredItems.map((item, index) => (
                      <div className="col-md-4" key={index}>
                        <div className="card h-100 shadow-sm border-0">
                          <img
                            src={item.image}
                            className="card-img-top"
                            alt={item.title}
                            style={{ height: '250px', objectFit: 'cover' }}
                          />
                          <div className="card-body text-center">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text text-muted">City | State</p>
                            <p className="card-text text-muted">{item.desc}</p>
                            <p className="fw-bold text-primary fs-5">$49.99</p>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => router.push('/buy-sell/details')}
                              style={{
                                background: '#c12020',
                                color: '#fff',
                                border: '#c12020'
                              }}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
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
  )
}

export default JobCategory
