'use client'
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
import Sidebar from "@/app/components/Sidebar"
import { useParams, useRouter } from 'next/navigation'
import { useState } from "react"

const JobCategory = () => {
  const router = useRouter()
  const { category } = useParams()

  const [searchTerm, setSearchTerm] = useState("")

  const handleViewDetails = () => {
    router.push('/buy-sell/details')
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    // Optional: Implement filter logic here
  }

  return (
    <>
      <Header />
      <OtherBanner page_title={category} banner_image="/assets/images/bg/furniture_banner.jpg" />

      <div className="tm-section tm-login-register-area bg-white tm-padding-section">
        <div className="container">
          <div className="row col-md-12">
            {/* <Sidebar /> */}

            <div className="profile-info col-md-12">
             
                <h4
                  style={{
                    textAlign: "left",
                    fontWeight: "bold"
                  }}
                >
                 Search Here
                </h4>

                {/* 🔍 Search Block */}
{/* 🚀 Modern Search Panel */}
<div className="search-panel p-4 mb-4 rounded shadow-sm border bg-light">
  <div className="row g-3 align-items-center">
    
    <div className="col-md-6">
      <input
        type="text"
        className="form-control"
        placeholder="Search furniture items..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>

    <div className="col-md-4">
      <select className="form-select">
        <option value="">Select Category</option>
        <option value="bed">Bed</option>
        <option value="sofa">Sofa</option>
        <option value="table">Table</option>
        <option value="chair">Chair</option>
      </select>
    </div>

    <div className="col-md-2 text-end">
      <button
        className="btn btn-danger w-100"
        type="button"
        onClick={() => setSearchTerm("")}
      >
        Clear
      </button>
    </div>
  </div>
</div>

                <h4
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    textDecoration: "underline"
                  }}
                >
                  Home Furnitures
                </h4>
                {/* 🪑 Furniture Grid */}
                <div className="container my-5">
                  <div className="row g-4">

                    {[
                      {
                        title: "Wood Bed With Side Storage",
                        desc: "Buy Sofa Online 2+1+1+ Center table / Black",
                        image: "/assets/buy-sell/bed1.webp"
                      },
                      {
                        title: "Luxury Wood Bed with Storage",
                        desc: "Short description of the product goes here.",
                        image: "/assets/buy-sell/bed2.jpg"
                      },
                      {
                        title: "Wooden Sofa Set - Solid Sheesham",
                        desc: "Buy Sofa Online 2+1+1+ Center table / Black",
                        image: "/assets/buy-sell/sofa1.jpg"
                      },
                      {
                        title: "WOODEN SOFA SET (Teak)",
                        desc: "Short description of the product goes here.",
                        image: "/assets/buy-sell/sofa2.jpg"
                      },
                      {
                        title: "L Shape Sofa Modern Sofa Set Design",
                        desc: "Short description of the product goes here.",
                        image: "/assets/buy-sell/sofa3.webp"
                      },
                      {
                        title: "Buy Luxury Sofas Online",
                        desc: "Short description of the product goes here.",
                        image: "/assets/buy-sell/sofa4.jpg"
                      }
                    ]
                      .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((item, index) => (
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

export default JobCategory
