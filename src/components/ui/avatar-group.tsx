import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  limit?: number;
  children: React.ReactNode;
  showCount?: boolean;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ limit = 3, className, children, showCount = true, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleAvatars = limit ? childrenArray.slice(0, limit) : childrenArray;
    const remainingAvatars = childrenArray.length - visibleAvatars.length;

    return (
      <div
        ref={ref}
        className={cn("flex", className)}
        {...props}
      >
        <div className="flex -space-x-4">
          {visibleAvatars.map((child, index) => (
            <div 
              key={index} 
              className="relative inline-block" 
              style={{ zIndex: visibleAvatars.length - index }}
            >
              {child}
            </div>
          ))}
        </div>
        
        {showCount && remainingAvatars > 0 && (
          <div className="flex items-center justify-center -ml-2 z-10">
            <div className="h-10 w-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-medium">
              +{remainingAvatars}
            </div>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";