import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import ProductCategory from '@/models/ProductCategory';

// Get all products
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
};

// POST - Create a new product
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      gallery,
      price,
      city,
      state,
      categoryId,
      shortDesc,
    } = body;

    if (!title || !price || !categoryId || !gallery || !gallery.length) {
      return NextResponse.json(
        { error: "title, price, categoryId, and at least one gallery image are required" },
        { status: 400 }
      );
    }

    const category = await ProductCategory.findById(categoryId);
    if (!category) {
      return NextResponse.json({ error: "Invalid categoryId" }, { status: 400 });
    }

    const newProduct = await Product.create({
      title,
      image: gallery[0],   // First image as main display image
      gallery,
      price,
      city,
      state,
      category: categoryId,
      shortDesc,
    });

    return NextResponse.json({ msg: "Product added successfully", product: newProduct }, { status: 201 });

  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
