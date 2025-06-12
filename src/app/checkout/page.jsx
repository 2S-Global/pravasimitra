'use client'

import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
import { useRouter } from 'next/navigation'

const Checkout = () => {
  const router = useRouter()
  return (
    <>
      <Header />
      <OtherBanner page_title="Checkout" banner_image="/assets/images/bg/furniture_banner.jpg" />

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold mb-4 text-center">Checkout</h2>
          <div className="row g-5">
            {/* Billing and Shipping Forms */}
            <div className="col-lg-7">
              <div className="bg-white p-4 shadow rounded-4 mb-4">
                <h5 className="fw-semibold mb-3">Billing Information</h5>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input type="text" className="form-control" placeholder="John" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input type="text" className="form-control" placeholder="Doe" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" placeholder="john@example.com" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Phone</label>
                      <input type="text" className="form-control" placeholder="+91 9876543210" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Billing Address</label>
                      <textarea className="form-control" rows="3" placeholder="Full address with pin code"></textarea>
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-white p-4 shadow rounded-4">
                <h5 className="fw-semibold mb-3">Shipping Information</h5>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input type="text" className="form-control" placeholder="Jane" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input type="text" className="form-control" placeholder="Smith" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Phone</label>
                      <input type="text" className="form-control" placeholder="+91 9876543211" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Shipping Address</label>
                      <textarea className="form-control" rows="3" placeholder="Full shipping address with pin code"></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-5">
              <div className="bg-white p-4 shadow rounded-4">
                <h5 className="fw-semibold mb-3">Order Summary</h5>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Office Chair</span>
                    <strong>₹2,500</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>LED TV (x2)</span>
                    <strong>₹24,000</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between text-muted">
                    <span>Shipping</span>
                    <span>Free</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between fw-bold fs-5">
                    <span>Total</span>
                    <span className="text-success">₹26,500</span>
                  </li>
                </ul>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Payment Method</label>
                  <select className="form-select">
                    <option>Cash on Delivery</option>
                    <option>UPI</option>
                    <option>Credit/Debit Card</option>
                  </select>
                </div>

                <button className="btn btn-primary w-100 py-2 fw-semibold rounded-3"  onClick={() => router.push('/payment')}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Checkout
