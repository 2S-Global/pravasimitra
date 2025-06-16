"use client";
import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import OtherBanner from "@/app/components/OtherBanner";
// import Sidebar from "@/app/components/Sidebar"
import ContactModal from "@/app/components/ContactModal";
import AddMarketItemModel from "@/app/components/AddMarketItemModel";

import EditMarketItemModal from "@/app/components/EditMarketItemModal";

const ContactedUsersList = () => {
  const [users] = useState([
    {
      id: 1,
      title: "Homemade Chicken Biryani",
      price: "$250/plate",
      datePosted: "2025-06-01",
      counter: "3",
      category: "Cooked Food",
      description:
        "Aromatic basmati rice cooked with tender chicken and a blend of Indian spices, served fresh and hot.",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4yjnaTVitHjdS2ySdQuRoodkwMvotP63G8w&s",
        "https://c.ndtvimg.com/2020-12/uimt7tg8_biryani_625x300_30_December_20.jpg",
        "https://www.foodiaq.com/wp-content/uploads/2025/01/chicken-biryani.jpg",
      ],
      contacts: [
        { name: "Ravi", email: "ravi@example.com", phone: "9123456789" },
        { name: "Meena", email: "meena@example.com", phone: "9988776655" },
        { name: "Arun", email: "arun@example.com", phone: "9876543210" },
      ],
    },
    {
      id: 2,
      title: "Organic Snacks Box",
      price: "$500/box",
      datePosted: "2025-06-03",
      counter: "2",
      category: "Package Food",
      description:
        "A curated box of healthy and organic snacks including roasted nuts, dried fruits, and millet chips.",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzZPb2qm4Sd5u8grj7IfRdElANiTxXLAUF0Q&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmRYuY_OJK678zMBvBtmqeaMbme2VlMWfn6IqeEZVc_zPI1Pvem9xr017J_r41E_5wsng&usqp=CAU",
      ],
      contacts: [
        { name: "Sneha", email: "sneha@example.com", phone: "9090909090" },
        { name: "Karan", email: "karan@example.com", phone: "8080808080" },
      ],
    },
    {
      id: 3,
      title: "Cotton Kurti for Women",
      price: "$799",
      datePosted: "2025-06-05",
      counter: "1",
      category: "Clothing",
      description:
        "Elegant and breathable cotton kurti ideal for daily wear, featuring floral prints and a stylish neckline.",
      images: [
        "https://www.samprada.in/cdn/shop/files/DSC08362-edited_1080x1080.jpg?v=1690352063",
        "https://sootisyahi.com/cdn/shop/products/sootisyahi-blushing-betel-bagru-handblock-printed-pure-cotton-kurti-225622.jpg?v=1661347800&width=500",
      ],
      contacts: [
        { name: "Priya", email: "priya@example.com", phone: "9988771122" },
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
      title: item.title,
      propertyType: item.propertyType,
      roomSize: item.roomSize,
      price: item.price,
      description: "Sample description here", // fallback if not present
      images: item.images || [],
      category:item.category
    });
    setShowEditModal(true);
  };

  const filteredUsers = users;

  return (
    <>
      <Header />
      <OtherBanner page_title="E-Market Place" />

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
                      <i className="bi bi-plus-lg me-1" /> Add New Item
                    </button>
                  </div>

                  {/* Table */}
                  <div className="table-responsive">
                    <table className="table table-striped align-middle text-center">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Title</th>

                          <th>Price</th>

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

                              <td>{user.price}</td>

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

                <AddMarketItemModel
                  show={showAddModal}
                  onClose={() => setShowAddModal(false)}
                />
                <EditMarketItemModal
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
