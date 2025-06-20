import { connectDB } from "../../../../../lib/db";
import ProductCategory from "../../../../../models/ProductCategory";
import { NextResponse } from "next/server";
import formidable from "formidable";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { Readable } from "stream";

// To disable Next.js body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// 📦 Convert the Next.js Web Request to Node.js stream
async function getReadableStreamFromRequest(request) {
  const buffer = await request.arrayBuffer();
  const readable = Readable.from(Buffer.from(buffer));
  return readable;
}

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

// 🟡 POST: Create new product category with image
export async function POST(req) {
  await connectDB();

  const form = formidable({ multiples: false, keepExtensions: true });

  return new Promise(async (resolve, reject) => {
    try {
      const stream = await getReadableStreamFromRequest(req);

      form.parse(stream, async (err, fields, files) => {
        if (err) {
          console.error("Form parse error:", err);
          reject(
            NextResponse.json({ error: "Error parsing form data" }, { status: 500 })
          );
          return;
        }

        const name = fields.name;
        let imageName = "";

        if (files.image) {
          const image = files.image[0];
          const ext = path.extname(image.originalFilename);
          imageName = `${uuidv4()}${ext}`;
          const uploadPath = path.join(
            process.cwd(),
            "public",
            "buy-sell",
            "product_category",
            imageName
          );

          await fs.promises.mkdir(path.dirname(uploadPath), { recursive: true });
          await fs.promises.rename(image.filepath, uploadPath);
        }

        const newCategory = await ProductCategory.create({
          name,
          image: imageName,
          is_del: false,
        });

        resolve(
          NextResponse.json(
            {
              msg: "Product category created successfully",
              category: newCategory,
            },
            { status: 201 }
          )
        );
      });
    } catch (error) {
      console.error("Unhandled error:", error);
      reject(
        NextResponse.json(
          {
            error: "Unhandled error during upload",
            details: error.message,
          },
          { status: 500 }
        )
      );
    }
  });
}
