"use client"
import { getData } from "@/actions/postAction";
import PostCard from "@/components/posts/PostCard";
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
  const [visibleMajors, setVisibleMajors] = useState<number>(6);
  const [search, setSearch] = useState<string>("");


  const params = useParamsStore(
    useShallow((state) => ({
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
      // search: state.search,
    }))
  );

  const data = usePostStore(
    useShallow((state) => ({
      posts: state.posts,
      totalCount: state.totalCount,
      pageSize: state.pageSize,
    }))
  );

  const setData = usePostStore((state) => state.setData);
  const resetParams = useParamsStore((state) => state.reset);

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      ...params,
      ...(search.trim() ? { search } : {}),
    },
  });

  useEffect(() => {
    showLoading();
    resetParams();
    getData().then((data) => {
      console.log("data", data);
      setData(data);
    })
    .catch((error) => {
      toast.error(error.status + ' ' + error.message);
    })
    .finally(() => {
      hideLoading();
    });
  }, [url, setData, showLoading, hideLoading]);

  console.log(data);

  return (
    <div className="">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Group Posts</h1>
      </header>

      {data.posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
