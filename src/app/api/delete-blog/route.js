import connectToDB from "@/database"
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function DELETE(req){
    try {
        await connectToDB();
        const {searchParams} = new URL(req.url);
        const getCurrentBlogId = searchParams.get("id");
        if(!getCurrentBlogId){
            return NextResponse.json({
                success:false,
                message:"BLOG ID REQUIRED",
            })  
        }
        const deletedBlog = await Blog.findByIdAndDelete(getCurrentBlogId);
        if(deletedBlog){
            return NextResponse.json({
                success:true,
                message:"BLOG DELETED SUCCESSFULLY",
            });
        }
        else{
            return NextResponse.json({
                success:false,
                message:"BLOG NOT FOUND",
            })
        }
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"SOMETHING WENT WRONG",
        })  
    }
}