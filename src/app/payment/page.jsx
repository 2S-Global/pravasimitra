'use client'

import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
import { useRouter } from "next/navigation"

const CardPayment = () => {
  const router = useRouter()

  const handlePayment = (e) => {
    e.preventDefault()
    // Replace with real gateway call (e.g. Stripe, Razorpay)
    alert('Payment Successful!')
    router.push('/thank-you') // or order summary page
  }

  return (
    <>
      <Header />
      <OtherBanner page_title="Card Payment" banner_image="/assets/images/bg/furniture_banner.jpg" />

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold mb-4 text-center">Secure Card Payment</h2>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="bg-white p-4 shadow rounded-4">
                <form onSubmit={handlePayment}>
                  <div className="mb-3">
                    <label className="form-label">Cardholder Name</label>
                    <input type="text" className="form-control" placeholder="John Doe" required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <input type="text" className="form-control" placeholder="1234 5678 9012 3456" maxLength={19} required />
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Expiry Date</label>
                      <input type="text" className="form-control" placeholder="MM/YY" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">CVV</label>
                      <input type="password" className="form-control" placeholder="•••" maxLength={4} required />
                    </div>
                  </div>

                  <div className="mt-4 border-top pt-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Amount</span>
                      <span className="fw-bold">₹26,500</span>
                    </div>
                    <button type="submit" className="btn btn-success w-100 fw-semibold py-2 rounded-pill mt-2">
                      Pay Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default CardPayment
