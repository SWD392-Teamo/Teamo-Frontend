import React, { useState } from 'react';
import { Trash, AlertTriangle } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import { removeGroupPosition } from '@/actions/groupActions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { GroupPosition } from '@/types';

export const DeletePositionDialog: React.FC<{ groupId: number; positions: GroupPosition[], onComplete: () => void }> = ({ 
  groupId, 
  positions,
  onComplete
}) => {
  const [open, setOpen] = useState(false);
  const [selectedPositionId, setSelectedPositionId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Reset state when dialog closes
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setSelectedPositionId(null);
    }
  };

  const getPositionById = (id: number) => {
    return positions.find(position => position.id === id);
  };

  const handleDelete = async () => {
    if (!selectedPositionId) {
      toast.error("Please select a position to delete.");
      return;
    }

    setIsLoading(true);
    try {
      await removeGroupPosition(groupId, selectedPositionId);
      
      toast.success("Position deleted successfully!");
      
      setOpen(false);
      if (onComplete) onComplete();
    } catch (error: any) {
      console.error("Failed to delete position:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem 
          onSelect={(e) => {
            e.preventDefault();
            setOpen(true);
          }} 
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash className="mr-2 h-4 w-4" /> Delete Position
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Position</DialogTitle>
          <DialogDescription>
            Select a position to remove from your group.
          </DialogDescription>
        </DialogHeader>
        
        {positions.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No positions available to delete.
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="position-select">Select Position</Label>
                <Select 
                  onValueChange={(value) => {
                    setSelectedPositionId(parseInt(value));
                  }}
                >
                  <SelectTrigger id="position-select">
                    <SelectValue placeholder="Choose a position" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    {positions.map((position) => (
                      <SelectItem key={position.id} value={position.id.toString()}>
                        {position.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedPositionId && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription className="space-y-2">
                    <p>
                      Are you sure you want to delete <strong>{getPositionById(selectedPositionId)?.name}</strong>?
                    </p>
                    <p>
                      Count: {getPositionById(selectedPositionId)?.count} | 
                      Status: {getPositionById(selectedPositionId)?.status}
                    </p>
                    <p>
                      This action cannot be undone and may affect existing applications.
                    </p>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </>
        )}
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={!selectedPositionId || isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Position"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};