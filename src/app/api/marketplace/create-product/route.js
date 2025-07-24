import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { connectDB } from "../../../../../lib/db";
import MarketProduct from "../../../../../models/MarketProduct";
import { withAuth } from "../../../../../lib/withAuth";
import { decodeObjectId } from "../../../../../lib/idCodec";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

// Handle preflight CORS
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
  const ingredients = form.getAll("ingredients") || [];
  const price = form.get("price");
  const shortDesc = form.get("shortDesc") || "";
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

  return { title, category, city, state, ingredients, price, shortDesc, description, images };
}

export const POST = withAuth(async function (req, user) {
  await connectDB();
  const userId = user?.id;

  let data;
  try {
    data = await parseFormData(req);
  } catch (err) {
    return addCorsHeaders(
      NextResponse.json({ error: err.message }, { status: 400 })
    );
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  const savedFilenames = [];

  const uploadDir = path.join(
    process.cwd(),
    "public/assets/images/e-marketplace"
  );
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  for (const file of data.images) {
    if (!allowedTypes.includes(file.mime)) {
      return addCorsHeaders(
        NextResponse.json(
          { error: "Only JPG, PNG, WEBP allowed" },
          { status: 200 }
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
    const newItem = await MarketProduct.create({
      title: data.title,
      images: savedFilenames,
      category: decodedCategoryId,
      city: data.city,
      state: data.state,
      ingredients: data.ingredients,
      price: parseFloat(data.price),
      shortDesc: data.shortDesc,
      description: data.description,
      createdBy: userId,
    });

    return addCorsHeaders(
      NextResponse.json({ msg: "Successfully Saved it", item: newItem }, { status: 200 })
    );
  } catch (err) {
    console.error("DB insert failed:", err);
    return addCorsHeaders(
      NextResponse.json({ error: "Database insert failed" }, { status: 500 })
    );
  }
});
