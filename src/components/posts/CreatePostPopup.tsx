"use client"

import { useState } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
// import { createPost } from "@/actions/postAction"
import toast from "react-hot-toast"

// Zod schema for post creation
const postSchema = z.object({
  content: z.string().min(10, { 
    message: "Content must be at least 10 characters long" 
  }).max(500, { 
    message: "Content must be less than 500 characters" 
  }),
  documentUrl: z.string().optional()
})

interface CreatePostPopupProps {
  groupId: number
  groupName: string
  onPostCreated?: () => void
}

export function CreatePostPopup({ 
  groupId, 
  groupName, 
  onPostCreated 
}: CreatePostPopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Initialize form with zod schema
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      documentUrl: ""
    }
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof postSchema>) {
    try {
      // Prepare post data
      const postData = {
        groupId,
        content: values.content,
        documentUrl: values.documentUrl || ""
      }

      // Call server action to create post
      // const result = await createPost(postData)

      // if (result) {
      //   toast.success("Post created successfully!")
      //   form.reset()
      //   setIsOpen(false)
      //   onPostCreated && onPostCreated()
      // } else {
      //   toast.error("Failed to create post")
      // }
    } catch (error) {
      console.error("Post creation error:", error)
      toast.error("An error occurred while creating the post")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create Post in {groupName}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Share your thoughts with the {groupName} group
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your post here..."
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="documentUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Attach a document URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create Post
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}