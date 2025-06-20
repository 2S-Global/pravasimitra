import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';
import Product from '../../../../../models/Product';
import ProductCategory from '../../../../../models/ProductCategory';
import path from 'path';
import fs from 'fs';

// GET all products
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId');

    const query = categoryId ? { category: categoryId } : {};

    const products = await Product.find(query)
      .populate('category', 'name')
      .select('-__v')
      .lean();

    return NextResponse.json({ products });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST - Create a new product with image upload
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get('title');
    const price = formData.get('price');
    const city = formData.get('city');
    const state = formData.get('state');
    const categoryId = formData.get('categoryId');
    const shortDesc = formData.get('shortDesc');
    const galleryFiles = formData.getAll('gallery');

    if (!title || !price || !categoryId || !galleryFiles.length) {
      return NextResponse.json(
        { error: "title, price, categoryId, and at least one gallery image are required" },
        { status: 400 }
      );
    }

    const category = await ProductCategory.findById(categoryId);
    if (!category) {
      return NextResponse.json({ error: "Invalid categoryId" }, { status: 400 });
    }

    const uploadedImageNames = [];
    for (const file of galleryFiles) {
      if (!file || !file.name) continue;

      const ext = path.extname(file.name);
      const random = Math.floor(1000 + Math.random() * 9000);
      const imageName = `prd_${random}${ext}`;

      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public", "buy-sell", "products");
      await fs.promises.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, imageName);
      await fs.promises.writeFile(filePath, buffer);

      uploadedImageNames.push(imageName);
    }

    const newProduct = await Product.create({
      title,
      image: uploadedImageNames[0], // use first image as main
      gallery: uploadedImageNames,
      price,
      city,
      state,
      category: categoryId,
      shortDesc,
    });

    return NextResponse.json(
      { msg: "Product added successfully", product: newProduct },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}