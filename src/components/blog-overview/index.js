"use client"
import React, { useEffect, useState } from 'react'
import AddNewBlog from '../add-new-blog';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const initialBlogData = {
  title: '',
  description:'',
}
const BlogOverview = ({blogList}) => {
  const [openDialog,setOpenDialog] = useState(false);
  const [loading,setLoading] = useState(false);
  const [blogData,setBlogData] = useState(initialBlogData);
  const [currentEdit, setCurrentEdit] = useState(null);
  const router = useRouter();
  useEffect(()=>{
    router.refresh();
},[])
  const handleSubmitData = async ()=>{
    try {
      setLoading(true);
      const response = currentEdit ? await fetch("/api/update-blog",{
        method:"PUT",
        body: JSON.stringify({
          ...blogData,
          id:currentEdit
        })
      }) : await fetch("/api/add-blog",{
        method:"POST",
        body: JSON.stringify(blogData),
      })
      const result = await response.json();
      if(result?.success){
        setBlogData(initialBlogData);
        setLoading(false);
        setOpenDialog(false);
        setCurrentEdit(null);
        router.refresh();
      }
      else{
        setLoading(false);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogData(initialBlogData);
    }
  }
   async function handleDeletebyId(id){
    try {
      const response = await fetch(`/api/delete-blog?id=${id}`,{
        method:"DELETE"
      });
      const result= await response.json();
      if(result?.success){
       router.refresh(); 
      }else{
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleEdit(blog){
    try {
      setOpenDialog(true);
      setBlogData({title:blog?.title,description:blog?.description});
      setCurrentEdit(blog._id);

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <div className='lex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-purple-700 to-blue-800 text-white'>
      <AddNewBlog openDialog={openDialog} setOpenDialog={setOpenDialog} loading={loading} setLoading={setLoading} blogData={blogData} setBlogData={setBlogData} handleSubmitData={handleSubmitData} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit}/>
      <div className='w-full'>
        <h1 className='text-4xl font-bold'>Blogs</h1>
        <div className='w-[85%] mx-auto flex justify-center flex-wrap gap-4 '>
          {
            blogList && blogList.length > 0 ? blogList.map((blog)=>{
              return <Card className='flex flex-col justify-center gap-4 m-6 py-6 px-10'>
              <h3 className='text-slate-950 text-2xl font-bold'>{blog?.title}</h3>
              <p className=' text-gray-500 text-md '>{blog?.description}</p>
              <div className='flex gap-4'>
                <Button onClick={()=>{handleEdit(blog)}}>Edit</Button>
                <Button onClick={()=>handleDeletebyId(blog._id)}>Delete</Button>
              </div>
            </Card>
            })
            : <h1 className='text-white'>No Blogs Available</h1>
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default BlogOverview