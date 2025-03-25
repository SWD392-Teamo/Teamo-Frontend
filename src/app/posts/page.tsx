"use client";
import { getData } from "@/actions/postAction";
import { CreatePostPopup } from "@/components/posts/CreatePostPopup";
import PostCard from "@/components/posts/PostCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParamsStore } from "@/hooks/useParamsStore";
import { usePostStore } from "@/hooks/usePostStore";
import { useLoading } from "@/providers/LoadingProvider";
import { Post } from "@/types";
import queryString from "query-string";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/shallow";

export default function Listings() {
  const { showLoading, hideLoading } = useLoading();
  const [selectedGroup, setSelectedGroup] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const data = usePostStore(
    useShallow((state) => ({
      posts: state.posts,
      totalCount: state.totalCount,
      pageSize: state.pageSize,
    }))
  );

  const posts = data.posts.filter(p => p.status === "Posted")
  console.log("Post:", posts)

  const setData = usePostStore((state) => state.setData);
  const resetParams = useParamsStore((state) => state.reset);

  useEffect(() => {
    showLoading();
    resetParams();
    getData()
      .then((data) => {
        console.log("data", data);
        setData(data);
      })

      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }, [setData, showLoading, hideLoading]);

  console.log(data);

  const groups = [
    { id: 0, name: 'All' },
    ...posts.reduce((acc, post) => {
      const existingGroup = acc.find(g => g.id === post.groupId);
      if (!existingGroup) {
        acc.push({ 
          id: post.groupId, 
          name: post.groupName 
        });
      }
      return acc;
    }, [] as {id: number, name: string}[])
  ];


  // Filter posts by selected group
  const filteredPosts = selectedGroup && selectedGroup.id !== 0
    ? posts.filter(post => post.groupId === selectedGroup.id)
    : posts;

  const handleGroupSelect = (value: string) => {
    const groupId = parseInt(value, 10);
    const group = groups.find(g => g.id === groupId) || null;
    setSelectedGroup(group);
  };

  return (
    <div className="space-y-4">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Group Posts</h1>
      </header>

      <div className="flex items-center space-x-4">
        <Select 
          onValueChange={handleGroupSelect}
          value={selectedGroup ? selectedGroup.id.toString() : undefined}

        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a group" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {groups.map((group) => (
              <SelectItem 
                key={group.id} 
                value={group.id.toString()}
                className="text-lg"
              >
                {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedGroup && selectedGroup.id !== 0 && (
          <CreatePostPopup 
            groupId={selectedGroup.id} 
            groupName={selectedGroup.name}
            onPostCreated={() => {
              // Optional: Refresh posts or update state
            }}
          />
        )}
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}

        {/* No Posts Message */}
        {posts.length === 0 && (
          <p className="text-center text-gray-500">
            {selectedGroup && selectedGroup.id !== 0
              ? `No posts found for ${selectedGroup.name}` 
              : 'No posts available'}
          </p>
        )}
      </div>
    </div>
  );
}
