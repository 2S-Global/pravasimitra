import { connectDB } from "../../../../../lib/db";
import User from "../../../../../models/User";
import { signToken } from "../../../../../lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
 const {identifier,password}=await req.json();

 const user=await User.findOne(
  {$or:[{email:identifier},{mobile:identifier}],
  isDel:false}
).lean()

  if(!user){
    return NextResponse.json({msg:"Invalid Email or Mobile Number"},{status:200})
  }

 const isMatch=await bcrypt.compare(password,user.password);

 if(!isMatch){
  return NextResponse.json({msg:"Incorrect Password"},{status:200})
 }

  const token=signToken({
    id:user._id,
    name:user.name
  })

const res = NextResponse.json({ msg: `Welcome ${user.name}` });
  res.cookies.set("token",token,{
    httpOnly:true,
    secure:false,
    path:"/",
    maxAge:7*24*60*60

  })

  return res;
}
