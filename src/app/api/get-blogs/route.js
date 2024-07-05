import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        await connectToDB();
        const response = await Blog.find({});
        if(response){
            console.log(response);
            return NextResponse.json({
                data:response,
                success:true
        });
        }
        else{
            return NextResponse.json({
                success:false,
                message:"SOMETHING WENT WRONG",
            })   
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"SOMETHING WENT WRONG",
        })   
    }
}