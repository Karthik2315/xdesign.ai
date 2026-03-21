import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export const POST = async(req:NextRequest) => {
  try {
    const {prompt} = await req.json();
    const {getUser} =  getKindeServerSession();
    const user = await getUser();
    if(!user) throw new Error("unAuthorized");
    if(!prompt) throw new Error("Missing Prompt")
    const userId = user.id;
    const project = await prisma.project.create({
      data : {
        userId,
        name : ""
      }
    })

    return NextResponse.json({
      success:true,
      data:project
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error:"Failed to create a project"
    },
  {
    status:500
  })
  }
}