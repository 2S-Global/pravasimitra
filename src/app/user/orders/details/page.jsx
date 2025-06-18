'use client'

import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
import { useParams } from 'next/navigation'

const OrderDetails = () => {
  const { id } = useParams()

  // Dummy Order Data (replace with real API data)
  const order = {
    id: id || "ORD123456",
    date: "2025-06-10",
    status: "Delivered",
    paymentMethod: "Credit Card",
    billing: {
      name: "Abhishek Dey",
      address: "123 Park Street, Kolkata, India",
      phone: "+91 9876543210",
      email: "abhishek.dey@gmail.com",
    },
    shipping: {
      name: "Abhishek Dey",
      address: "123 Park Street, Kolkata, India",
      phone: "+91 9876543210",
    },
    items: [
      {
        name: "Office Chair",
        quantity: 1,
        price: 2500,
        image: "https://m.media-amazon.com/images/I/818hqgJuNoL._SL1500_.jpg",
      },
      {
        name: "LED TV",
        quantity: 2,
        price: 12000,
        image: "https://m.media-amazon.com/images/I/81XdceRvZaL._SL1500_.jpg",
      },
    ],
  }

  const getTotal = () =>
    order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered': return 'success'
      case 'Shipped': return 'warning text-dark'
      case 'Cancelled': return 'danger'
      default: return 'secondary'
    }
  }

  return (
    <>
      <Header />
      <OtherBanner page_title="Order Details" banner_image="/assets/images/bg/furniture_banner.jpg" />

      <section className="py-5 bg-light">
        <div className="container">
          <div className="bg-white shadow-sm rounded p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold">Order #{order.id}</h4>
              <span className={`badge bg-${getStatusBadge(order.status)} fs-6`}>
                {order.status}
              </span>
            </div>

            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <h6 className="fw-bold">Order Info</h6>
                <p className="mb-1"><strong>Date:</strong> {order.date}</p>
                <p className="mb-1"><strong>Payment:</strong> {order.paymentMethod}</p>
              </div>
              <div className="col-md-4 mb-3">
                <h6 className="fw-bold">Billing Details</h6>
                <p className="mb-1">{order.billing.name}</p>
                <p className="mb-1">{order.billing.address}</p>
                <p className="mb-1">{order.billing.phone}</p>
                <p className="mb-1">{order.billing.email}</p>
              </div>
              <div className="col-md-4 mb-3">
                <h6 className="fw-bold">Shipping Address</h6>
                <p className="mb-1">{order.shipping.name}</p>
                <p className="mb-1">{order.shipping.address}</p>
                <p className="mb-1">{order.shipping.phone}</p>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle">
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
                  {order.items.map((item, index) => (
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

            <div className="d-flex justify-content-end mt-4">
              <div className="bg-light rounded p-4" style={{ minWidth: 300 }}>
                <h6 className="fw-bold mb-3">Order Total</h6>
                <div className="d-flex justify-content-between">
                  <span>Total Amount:</span>
                  <span className="fw-bold">₹{getTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default OrderDetails
