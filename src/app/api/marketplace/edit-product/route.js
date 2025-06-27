import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { connectDB } from "../../../../../lib/db";
import MarketProduct from "../../../../../models/MarketProduct";
import { withAuth } from "../../../../../lib/withAuth";
import MarketCategory from "../../../../../models/MarketCategory";
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
  const category = form.get("category");
  const price = form.get("price");
  const description = form.get("description") || "";
  const files = form.getAll("images");
  const existingImageRaw = form.get("existingImageRaw");
  
  let existingImages = [];
  if (existingImageRaw) {
    try {
      existingImages = JSON.parse(existingImageRaw);
    } catch {
      existingImages = existingImageRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

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
    category,
    price,
    description,
    newImages: images.filter(Boolean),
    existingImages,
  };
}


/**
 * @description Handle single MarketProduct item fetch and update (only for authenticated users)
 *
 * @route GET /api/marketplace/edit-product
 * @queryparam {string} id - Encoded MarketProduct ID
 * @success {object} 200 - Returns the MarketProduct data
 * @error {object} 400 - Missing or invalid ID
 * @error {object} 404 - Item not found or unauthorized
 * @error {object} 500 - Server error
 *
 * @route PATCH /api/marketplace/edit-product
 * @formdata {string} id - Encoded MarketProduct ID
 * @formdata {string} title - Product title
 * @formdata {string} category - Encoded category ID
 * @formdata {number} price - Product price
 * @formdata {string} description - Product description (optional)
 * @formdata {string} existingImageRaw - JSON array or comma-separated list of existing image filenames
 * @formdata {File[]} images - New image files to upload
 * @success {object} 200 - Item updated successfully
 * @error {object} 400 - Invalid form data or ID
 * @error {object} 404 - Item not found or unauthorized
 * @error {object} 500 - Image upload or database update failure
 */

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
    const item = await MarketProduct.findOne({ _id: id, createdBy: user.id })
      .populate("category", "name")
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

  const { id, title, category, price, description, newImages, existingImages } =
    data;

    console.log(data);

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

  const uploadDir = path.join(
    process.cwd(),
    "public/assets/images/e-marketplace"
  );
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
    const updated = await MarketProduct.findByIdAndUpdate(
      { _id: decodedId, createdBy: user.id },
      {
        $set: {
          title,
          category,
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
