import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash, AlertCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { GroupMember } from "@/types";
import { removeMember } from "@/actions/groupActions";
import { getUserId } from "@/actions/userActions";

interface RemoveMemberDialogProps {
  groupId: number;
  members: GroupMember[];
  onMemberRemoved?: () => void;
}

export const RemoveMemberDialog: React.FC<RemoveMemberDialogProps> = ({
  groupId,
  members,
  onMemberRemoved,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<GroupMember | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmRemoval, setConfirmRemoval] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const userId = await getUserId();
        setCurrentUserId(userId);
      } catch (error) {
        console.error("Error fetching current user ID:", error);
      }
    };
    
    fetchCurrentUserId();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSelectedMember(null);
      setConfirmRemoval(false);
    }
  }, [isOpen]);

  const handleMemberSelect = (memberId: number) => {
    const member = members.find((m) => m.studentId === memberId);
    setSelectedMember(member || null);
    setConfirmRemoval(false);
  };

  const memberHasPositions = (member: GroupMember | null): boolean => {
    return (
      !!member && Array.isArray(member.positions) && member.positions.length > 0
    );
  };
  
  const isCurrentUser = (member: GroupMember | null): boolean => {
    return !!member && !!currentUserId && member.studentId === currentUserId;
  };
  
  const canRemoveMember = (member: GroupMember | null): boolean => {
    return !!member && 
      !memberHasPositions(member) && 
      !isCurrentUser(member);
  };

  const handleConfirmRemoval = () => {
    if (!selectedMember) return;

    if (memberHasPositions(selectedMember)) {
      toast.error("Cannot remove member with positions.");
      return;
    }
    
    if (isCurrentUser(selectedMember)) {
      toast.error("Cannot remove current user.");
      return;
    }

    setConfirmRemoval(true);
  };

  const handleRemoveMember = async () => {
    if (!selectedMember) return;

    setIsSubmitting(true);

    try {
      await removeMember(groupId, selectedMember.studentId);
      
      toast.success("Member removed successfully!");
      
      if (onMemberRemoved) {
        onMemberRemoved();
      }
      
      setIsOpen(false);
    } catch (error:any) {
      console.error('Error removing member:', error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash className="mr-2 h-4 w-4" /> Remove Member
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove Member</DialogTitle>
          <DialogDescription>
            Select a member to remove from your group.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          {/* Member selection */}
          <div className="space-y-2">
            <Label htmlFor="member-select">Select Member</Label>
            <Select
              value={selectedMember?.studentId.toString() || ""}
              onValueChange={(value) => handleMemberSelect(parseInt(value))}
            >
              <SelectTrigger id="member-select">
                <SelectValue placeholder="Select a member" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {members.map((member) => {
                  const hasPositions = memberHasPositions(member);
                  const isSelf = isCurrentUser(member);
                  const disabled = hasPositions || isSelf;
                  
                  return (
                    <SelectItem
                      key={member.studentId}
                      value={member.studentId.toString()}
                      disabled={disabled}
                    >
                      <div className="flex items-center">
                        {member.studentName}
                        {hasPositions && (
                          <span className="ml-2 text-xs text-red-500">
                            (Has positions)
                          </span>
                        )}
                        {isSelf && (
                          <span className="ml-2 text-xs text-red-500">
                            (You)
                          </span>
                        )}
                        {member.role === "Leader" && !isSelf && !hasPositions && (
                          <span className="ml-2 text-xs text-amber-500">
                            (Leader)
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {selectedMember && (
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Selected Member</h3>
              <p className="mb-1">
                <span className="font-medium">Name:</span>{" "}
                {selectedMember.studentName}
                {isCurrentUser(selectedMember) && (
                  <span className="ml-2 text-xs text-red-500">
                    (This is you)
                  </span>
                )}
              </p>
              <p className="mb-1">
                <span className="font-medium">Email:</span>{" "}
                {selectedMember.studentEmail}
              </p>
              <p className="mb-1">
                <span className="font-medium">Role:</span> {selectedMember.role}
              </p>

              {memberHasPositions(selectedMember) ? (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-700">
                      Cannot Remove
                    </p>
                    <p className="text-sm text-red-600">
                      This member has the following positions:
                      <span className="font-medium">
                        {" "}
                        {selectedMember.positions.join(", ")}
                      </span>
                    </p>
                    <p className="text-sm text-red-600 mt-1">
                      Please update their positions first before removing them.
                    </p>
                  </div>
                </div>
              ) : isCurrentUser(selectedMember) ? (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-700">Cannot Remove Yourself</p>
                    <p className="text-sm text-red-600">
                      You cannot remove yourself from the group.
                    </p>
                    <p className="text-sm text-red-600 mt-1">
                      If you want to leave the group, please ask another member with appropriate permissions to remove you.
                    </p>
                  </div>
                </div>
              ) : selectedMember.role === "Leader" ? (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-700">Removing a Leader</p>
                    <p className="text-sm text-amber-600">
                      You are about to remove a group leader. This may affect group management.
                    </p>
                    <p className="text-sm text-amber-600 mt-1">
                      Please ensure another leader is available to manage the group.
                    </p>
                  </div>
                </div>
              ) : confirmRemoval ? (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm font-medium text-red-700">
                    Confirm Removal
                  </p>
                  <p className="text-sm text-red-600">
                    Are you sure you want to remove {selectedMember.studentName}{" "}
                    from the group? This action cannot be undone.
                  </p>
                </div>
              ) : null}
            </div>
          )}

          {members.length === 0 && (
            <div className="p-4 text-center text-gray-500 border rounded-md">
              No members available to remove.
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          {selectedMember && !confirmRemoval && (
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmRemoval}
              disabled={!canRemoveMember(selectedMember) || isSubmitting}
            >
              Confirm Removal
            </Button>
          )}

          {selectedMember && confirmRemoval && (
            <Button
              type="button"
              variant="destructive"
              onClick={handleRemoveMember}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove Member"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};