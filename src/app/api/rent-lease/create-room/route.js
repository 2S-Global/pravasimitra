import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import {connectDB} from "../../../../../lib/db";
import RoomItem from "../../../../../models/Room";
import { withAuth } from "../../../../../lib/withAuth";
import RoomCategory from "../../../../../models/RoomCategory";
import User from "../../../../../models/User";

export const config = {
  api: { bodyParser: false },
};


async function parseFormData(req) {
  const form = await req.formData();

  const title = form.get("title");
  const propertyType = form.get("propertyType");
  const roomSize = form.get("roomSize");
  const price = form.get("price");
  const description = form.get("description") || "";
  const files = form.getAll("images");



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

  return { title, propertyType, roomSize, price, description, images };
}

export const POST=withAuth(async function (req,user) {
  await connectDB();
    const userId = user?.id;
  let data;
  try {
    data = await parseFormData(req);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp","image/avif"];
  const savedFilenames = [];

  const uploadDir = path.join(process.cwd(), "public/assets/images/rent-items");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  for (const file of data.images) {
    if (!allowedTypes.includes(file.mime)) {
      return NextResponse.json({ error: "Only JPG, PNG, WEBP allowed" }, { status: 200 });
    }

    const newFilename = `${Date.now()}_${file.filename}`;
    const savePath = path.join(uploadDir, newFilename);

    try {
      fs.writeFileSync(savePath, file.buffer);
      savedFilenames.push(newFilename);
    } catch (err) {
      console.error("Image save failed:", err);
      return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
    }
  }

  try {
    const newItem = await RoomItem.create({
      title: data.title,
      images: savedFilenames,
      propertyType: data.propertyType,
      roomSize: data.roomSize,
      price: parseFloat(data.price),
      description: data.description,
      createdBy:userId
    });

    return NextResponse.json({ msg: "Successfully Saved it", item: newItem }, { status: 200 });
  } catch (err) {
    console.error("DB insert failed:", err);
    return NextResponse.json({ error: "Database insert failed" }, { status: 500 });
  }
})



