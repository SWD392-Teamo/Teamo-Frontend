"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Trash2Icon, PlusIcon } from "lucide-react";
import { getAllSkills } from "@/actions/skillActions";
import { getAllSemesters } from "@/actions/semesterActions";
import { getAllSubjects } from "@/actions/subjectAction";
import { createGroup } from "@/actions/groupActions";
import { Semester, Skill, Subject } from "@/types";
import { addGroup } from "@/types/interface";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
 } from "@/components/ui/popover"
 import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
 } from "@/components/ui/command"
 import { Check, ChevronsUpDown } from "lucide-react"
 import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Zod schema for form validation
const groupSchema = z.object({
  name: z.string().min(2, "Group name must be at least 2 characters"),
  title: z.string().min(2, "Group title must be at least 2 characters"),
  semesterId: z.number().min(1, "Semester is required"),
  maxMember: z.number().min(1, "Max members must be at least 1"),
  fieldId: z.number().optional(),
  subjectId: z.number().min(1, "Subject is required"),
  groupPositions: z
    .array(
      z.object({
        name: z.string().min(1, "Position name is required"),
        count: z.number().min(1, "Count must be at least 1"),
        skillIds: z.array(z.number()).min(1, "At least one skill is required"),
      })
    )
    .min(1, "At least one group position is required"),
});

const CreateGroupPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // Initialize form with react-hook-form and zod
  const form = useForm({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: "",
      title: "",
      semesterId: undefined,
      maxMember: 1,
      subjectId: undefined,
      groupPositions: [
        {
          name: "",
          count: 1,
          skillIds: [],
        },
      ],
    },
  });

  // Field array for dynamic group positions
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "groupPositions",
  });

  const router = useRouter();

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [skillsData, semestersData, subjectsData] = await Promise.all([
          getAllSkills(),
          getAllSemesters("?status=ongoing"),
          getAllSubjects("?status=Active"),
        ]);

        setSkills(skillsData);
        setSemesters(semestersData.data);
        setSubjects(subjectsData.data);
      } catch (error) {
        toast.error("Error fetching data!");
      }
    };

    fetchInitialData();
  }, []);

  // Submit handler
  const onSubmit = async (data: addGroup) => {
    try {
      await createGroup(data);
      toast.success("Group created successfully!");

      router.push("/groups");
    } catch (error) {
      toast.error("Post created error!");
    }
  };
  const getSkillNames = (skillIds: number[]) => {
    return skillIds
      .map((id) => skills.find((skill) => skill.id === id)?.name)
      .filter(Boolean);
  };

  console.log("semester:", semesters);
  console.log("subjects:", subjects);

  return (
    <div>
      <Card className="w-2/3 mx-auto">
        <CardHeader>
          <CardTitle>Create New Group</CardTitle>
          <CardDescription>
            Fill in the details to create a new group
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Basic Group Details */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter group name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter group title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Semester and Subject Selection */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="semesterId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Semester</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Semester" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {semesters.map((semester) => (
                            <SelectItem
                              key={semester.id}
                              value={semester.id.toString()}
                            >
                              {semester.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subjectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem
                              key={subject.id}
                              value={subject.id.toString()}
                            >
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Max Members */}
              <FormField
                control={form.control}
                name="maxMember"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Members</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Maximum number of members"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dynamic Group Positions */}
              <div className="space-y-4">
                <Label className="block text-sm font-medium">
                  Group Positions
                </Label>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-2 p-4 border rounded-lg"
                  >
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <FormField
                        control={form.control}
                        name={`groupPositions.${index}.name`}
                        render={({ field: inputField }) => (
                          <FormItem>
                            <FormLabel>Position Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Frontend Developer"
                                {...inputField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`groupPositions.${index}.count`}
                        render={({ field: inputField }) => (
                          <FormItem>
                            <FormLabel>Position Count</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Number of positions"
                                {...inputField}
                                onChange={(e) =>
                                  inputField.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                      control={form.control}
                      name={`groupPositions.${index}.skillIds`}
                      render={({ field: selectField }) => (
                        <FormItem>
                          <FormLabel>Skills</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full justify-between",
                                    !selectField.value && "text-muted-foreground"
                                  )}
                                >
                                  {selectField.value?.length > 0
                                    ? `${selectField.value.length} skills selected`
                                    : "Select skills"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search skills..." />
                                <CommandList>
                                  <CommandEmpty>No skills found.</CommandEmpty>
                                  <CommandGroup>
                                    {skills.map((skill) => (
                                      <CommandItem
                                        key={skill.id}
                                        value={skill.name}
                                        onSelect={() => {
                                          const currentSkills = 
                                            selectField.value || [];
                                          const newSkills = currentSkills.includes(skill.id)
                                            ? currentSkills.filter(
                                                (id) => id !== skill.id
                                              )
                                            : [...currentSkills, skill.id];
                                          
                                          selectField.onChange(newSkills);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            (selectField.value || []).includes(skill.id)
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
                        </FormItem>
                      )}
                    />

                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => remove(index)}
                          className="mt-1"
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {/* Display selected skills */}
                    {form.watch(`groupPositions.${index}.skillIds`).length >
                      0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {getSkillNames(
                          form.watch(`groupPositions.${index}.skillIds`)
                        ).map((skillName) => (
                          <Badge key={skillName} variant="secondary">
                            {skillName}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    append({
                      name: "",
                      count: 1,
                      skillIds: [],
                    })
                  }
                  className="mt-2"
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Position
                </Button>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Create Group
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateGroupPage;
