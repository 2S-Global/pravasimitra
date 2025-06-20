import { withAuth } from "../../../../../lib/withAuth";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import User from "../../../../../models/User";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { IncomingForm } from "formidable";
import { Readable } from "stream";

// ============ [GET] User Profile ============ //
export const GET = withAuth(async (req, user) => {
  try {
    await connectDB();

    const userId = user?.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ msg: "Invalid User Id" }, { status: 200 });
    }

    const existingUser = await User.findById(userId).select("image").lean();

    if (!existingUser) {
      return NextResponse.json({ msg: "User Not Found" }, { status: 200 });
    }
    return NextResponse.json(
      {
        msg: "User Fetched Succesfully",
        image: existingUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

// ============ [PUT] Update Profile ============ //

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readFormDataFileStream(req) {
  const boundary = req.headers.get("content-type")?.split("boundary=")?.[1];
  if (!boundary) throw new Error("Invalid multipart form boundary");

  const formData = await req.formData();
  const file = formData.get("image");

  if (!file || typeof file === "string") {
    throw new Error("No image file found in form data");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  return {
    buffer,
    filename: file.name,
    type: file.type,
  };
}

export const PUT = withAuth(async (req, user) => {
  await connectDB();
  const userId = user?.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  let fileData;
  try {
    fileData = await readFormDataFileStream(req);
  } catch (err) {
    console.error("Image parsing error:", err);
    return NextResponse.json(
      { error: "Image parsing failed" },
      { status: 400 }
    );
  }

  const { buffer, filename, type } = fileData;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(type)) {
    return NextResponse.json(
      { error: "Only JPG, PNG, and WEBP allowed" },
      { status: 400 }
    );
  }

  const ext = path.extname(filename);
  const newFileName = `${userId}_${Date.now()}${ext}`;
  const uploadDir = path.join(
    process.cwd(),
    "public/assets/images/profile-img"
  );

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, newFileName);

  try {
    fs.writeFileSync(filePath, buffer);
  } catch (err) {
    console.error("Failed to save file:", err);
    return NextResponse.json(
      { error: "Failed to save image" },
      { status: 500 }
    );
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { image: newFileName } },
      { new: true }
    )
      .select("image -_id")
      .lean();

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      msg: "Profile image updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("MongoDB update error:", err);
    return NextResponse.json({ error: "DB update failed" }, { status: 500 });
  }
});
