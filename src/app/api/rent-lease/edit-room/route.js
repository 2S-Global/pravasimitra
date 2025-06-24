import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { connectDB } from "../../../../../lib/db";
import RoomItem from "../../../../../models/Room";
import { withAuth } from "../../../../../lib/withAuth";
import RoomCategory from "../../../../../models/RoomCategory";
import User from "../../../../../models/User";
import { decodeObjectId } from "../../../../../lib/idCodec";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseFormData(req) {
  const form = await req.formData();

  const id = form.get("id");
  const title = form.get("title");
  const propertyType = form.get("propertyType");
  const roomSize = form.get("roomSize");
  const price = form.get("price");
  const description = form.get("description");
  const files = form.getAll("images");
  const existingImageRaw = form.get("existingImageRaw");
  const existingImages = existingImageRaw ? JSON.parse(existingImageRaw) : [];

  const images = await Promise.all(
    files.map(async (file) => {
      if (typeof file === "string") return null;
      const buffer = Buffer.from(await file.arrayBuffer());
      return {
        buffer,
        filename: file.name,
        mime: file.type,
      };
    })
  );

  return {
    id,
    title,
    propertyType,
    roomSize,
    price,
    description,
    newImages: images.filter(Boolean),
    existingImages,
  };
}

export const GET = withAuth(async (req, user) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  let id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ error: "Missing item ID" }, { status: 400 });

  try {
    id = decodeObjectId(id); 
  } catch {
    return NextResponse.json({ error: "Invalid encoded ID" }, { status: 400 });
  }

  try {
    const item = await RoomItem.findOne({ _id: id, createdBy: user.id })
      .populate("propertyType", "name")
      .populate("createdBy", "name")
      .lean();

    if (!item) {
      return NextResponse.json(
        { error: "Item not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ item }, { status: 200 });
  } catch (err) {
    console.error("GET single item error:", err);
    return NextResponse.json(
      { error: "Failed to fetch item" },
      { status: 500 }
    );
  }
});

export const PATCH = withAuth(async (req, user) => {
  await connectDB();

  let data;
  try {
    data = await parseFormData(req);
  } catch (err) {
    return NextResponse.json({ msg: "Invalid Form Data" }, { status: 400 });
  }

  const {
    id,
    title,
    propertyType,
    roomSize,
    price,
    description,
    newImages,
    existingImages,
  } = data;


  if (!id) {
    return NextResponse.json({ msg: "Missing item Id" }, { status: 200 });
  }

   let decodedId;
  try {
    decodedId = decodeObjectId(id);
  } catch {
    return NextResponse.json({ msg: "Invalid encoded ID" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  const savedFilenames = [...existingImages];

  const uploadDir = path.join(process.cwd(), "public/assets/images/rent-items");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  for (const file of newImages) {
    if (!allowedTypes.includes(file.mime)) {
      return NextResponse.json(
        { msg: "Only JPG,PNG,AVIF,WEBP Allowed" },
        { status: 200 }
      );
    }
    const newFilename = `${Date.now()}_${file.filename}`;
    const savePath = path.join(uploadDir, newFilename);

    try {
      fs.writeFileSync(savePath, file.buffer);
      savedFilenames.push(newFilename);
    } catch (err) {
      return NextResponse.json(
        { error: "Image upload failed" },
        { status: 500 }
      );
    }
  }

  try {
    const updated = await RoomItem.findByIdAndUpdate(
      { _id: decodedId, createdBy: user.id },
      {
        $set: {
          title,
          propertyType,
          roomSize,
          price: parseFloat(price),
          description,
          images: savedFilenames,
        },
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Item not found or unauthorized" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { msg: "Item updated successfully", item: updated },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: "Update failed" }, { status: 500 });
  }
});
