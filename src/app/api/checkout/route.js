import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Address from "../../../../models/Address";
import { withAuth } from "../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../lib/cors";
import Cart from "../../../../models/Cart";
import Order from "../../../../models/Order";
import Counter from "../../../../models/Counter";
import nodemailer from "nodemailer";
import User from "../../../../models/User";
import MarketProduct from "../../../../models/MarketProduct";

export async function OPTIONS() {
  return optionsResponse();
}

export const POST = withAuth(async (req, user) => {
  await connectDB();

  let data;
  try {
    data = await req.json();
  } catch (err) {
    return addCorsHeaders(
      NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    );
  }

  const { billing, shipping, paymentMethod, transactionId } = data;

  if (!billing || !shipping || !paymentMethod) {
    return addCorsHeaders(
      NextResponse.json(
        { error: "Billing, shipping, or payment method missing" },
        { status: 400 }
      )
    );
  }

  try {
    const newAddress = new Address({
      userId: user.id,
      billing,
      shipping,
    });
    const savedAddress = await newAddress.save();

    // Fetch cart & populate products
    const cart = await Cart.findOne({ userId: user.id }).populate({
      path: "items.productId",
      model: "MarketProduct",
    });

    if (!cart || !cart.items || cart.items.length === 0) {
      return addCorsHeaders(
        NextResponse.json({ error: "Cart is empty" }, { status: 400 })
      );
    }

    let status = "pending";
    if (paymentMethod.toLowerCase() === "cash") {
      status = "pending";
    }

    let counter = await Counter.findOneAndUpdate(
      { name: "order" },
      { $inc: { value: 1 } },
      { new: true, upsert: true } // Create if doesn't exist
    );

    const formattedOrderId = `pravasi-${String(counter.value).padStart(
      4,
      "0"
    )}`;

    const newOrder = new Order({
      userId: user.id,
      orderId: formattedOrderId,
      addressId: savedAddress._id,
      transactionId: transactionId,
      paymentMethod,
      status,
      items: cart.items,
    });
    const savedOrder = await newOrder.save();

    // if (paymentMethod.toLowerCase() === "cash") {
    await Cart.deleteOne({ userId: user.id });
    //}

    // ------------------
    // 📧 SEND EMAILS
    // ------------------
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Build buyer's product list
    const buyerProductListHtml = cart.items
      .map(
        (p) => `
      <li>
        <b>${p.productId.title}</b> - ${p.quantity} ${p.productId.unit} @ £${p.productId.price}
      </li>
    `
      )
      .join("");

    // 1️⃣ Email Buyer
    await transporter.sendMail({
      from: `"Pravasi Mitra" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `Order Confirmation - ${formattedOrderId}`,
      html: `
          <p><img src="https://res.cloudinary.com/dwy9i2fqt/image/upload/v1755090539/Pravasi_Mitra_Logo_vwfvsb.png" alt="Pravasi Mitra" style="width:150px;"></p>
          <br>
          <p>Hello ${user.name},</p>
          <p>Your order Id: <b>${formattedOrderId}</b> has been placed successfully.</p>
          <p>Ordered Products:</p>
          <ul>${buyerProductListHtml}</ul>
          <p>We will notify you once it is processed.</p>
          <p>Thank you for shopping with Pravasi Mitra.</p>
        `,
    });

    // 2️⃣ Email Sellers (only their own products)
    const sellerIds = [
      ...new Set(cart.items.map((item) => item.productId.createdBy.toString())),
    ];

    const sellers = await User.find({ _id: { $in: sellerIds } });

    await Promise.all(
      sellers.map((seller) => {
        const sellerProducts = cart.items.filter(
          (item) =>
            item.productId.createdBy.toString() === seller._id.toString()
        );

        const productListHtml = sellerProducts
          .map(
            (p) => `
              <li>
                <b>${p.productId.title}</b> - ${p.quantity} ${p.productId.unit} @ £${p.productId.price}
              </li>
            `
          )
          .join("");

        return transporter.sendMail({
          from: `"Pravasi Mitra" <${process.env.EMAIL_USER}>`,
          to: seller.email,
          subject: `New Order Received - ${formattedOrderId}`,
          html: `
            <p><img src="https://res.cloudinary.com/dwy9i2fqt/image/upload/v1755090539/Pravasi_Mitra_Logo_vwfvsb.png" alt="Pravasi Mitra" style="width:150px;"></p>
            <br>
            <p>Hello ${seller.name},</p>
            <p>You have received a new order (<b>${formattedOrderId}</b>).</p>
            <p>Buyer: ${user.name} (${user.email})</p>
            <p>Ordered Products:</p>
            <ul>${productListHtml}</ul>
            <p>Please process the order at your earliest convenience.</p>
          `,
        });
      })
    );

    return addCorsHeaders(
      NextResponse.json(
        {
          message: "Order created successfully",
          id: savedOrder._id,
          orderId: savedOrder.orderId,
          addressId: savedAddress._id,
          order: savedOrder,
        },
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("Error saving address or order:", err);
    return addCorsHeaders(
      NextResponse.json({ error: "Server error" }, { status: 500 })
    );
  }
});
