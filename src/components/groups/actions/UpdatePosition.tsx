import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import {
  Edit,
  Check,
  ChevronsUpDown,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { getAllSkills } from "@/actions/skillActions";
import toast from "react-hot-toast";
import { Group, Skill } from "@/types";
import { editGroupPositions } from "@/types/interface";
import { updateGroupPosition } from "@/actions/groupActions";

const positionStatusOptions = [
  { value: "Open", label: "Open" },
  { value: "Closed", label: "Closed" },
  { value: "Deleted", label: "Deleted" },
];

const positionSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: "Position name is required" }),
  count: z.number().min(1, { message: "Count must be at least 1" }),
  status: z.string().optional(),
  skillIds: z.array(z.number().optional()),
});

const updatePositionsSchema = z.object({
  positions: z.array(positionSchema),
});

export const UpdatePositionsDialog: React.FC<{ group: Group, onComplete?: () => void }> = ({
  group,
  onComplete
}) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedPosition, setExpandedPosition] = useState<string | null>(null);

  const form = useForm<z.infer<typeof updatePositionsSchema>>({
    resolver: zodResolver(updatePositionsSchema),
    defaultValues: {
      positions: group.groupPositions.map((position) => ({
        id: position.id,
        name: position.name,
        count: position.count,
        status: position.status || "Open",
        skillIds: position.skillIds || [],
      })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "positions",
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const allSkills = await getAllSkills();
        setSkills(allSkills);
      } catch (error: any) {
        console.error("Failed to fetch skills:", error);
        toast.error(error.message);
      }
    };

    if (open) {
      fetchSkills();
    }
  }, [open]);

  const getSkillNames = (skillIds: (number | undefined)[]) => {
    return skillIds.map((id) => {
      const skill = skills.find((s) => s.id === id);
      return skill ? skill.name : `Skill ${id}`;
    });
  };

  const onSubmit = async (data: z.infer<typeof updatePositionsSchema>) => {
    setIsLoading(true);

    try {
      const updatePromises = data.positions.map((position) => {
        const positionData: editGroupPositions = {
          name: position.name,
          count: position.count,
          status: position.status,
          skillIds: position.skillIds,
        };

        return updateGroupPosition(group.id, position.id, positionData);
      });

      await Promise.all(updatePromises);

      toast.success("Positions updated successfully!");

      setOpen(false);
      if (onComplete) onComplete();
    } catch (error: any) {
      console.error("Failed to update positions:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          <Edit className="mr-2 h-4 w-4" /> Update Positions
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Positions</DialogTitle>
          <DialogDescription>
            Modify existing positions for your group.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No positions found. Add positions to update them.
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium">
                        {form.watch(`positions.${index}.name`) ||
                          `Position ${index + 1}`}
                      </h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setExpandedPosition(
                            expandedPosition === `position-${index}`
                              ? null
                              : `position-${index}`
                          )
                        }
                      >
                        {expandedPosition === `position-${index}` ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {expandedPosition === `position-${index}` && (
                      <div className="space-y-4">
                        {/* Position Name */}
                        <FormField
                          control={form.control}
                          name={`positions.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Position Count */}
                        <FormField
                          control={form.control}
                          name={`positions.${index}.count`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Positions</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={1}
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      parseInt(e.target.value) || 1
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Position Status */}
                        <FormField
                          control={form.control}
                          name={`positions.${index}.status`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                  {positionStatusOptions
                                    .filter(
                                      (option) =>
                                        option.value === "Open" ||
                                        option.value === "Closed"
                                    )
                                    .map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Skills Selection */}
                        <FormField
                          control={form.control}
                          name={`positions.${index}.skillIds`}
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
                                        !field.value.length &&
                                          "text-muted-foreground"
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
                                    <CommandInput placeholder="Search skills..." />
                                    <CommandList>
                                      <CommandEmpty>
                                        No skills found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {skills.map((skill) => (
                                          <CommandItem
                                            className="bg-white"
                                            key={skill.id}
                                            value={skill.name}
                                            onSelect={() => {
                                              const currentSkills =
                                                field.value || [];
                                              const newSkills =
                                                currentSkills.includes(skill.id)
                                                  ? currentSkills.filter(
                                                      (id) => id !== skill.id
                                                    )
                                                  : [
                                                      ...currentSkills,
                                                      skill.id,
                                                    ];

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
                                  {getSkillNames(field.value).map(
                                    (skillName) => (
                                      <Badge
                                        key={skillName}
                                        variant="secondary"
                                        className="flex items-center"
                                      >
                                        {skillName}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const skillId = skills.find(
                                              (s) => s.name === skillName
                                            )?.id;
                                            if (skillId) {
                                              field.onChange(
                                                field.value.filter(
                                                  (id) => id !== skillId
                                                )
                                              );
                                            }
                                          }}
                                          className="ml-1 text-muted-foreground hover:text-foreground"
                                        >
                                          <X className="h-3 w-3" />
                                        </button>
                                      </Badge>
                                    )
                                  )}
                                </div>
                              )}
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
