'use client'

import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
import Sidebar from "@/app/components/Sidebar"

const ChangePassword = () => {
  return (
    <>
      <Header />
      <OtherBanner page_title="Change Password" />

      <section className="tm-section tm-login-register-area bg-white tm-padding-section">
        <div className="container">
          <div className="row col-md-12">
            <Sidebar />

            <div className="col-md-9">
              <form method="post" action="" className="tm-form tm-login-form tm-form-bordered form-card">
                <h4
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    marginBottom: "20px"
                  }}
                >
                  Change Password
                </h4>

                <div className="tm-form-inner">
                  <div className="row col-md-12">
                    <div className="col-md-9">
                      <div className="tm-form-field mb-3">
                        <label htmlFor="current_password">Current Password</label>
                        <input type="password" className="form-control" name="current_password" id="current_password" placeholder="Enter current password" required />
                      </div>

                      <div className="tm-form-field mb-3">
                        <label htmlFor="new_password">New Password</label>
                        <input type="password" className="form-control" name="new_password" id="new_password" placeholder="Enter new password" required />
                      </div>

                      <div className="tm-form-field mb-4">
                        <label htmlFor="confirm_password">Confirm New Password</label>
                        <input type="password" className="form-control" name="confirm_password" id="confirm_password" placeholder="Confirm new password" required />
                      </div>

                      <div className="tm-form-field text-center">
                        <button type="submit" className="btn btn-danger px-4">Update Password</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default ChangePassword
