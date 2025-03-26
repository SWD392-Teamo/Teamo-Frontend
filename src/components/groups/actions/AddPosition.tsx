import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Briefcase, Check, ChevronsUpDown, Plus, X } from 'lucide-react';
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
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Skill } from '@/types';
import { getAllSkills } from '@/actions/skillActions';
import toast from 'react-hot-toast';
import { createGroupPosition } from '@/actions/groupActions';
import { addGroupPositions } from '@/types/interface';

const positionFormSchema = z.object({
  name: z.string().min(1, { message: "Position name is required" }),
  count: z.number().min(1, { message: "Count must be at least 1" }),
  skillIds: z.array(z.number()).min(1, { message: "At least one skill is required" }),
});

export const AddPositionDialog: React.FC<{ groupId: number }> = ({ groupId }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof positionFormSchema>>({
    resolver: zodResolver(positionFormSchema),
    defaultValues: {
      name: "",
      count: 1,
      skillIds: [],
    },
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const allSkills = await getAllSkills();
        setSkills(allSkills);
      } catch (error:any) {
        console.error("Failed to fetch skills:", error);
        toast.error(error.message);
      }
    };

    fetchSkills();
  }, []);

  const getSkillNames = (skillIds: number[]) => {
    return skillIds.map(id => {
      const skill = skills.find(s => s.id === id);
      return skill ? skill.name : `Skill ${id}`;
    });
  };

  const onSubmit = async (data: z.infer<typeof positionFormSchema>) => {
    setIsLoading(true);
    try {
      const position: addGroupPositions = {
        name: data.name,
        count: data.count,
        skillIds: data.skillIds,
      };
      
      await createGroupPosition(groupId, position);
      toast.success("Position created successfully!");
      
      setOpen(false);
      form.reset();
    } catch (error:any) {
      console.error("Failed to create position:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => {
          e.preventDefault();
          setOpen(true);
        }}>
          <Briefcase className="mr-2 h-4 w-4" /> Add Position
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Position</DialogTitle>
          <DialogDescription>
            Create a new position for your group.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Positions</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={1} 
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormDescription>
                    How many people are needed for this position
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="skillIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Required Skills</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value.length && "text-muted-foreground"
                          )}
                        >
                          {field.value.length > 0
                            ? `${field.value.length} skills selected`
                            : "Select skills"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command className="bg-white">
                        <CommandInput placeholder="Search skills..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>No skills found.</CommandEmpty>
                          <CommandGroup>
                            {skills.map((skill) => (
                              <CommandItem
                                className="bg-white"
                                key={skill.id}
                                value={skill.name}
                                onSelect={() => {
                                  const currentSkills = field.value || [];
                                  const newSkills = currentSkills.includes(skill.id)
                                    ? currentSkills.filter((id) => id !== skill.id)
                                    : [...currentSkills, skill.id];

                                  field.onChange(newSkills);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value.includes(skill.id)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {skill.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                  
                  {/* Display selected skills */}
                  {field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {getSkillNames(field.value).map((skillName) => (
                        <Badge key={skillName} variant="secondary" className="flex items-center">
                          {skillName}
                          <button
                            type="button"
                            onClick={() => {
                              const skillId = skills.find(s => s.name === skillName)?.id;
                              if (skillId) {
                                field.onChange(field.value.filter(id => id !== skillId));
                              }
                            }}
                            className="ml-1 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Position"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};