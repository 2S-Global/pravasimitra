import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Address from "../../../../../models/Address";
import { withAuth } from "../../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

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

  const { billing, shipping } = data;

  if (!billing || !shipping) {
    return addCorsHeaders(
      NextResponse.json(
        { error: "Billing or shipping info missing" },
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

    const saved = await newAddress.save();

    return addCorsHeaders(
      NextResponse.json(
        {
          message: "Address saved successfully",
          addressId: saved._id,
          address: saved,
        },
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("Error saving address:", err);
    return addCorsHeaders(
      NextResponse.json({ error: "Server error" }, { status: 500 })
    );
  }
});
