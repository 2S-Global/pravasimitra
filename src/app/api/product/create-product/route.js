import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { connectDB } from "../../../../../lib/db";
import Product from "../../../../../models/Product";
import ProductCategory from "../../../../../models/ProductCategory"; // For population
import { withAuth } from "../../../../../lib/withAuth";
import { decodeObjectId } from "../../../../../lib/idCodec";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

export const config = {
  api: { bodyParser: false },
};

async function parseFormData(req) {
  const form = await req.formData();

  const title = form.get("title");
  const category = form.get("category");
  const city = form.get("city");
  const state = form.get("state");
  const price = form.get("price");
  const shortDesc = form.get("shortDesc") || "";
  const description = form.get("description") || "";
  const files = form.getAll("images");

  const images = (
    await Promise.all(
      files.map(async (file) => {
        if (typeof file === "string") return null;
        const buffer = Buffer.from(await file.arrayBuffer());
        return {
          buffer,
          filename: file.name,
          mime: file.type,
        };
      })
    )
  ).filter(Boolean);

  return {
    title,
    category,
    city,
    state,
    price,
    shortDesc,
    description,
    images,
  };
}

export const POST = withAuth(async function (req, user) {
  await connectDB();
  const userId = user?.id;

  const baseImageUrl = `${process.env.IMAGE_URL}/product-items`; // ✅ must be defined before use

  let data;
  try {
    data = await parseFormData(req);
  } catch (err) {
    return addCorsHeaders(
      NextResponse.json({ error: err.message }, { status: 400 })
    );
  }

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"];
  const savedFilenames = [];

const uploadDir = path.join(process.cwd(), "public", "assets", "images", "product-items");

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  for (const file of data.images) {
    if (!file || !file.mime) {
      console.warn("Skipping invalid file:", file);
      continue;
    }

    if (!allowedTypes.includes(file.mime)) {
      return addCorsHeaders(
        NextResponse.json(
          { error: "Only JPG, PNG, WEBP, AVIF allowed" },
          { status: 400 }
        )
      );
    }

    const newFilename = `${Date.now()}_${file.filename}`;
    const savePath = path.join(uploadDir, newFilename);

    try {
      fs.writeFileSync(savePath, file.buffer);
      savedFilenames.push(newFilename);
    } catch (err) {
      console.error("Image save failed:", err);
      return addCorsHeaders(
        NextResponse.json({ error: "Image upload failed" }, { status: 500 })
      );
    }
  }

  let decodedCategoryId;
  try {
    decodedCategoryId = decodeObjectId(data.category);
  } catch (error) {
    return addCorsHeaders(
      NextResponse.json({ error: "Invalid category ID" }, { status: 400 })
    );
  }

  try {
    const newProduct = await Product.create({
      title: data.title,
      category: decodedCategoryId,
      city: data.city,
      state: data.state,
      price: parseFloat(data.price),
      shortDesc: data.shortDesc,
      description: data.description,
      image: savedFilenames[0] || null,
      gallery: savedFilenames,
      createdBy: userId,
    });

    return addCorsHeaders(
      NextResponse.json(
        {
          msg: "Product added successfully",
          product: {
            id: newProduct._id,
            title: newProduct.title,
            category: data.category,
            price: newProduct.price,
            city: newProduct.city,
            state: newProduct.state,
            shortDesc: newProduct.shortDesc,
            description: newProduct.description,
            image: newProduct.image,
            gallery: newProduct.gallery.map((img) => `${img}`),
            createdBy: userId,
          },
        },
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("DB insert failed:", err);
    return addCorsHeaders(
      NextResponse.json({ error: "Database insert failed" }, { status: 500 })
    );
  }
});
