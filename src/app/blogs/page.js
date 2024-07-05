import BlogOverview from '@/components/blog-overview'
import React from 'react'

async function fetchBlogs(){
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-blogs",{
      method:GET,
      cache: "no-store"
    })
    const blogs = await apiResponse.json()
    return blogs?.data
  } catch (error) {
    // throw new Error(error);
    console.log("ERROORORR");
  }
}
const Blogs = async () => {
  const blogList = fetchBlogs();
  console.log(blogList);
  return (
    <BlogOverview/>
  )
}

export default Blogs