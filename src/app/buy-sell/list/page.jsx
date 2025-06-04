'use client'
import { useState } from "react"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
// import Sidebar from "@/app/components/Sidebar"

const ContactedUsersList = () => {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      type: "Buy",
      item: "Wooden Table",
      date: "2025-06-01"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9123456789",
      type: "Sell",
      item: "Office Chair",
      date: "2025-06-02"
    }
  ])

  const [activeTab, setActiveTab] = useState("Buy")

  const handleViewDetails = (user) => {
    alert(`Details:\n\nName: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}\nType: ${user.type}\nItem: ${user.item}\nDate: ${user.date}`)
  }

  const handleAdd = () => {
    alert('Redirect to add new contact form or open modal')
  }

  const filteredUsers = users.filter(user => user.type === activeTab)

  return (
    <>
      <Header />
      <OtherBanner page_title="Buy & Sell" />

      <div className="tm-section tm-login-register-area bg-white tm-padding-section">
        <div className="container">
          <div className="row col-md-12">
            {/* <Sidebar /> */}

            <div className="profile-info col-md-12">
              <form className="tm-form tm-login-form tm-form-bordered form-card">
                <h4
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    textDecoration: "underline"
                  }}
                >
                  Users Who Contacted (Buy/Sell)
                </h4>

                <div className="container my-4">

                  {/* Tabs */}
                  <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "Buy" ? "active" : ""}`}
                        onClick={() => setActiveTab("Buy")}
                        type="button"
                      >
                        Buy
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "Sell" ? "active" : ""}`}
                        onClick={() => setActiveTab("Sell")}
                        type="button"
                      >
                        Sell
                      </button>
                    </li>
                  </ul>

                  {/* Add New Button */}
                  <div className="mb-3 text-end">
                    <button type="button" className="btn btn-primary " onClick={handleAdd}  style={{
    background: '#c12020',
    color: '#fff',
    border: '#c12020'
  }}>
                      <i className="bi bi-plus-lg me-1" /> Add New Item
                    </button>
                  </div>

                  {/* Table */}
                  <div className="table-responsive">
                    <table className="table table-striped align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email / Phone</th>
                          <th>Type</th>
                          <th>Item</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>
                              <div>{user.email}</div>
                              <small className="text-muted">{user.phone}</small>
                            </td>
                            <td>
                              <span className={`badge ${user.type === 'Buy' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                {user.type}
                              </span>
                            </td>
                            <td>{user.item}</td>
                            <td>{new Date(user.date).toLocaleDateString()}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-info"
                                title="View Details"
                                onClick={() => handleViewDetails(user)}
                              >
                                <i className="bi bi-eye" />
                              </button>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan="7" className="text-center text-muted">No {activeTab} users found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Floating Button */}
                <button
                  className="btn btn-danger rounded-circle position-fixed"
                  style={{ bottom: 20, right: 20, width: 50, height: 50 }}
                >
                  <img src="/assets/images/icon-sos.png" alt="" style={{ maxWidth: 25 }} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ContactedUsersList
