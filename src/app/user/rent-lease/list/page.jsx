"use client";
import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import OtherBanner from "@/app/components/OtherBanner";
import ContactModal from "@/app/components/ContactModal";
import AddRoomModel from "@/app/components/AddRoomModel";
import EditRoomModal from "@/app/components/EditRoomModal";
import AlertService from "@/app/components/alertService";
import axios from "axios";
const ContactedUsersList = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemContacts, setSelectedItemContacts] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

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
      propertyType: item.propertyType,
      roomSize: item.roomSize,
      price: item.price,
      description: "Sample description here", // fallback if not present
      images: item.images || [],
    });
    setShowEditModal(true);
  };

  const filteredUsers = users;


    const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/rent-lease/list-room");

      setUsers(response.data.items);

    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); 
    }
  };

    useEffect(() => {
      fetchUsers();
    }, []);

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
                  <div className="mb-3 text-end mb-5">
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
                          <th>Room Image</th>
                          <th>Property Type</th>
                          <th>Price</th>
                          <th>Room Size</th>
                          <th>Date Posted</th>
                          <th>Interested Users</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>

                           {loading ? (
                          <tr>
                            <td colSpan="10">
                              <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ minHeight: "200px" }}
                              >
                                <div
                                  className="spinner-border text-danger"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ) :
                        filteredUsers.length > 0 ? (
                          filteredUsers.map((user, index) => (
                            <tr key={user.id}>
                              <td>{index + 1}</td>
                             <td>
                                {user.title.split(" ").length > 12
                                  ? user.title
                                      .split(" ")
                                      .slice(0, 12)
                                      .join(" ") + "..."
                                  : user.title}
                              </td>
                              <td><img
                                  src={user?.images?.[0] }
                                  alt="User"
                                  width={80}
                                  height={60}
                                  style={{ objectFit: "cover" }}
                                /></td>
                              <td>{user.propertyType?.name || "N/A"}</td>
                              <td>{user.price}</td>
                              <td>{user.roomSize}</td>

                                 <td>
                                {new Date(user.createdAt).toLocaleDateString(
                                  "en-GB"
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
                                  {user.contactCount}
                                </button>
                              </td>
                              <td>
                                <div className="d-flex justify-content-center gap-1">
                                  <button
                                    className="btn btn-sm btn-outline-warning "
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
                            <td colSpan="9" className="text-center text-muted">
                              No Room found.
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
