"use client";
import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import OtherBanner from "@/app/components/OtherBanner";
// import Sidebar from "@/app/components/Sidebar"
import ContactModal from "@/app/components/ContactModal";
import AddRoomModel from "@/app/components/AddRoomModel";

import EditRoomModal from "@/app/components/EditRoomModal";

const ContactedUsersList = () => {
  const [users] = useState([
    {
      id: 1,
      title: "2 BHK Apartment in City Center",
      propertyType: "Rent",
      price: "$1,200/month",
      roomSize: "950 sq.ft",
      datePosted: "2025-06-01",
      counter: "2",
      images: [
        "https://delf2iyv2crlj.cloudfront.net/Images/253e9e2a-ca65-4bc2-b2ee-9bee6288dff2.webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVahLtcySXRTWD6oqowjthP4yUzVWliWJi7w&s",
        "https://images.nobroker.in/images/8a9fb18278c643d30178c65f903a068a/8a9fb18278c643d30178c65f903a068a_75763_384707_large.jpg"
      ],
      contacts: [
        { name: "Alice", email: "alice@example.com", phone: "1234567890" },
        { name: "Bob", email: "bob@example.com", phone: "9876543210" },
      ],
    },
    {
      id: 2,
      title: "Residential Plot Available",
      propertyType: "Sell",
      price: "$15,000",
      roomSize: "2400 sq.ft",
      datePosted: "2025-06-03",
      counter: "1",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwzFfGI42o3Gj9goEHVWwjbwla84LnBx7w1w&s",
        "https://s3.ap-south-1.amazonaws.com/www.cimg.in/images/2022/09/08/34/_16626388441_large.jpg"
      ],
      contacts: [
        { name: "Charlie", email: "charlie@example.com", phone: "9999999999" },
      ],
    },
    {
      id: 3,
      title: "Commercial Shop Space for Lease",
      propertyType: "Lease",
      price: "$2,000/month",
      roomSize: "400 sq.ft",
      datePosted: "2025-06-05",
      counter: "1",
      images: ["https://static.360realtors.com/properties/photos/7247/mini/1727417831_0propertyimage.webp",
        "https://5.imimg.com/data5/XH/NE/SW/SELLER-48886426/shop-for-sale-in-jaipur-commercial.jpg"
      ],
      contacts: [{ name: "David", email: "david@example.com", phone: "8888888888" },],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedItemContacts, setSelectedItemContacts] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleViewDetails = (itemName, contacts) => {
    setSelectedItemName(itemName);
    setSelectedItemContacts(contacts);

    setShowModal(true);
  };

  const handleAdd = () => {
    setShowAddModal(true); // Open add modal
  };
  const handleEdit = (item) => {
    setItemToEdit({
      title: item.title,
      propertyType:item.propertyType,
      roomSize:item.roomSize,
      price: item.price,
      description: "Sample description here", // fallback if not present
      images: item.images || [],
    });
    setShowEditModal(true);
  };

  const filteredUsers = users;

  return (
    <>
      <Header />
      <OtherBanner page_title="Rent & Lease" />

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
                    textDecoration: "underline",
                  }}
                >
                  My Posts
                </h4>

                <div className="container my-4">
                  {/* Add New Button */}
                  <div className="mb-3 text-end">
                    <button
                      type="button"
                      className="btn btn-primary "
                      onClick={handleAdd}
                      style={{
                        background: "#c12020",
                        color: "#fff",
                        border: "#c12020",
                      }}
                    >
                      <i className="bi bi-plus-lg me-1" /> Add New Property
                    </button>
                  </div>

                  {/* Table */}
                  <div className="table-responsive">
                    <table className="table table-striped align-middle text-center">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Property Type</th>
                          <th>Price</th>
                          <th>Room Size</th>
                          <th>Date Posted</th>
                          <th>Interested Users</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user, index) => (
                            <tr key={user.id}>
                              <td>{index + 1}</td>
                              <td>{user.title}</td>
                              <td>{user.propertyType}</td>
                              <td>{user.price}</td>
                              <td>{user.roomSize}</td>

                              <td>
                                {new Date(user.datePosted).toLocaleDateString(
                                  "en-IN"
                                )}
                              </td>
                    
                              <td>
                                <button
                                  className="btn btn-sm btn-outline-info"
                                  title="View Details"
                                  type="button"
                                  onClick={() =>
                                    handleViewDetails(user.title, user.contacts)
                                  }
                                >
                                  {user.counter}
                                </button>
                              </td>
                              <td>
                                <div className="d-flex justify-content-center gap-1">
                                  <button
                                    className="btn btn-sm btn-outline-warning"
                                    title="Edit"
                                    type="button"
                                    onClick={() => handleEdit(user)}
                                  >
                                    <i className="bi bi-pencil-square"></i>
                                  </button>

                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    title="Delete"
                                    onClick={() => handleDelete(user.id)}
                                  >
                                    <i className="bi bi-trash" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center text-muted">
                              No users found.
                            </td>
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
                  <img
                    src="/assets/images/icon-sos.png"
                    alt=""
                    style={{ maxWidth: 25 }}
                  />
                </button>

                <ContactModal
                  show={showModal}
                  onClose={() => setShowModal(false)}
                  contacts={selectedItemContacts}
                  itemName={selectedItemName}
                />

                <AddRoomModel
                  show={showAddModal}
                  onClose={() => setShowAddModal(false)}
                />
                <EditRoomModal
                  show={showEditModal}
                  onClose={() => setShowEditModal(false)}
                  itemData={itemToEdit}
                  onSave={(formData) => {
                    // You can handle formData submission to your API here
                    console.log("Submit updated item", formData);
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactedUsersList;
