"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import OtherBanner from "@/app/components/OtherBanner";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import AlertService from "../components/alertService";
import { useOrderStore } from "@/app/store/orderStore";
import axios from "axios";

const Checkout = () => {
  const router = useRouter();
  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [orderSummary,setOrderSummary]=useState([]);
  const Required = () => <span className="text-danger">*</span>;

   useEffect(() => {
    fetchOrderSummary();

  }, []);

  const handleCheckbox = (e) => {
    const checked = e.target.checked;
    setSameAsBilling(checked);
    if (checked) {
      setShipping({ ...billing });
    }
  };

  const handleChange = (formType) => (e) => {
    const { name, value } = e.target;

      if ((name === "firstName" || name === "lastName") && /[^a-zA-Z\s-]/.test(value)) {
    return;
  }

  if (name === "phone" && (!/^\d{0,11}$/.test(value))) {
    return;
  }

  if (name === "pincode" && (!/^\d{0,6}$/.test(value))) {
  return;
}

    if (formType === "billing") {
      const updatedBilling = { ...billing, [name]: value };
      setBilling(updatedBilling);

      if (sameAsBilling) {
        setShipping({ ...updatedBilling });
      }
    }

    if (formType === "shipping" && !sameAsBilling) {
      setShipping((prev) => ({ ...prev, [name]: value }));
    }
  };

    const fetchOrderSummary= async () => {
    try {
      const orderSumm = await axios.post("/api/order-summary");

      setOrderSummary(orderSumm.data.summary);
      console.log(orderSummary);
      
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const validateForm = () => {
  const nameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,}$/;
 const pincodeRegex = /^\d{5,6}$/;
  const checkFields = (data, type) => {
    for (const key in data) {
      if (!data[key]) {
        AlertService.error(`${type} ${key} is required`);
        return false;
      }
    }

 
    if (!emailRegex.test(data.email)) {
      AlertService.error(`${type} Email is invalid`);
      return false;
    }

     if (!pincodeRegex.test(data.pincode)) {
      AlertService.error(`${type} Pincode must be 5 or 6 digits`);
      return false;
    }


    return true;
  };

  if (!checkFields(billing, "Billing")) return false;
  if (!sameAsBilling && !checkFields(shipping, "Shipping")) return false;

  return true;
};

const placeOrder = () => {
  if (!validateForm()) return;


  useOrderStore.getState().setOrder(billing, shipping);


  router.push("/payment");
};




  return (
    <>
      <Header />
      <OtherBanner
        page_title="Checkout"
        banner_image="/assets/images/bg/furniture_banner.jpg"
      />

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold mb-4 text-center">Checkout</h2>
          <div className="row g-5">
            {/* Billing and Shipping Forms */}
            <div className="col-lg-7">
              <div className="bg-white p-4 shadow rounded-4 mb-4">
                <h5 className="fw-semibold mb-3">Billing Information</h5>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        First Name <Required />
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={billing.firstName}
                        className="form-control"
                 
                        onChange={handleChange("billing")}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Last Name <Required />
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={billing.lastName}
                        className="form-control"
        
                        onChange={handleChange("billing")}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">
                        Email <Required />
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={billing.email}
                        className="form-control"
                  
                        onChange={handleChange("billing")}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">
                        Phone <Required />
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={billing.phone}
                        className="form-control"
                    
                        onChange={handleChange("billing")}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">
                        Billing Address <Required />
                      </label>
                      <textarea
                        className="form-control"
                        name="address"
                        value={billing.address}
                        rows="3"
          
                        onChange={handleChange("billing")}
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <label className="form-label">
                        PIN Code <Required />
                      </label>
                      <input
                        type="text"
                        value={billing.pincode}
                        name="pincode"
                        className="form-control"
                      
                        onChange={handleChange("billing")}
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-white p-4 shadow rounded-4">
                <h5 className="fw-semibold mb-3">Shipping Information</h5>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="sameAddress"
                    checked={sameAsBilling}
                    onChange={handleCheckbox}
                  />
                  <label className="form-check-label" htmlFor="sameAddress">
                    Shipping address is the same as billing address
                  </label>
                </div>

                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        First Name <Required />
                      </label>
                      <input
                        name="firstName"
                        type="text"
                        value={shipping.firstName}
                        className="form-control"
                  
                        readOnly={sameAsBilling}
                        onChange={handleChange("shipping")}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Last Name <Required />
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={shipping.lastName}
                        className="form-control"
                
                        readOnly={sameAsBilling}
                        onChange={handleChange("shipping")}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">
                        Email <Required />
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={shipping.email}
                        className="form-control"
                      
                        readOnly={sameAsBilling}
                        onChange={handleChange("shipping")}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">
                        Phone <Required />
                      </label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={shipping.phone}
                
                        readOnly={sameAsBilling}
                        onChange={handleChange("shipping")}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">
                        Shipping Address <Required />
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        name="address"
                        value={shipping.address}
         
                        readOnly={sameAsBilling}
                        onChange={handleChange("shipping")}
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <label className="form-label">
                        PIN Code <Required />
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={shipping.pincode}
                        className="form-control"
              
                        readOnly={sameAsBilling}
                        onChange={handleChange("shipping")}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-5">
              <div className="bg-white p-4 shadow rounded-4">
                <h5 className="fw-semibold mb-3">Order Summary</h5>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Price ({orderSummary.items} {orderSummary.items === 1 ? "item" : "items"})</span>
                    <strong>${orderSummary.totalAmount}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between text-muted">
                    <span>Shipping</span>
                    <span>Free</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between fw-bold fs-5">
                    <span>Total</span>
                    <span className="text-success">${orderSummary.totalAmount}</span>
                  </li>
                </ul>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Payment Method</label>
                  <select className="form-select">
                    <option>Credit/Debit Card</option>
                  </select>
                </div>

                <button
                  className="btn btn-danger w-100 py-2 fw-semibold rounded-3 mt-4"
                   onClick={placeOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Checkout;
