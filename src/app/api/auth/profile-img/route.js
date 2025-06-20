import { withAuth } from "../../../../../lib/withAuth";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import User from "../../../../../models/User";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { IncomingForm } from "formidable";

// ============ [GET] User Profile ============ //
export const GET = withAuth(async (req, user) => {
  try {
    await connectDB();

    const userId = user?.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ msg: "Invalid User Id" }, { status: 200 });
    }

    const existingUser = await User.findById(userId).select("-__v").lean();

    if (!existingUser) {
      return NextResponse.json({ msg: "User Not Found" }, { status: 200 });
    }
    return NextResponse.json(
      {
        msg: "User Fetched Succesfully",
        status: existingUser,
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


export const PUT = withAuth(async (req, user) => {
  await connectDB();

  const userId = user?.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  // Parse multipart/form-data using formidable
  const form = new IncomingForm();
  form.uploadDir = "/tmp"; // Temp location
  form.keepExtensions = true;

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Formidable error:", err);
        return resolve(NextResponse.json({ error: "Image parsing failed" }, { status: 400 }));
      }

      const file = files.image;
      if (!file) {
        return resolve(NextResponse.json({ error: "No image uploaded" }, { status: 400 }));
      }

      // ✅ File type validation
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.mimetype)) {
        return resolve(NextResponse.json({ error: "Only JPG, PNG, and WEBP allowed" }, { status: 200 }));
      }

      const newFileName = `${userId}_${Date.now()}${path.extname(file.originalFilename)}`;
      const destination = path.join(process.cwd(), "public/assets/images/profile-img", newFileName);

      fs.rename(file.filepath, destination, async (err) => {
        if (err) {
          console.error("File saving error:", err);
          return resolve(NextResponse.json({ error: "Failed to save image" }, { status: 500 }));
        }

        try {
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { image: newFileName } },
            { new: true, runValidators: true }
          ).select("-__v").lean();

          if (!updatedUser) {
            return resolve(NextResponse.json({ error: "User not found" }, { status: 200 }));
          }

          return resolve(
            NextResponse.json(
              { msg: "Profile image updated successfully", user: updatedUser },
              { status: 200 }
            )
          );
        } catch (error) {
          console.error("MongoDB error:", error);
          return resolve(NextResponse.json({ error: "DB update failed" }, { status: 500 }));
        }
      });
    });
  });
});
