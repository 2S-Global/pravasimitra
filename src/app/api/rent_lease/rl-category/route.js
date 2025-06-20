import { connectDB } from "../../../../../lib/db";
import RLcategory from "../../../../../models/RLcategory";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";


// Get all Rent & Lease categories (not soft-deleted)
export async function GET() {
    try {
        await connectDB();

        const categories = await RLcategory.find({is_del: false }).sort({  createdAT: -1}).lean();

        if (!categories || categories.length === 0) {
            return NextResponse.json(
                { msg: "No Rent & Lease categories found" },
                { status: 404}
            );
        }

        return NextResponse.json(
            { msg: "Rent & Lease categories fetched successfully", categories },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to fetch Rent & Lease categories",
                details: error.message,
            },
            { status: 500 }
        );
    }
}

// POST: Create a new Rent & Lease category with image upload
export async function POST(req) {
    try {
        await connectDB();

        const formData = await req.formData();

        const name = formData.get("name");
        const file = formData.get("image");

        let imageName = "";

        if (file && file.name) {
            const ext = path.extname(file.name);
            const random = Math.floor(1000 + Math.random() * 9000);
            imageName = `cat_${random}${ext}`;

            const buffer = Buffer.from(await file.arrayBuffer());
            const uploadDir = path.join(
                process.cwd(),
                "public",
                "assets",
                "rent-lease",
                "rl_category"
            );

            // Ensure the upload directory exists
            await fs.promises.mkdir(uploadDir, { recursive: true });
            
            const filePath = path.join(uploadDir, imageName);
            await fs.promises.writeFile(filePath, buffer);
        }

        const newCategory = await RLcategory.create({
            name,
            image: imageName,
            is_del: false,
        });

        return NextResponse.json(
            { msg: "Rent & Lease category created successfully", category: newCategory },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to create Rent & Lease category",
                details: error.message,
            },
            { status: 500 }
        );
    }
}
