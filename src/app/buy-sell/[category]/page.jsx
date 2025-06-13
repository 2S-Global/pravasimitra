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
  const [selectedSubCategory, setSelectedSubCategory] = useState("")

  const allItems = [
    {
      title: "Wood Bed With Side Storage",
      desc: "Buy Sofa Online 2+1+1+ Center table / Black",
      image: "/assets/buy-sell/bed1.webp",
      images: [
        "/assets/buy-sell/bed1.webp",
        "/assets/buy-sell/bed2.jpg",
        "/assets/buy-sell/bed3.jpg"
      ],
      category: "Home Furniture",
      subCategory: "Bed"
    },
    {
      title: "Luxury Wood Bed with Storage",
      desc: "Short description of the product goes here.",
      image: "/assets/buy-sell/bed2.jpg",
      images: [
        "/assets/buy-sell/bed2.jpg",
        "/assets/buy-sell/bed3.jpg"
      ],
      category: "Home Furniture",
      subCategory: "Bed"
    },
    {
      title: "Wooden Sofa Set - Solid Sheesham",
      desc: "Buy Sofa Online 2+1+1+ Center table / Black",
      image: "/assets/buy-sell/sofa1.jpg",
      images: ["/assets/buy-sell/sofa1.jpg"],
      category: "Home Furniture",
      subCategory: "Sofa"
    },
    {
      title: "WOODEN SOFA SET (Teak)",
      desc: "Short description of the product goes here.",
      image: "/assets/buy-sell/sofa2.jpg",
      images: [
        "/assets/buy-sell/sofa2.jpg",
        "/assets/buy-sell/sofa4.jpg"
      ],
      category: "Office Furniture",
      subCategory: "Sofa"
    },
    {
      title: "L Shape Sofa Modern Sofa Set Design",
      desc: "Short description of the product goes here.",
      image: "/assets/buy-sell/sofa3.webp",
      images: [
        "/assets/buy-sell/sofa3.webp",
        "/assets/buy-sell/sofa4.jpg"
      ],
      category: "Office Furniture",
      subCategory: "L-Sofa"
    },
    {
      title: "Buy Luxury Sofas Online",
      desc: "Short description of the product goes here.",
      image: "/assets/buy-sell/sofa4.jpg",
      images: [
        "/assets/buy-sell/sofa4.jpg",
        "/assets/buy-sell/sofa3.webp"
      ],
      category: "Electronics",
      subCategory: "Smart TV"
    }
  ]

  const allCategories = [
    "All",
    "Home Furniture",
    "Office Furniture",
    "Electronics",
    "Clothing",
    "Vehicles",
    "House Holds"
  ]

  const subCategories = {
    "Home Furniture": ["Bed", "Sofa", "Cupboard"],
    "Office Furniture": ["Desk", "Chair", "Sofa", "L-Sofa"],
    "Electronics": ["Smart TV", "Refrigerator", "Laptop"],
    "Clothing": ["Men", "Women", "Kids"],
    "Vehicles": ["Car", "Bike", "Truck"],
    "House Holds": ["Decor", "Appliances"]
  }

  const filteredItems = allItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || selectedCategory === "All" || item.category === selectedCategory) &&
    (selectedSubCategory === "" || selectedSubCategory === "All" || item.subCategory === selectedSubCategory)
  )

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
                  {allCategories.map(cat => (
                    <button
                      key={cat}
                      className={`btn btn-sm  px-4 py-2  
                        ${(selectedCategory === cat || (cat === "All" && selectedCategory === "")) ? 'btn-danger' : 'btn-outline-danger'} 
                        shadow-sm`}
                      onClick={() => {
                        setSelectedCategory(cat === "All" ? "" : cat)
                        setSelectedSubCategory("")
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 🔍 Search Box */}
              <div className="search-panel p-4 mb-3 rounded shadow-sm border bg-light">
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
                        setSelectedSubCategory("")
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* 📁 Sub Category Filter */}
              {selectedCategory && selectedCategory !== "All" && subCategories[selectedCategory] && (
                <div className="mb-4 text-center">
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button
                      className={`btn btn-sm rounded-pill px-4 py-2 fw-semibold 
                        ${selectedSubCategory === "" ? 'btn-success' : 'btn-outline-success'} 
                        shadow-sm`}
                      onClick={() => setSelectedSubCategory("")}
                    >
                      All
                    </button>
                    {subCategories[selectedCategory].map(sub => (
                      <button
                        key={sub}
                        className={`btn btn-sm rounded-pill px-4 py-2 fw-semibold 
                          ${selectedSubCategory === sub ? 'btn-success' : 'btn-outline-success'} 
                          shadow-sm`}
                        onClick={() =>
                          setSelectedSubCategory(sub === selectedSubCategory ? "" : sub)
                        }
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 🪑 Product Grid */}
              <div className="container my-5">
                <div className="row g-4">
                  {filteredItems.length === 0 ? (
                    <p className="text-center">No records found</p>
                  ) : (
                    filteredItems.map((item, index) => (
                      <div className="col-md-4" key={index}>
                        <div className="card h-100 shadow-sm border-0 position-relative">
                          <img
                            src={item.image}
                            className="card-img-top"
                            alt={item.title}
                            style={{ height: '250px', objectFit: 'cover' }}
                          />
                          {item.images && item.images.length > 1 && (
                            <span className="badge bg-dark position-absolute top-0 end-0 m-2" style={{padding:"7px"}}>
                              {item.images.length} More Photos
                            </span>
                          )}
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
