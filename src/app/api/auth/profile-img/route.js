import { withAuth } from "../../../../../lib/withAuth";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import User from "../../../../../models/User";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { IncomingForm } from "formidable";

// ============ [GET] User Profile ============ //
export const GET = withAuth(async (req, user) => {
  try {
    await connectDB();

    const userId = user?.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ msg: "Invalid User Id" }, { status: 200 });
    }

    const existingUser = await User.findById(userId).select("-__v").lean();

    if (!existingUser) {
      return NextResponse.json({ msg: "User Not Found" }, { status: 200 });
    }
    return NextResponse.json(
      {
        msg: "User Fetched Succesfully",
        status: existingUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

// ============ [PUT] Update Profile ============ //

export const config = {
  api: {
    bodyParser: false,
  },
};


export const PUT = withAuth(async (req, user) => {
  try {
    await connectDB();
    const userId=user?.id;
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return NextResponse.json({msg:"Invalid User Id"},{status:200});
    }



    const form=new IncomingForm();
    form.uploadDir="./tmp";

    return new Promise((resolve,reject)=>{

        form.parse(req,async(err,fields,files)=>{
            if(err){
                return resolve(NextResponse.json({msg:"Image  parsing failed"},{status:200}));
            }

            const file=files.image;
            if(!file){
                return resolve(NextResponse.json({msg:"No Image Uploaded"},{status:200}));
            }
        })
    })

  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
});
