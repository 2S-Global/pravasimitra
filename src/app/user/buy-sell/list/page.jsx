"use client";
import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import OtherBanner from "@/app/components/OtherBanner";
// import Sidebar from "@/app/components/Sidebar"
import ContactModal from "@/app/components/ContactModal";
import AddItemModal from "@/app/components/AddItemModel";
import axios from "axios";
import EditItemModal from "@/app/components/EditItemModal";

const ContactedUsersList = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemContacts, setSelectedItemContacts] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/product/list-product");

        setUsers(response.data.items);

        // console.log("Fetched users:", response.data.items);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // end loading
      }
    };

    fetchUsers();
  }, []);

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
      title: item.item, // map 'item' to 'title'
      price: item.price,
      description: "Sample description here", // fallback if not present
      images: item.images || [],
      category: item.category,
    });
    setShowEditModal(true);
  };

  const filteredUsers = users;

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
                    textDecoration: "underline",
                  }}
                >
                  My Posted Items
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
                      <i className="bi bi-plus-lg me-1" /> Add New Item
                    </button>
                  </div>

                  {/* Table */}
                  <div className="table-responsive">
                    <table className="table table-striped align-middle text-center">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Item Name</th>
                          <th>Item Image</th>
                          <th>Category Name</th>
                          <th>Price ($)</th>
                          <th>Date</th>
                          <th>Interested Users</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="8">
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
                        ) : filteredUsers.length > 0 ? (
                          filteredUsers.map((user, index) => (
                            <tr key={user.id}>
                              <td>{index + 1}</td>
                              <td>
                                {user.title.split(" ").length > 5
                                  ? user.title
                                      .split(" ")
                                      .slice(0, 5)
                                      .join(" ") + "..."
                                  : user.title}
                              </td>
                              <td>
                                <img
                                  src={user?.image}
                                  alt="User"
                                  width={80}
                                  height={60}
                                  style={{ objectFit: "cover" }}
                                />
                              </td>
                              <td>{user.category?.name}</td>

                              <td>{user.price}</td>

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
                            <td colSpan="8" className="text-center text-muted">
                              No Products found.
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

                <AddItemModal
                  show={showAddModal}
                  onClose={() => setShowAddModal(false)}
                />
                <EditItemModal
                  show={showEditModal}
                  onClose={() => setShowEditModal(false)}
                  itemData={itemToEdit}
                  onSave={(formData) => {
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
