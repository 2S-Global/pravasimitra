import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import RoomContact from "../../../../../models/RoomContact";
import RoomItem from "../../../../../models/Room";
import User from "../../../../../models/User";
import nodemailer from "nodemailer";
import { withAuth } from "../../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";
import { decodeObjectId } from "../../../../../lib/idCodec";

export async function OPTIONS() {
  return optionsResponse();
}

export const POST = withAuth(async (req, authUser) => {
  await connectDB();
  let data;

  try {
    data = await req.json();
  } catch {
    return addCorsHeaders(
      NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    );
  }

  let { roomId, ownerId } = data;

  roomId = decodeObjectId(roomId);
  const userId = authUser.id;

  if (!roomId || !ownerId) {
    return addCorsHeaders(
      NextResponse.json({ error: "Missing fields" }, { status: 400 })
    );
  }

  try {
    const [user, owner, room] = await Promise.all([
      User.findById(userId),
      User.findById(ownerId),
      RoomItem.findById(roomId),
    ]);

    if (!user || !owner || !room) {
      return addCorsHeaders(
        NextResponse.json({ error: "Invalid references" }, { status: 404 })
      );
    }

    // ✅ Check if already contacted for the same room
    const existingContact = await RoomContact.findOne({
      userId,
      ownerId,
      roomId,
    });

    if (existingContact) {
      return addCorsHeaders(
        NextResponse.json(
          {
            msg: "You have already contacted the owner for this room.",
          },
          { status: 200 }
        )
      );
    }

    // ✅ Create new contact
    await RoomContact.create({ userId, ownerId, roomId });

    // Send email to owner
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Pravasi Mitra" <${process.env.EMAIL_USER}>`,
      to: owner.email,
      subject: `Rental Inquiry: ${room.title}`,
      html: `
        <p>Hello ${owner.name},</p>
        <p>${user.name} is interested in your room: <b>${room.title}</b>.</p>
        <p>Contact: <a href="mailto:${user.email}">${user.email}</a></p>
      `,
    });

    return addCorsHeaders(
      NextResponse.json(
        { msg: "You’ve successfully reached out to the owner." },
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("Contact Owner Error:", err);
    return addCorsHeaders(
      NextResponse.json({ error: "Server error" }, { status: 500 })
    );
  }
});
