"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import OtherBanner from "@/app/components/OtherBanner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
const Orders = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [applyList, setapplyList] = useState([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/product/my-contact");

      setapplyList(response.data.list);

      // console.log("Fetched users:", response.data.items);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // end loading
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Header />
      <OtherBanner
        page_title="Apply List (Buy/Sell)"
        banner_image="/assets/images/bg/furniture_banner.jpg"
      />
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading products...</span>
          </div>
        </div>
      ) : (
        <div className="tm-section tm-login-register-area bg-white tm-padding-section">
          <div className="container">
            <div className="profile-info col-md-12">
              <section className="py-5 bg-light">
                <div className="container">
                  <h2 className="fw-bold mb-5 text-center">
                    Apply List (Buy/Sell)
                  </h2>

                  {Array.isArray(applyList) && applyList.length === 0 ? (
                    <p className="text-center">
                      You haven’t contacted any seller.
                    </p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle bg-white shadow-sm rounded">
                        <thead className="table-light text-center">
                          <tr>
                            <th>Sl no</th>
                            <th>Items Image</th>
                            <th>Items Name</th>
                            <th>Seller Name</th>
                            <th>Seller Email</th>
                            <th>Seller Phone</th>
                            <th>Apply Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applyList.map((order) => (
                            <tr key={order.id} className="text-center">
                              <td className="fw-semibold text-primary">
                                #{order.id}
                              </td>
                              <td className="fw-semibold text-primary">
                                {" "}
                                <img
                                  src={order.productImage}
                                  className="card-img-top"
                                  alt={order.productTitle}
                                  style={{
                                    height: "80px",
                                    width: "80px",
                                    objectFit: "cover",
                                  }}
                                />
                              </td>
                              <td className="fw-semibold text-primary">
                                #{order.productTitle}
                              </td>
                              <td>{order.sellerName}</td>
                              <td>{order.sellerEmail}</td>
                              <td>{order.sellerPhone}</td>
                              <td>
                                {new Date(order.contactedAt).toLocaleDateString(
                                  "en-GB"
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Orders;
