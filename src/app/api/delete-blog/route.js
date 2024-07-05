import connectToDB from "@/database"


export async function DELETE(req){
    try {
        await connectToDB();
        
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"SOMETHING WENT WRONG",
        })  
    }
}