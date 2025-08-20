"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import OtherBanner from "@/app/components/OtherBanner";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/order-detailsBuyer?id=${id}`, {
          withCredentials: true,
        });
        setOrder(res.data?.orderDetails || null);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const getTotal = () =>
    order?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Shipped":
        return "warning text-dark";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <>
      <Header />
      <OtherBanner
        page_title={`Order #${order?.orderId || ""}`}
        banner_image="/assets/images/bg/furniture_banner.jpg"
      />

      <div className="tm-section tm-login-register-area bg-white tm-padding-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 profile-info">
              <form className="tm-form tm-login-form tm-form-bordered form-card">
                {loading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "300px" }}
                  >
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : !order ? (
                  <p className="text-center text-muted mt-4">Order not found.</p>
                ) : (
                  <>
                    {/* Order Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="fw-bold">Order #{order.orderId}</h4>
                      <span className={`badge bg-${getStatusBadge(order.status)} fs-6`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Order & Billing Info */}
                    <div className="row mb-4">
                      <div className="col-md-4 mb-3">
                        <h6 className="fw-bold">Order Info</h6>
                        <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                        <p><strong>Payment:</strong> {order.paymentMethod}</p>
                      </div>
                      <div className="col-md-4 mb-3">
                        <h6 className="fw-bold">Billing Details</h6>
                        <p>{order.billing?.name}</p>
                        <p>{order.billing?.address}</p>
                        <p>{order.billing?.phone}</p>
                        <p>{order.billing?.email}</p>
                      </div>
                      <div className="col-md-4 mb-3">
                        <h6 className="fw-bold">Shipping Address</h6>
                        <p>{order.shipping?.name}</p>
                        <p>{order.shipping?.address}</p>
                        <p>{order.shipping?.phone}</p>
                      </div>
                    </div>

                    {/* Items Table */}
                    <div className="table-responsive">
                      <table className="table align-middle table-striped text-center">
                        <thead className="table-light">
                          <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <img src={item.image} alt={item.name} width={60} height={60} />
                              </td>
                              <td>{item.name}</td>
                              <td>{item.quantity}</td>
                              <td>₹{item.price.toLocaleString()}</td>
                              <td>₹{(item.price * item.quantity).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Total */}
                    <div className="d-flex justify-content-end mt-4">
                      <div className="bg-light rounded p-4" style={{ minWidth: 300 }}>
                        <h6 className="fw-bold mb-3">Order Total</h6>
                        <div className="d-flex justify-content-between">
                          <span>Total Amount:</span>
                          <span className="fw-bold">₹{getTotal().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderDetails;
