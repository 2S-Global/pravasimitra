'use client'
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
import { useParams, useRouter } from 'next/navigation'
import { useState } from "react"

const MarketPlaceListing = () => {
  const router = useRouter()
  const { category } = useParams()

  const [searchTerm, setSearchTerm] = useState("")

  // ✅ Static JSON grouped by slug
  const data = {
    "cooked-food": [
      {
        title: "Bhapa Ilish",
        desc: "Cook Bhapa Ilish (Steamed Hilsa Fish) in the comfort of your home with BetterButter.",
        image: "/assets/marketplace/hi-kolkata.webp",
        price: "15"
      },
      {
        title: "Chicken Tikka Masala",
        desc: "This easy stovetop Chicken Tikka Masala tastes just like your favorite Indian take-out",
        image: "/assets/marketplace/tikka_chicken.jpg",
        price: "17"
      },
       {
        title: "Bengali Mutton Kosha",
        desc: "Cook Mutton Kosha in the comfort of your home with BetterButter. ",
        image: "/assets/marketplace/mutton.jpeg",
        price: "11"
      },
      {
        title: "Hyderabadi Mutton Biryani",
        desc: "chicken biryani recipe, how to make biryani. it is very testy ",
        image: "/assets/marketplace/how-to-make-hyderabadi-mutton-biryani.jpg",
        price: "15"
      },
      {
        title: "Kalojire diye Macher Rosha",
        desc: "Kalojire diye Macher Rosha recipe testi jhol, very testy ",
        image: "/assets/marketplace/katla.jpg",
        price: "20"
      },
      {
        title: "Paneer Butter Masala",
        desc: "Here's an easy recipe for the perfect restaurant style paneer butter masala. ",
        image: "/assets/marketplace/paneer.jpg",
        price: "10"
      }

      
    ],
    "package-food": [
      {
        title: "Instant Mango Pickle",
        desc: "Mango Pickle is a popular condiment all over the world. Each family has their own way of making",
        image: "/assets/marketplace/pickle1.jpg",
        price: "17"
      },
      {
        title: "Spicy Green Chilli Pickle",
        desc: "Spicy Green Chilli Pickle, Packaging Type: Jar, Packaging Size: 500 Gm",
        image: "/assets/marketplace/pickle2.webp",
        price: "15"
      },
      {
        title: "GRB Rasogolla",
        desc: "Buy GRB Rasogolla online at lowest price from bigbasket and get them delivered at your doorstep",
        image: "/assets/marketplace/900457694_1-grb-rasogolla.webp",
        price: "15"
      },
      {
        title: "Kaju Katli",
        desc: "Experience sheer bliss with Kaju Katli; the epitome of the best Indian sweets",
        image: "/assets/marketplace/KajuKatli_1.jpg",
        price: "20"
      }
    ],
    "religious-items": [
      {
        title: "Brass Puja Thali",
        desc: "Brass Puja Thali Indian Cultural Religious Item Best for Temple, Home, Office, Gifts Office Diwali Pooja ",
        image: "/assets/marketplace/61EUl2NvkoL.jpg",
        price: "10"
      },
      {
        title: "Best Pooja Thali Set",
        desc: "Best Pooja Thali Set with Velvet Box ",
        image: "/assets/marketplace/simple-polish-pooja-set-766533.jpg",
        price: "17"
      }
      ,
      {
        title: "Marble Sitting Ganesh",
        desc: "Marble Sitting Ganesh Decorative Showpiece – Lavanshi Handicrafts – Wholesaler & Manufacturer Jaipur",
        image: "/assets/marketplace/MAF-108-WATERMARK-1200x1200.jpg",
        price: "15"
      }
    ]
  }

  // ✅ Normalize slug for comparison
  const currentSlug = decodeURIComponent(category || '').toLowerCase().replace(/\s+/g, '-')
  const items = data[currentSlug] || []

  const handleViewDetails = () => {
    router.push('/marketplace/details')
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <Header />
      <OtherBanner page_title={category?.replace(/-/g, " ")}  banner_image="/assets/images/bg/marketplace.png" />

      <div className="tm-section tm-login-register-area bg-white tm-padding-section">
        <div className="container">
          <div className="row col-md-12">
            <div className="profile-info col-md-12">
             {/*  <form method="post" action="" className="tm-form tm-login-form tm-form-bordered form-card"> */}
                <h4 className="mb-3 fw-bold">Search Here</h4>

                {/* 🔍 Search Panel */}
                <div className="search-panel p-4 mb-4 rounded shadow-sm border bg-light">
                  <div className="row g-3 align-items-center">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search items..."
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

                {/* 🪑 Listing */}
                <h4 className="text-center fw-bold text-decoration-underline mb-4">
                  {category?.replace(/-/g, " ")}
                </h4>

                <div className="container my-4">
                  <div className="row g-4">
                    {items
                      .filter(item =>
                        item.title.toLowerCase().includes(searchTerm.toLowerCase())
                      )
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
                              <p className="card-text text-muted">{item.desc}</p>
                              <p className="fw-bold text-primary fs-5">$20</p>
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={handleViewDetails}
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
                    {items.length === 0 && (
                      <div className="text-center text-muted py-5">
                        No items found for this category.
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating SOS Button */}
                <button
                  className="btn btn-danger rounded-circle position-fixed"
                  style={{ bottom: 20, right: 20, width: 50, height: 50 }}
                >
                  <img src="/assets/images/icon-sos.png" alt="" style={{ maxWidth: 25 }} />
                </button>
             {/*  </form> */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default MarketPlaceListing
