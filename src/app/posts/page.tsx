"use client";
import { getData } from "@/actions/groupActions";
import {  getPostByGroup, getPostData } from "@/actions/postAction";
import { CreatePostPopup } from "@/components/posts/CreatePostPopup";
import PostCard from "@/components/posts/PostCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { Group, Post } from "@/types";
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);


  const params = useParamsStore(
    useShallow((state) => ({
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
    }))
  );

  const setParams = useParamsStore((state) => state.setParams);
  const resetParams = useParamsStore((state) => state.reset);

  const data = usePostStore(
    useShallow((state) => ({
      posts: state.posts,
      totalCount: state.totalCount,
      pageSize: state.pageSize,
    }))
  );

  const setData = usePostStore((state) => state.setData);

  // Updated URL generation to include pageIndex and pageSize
  const url = queryString.stringifyUrl({
    url: "",
    query: {
      ...params,
      pageIndex: params.pageIndex,
      pageSize: params.pageSize,
    },
  });

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        showLoading();
        const groupQuery = queryString.stringifyUrl({
          url: '',
          query: {
            pageIndex: 1,
            pageSize: 100, // Adjust as needed
          },
        });
        
        const groupsResponse = await getData(groupQuery, true);
        setGroups([
          { 
            id: 0, 
            name: 'All', 
            title: 'All Groups', 
            semesterName: '',
            description: '',
            createdAt: '',
            createdByUserName: '',
            maxMember: 0,
            imgUrl: '',
            groupMembers: [],
            status: '',
            fieldName: '',
            subjectCode: '',
            totalMembers: 0,
            totalGroupPositions: 0,
            totalApplications: 0,
            groupPositions: [],
            applications: []
          },
          ...groupsResponse.data
        ]);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
        toast.error('Failed to load groups');
      } finally {
        hideLoading();
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    console.log("Fetching data with URL:", url);
    showLoading();

    const fetchMethod = selectedGroup && selectedGroup.id !== 0
      ? () => getPostByGroup(selectedGroup.id, url)
      : () => getPostData(url);

    fetchMethod()
      .then((responseData) => {
        console.log("Fetched Data:", responseData);
        setData(responseData);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        toast.error(error.message || "Failed to fetch posts");
      })
      .finally(() => {
        hideLoading();
      });
  }, [
    url,
    params.pageIndex,
    params.pageSize,
    selectedGroup,
    setData,
    showLoading,
    hideLoading,
  ]);

  useEffect(() => {
    const filteredPosts = data.posts.filter(
      (p) => p.status === "Posted" || p.status === "Edited"
    );
    console.log("filter posts:", filteredPosts);

    try {
      setPosts(filteredPosts);
      console.log("Posts set successfully", posts);
    } catch (error) {
      console.error("Error setting posts:", error);
    }
  }, [data.posts]);


  const filteredPosts = posts;

  const totalPages = Math.ceil(data.totalCount / params.pageSize);
  const startIndex = (params.pageIndex - 1) * params.pageSize;

  const handleGroupSelect = (value: string) => {
    const groupId = parseInt(value, 10);
    const group = groups.find((g) => g.id === groupId) || null;
    setSelectedGroup(group);
    setParams({ pageIndex: 1 });
  };

  const handlePageChange = (newPageIndex: number) => {
    console.log("Attempting to change page:", newPageIndex);

    const parsedPageIndex = Number(newPageIndex);

    if (
      !isNaN(parsedPageIndex) &&
      parsedPageIndex > 0 &&
      parsedPageIndex <= totalPages
    ) {
      setParams({ pageIndex: parsedPageIndex });
    } else {
      console.error("Invalid page index:", newPageIndex);
    }
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
              : "No posts available"}
          </p>
        )}
      </div>

      <div className="mb-auto">
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (params.pageIndex > 1)
                      handlePageChange(params.pageIndex - 1);
                  }}
                  className={
                    params.pageIndex === 1
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(index + 1);
                    }}
                    isActive={params.pageIndex === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (params.pageIndex < totalPages)
                      handlePageChange(params.pageIndex + 1);
                  }}
                  className={
                    params.pageIndex === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}