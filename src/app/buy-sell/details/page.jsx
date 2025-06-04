'use client'
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
import Sidebar from "@/app/components/Sidebar"

const JobCategory = () => {
  return (
    <>
      <Header />
      <OtherBanner page_title="Product Details" banner_image="/assets/images/bg/furniture_banner.jpg" />

      <div className="tm-section tm-login-register-area bg-white tm-padding-section">
        <div className="container">
          <div className="row col-md-12">
         {/*    <Sidebar /> */}

            <div className="profile-info col-md-12">
              <form method="post" action="" className="tm-form tm-login-form tm-form-bordered form-card">
               

<div className="container my-5">
  <div className="row g-5 align-items-start">
    
    {/* Product Image */}
    <div className="col-md-6">
      <div className="position-relative shadow-sm rounded overflow-hidden">
        <img
          src="/assets/buy-sell/sofa3.webp"
          alt="Elegant Wooden Chair"
          className="img-fluid w-100 object-fit-cover"
          style={{ height: '450px', borderRadius: '12px' }}
        />
      </div>
    </div>

    {/* Product Details */}
    <div className="col-md-6">
      <h2 className="fw-bold mb-2">L Shape Sofa Modern Sofa Set Design</h2>
      <p className="text-secondary mb-1">Category: <strong className="text-dark">Furniture</strong></p>

      <div className="d-flex align-items-center mb-3">
        <span className="badge bg-success me-2">In Stock</span>
        <span className="text-warning fw-semibold fs-5">★★★★☆</span>
        <small className="ms-2 text-muted">(112 reviews)</small>
      </div>

      <h3 className="text-primary fw-bold mb-4">$149.00</h3>

      <p className="text-muted mb-4">
        Upgrade your living space with this modern L-shaped sofa set, combining style and comfort. Its sleek design fits perfectly in any corner, maximizing space while.
      </p>

{/*       <div className="d-flex align-items-center mb-4">
        <label className="me-3 fw-semibold">Quantity:</label>
        <input
          type="number"
          className="form-control w-25"
          defaultValue={1}
          min={1}
        />
      </div> */}

      <div className="d-flex gap-2">
        <button
  className="btn btn-primary px-4"
  style={{
    background: '#c12020',
    color: '#fff',
    border: '#c12020'
  }}
>
          <i className="bi bi-cart-plus me-2"></i> Contact Seller
        </button>
        <button className="btn btn-outline-secondary px-4" style={{
    background: '#c12020',
    color: '#fff',
    border: '#c12020'
  }}>
          <i className="bi bi-heart me-2"></i> Wishlist
        </button>
      </div>
    </div>
  </div>

  {/* Tabs Section */}
  <div className="row mt-5">
    <div className="col-12">
      <ul className="nav nav-pills mb-3" id="productTab" role="tablist" >
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="desc-tab" data-bs-toggle="pill" data-bs-target="#desc" type="button" role="tab" style={{
    background: '#c12020',
    color: '#fff',
    border: '#c12020'
  }}>
            Description
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="reviews-tab" data-bs-toggle="pill" data-bs-target="#reviews" type="button" role="tab">
            Reviews (112)
          </button>
        </li>
      </ul>
      <div className="tab-content border rounded p-4 shadow-sm bg-light" id="productTabContent">
        <div className="tab-pane fade show active" id="desc" role="tabpanel">
          <p className="text-muted">
            Upgrade your living space with this modern L-shaped sofa set, combining style and comfort. Its sleek design fits perfectly in any corner, maximizing space while offering ample seating. Crafted with premium materials, it's ideal for contemporary homes. Perfect for relaxing, entertaining guests, or adding a touch of elegance to your décor.

          </p>
        </div>
        <div className="tab-pane fade" id="reviews" role="tabpanel">
          <p className="text-muted">No reviews yet. Be the first to review this product!</p>
        </div>
      </div>
    </div>
  </div>
</div>

 </form>



</div>

                <button
                  className="btn btn-danger rounded-circle position-fixed"
                  style={{ bottom: 20, right: 20, width: 50, height: 50 }}
                >
                  <img src="/assets/images/icon-sos.png" alt="" style={{ maxWidth: 25 }} />
                </button>
             
            </div>
          </div>
        </div>
     

      <Footer />
    </>
  )
}

export default JobCategory
