'use client'

import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
import { useRouter } from "next/navigation"

const Orders = () => {
  const router = useRouter()

  const orderList = [
    {
      id: "ORD123456",
      date: "2025-06-10",
      amount: 26500,
      status: "Delivered",
      items: ["Office Chair", "LED TV"],
    },
    {
      id: "ORD123457",
      date: "2025-06-05",
      amount: 4500,
      status: "Shipped",
      items: ["Table Lamp"],
    },
    {
      id: "ORD123458",
      date: "2025-06-01",
      amount: 7800,
      status: "Cancelled",
      items: ["Sofa Cushion Set"],
    },
  ]

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'success'
      case 'Shipped':
        return 'warning text-dark'
      case 'Cancelled':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  return (
    <>
      <Header />
      <OtherBanner page_title="My Orders" banner_image="/assets/images/bg/furniture_banner.jpg" />

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold mb-4 text-center">Order History</h2>

          {orderList.length === 0 ? (
            <p className="text-center">You haven’t placed any orders yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle bg-white shadow-sm rounded">
                <thead className="table-light text-center">
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList.map(order => (
                    <tr key={order.id} className="text-center">
                      <td className="fw-semibold text-primary">#{order.id}</td>
                      <td>{order.date}</td>
                      <td className="text-muted">{order.items.join(', ')}</td>
                      <td className="fw-semibold">₹{order.amount.toLocaleString()}</td>
                      <td>
                        <span className={`badge bg-${getStatusClass(order.status)} px-3 py-2 rounded-pill`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          title="View Details"
                          onClick={() => router.push(`/orders/details`)}
                          style={{ padding: "6px 9px" }}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Orders
