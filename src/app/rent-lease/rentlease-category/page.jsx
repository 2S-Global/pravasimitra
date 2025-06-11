'use client'

import { useRouter } from 'next/navigation'
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"

const MarketPlaceCategory = () => {
  const router = useRouter()

  const handleClick = (category) => {
    const slug = encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))
   router.push(`/rent-lease/${slug}`)

   // router.push(`/rent-lease/category_id?name=${slug}`)
  }

  const categories = [
     { id: 1, label: "Rent Home", image: "/assets/images/rent.png" },
     { id: 2, label: "Rent Apartments", image: "/assets/images/RentApartments.png" },
     { id: 3, label: "Rent Townhouses", image: "/assets/images/RentTownhouses.png" },
     { id: 4, label: "Lease Home", image: "/assets/images/Lease.png" },
     { id: 5, label: "Lease Apartments", image: "/assets/images/LeaseApartments.png" },
     { id: 6, label: "Lease Townhouses", image: "/assets/images/LeaseTownhouses.png" },
  ]

  return (
    <>
      <Header />
      <OtherBanner page_title="Rent & Lease"  banner_image="/assets/images/bg/rent.jpg" />

      <section className="tm-section bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Explore Categories</h2>
          <div className="row g-4">
            {categories.map(category => (
              <div key={category.id} className="col-12 col-sm-6 col-md-4">
                <div
                  className="category-card d-flex flex-column justify-content-center align-items-center text-center shadow-sm p-4"
                  onClick={() => handleClick(category.label)}
                  style={{
                    borderRadius: '20px',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    minHeight: '200px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.03)'
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)'
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.label}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                      marginBottom: '1rem'
                    }}
                  />
                  <h6 className="fw-semibold mb-0">{category.label}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating SOS Button */}
      <button
        className="btn btn-danger rounded-circle position-fixed d-flex align-items-center justify-content-center"
        style={{ bottom: 20, right: 20, width: 50, height: 50 }}
      >
        <img src="/assets/images/icon-sos.png" alt="SOS" style={{ maxWidth: 25 }} />
      </button>

      <Footer />
    </>
  )
}

export default MarketPlaceCategory
