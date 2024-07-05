import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})
export async function POST(req){
    try {
        console.log("hello");
        await connectToDB();
        const { title, description} = await req.json();
        const {error} = AddNewBlog.validate({
            title,
            description
        })

        if(error){
            return NextResponse.json({
                success:false,
                message:error.details[0].message
            })
        }

        const newBlog = await Blog.create({
            title,
            description
        })
        if(newBlog){
            return NextResponse.json({
                success:true,
                message:"Blog added successfully"
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"SOMETHING WENT WRONG WHILE ADDING BLOG",
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