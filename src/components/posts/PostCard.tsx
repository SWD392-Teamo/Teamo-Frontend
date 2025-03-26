"use client";
import { Post } from "@/types";
import React, { useState } from "react";
import { MoreHorizontal, FileText, Maximize } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import DateConverter from "../commons/DateConvert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { VisuallyHidden } from "radix-ui";

// Helper function to determine file type
const getFileTypeFromFirebaseUrl = (
  url: string
): "image" | "document" | "unknown" => {
  if (!url) return "unknown";

  const imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "svg",
    "bmp",
    "tiff",
    "jfif",
    "heic",
    "heif",
    "raw",
    "ico",
  ];

  try {
    const parsedUrl = new URL(url);

    const pathParts = parsedUrl.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];

    const filenameParts = decodeURIComponent(lastPart).split(".");
    const extension = filenameParts[filenameParts.length - 1].toLowerCase();

    if (imageExtensions.includes(extension)) {
      return "image";
    }

    return "document";
  } catch (error) {
    console.warn("Failed to parse Firebase URL:", url);
    return "unknown";
  }
};

const PostCard: React.FC<Post> = ({
  groupMemberName,
  groupMemberImgUrl,
  createdAt,
  groupName,
  content,
  documentUrl,
  status,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusBadge = () => {
    switch (status) {
      case "Posted":
        return { variant: "default", text: "Posted" };
      case "Edited":
        return { variant: "destructive", text: "Edited" };
      default:
        return { variant: "secondary", text: status };
    }
  };

  const statusBadge = getStatusBadge();

  // Determine file type
  const fileType = documentUrl
    ? getFileTypeFromFirebaseUrl(documentUrl)
    : "unknown";

  return (
    <div>
      <Card className="w-full mx-16 my-8">
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

        <CardContent className="p-8">
          <p className="text-lg text-foreground whitespace-pre-line">
            {content}
          </p>

          {documentUrl && (
            <div className="mt-4">
              {fileType === "image" ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="w-full rounded-lg overflow-hidden relative cursor-pointer group">
                      <img
                        src={documentUrl}
                        alt="Attached Image"
                        className="w-full object-cover max-h-[500px]"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="bg-white/70"
                        >
                          <Maximize className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[90%] max-h-[90%] w-auto h-auto p-0">
                    <VisuallyHidden.Root>
                      <DialogTitle>Full-size Image</DialogTitle>
                    </VisuallyHidden.Root>
                    <DialogDescription>
                      <img
                        src={documentUrl}
                        alt="Full Size Image"
                        className="max-w-full max-h-full object-contain"
                      />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              ) : fileType === "document" ? (
                <div className="bg-secondary/50 rounded-lg p-3 flex items-center">
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
              ) : null}
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t p-4">
          <Badge variant={statusBadge.variant as any} >{statusBadge.text}</Badge>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;
