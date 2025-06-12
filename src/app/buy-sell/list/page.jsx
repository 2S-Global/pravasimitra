"use client";
import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import OtherBanner from "@/app/components/OtherBanner";
// import Sidebar from "@/app/components/Sidebar"
import ContactModal from "@/app/components/ContactModal";
import AddItemModal from "@/app/components/AddItemModel";

import EditItemModal from "@/app/components/EditItemModal";

const ContactedUsersList = () => {
  const [users] = useState([
  {
    id: 1,
    item: "Wooden Table",
    date: "2025-06-01",
    price: "100$",
    counter: "2",
    images: [
      "https://5.imimg.com/data5/IH/ZP/YN/SELLER-1084552/wodden-table.jpg",
      "https://images.woodenstreet.de/image/cache/data/coffee-table/elevate-sheesham-wood-glass-top-coffee-table-with-storage-walnut-finish/walnut-finish/new-logo/1-750x650.jpg",
    ],
    contacts: [
      { name: "Alice", email: "alice@example.com", phone: "1234567890" },
      { name: "Bob", email: "bob@example.com", phone: "9876543210" },
    ],
  },
  {
    id: 2,
    item: "Wooden Chair",
    date: "2025-06-01",
    price: "100$",
    counter: "1",
    images: [
      "https://m.media-amazon.com/images/I/710GKrS7GvL._AC_UF894,1000_QL80_.jpg"
    ],
    contacts: [
      { name: "Charlie", email: "charlie@example.com", phone: "9999999999" },
    ],
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
    title: item.item, // map 'item' to 'title'
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
                          <th>Price</th>

                          <th>Date</th>
                          <th>Contact Person</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user, index) => (
                            <tr key={user.id}>
                              <td>{index + 1}</td>
                              <td>{user.item}</td>
                              <td>{user.price}</td>

                              <td>
                                {new Date(user.date).toLocaleDateString()}
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm btn-outline-info"
                                  title="View Details"
                                  type="button"
                                  onClick={() =>
                                    handleViewDetails(user.item, user.contacts)
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

                <AddItemModal
                  show={showAddModal}
                  onClose={() => setShowAddModal(false)}
                />
                <EditItemModal
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
