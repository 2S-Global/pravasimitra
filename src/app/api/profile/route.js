import { withAuth } from "../../../../lib/withAuth";
import { NextResponse } from "next/server";

export const GET = withAuth(async (req, user) => {
  const userId = user.id; 


  return NextResponse.json({ message: "Authenticated", userId });
});
