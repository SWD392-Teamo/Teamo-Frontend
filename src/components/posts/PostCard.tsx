"use client";
import { Post } from "@/types";
import React, { useState } from "react";
import { MoreHorizontal, FileText } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import DateConverter from "../commons/DateConvert";

const PostCard: React.FC<Post> = ({
  groupMemberName,
  groupMemberImgUrl,
  createdAt,
  groupName,
  content,
  documentUrl,
  status,
}) => {
  // Extract initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div>
      <Card className="w-full mx-10 my-8">
        <CardHeader className="flex flex-row items-center space-x-4 border-b">
          <Avatar>
            <AvatarImage src={groupMemberImgUrl} alt={groupMemberName} />
            <AvatarFallback>{getInitials(groupMemberName)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold text-xl">{groupMemberName}</div>
            <div className="text-sm text-muted-foreground flex items-center">
              <span>
                <DateConverter isoDate={createdAt} />
              </span>
              <span className="mx-2">•</span>
              <Badge variant="secondary">{groupName}</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <p className="text-lg text-foreground whitespace-pre-line">
            {content}
          </p>

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
          <Badge variant={status === "Posted" ? "default" : "outline"}>
            {status}
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;
