import React, { useState } from 'react';
import { MoreHorizontal, ThumbsUp, Paperclip, FileText } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export type Post = {
   id: number;
   groupId: number;
   groupName: string;
   studentId: number;
   groupMemberName: string;
   groupMemberImgUrl: string;
   content: string;
   status: string;
   documentUrl: string;
   createdAt: string;
   updatedAt: string;
}

const PostCard: React.FC<Post> = ({
   groupMemberName,
   groupMemberImgUrl,
   createdAt,
   groupName,
   content,
   documentUrl,
   status
}) => {
   // Extract initials for avatar fallback
   const getInitials = (name: string) => {
       return name.split(' ').map(n => n[0]).join('').toUpperCase();
   };

   return (
       <Card className="w-full">
           <CardHeader className="flex flex-row items-center space-x-4 border-b">
               <Avatar>
                   <AvatarImage src={groupMemberImgUrl} alt={groupMemberName} />
                   <AvatarFallback>{getInitials(groupMemberName)}</AvatarFallback>
               </Avatar>
               <div className="flex-1">
                   <div className="font-semibold">{groupMemberName}</div>
                   <div className="text-sm text-muted-foreground flex items-center">
                       <span>{createdAt}</span>
                       <span className="mx-2">•</span>
                       <Badge variant="secondary">{groupName}</Badge>
                   </div>
               </div>
               <Button variant="ghost" size="icon">
                   <MoreHorizontal className="h-4 w-4" />
               </Button>
           </CardHeader>
           
           <CardContent className="p-4">
               <p className="text-sm text-foreground whitespace-pre-line">{content}</p>
               
               {documentUrl && (
                   <div className="mt-4 bg-secondary/50 rounded-lg p-3 flex items-center">
                       <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                       <a 
                           href={documentUrl} 
                           className="text-primary hover:underline text-sm font-medium"
                           target="_blank"
                           rel="noopener noreferrer"
                       >
                           View Document
                       </a>
                   </div>
               )}
           </CardContent>
           
           <CardFooter className="border-t">
               <Badge variant={status === 'Posted' ? 'default' : 'outline'}>
                   {status}
               </Badge>
           </CardFooter>
       </Card>
   );
};

const PostCarousel: React.FC = () => {
   const posts: Post[] = [
       {
           id: 1,
           groupId: 1,
           groupName: 'YACK',
           studentId: 1,
           groupMemberName: 'Khánh Ngô',
           groupMemberImgUrl: 'https://example.com/avatar.jpg',
           content: 'Here\'s the meeting summary from today. We agreed to focus on improving the UI for our prototype and also refining the user flow based on the feedback we received.',
           status: 'Posted',
           documentUrl: '/meeting-notes.pdf',
           createdAt: 'Mar 23, 2025',
           updatedAt: 'Mar 23, 2025'
       },
       // Add more posts following the same structure
   ];

   return (
       <div className="container max-w-xl mx-auto px-4 py-6">
           <header className="flex justify-between items-center mb-6">
               <h1 className="text-2xl font-bold">Group Posts</h1>
           </header>
           
           {posts.map(post => (
               <PostCard key={post.id} {...post} />
           ))}
       </div>
   );
};

export default PostCarousel;