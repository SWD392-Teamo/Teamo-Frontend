import { getAllUsers } from "@/actions/userActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GroupPosition, User } from "@/types";
import { addGroupMembers } from "@/types/interface";
import { Loader2, Search, UserPlusIcon } from "lucide-react";
import { JSX, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AddMembersStepProps {
  onSubmit: (data: addGroupMembers) => Promise<boolean>;
  onSkip: () => void;
  onBack: () => void;
  groupPositions: GroupPosition[];
  isSubmitting: boolean;
}

const AddMembersStep: React.FC<AddMembersStepProps> = ({
  onSubmit,
  onSkip,
  onBack,
  groupPositions,
  isSubmitting,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Debounced search function
  const debouncedSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setUsers([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const result = await getAllUsers(`?search=${query}`);
      setUsers(result.data);

      if (result.data.length === 0) {
        setSearchError("No users found matching your search");
      }
    } catch (error) {
      console.error("Error searching for users:", error);
      setSearchError("Error searching for users. Please try again.");
      toast.error("Failed to search for users");
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  // Search users effect with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(searchQuery);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearch]);

  // Validate form on change
  useEffect(() => {
    setIsFormValid(selectedUser !== null && selectedPositions.length > 0);
  }, [selectedUser, selectedPositions]);

  // Handle position selection
  const handlePositionSelect = (positionId: number) => {
    setSelectedPositions((prev) => {
      // Check if already selected
      if (prev.includes(positionId)) {
        // Remove if already selected
        return prev.filter((id) => id !== positionId);
      } else {
        // Add if not selected
        return [...prev, positionId];
      }
    });
  };

  // Handle submit
  const handleSubmit = async (): Promise<void> => {
    if (!isFormValid || !selectedUser) return;

    // Ensure position IDs are properly formatted as numbers
    const positionIds = selectedPositions.map((id) => Number(id));

    const memberData: addGroupMembers = {
      studentId: selectedUser.id,
      groupPositionIds: positionIds,
    };

    console.log("Submitting member data:", memberData);

    try {
      const success = await onSubmit(memberData);
      if (success) {
        // Reset form state
        setSelectedUser(null);
        setSelectedPositions([]);
        // Don't reset search query to improve UX - allow the user to continue searching
      }
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Failed to add member");
    }
  };

  // Helper to highlight matching text
  const highlightMatch = (text: string, query: string): JSX.Element => {
    if (!query || query.length < 2) return <>{text}</>;

    try {
      const regex = new RegExp(`(${query})`, "gi");
      const parts = text.split(regex);

      return (
        <>
          {parts.map((part, index) =>
            regex.test(part) ? (
              <span key={index} className="bg-yellow-200">
                {part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </>
      );
    } catch (e) {
      // Fallback for any regex issues
      return <>{text}</>;
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Add Members (Optional)</CardTitle>
        <CardDescription className="text-xl">
          Add members to your group or skip this step
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
                {users.map((user) => (
                  <div
                    key={user.id}
                    className={`p-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between ${
                      selectedUser?.id === user.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div>
                      <div className="font-medium">
                        {highlightMatch(
                          `${user.firstName} ${user.lastName}`,
                          searchQuery
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedUser(user);
                      }}
                    >
                      Select
                    </Button>
                  </div>
                ))}
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
          {selectedUser && groupPositions.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xl">Select Positions</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {groupPositions.map((position) => (
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
                Selected {selectedPositions.length} of {groupPositions.length}{" "}
                positions
              </p>
            </div>
          )}

          {/* For debugging - show selected positions */}
          {selectedPositions.length > 0 && (
            <div className="text-xs text-gray-500">
              Selected position IDs: {selectedPositions.join(", ")}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <div className="space-x-2">
              <Button type="button" variant="default" onClick={onSkip}>
                Skip
              </Button>
              <Button
                type="button"
                disabled={!isFormValid || isSubmitting}
                onClick={handleSubmit}
              >
                <UserPlusIcon className="mr-2 h-4 w-4" />
                {isSubmitting ? "Adding..." : "Add Member"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddMembersStep;
