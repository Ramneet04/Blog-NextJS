import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const editBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})
export async function PUT(req){
    try {
        const {id, title, description} =await req.json();
        console.log("iddddd->>>>>", id);
        const {error} = editBlog.validate({
            title,
            description
        })

        if(error){
            return NextResponse.json({
                success:false,
                message:error.details[0].message
            })
        };
        if(!id){
            return NextResponse.json({
                success:false,
                message:"Blog id is required"
            })
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id,{title,description},{new:true});
        if(updatedBlog){
        return NextResponse.json({
            success:true,
            message:"Blog updated successfully",
            data:updatedBlog
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