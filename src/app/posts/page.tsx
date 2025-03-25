import PostCard from "@/components/posts/PostCard";
import { Post } from "@/types";

export default function Listings() {
  const posts: Post[] = [
    {
      id: 1,
      groupId: 1,
      groupName: "YACK",
      studentId: 1,
      groupMemberName: "Khánh Ngô",
      groupMemberImgUrl: "https://example.com/avatar.jpg",
      content:
        "Here's the meeting summary from today. We agreed to focus on improving the UI for our prototype and also refining the user flow based on the feedback we received.",
      status: "Posted",
      documentUrl: "/meeting-notes.pdf",
      createdAt: "Mar 23, 2025",
      updatedAt: "Mar 23, 2025",
    },
    // Add more posts following the same structure
  ];

  return (
    <div className="">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Group Posts</h1>
      </header>

      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
