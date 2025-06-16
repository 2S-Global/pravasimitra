'use client'

import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
import Sidebar from "@/app/components/Sidebar"
import { useState } from "react"

const ChangeProfileImage = () => {
  const [preview, setPreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <Header />
      <OtherBanner page_title="Change Profile Image" />

      <section className="tm-section tm-login-register-area bg-white tm-padding-section">
        <div className="container">
          <div className="row col-md-12">
            <Sidebar />

            <div className="col-md-9">
              <form method="post" action="" className="tm-form tm-login-form tm-form-bordered form-card" encType="multipart/form-data">
                <h4
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    marginBottom: "20px"
                  }}
                >
                  Change Profile Image
                </h4>

                <div className="tm-form-inner">
                  <div className="row col-md-12">
                    <div className="col-md-9">
                      <div className="tm-form-field mb-3">
                        <label htmlFor="profile_image">Select New Profile Image</label>
                        <input
                          type="file"
                          className="form-control"
                          name="profile_image"
                          id="profile_image"
                          accept="image/*"
                          onChange={handleImageChange}
                          required
                        />
                      </div>

                      {preview && (
                        <div className="mb-4 text-center">
                          <p>Image Preview:</p>
                          <img src={preview} alt="Preview" style={{ maxWidth: "150px", borderRadius: "50%" }} />
                        </div>
                      )}

                      <div className="tm-form-field text-center">
                        <button type="submit" className="btn btn-danger px-4">Update Profile Image</button>
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

export default ChangeProfileImage
