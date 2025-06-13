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

  const categories = [
    "All",
    "Cooked Food",
    "Package Food",
    "Clothings",
    "Fruites",
    "Religious Items",
    "Ayurvedic and herbal products"
  ]

  const data = {
    "cooked-food": [
      {
        title: "Bhapa Ilish",
        desc: "Cook Bhapa Ilish (Steamed Hilsa Fish) in the comfort of your home with BetterButter.",
        image: "/assets/marketplace/hi-kolkata.webp",
        price: "15",
        imagesCount: 5
      },
      {
        title: "Chicken Tikka Masala",
        desc: "This easy stovetop Chicken Tikka Masala tastes just like your favorite Indian take-out",
        image: "/assets/marketplace/tikka_chicken.jpg",
        price: "17",
        imagesCount: 4
      },
      {
        title: "Bengali Mutton Kosha",
        desc: "Cook Mutton Kosha in the comfort of your home with BetterButter.",
        image: "/assets/marketplace/mutton.jpeg",
        price: "11",
        imagesCount: 3
      },
      {
        title: "Hyderabadi Mutton Biryani",
        desc: "Chicken biryani recipe, how to make biryani. It is very tasty",
        image: "/assets/marketplace/how-to-make-hyderabadi-mutton-biryani.jpg",
        price: "15",
        imagesCount: 6
      },
      {
        title: "Kalojire diye Macher Rosha",
        desc: "Kalojire diye Macher Rosha recipe testi jhol, very tasty",
        image: "/assets/marketplace/katla.jpg",
        price: "20",
        imagesCount: 2
      },
      {
        title: "Paneer Butter Masala",
        desc: "Here's an easy recipe for the perfect restaurant style paneer butter masala.",
        image: "/assets/marketplace/paneer.jpg",
        price: "10",
        imagesCount: 4
      }
    ],
    "package-food": [
      {
        title: "Instant Mango Pickle",
        desc: "Mango Pickle is a popular condiment all over the world. Each family has their own way of making",
        image: "/assets/marketplace/pickle1.jpg",
        price: "17",
        imagesCount: 3
      },
      {
        title: "Spicy Green Chilli Pickle",
        desc: "Spicy Green Chilli Pickle, Packaging Type: Jar, Packaging Size: 500 Gm",
        image: "/assets/marketplace/pickle2.webp",
        price: "15",
        imagesCount: 2
      },
      {
        title: "GRB Rasogolla",
        desc: "Buy GRB Rasogolla online at lowest price from bigbasket and get them delivered at your doorstep",
        image: "/assets/marketplace/900457694_1-grb-rasogolla.webp",
        price: "15",
        imagesCount: 5
      },
      {
        title: "Kaju Katli",
        desc: "Experience sheer bliss with Kaju Katli; the epitome of the best Indian sweets",
        image: "/assets/marketplace/KajuKatli_1.jpg",
        price: "20",
        imagesCount: 4
      }
    ],
    "religious-items": [
      {
        title: "Brass Puja Thali",
        desc: "Brass Puja Thali Indian Cultural Religious Item Best for Temple, Home, Office, Gifts Office Diwali Pooja",
        image: "/assets/marketplace/61EUl2NvkoL.jpg",
        price: "10",
        imagesCount: 3
      },
      {
        title: "Best Pooja Thali Set",
        desc: "Best Pooja Thali Set with Velvet Box",
        image: "/assets/marketplace/simple-polish-pooja-set-766533.jpg",
        price: "17",
        imagesCount: 2
      },
      {
        title: "Marble Sitting Ganesh",
        desc: "Marble Sitting Ganesh Decorative Showpiece – Lavanshi Handicrafts – Wholesaler & Manufacturer Jaipur",
        image: "/assets/marketplace/MAF-108-WATERMARK-1200x1200.jpg",
        price: "15",
        imagesCount: 4
      }
    ]
  }

  const currentSlug = decodeURIComponent(category || '').toLowerCase().replace(/\s+/g, '-')
  const isAll = currentSlug === '' || currentSlug === 'all'

  const items = isAll ? Object.values(data).flat() : data[currentSlug] || []

  const handleViewDetails = () => {
    router.push('/marketplace/details')
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryClick = (cat) => {
    const slug = cat === "All" ? "all" : cat.toLowerCase().replace(/\s+/g, '-')
    router.push(`/marketplace/${slug}`)
  }

  const readableCategory = category?.replace(/-/g, " ") || "All"

  return (
    <>
      <Header />
      <OtherBanner
        page_title={readableCategory}
        banner_image="/assets/images/bg/marketplace.png"
      />

      <div className="tm-section tm-login-register-area bg-white tm-padding-section">
        <div className="container">
          <div className="row col-md-12">
            <div className="profile-info col-md-12">

              {/* Category Filter */}
              <div className="mb-4 text-center">
                {categories.map((cat, idx) => {
                  const slug = cat === "All" ? "all" : cat.toLowerCase().replace(/\s+/g, '-')
                  const isActive = slug === currentSlug || (cat === "All" && isAll)
                  return (
                    <button
                      key={idx}
                      className={`btn me-2 mb-2 ${isActive ? 'btn-danger' : 'btn-outline-danger'}`}
                      onClick={() => handleCategoryClick(cat)}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>

              {/* Search Panel */}
              <h4 className="mb-3 fw-bold">Search Here</h4>
              <div className="search-panel p-4 mb-4 rounded shadow-sm border bg-light">
                <div className="row g-3 align-items-center">
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search items..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
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

              {/* Listing */}
              <h4 className="text-center fw-bold text-decoration-underline mb-4">
                {readableCategory}
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
                          <div style={{ position: 'relative' }}>
                            <img
                              src={item.image}
                              className="card-img-top"
                              alt={item.title}
                              style={{ height: '250px', objectFit: 'cover' }}
                            />
                            {item.imagesCount && (
                              <div
                                className="badge bg-dark text-white position-absolute"
                                style={{ top: 10, left: 10, padding: "5px 10px", borderRadius: "12px" }}
                              >
                                {item.imagesCount} Photos
                              </div>
                            )}
                          </div>
                          <div className="card-body text-center">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text text-muted">{item.desc}</p>
                            <p className="fw-bold text-primary fs-5">${item.price}</p>
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

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default MarketPlaceListing
