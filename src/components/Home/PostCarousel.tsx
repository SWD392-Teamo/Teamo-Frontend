import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Heart, FileText, Users } from 'lucide-react';

type Post = { 
  id: number, 
  groupId: number, 
  groupName: string, 
  studentId: number, 
  groupMemberName: string, 
  groupMemberImgUrl: string, 
  content: string, 
  status: string, 
  documentUrl: string, 
  createdAt: string, 
  updatedAt: string, 
  totalLike: number, 
}

const samplePosts: Post[] = [
  {
    id: 1,
    groupId: 101,
    groupName: "Software Engineering",
    studentId: 1001,
    groupMemberName: "John Doe",
    groupMemberImgUrl: "/api/placeholder/40/40",
    content: "Looking for teammates for our final year project on AI and Machine Learning",
    status: "Open",
    documentUrl: "",
    createdAt: "2024-03-25T10:30:00Z",
    updatedAt: "2024-03-25T10:30:00Z",
    totalLike: 5
  },
  {
    id: 2,
    groupId: 102,
    groupName: "Data Science",
    studentId: 1002,
    groupMemberName: "Jane Smith",
    groupMemberImgUrl: "/api/placeholder/40/40",
    content: "Need 2 more members for our data visualization project",
    status: "Recruiting",
    documentUrl: "https://example.com/project-details",
    createdAt: "2024-03-24T15:45:00Z",
    updatedAt: "2024-03-24T15:45:00Z",
    totalLike: 3
  }
];

const PostCarousel: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(samplePosts);

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Team Recruitment Posts</h2>
      
      <Carousel className="w-full">
        <CarouselContent>
          {posts.map((post) => (
            <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="h-full flex flex-col">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <img 
                    src={post.groupMemberImgUrl} 
                    alt={post.groupMemberName} 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <CardTitle className="text-lg">{post.groupMemberName}</CardTitle>
                    <p className="text-xs text-muted-foreground">{post.groupName}</p>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <p className="text-sm mb-4">{post.content}</p>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="secondary">{post.status}</Badge>
                  </div>
                  
                  {post.documentUrl && (
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <a 
                        href={post.documentUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-blue-600 hover:underline"
                      >
                        View Project Details
                      </a>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="flex justify-between items-center border-t pt-2">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{post.totalLike}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(post.createdAt)}
                  </span>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default PostCarousel;