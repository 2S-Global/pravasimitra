'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"

const Cart = () => {
  const router = useRouter()

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Office Chair",
      image: "/assets/images/officefrniture.png",
      quantity: 1,
      price: 2500,
    },
    {
      id: 2,
      name: "LED TV",
      image: "/assets/images/electronicsgoods.png",
      quantity: 2,
      price: 12000,
    },
  ])

  const updateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <Header />
      <OtherBanner page_title="Your Cart" banner_image="/assets/images/bg/furniture_banner.jpg" />

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 fw-bold text-center">Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table align-middle bg-white">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>

<tbody>
  {cartItems.map(item => (
    <tr key={item.id}>
      <td><img src={item.image} alt={item.name} width="70" height="70" /></td>
      <td>{item.name}</td>
      <td>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={() => updateQuantity(item.id, -1)}
            style={{ width: 32, height: 32 }}
          >-</button>
          <span className="fw-bold">{item.quantity}</span>
          <button
            className="btn btn-sm btn-outline-secondary ms-2"
            onClick={() => updateQuantity(item.id, 1)}
            style={{ width: 32, height: 32 }}
          >+</button>
        </div>
      </td>
      <td>₹{item.price.toLocaleString()}</td>
      <td>₹{(item.quantity * item.price).toLocaleString()}</td>
      <td>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => removeItem(item.id)}
          style={{ width: 36, height: 36 }}
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  ))}
</tbody>

                </table>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <div className="bg-white p-4 shadow-sm rounded" style={{ minWidth: '300px' }}>
                  <h5 className="fw-bold mb-3">Cart Summary</h5>
                  <p className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </p>
                  <hr />
                  <p className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </p>
                  <button
                    className="btn btn-danger w-100 mt-3"
                    onClick={() => router.push('/checkout')}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Cart
