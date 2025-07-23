import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';
import PriceRange from '../../../../../models/PriceRange';

/**
 * @description Fetch or Create Price Ranges
 * @route GET /api/rent-lease/price-range
 * @query ?action=true  => Creates default price ranges only if collection is empty
 * @success {object} 200 - Returns price range list
 * @error {object} 500 - On DB failure or internal error
 */

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");

  try {
    if (action === "true") {
      const existing = await PriceRange.find({});
      if (existing.length === 0) {
        const ranges = [
          { label: "$0 - $500", value: "0-500" },
          { label: "$500 - $1000", value: "500-1000" },
          { label: "$1000+", value: "1000+" },
        ];

        const result = await PriceRange.insertMany(ranges);
        return NextResponse.json(
          { msg: "Price ranges created successfully", priceRanges: result },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { msg: "Price ranges already exist", priceRanges: existing },
          { status: 200 }
        );
      }
    } else {
      const ranges = await PriceRange.find({}).sort({ value: 1 });

      return NextResponse.json(
        { msg: "Fetched price ranges", ranges },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Price range fetch/seed failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch or create price ranges" },
      { status: 500 }
    );
  }
}