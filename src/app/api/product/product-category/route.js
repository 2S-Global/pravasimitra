import { connectDB } from "../../../../../lib/db";
import ProductCategory from "../../../../../models/ProductCategory";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// 🟢 GET all product categories (not soft-deleted)
export async function GET() {
  try {
    await connectDB();

    const categories = await ProductCategory.find({ is_del: false })
      .sort({ createdAt: -1 })
      .lean();

    if (!categories || categories.length === 0) {
      return NextResponse.json(
        { msg: "No product categories found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { msg: "Product categories fetched successfully", categories },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch product categories",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// 🟡 POST: Create a new product category with image upload
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name");
    const file = formData.get("image"); // this is a Blob (File)

    let imageName = "";

    if (file && file.name) {
      const ext = path.extname(file.name);
      const random = Math.floor(1000 + Math.random() * 9000);
      imageName = `cat_${random}${ext}`;

      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(
        process.cwd(),
        "public",
        "buy-sell",
        "product_category"
      );

      // Ensure the directory exists
      await fs.promises.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, imageName);
      await fs.promises.writeFile(filePath, buffer);
    }

    const newCategory = await ProductCategory.create({
      name,
      image: imageName,
      is_del: false,
    });

    return NextResponse.json(
      {
        msg: "Product category created successfully",
        category: newCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      {
        error: "Failed to create product category",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
