"use client"
import React from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
const AddNewBlog = ({openDialog, setOpenDialog,loading,setLoading,blogData,setBlogData,handleSubmitData,currentEdit,setCurrentEdit}) => {
  return (
    <div>
        <div>
        <Button onClick={()=>{setOpenDialog(true)}} >Add New Blog</Button>
      </div>
      <Dialog open={openDialog} onOpenChange={()=>{setOpenDialog(false); setBlogData({title:"",description:""}); setCurrentEdit(null)}}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{currentEdit ? "Edit Blog" : "Add New Blog" }</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              name="title"
              id="title"
              className="col-span-3"
              placeholder="Enter title"
              value={blogData.title}
              onChange={(e)=> setBlogData({
                ...blogData,
                title:e.target.value
              })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input
              name="description"
              id="description"
              placeholder="Enter description"
              value={blogData.description}
              className="col-span-3"
              onChange={(e)=> setBlogData({
                ...blogData,
                description:e.target.value
              })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmitData} type="button">
            {
                loading? 'Saving Changes...' :  'Save Changes'

            }
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default AddNewBlog