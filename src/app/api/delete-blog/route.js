import connectToDB from "@/database"
import Blog from "@/models/blog";


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
        const deletedBlog = await Blog.findOneAndDelete(getCurrentBlogId);
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