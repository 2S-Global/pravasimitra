import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Address from "../../../../models/Address";
import { withAuth } from "../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../lib/cors";
import Cart from "../../../../models/Cart";
import Order from "../../../../models/Order";


export async function OPTIONS() {
  return optionsResponse();
}




export const GET=withAuth(async(req,user)=>{
    await connectDB();
    try{
        const orders=await Order.find({userId:user.id});
        if(!orders || orders.length===0){
            return addCorsHeaders(
                NextResponse.json({error:"No orders found"},{status:404})
            );
        }
    }
    catch(err){
        return addCorsHeaders(
            NextResponse.json({error:"Error fetching orders"},{status:500})
        );
    }
})