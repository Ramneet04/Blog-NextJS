"use client"
import React, { useState } from 'react'
import AddNewBlog from '../add-new-blog';

const initialBlogData = {
  title: '',
  description:'',
}
const BlogOverview = () => {
  const [openDialog,setOpenDialog] = useState(false);
  const [loading,setLoading] = useState(false);
  const [blogData,setBlogData] = useState(initialBlogData);
  const handleSubmitData = async ()=>{
    try {
      setLoading(true);
      const response = await fetch("/api/add-blog",{
        method:"POST",
        body: JSON.stringify(blogData),
      })
      const result = await response.json();
      if(result?.success){
        setBlogData(initialBlogData);
        setLoading(false);
        setOpenDialog(false);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogData(initialBlogData);
    }
  }
  return (
    <>
    <div className='lex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-purple-700 to-blue-800 text-white'>
      <AddNewBlog openDialog={openDialog} setOpenDialog={setOpenDialog} loading={loading} setLoading={setLoading} blogData={blogData} setBlogData={setBlogData} handleSubmitData={handleSubmitData}/>

    </div>
    </>
  )
}

export default BlogOverview