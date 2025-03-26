import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Settings, UserCheck, Loader2 } from 'lucide-react';
import { Group, GroupMember, GroupPosition } from '@/types';
import toast from 'react-hot-toast';
import { editMember } from '@/types/interface';
import { updateMember } from '@/actions/groupActions';

interface UpdateMemberDialogProps {
  group: Group;
  onMemberUpdated?: () => void;
}

export const UpdateMemberDialog: React.FC<UpdateMemberDialogProps> = ({ 
  group,
  onMemberUpdated 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<GroupMember | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('Member');
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setSelectedMember(null);
      setSelectedRole('Member');
      setSelectedPositions([]);
    }
  }, [isOpen]);

  // Update form when member is selected
  useEffect(() => {
    if (selectedMember) {
      setSelectedRole(selectedMember.role);
      
      // Convert position names to IDs by matching with available positions
      if (selectedMember.positions && Array.isArray(selectedMember.positions)) {
        const positionIds = selectedMember.positions.map(posName => {
          const foundPosition = group.groupPositions.find(pos => pos.name === posName);
          return foundPosition ? foundPosition.id : -1;
        }).filter(id => id !== -1);
        
        setSelectedPositions(positionIds);
      } else {
        // If positions is undefined or not an array, set empty array
        setSelectedPositions([]);
      }
    }
  }, [selectedMember, group.groupPositions]);

  // Handle member selection
  const handleMemberSelect = (memberId: number) => {
    const member = group.groupMembers.find(m => m.studentId === memberId);
    setSelectedMember(member || null);
  };

  // Handle position selection
  const handlePositionSelect = (positionId: number) => {
    setSelectedPositions(prev => 
      prev.includes(positionId)
        ? prev.filter(id => id !== positionId)
        : [...prev, positionId]
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedMember) {
      toast.error("Please select a member to update.");
      return;
    }

    if (selectedPositions.length === 0) {
      toast.error("Please select at least one position.");
      return;
    }

    setIsSubmitting(true);

    try {
      const memberData: editMember = {
        role: selectedRole,
        groupPositionIds: selectedPositions
      };

      await updateMember(group.id, selectedMember.studentId, memberData);
      
      toast.success("Member updated successfully!");
      
      if (onMemberUpdated) {
        onMemberUpdated();
      }
      
      setIsOpen(false);
    } catch (error: any) {
      console.error('Error updating member:', error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPositionNameById = (id: number): string => {
    const position = group.groupPositions.find(p => p.id === id);
    return position ? position.name : '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}>
          <Settings className="mr-2 h-4 w-4" /> Update Member
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Update Group Member</DialogTitle>
          <DialogDescription>
            Update roles or positions for members in {group.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          {/* Member selection */}
          <div className="space-y-2">
            <Label htmlFor="member-select">Select Member</Label>
            <Select 
              value={selectedMember?.studentId.toString() || ''} 
              onValueChange={(value) => handleMemberSelect(parseInt(value))}
            >
              <SelectTrigger id="member-select">
                <SelectValue placeholder="Select a member" />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                {group.groupMembers.map((member) => (
                  <SelectItem 
                    key={member.studentId} 
                    value={member.studentId.toString()}
                  >
                    {member.studentName} ({member.studentEmail})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedMember && (
            <>
              {/* Role selection */}
              <div className="space-y-2">
                <Label htmlFor="role-select">Member Role</Label>
                <Select 
                  value={selectedRole} 
                  onValueChange={setSelectedRole}
                >
                  <SelectTrigger id="role-select">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    <SelectItem value="Leader">Leader</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Position selection */}
              <div className="space-y-2">
                <Label className="text-md">Select Positions</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {group.groupPositions.map((position) => (
                    <div
                      key={position.id}
                      className={`border rounded-md p-3 cursor-pointer ${
                        selectedPositions.includes(position.id)
                          ? "bg-blue-100 border-blue-500"
                          : ""
                      }`}
                      onClick={() => handlePositionSelect(position.id)}
                    >
                      <div className="font-medium">{position.name}</div>
                      <div className="text-sm">
                        {position.count} position{position.count > 1 ? "s" : ""}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Selected {selectedPositions.length} of {group.groupPositions.length}{" "}
                  positions
                </p>
              </div>

              {/* Current selections summary */}
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Current Selections</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium">Member:</p>
                    <p className="text-sm">{selectedMember.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Role:</p>
                    <p className="text-sm">{selectedRole}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium">Positions:</p>
                    <p className="text-sm">
                      {selectedPositions.length > 0 
                        ? selectedPositions.map(id => getPositionNameById(id)).join(', ')
                        : "None selected"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={!selectedMember || selectedPositions.length === 0 || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};