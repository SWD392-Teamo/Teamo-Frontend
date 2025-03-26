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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { UserPlus, Search, Loader2 } from 'lucide-react';
import { Group, User } from '@/types';
import { getAllUsers } from '@/actions/userActions';
import toast from 'react-hot-toast';
import { addGroupMembers } from '@/types/interface';
import { addMember } from '@/actions/groupActions';

export const AddMemberDialog: React.FC<{ group: Group }> = ({ group }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setUsers([]);
      setSelectedUser(null);
      setSelectedPositions([]);
      setSearchError('');
    }
  }, [isOpen]);

  const isUserAlreadyMember = (userId: number) => {
    return group.groupMembers.some(member => member.studentId === userId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length <= 1) {
      setUsers([]);
      setSearchError('');
      return;
    }

    const timeoutId = setTimeout(() => {
      searchUsers(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const searchUsers = async (query: string) => {
    setIsSearching(true);
    setSearchError('');

    try {
      const response = await getAllUsers(`?search=${query}`);

      setUsers(response.data);
      
      if (response.data.length === 0) {
        setSearchError('No users found');
      }
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchError('Failed to search users. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query || query.length <= 1) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => 
      regex.test(part) ? <span key={i} className="bg-yellow-200">{part}</span> : part
    );
  };

  const handlePositionSelect = (positionId: number) => {
    setSelectedPositions(prev => 
      prev.includes(positionId)
        ? prev.filter(id => id !== positionId)
        : [...prev, positionId]
    );
  };

  const handleSubmit = async () => {
    if (!selectedUser) {
      toast.error("Please select a user to add.");
      return;
    }

    if (selectedPositions.length === 0) {
      toast.error("Please select at least one position.");
      return;
    }

    if (isUserAlreadyMember(selectedUser.id)) {
      toast.error(`${selectedUser.firstName} ${selectedUser.lastName} is already a member of the group.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const memberData: addGroupMembers = {
        studentId: selectedUser.id,
        groupPositionIds: selectedPositions
      };

      await addMember(group.id, memberData);
      
      toast.success("Member added successfully!");
      
      setIsOpen(false);
    } catch (error) {
      console.error('Error adding member:', error);
      toast.error("Failed to add member. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}>
          <UserPlus className="mr-2 h-4 w-4" /> Add Member
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Member to {group.name}</DialogTitle>
          <DialogDescription>
            Search for a user and assign them to positions in your group.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          {/* Search for users */}
          <div className="space-y-2">
            <Label className="text-xl">Search for users</Label>
            <div className="relative">
              <Input
                className="text-xl pl-10"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {isSearching ? (
                  <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
                ) : (
                  <Search className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
            {searchQuery.length === 1 && (
              <p className="text-sm text-gray-500">
                Type at least 2 characters to search
              </p>
            )}
          </div>

          {/* User search results */}
          {searchError && !isSearching && searchQuery.length > 1 && (
            <div className="p-4 text-center text-gray-500 border rounded-md">
              {searchError}
            </div>
          )}

          {users.length > 0 && !isSearching && (
            <div className="border rounded-md">
              <div className="p-2 bg-gray-50 font-medium">
                Search Results ({users.length})
              </div>
              <div className="divide-y max-h-64 overflow-y-auto">
                {users.map((user) => {
                  const isAlreadyMember = isUserAlreadyMember(user.id);
                  return (
                    <div
                      key={user.id}
                      className={`p-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between ${
                        selectedUser?.id === user.id ? "bg-blue-50" : ""
                      } ${isAlreadyMember ? "opacity-50" : ""}`}
                      onClick={() => !isAlreadyMember && setSelectedUser(user)}
                    >
                      <div>
                        <div className="font-medium">
                          {highlightMatch(
                            `${user.firstName} ${user.lastName}`,
                            searchQuery
                          )}
                          {isAlreadyMember && (
                            <span className="ml-2 text-xs text-red-500">
                              (Already a member)
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {highlightMatch(user.email, searchQuery)}
                        </div>
                        {user.code && (
                          <div className="text-xs text-gray-400">
                            Code: {user.code}
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={isAlreadyMember}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isAlreadyMember) {
                            setSelectedUser(user);
                          }
                        }}
                      >
                        {isAlreadyMember ? "Member" : "Select"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Loading state */}
          {isSearching && searchQuery.length > 1 && (
            <div className="p-4 text-center text-gray-500 border rounded-md flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Searching for users...
            </div>
          )}

          {/* Selected user */}
          {selectedUser && (
            <div className="p-4 border rounded-md bg-blue-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Selected User</h3>
                  <p>
                    {selectedUser.firstName} {selectedUser.lastName} (
                    {selectedUser.email})
                  </p>
                  {selectedUser.code && (
                    <p className="text-sm text-gray-600">
                      Code: {selectedUser.code}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedUser(null)}
                >
                  Change
                </Button>
              </div>
            </div>
          )}

          {/* Position selection */}
          {selectedUser && group.groupPositions.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xl">Select Positions</Label>
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
            disabled={!selectedUser || selectedPositions.length === 0 || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Member'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};