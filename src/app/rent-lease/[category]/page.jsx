'use client'
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
import Sidebar from "@/app/components/Sidebar"
import { useParams, useRouter } from 'next/navigation'

const ListHomes = () => {


  const categories = [
  "All",  
  "Rent Home",
  "Rent Apartments",
  "Rent Townhouses",
  "Lease Home",
  "Lease Apartments",
  "Lease Townhouses"
];


const router = useRouter()
  const { category } = useParams()
  console.log(category)
  return (
    <>
      <Header />
      <OtherBanner page_title={category}  banner_image="/assets/images/bg/rent.jpg" />

      <div className="tm-section tm-login-register-area bg-white tm-padding-section">
        <div className="container">
          <div className="row col-md-12">
            {/* <Sidebar /> */}

            <div className="profile-info col-md-12">


              <div className="container mb-4">
  <div className="category-scroll d-flex gap-3 overflow-auto py-2 px-3 mb-4">
    {categories.map((cat, idx) => (
      <button
        key={idx}
        className="btn btn-outline-secondary btn-sm text-nowrap"
        style={{
          whiteSpace: 'nowrap',
          borderRadius: '20px',
          padding: '6px 16px',
          backgroundColor: cat === category ? '#c12020' : '',
          color: cat === category ? '#fff' : '',
          borderColor: cat === category ? '#c12020' : ''
        }}
        onClick={() => router.push(`/rent-lease/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}`)}
      >
        {cat}
      </button>
    ))}
  </div>
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




                <h4
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    textDecoration: "underline"
                  }}
                >
                Rent Home
                </h4>

                <div className="container my-5">
                  
  <div className="row g-4">


      <div className="col-md-4">
        <div className="card h-100 shadow-sm border-0">
          <img
            src="/assets/rent-lease/1.jpg"
            className="card-img-top"
            alt=""
            style={{ height: '250px', objectFit: 'cover' }}
          />
          <div className="card-body text-center">
            <h5 className="card-title">3 Bedroom House For Rent - E3 4QH</h5>
            <p>City | State</p>
            <p className="card-text text-muted">Robert Alan Homes - Hackney & Barnet Estate Agent.</p>
            <p className="fw-bold text-primary fs-5">$49.99</p>
            <button className="btn btn-outline-primary btn-sm" onClick={() => router.push('/rent-lease/details')} style={{
    background: '#c12020',
    color: '#fff',
    border: '#c12020'
  }}>View Details</button>
          </div>
        </div>
      </div>

            <div className="col-md-4">
        <div className="card h-100 shadow-sm border-0">
          <img
            src="/assets/rent-lease/4.jpg"
            className="card-img-top"
            alt=""
            style={{ height: '250px', objectFit: 'cover' }}
          />
          <div className="card-body text-center">
            <h5 className="card-title">3 bedroom houses to let in Central</h5>
            <p>City | State</p>
            <p className="card-text text-muted">3 bedroom houses to let in Central London - Primelocation.</p>
            <p className="fw-bold text-primary fs-5">$49.99</p>
            <button className="btn btn-outline-primary btn-sm"  onClick={() => router.push('/rent-lease/details')} style={{
    background: '#c12020',
    color: '#fff',
    border: '#c12020'
  }}>View Details</button>
          </div>
        </div>
      </div>

            <div className="col-md-4">
        <div className="card h-100 shadow-sm border-0">
          <img
            src="/assets/rent-lease/3.jpg"
            className="card-img-top"
            alt=""
            style={{ height: '250px', objectFit: 'cover' }}
          />
          <div className="card-body text-center">
            <h5 className="card-title">Renovated Home </h5>
            <p>City | State</p>
            <p className="card-text text-muted">Renovated London Home Available To Rent For £15,000 A Month.</p>
            <p className="fw-bold text-primary fs-5">$49.99</p>
            <button className="btn btn-outline-primary btn-sm" onClick={() => router.push('/rent-lease/details')} style={{
    background: '#c12020',
    color: '#fff',
    border: '#c12020'
  }}> View Details</button>
          </div>
        </div>
      </div>

            <div className="col-md-4">
        <div className="card h-100 shadow-sm border-0">
          <img
            src="/assets/rent-lease/2.jpg"
            className="card-img-top"
            alt=""
            style={{ height: '250px', objectFit: 'cover' }}
          />
          <div className="card-body text-center">
            <h5 className="card-title">Luxury Flats and Houses</h5>
            <p>City | State</p>
            <p className="card-text text-muted">Luxury Flats and Houses to Rent in West London - Domus Nova.</p>
            <p className="fw-bold text-primary fs-5">$49.99</p>
            <button className="btn btn-outline-primary btn-sm" onClick={() => router.push('/rent-lease/details')} style={{
    background: '#c12020',
    color: '#fff',
    border: '#c12020'
  }}>View Details</button>
          </div>
        </div>
      </div>

            <div className="col-md-4">
        <div className="card h-100 shadow-sm border-0">
          <img
            src="/assets/rent-lease/onebedroom.jpg"
            className="card-img-top"
            alt=""
            style={{ height: '250px', objectFit: 'cover' }}
          />
          <div className="card-body text-center">
            <h5 className="card-title">1 Bedroom Apartments</h5>
            <p>City | State</p>
            <p className="card-text text-muted">Our stunning 1 bedroom Greenwich apartments at Union.</p>
            <p className="fw-bold text-primary fs-5">$49.99</p>
            <button className="btn btn-outline-primary btn-sm" onClick={() => router.push('/rent-lease/details')} style={{
    background: '#c12020',
    color: '#fff',
    border: '#c12020'
  }}>View Details</button>
          </div>
        </div>
      </div>

            <div className="col-md-4">
        <div className="card h-100 shadow-sm border-0">
          <img
            src="/assets/rent-lease/dressage-court-1-bed-b1_11.jpg"
            className="card-img-top"
            alt=""
            style={{ height: '250px', objectFit: 'cover' }}
          />
          <div className="card-body text-center">
            <h5 className="card-title">Bethnal Green 1 Bedroom Apartments</h5>
            <p>City | State</p>
            <p className="card-text text-muted">Our spacious 1-bed apartments are perfect for singles.</p>
            <p className="fw-bold text-primary fs-5">$49.99</p>
            <button className="btn btn-outline-primary btn-sm" onClick={() => router.push('/rent-lease/details')} style={{
    background: '#c12020',
    color: '#fff',
    border: '#c12020'
  }}>View Details</button>
          </div>
        </div>
      </div>


  </div>
</div>


                {/* Floating Button */}
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
