import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Check,
  ChevronsUpDown,
  Plus as PlusIcon,
  Trash2 as Trash2Icon,
} from "lucide-react";
import { addGroup } from "@/types/interface";
import { updateGroup } from "@/actions/groupActions";
import { Field, Group, Semester, Skill, Subject } from "@/types";
import { getAllSkills } from "@/actions/skillActions";
import { getAllSemesters } from "@/actions/semesterActions";
import { getAllSubjects } from "@/actions/subjectAction";
import { getAllFields } from "@/actions/fieldActions";
import ImageUpload from "./ImageUpload";

interface UpdateGroupDialogProps {
  group: Group;
  onSuccess?: () => void;
}

// Simplified schema for form validation (without groupPositions)
const updateGroupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  title: z.string().min(2, "Group title must be at least 2 characters"),
  maxMember: z.number().min(1, "Max members must be at least 1"),
  description: z.string().optional(),
  semesterId: z.number().optional(),
  fieldId: z.number().optional(),
  subjectId: z.number().optional(),
});

type UpdateGroupFormValues = z.infer<typeof updateGroupSchema>;

const UpdateGroupDialog: React.FC<UpdateGroupDialogProps> = ({
  group,
  onSuccess,
}) => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const [searchSubject, setSearchSubject] = useState<string>("");
  const [searchField, setSearchField] = useState<string>("");

  const form = useForm<UpdateGroupFormValues>({
    resolver: zodResolver(updateGroupSchema),
    defaultValues: {
      name: group.name,
      title: group.title,
      semesterId: 0,
      maxMember: group.maxMember,
      fieldId: 0,
      subjectId: 0,
      description: group.description || "",
    },
    mode: "onChange",
  });

  const [selectedValues, setSelectedValues] = useState({
    semester: { name: group.semesterName, id: 0 },
    field: { name: group.fieldName, id: undefined as number | undefined },
    subject: { code: group.subjectCode, id: 0 },
  });

  useEffect(() => {
    if (isOpen) {
      setIsDataLoaded(false);

      const fetchInitialData = async () => {
        try {
          const semestersResponse = await getAllSemesters("?status=ongoing");
          const subjectsResponse = await getAllSubjects("?status=Active");
          const fieldsResponse = await getAllFields();

          const semestersArray =
            semestersResponse?.data || semestersResponse || [];
          const subjectsArray =
            subjectsResponse?.data || subjectsResponse || [];
          const fieldsArray = fieldsResponse?.data || fieldsResponse || [];

          setSemesters(semestersArray);
          setSubjects(subjectsArray);
          setFields(fieldsArray);

          const updatedValues = { ...selectedValues };

          const matchingSemester = semestersArray.find(
            (s) => s.name === group.semesterName
          );
          if (matchingSemester) {
            updatedValues.semester = {
              name: group.semesterName,
              id: matchingSemester.id,
            };
          } else if (semestersArray.length > 0) {
            updatedValues.semester = {
              name: semestersArray[0].name,
              id: semestersArray[0].id,
            };
          }

          const matchingSubject = subjectsArray.find(
            (s) => s.code === group.subjectCode
          );
          if (matchingSubject) {
            updatedValues.subject = {
              code: group.subjectCode,
              id: matchingSubject.id,
            };
          } else if (subjectsArray.length > 0) {
            updatedValues.subject = {
              code: subjectsArray[0].code,
              id: subjectsArray[0].id,
            };
          }

          const matchingField = fieldsArray.find(
            (f) => f.name === group.fieldName
          );
          if (matchingField) {
            updatedValues.field = {
              name: group.fieldName,
              id: matchingField.id,
            };
          }

          setSelectedValues(updatedValues);

          form.reset({
            name: group.name,
            title: group.title,
            semesterId: updatedValues.semester.id,
            maxMember: group.maxMember,
            fieldId: updatedValues.field.id,
            subjectId: updatedValues.subject.id,
            description: group.description || "",
          });

          setIsDataLoaded(true);
        } catch (error: any) {
          console.error("Error fetching data:", error);
          toast.error(`${error.message}`);
          setIsDataLoaded(true); // Still mark as loaded even on error
        }
      };

      fetchInitialData();
    }
  }, [isOpen, form, group]);

  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (isDataLoaded) {
      const subscription = form.watch(() => {
        // Check if all required fields are filled
        const formValues = form.getValues();
        const requiredFieldsFilled =
          formValues.name?.trim() !== "" &&
          formValues.title?.trim() !== "" &&
          formValues.semesterId !== undefined &&
          formValues.subjectId !== undefined &&
          formValues.maxMember > 0;

        setIsFormValid(requiredFieldsFilled);
      });

      const formValues = form.getValues();
      const requiredFieldsFilled =
        formValues.name?.trim() !== "" &&
        formValues.title?.trim() !== "" &&
        formValues.semesterId !== undefined &&
        formValues.subjectId !== undefined &&
        formValues.maxMember > 0;

      setIsFormValid(requiredFieldsFilled);

      return () => subscription.unsubscribe();
    }
  }, [form, isDataLoaded]);

  const handleSubmit = async (data: UpdateGroupFormValues) => {
    setIsSubmitting(true);
    try {
      const currentPositions = group.groupPositions.map((position) => ({
        name: position.name,
        count: position.count || 1,
        skillIds: position.skillIds || [],
      }));

      const updateData: Partial<addGroup> = {
        name: data.name,
        title: data.title,
        maxMember: data.maxMember,
        description: data.description || "",
        groupPositions: currentPositions,
      };

      if (data.semesterId && data.semesterId !== 0) {
        updateData.semesterId = data.semesterId;
      }

      if (data.subjectId && data.subjectId !== 0) {
        updateData.subjectId = data.subjectId;
      }

      if (data.fieldId && data.fieldId !== 0) {
        updateData.fieldId = data.fieldId;
      }

      await updateGroup(group.id, updateData as addGroup);
      toast.success("Group updated successfully");
      setIsOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error updating group:", error);
      toast.error("Failed to update group");
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
        >
          <Edit className="mr-2 h-4 w-4" /> Update Group
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Group</DialogTitle>
          <DialogDescription>
            Make changes to your group details below
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
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

            {/* Group Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none min-h-[100px]"
                      placeholder="Enter a description for your group..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Semester and Subject Selection */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="semesterId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const id = Number(value);
                        field.onChange(id);
                        const semester = semesters.find((s) => s.id === id);
                        if (semester) {
                          setSelectedValues((prev) => ({
                            ...prev,
                            semester: { name: semester.name, id },
                          }));
                        }
                      }}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              !isDataLoaded ? "Loading..." : "Select Semester"
                            }
                          >
                            {selectedValues.semester.name}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
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
                      onValueChange={(value) => {
                        const id = Number(value);
                        field.onChange(id);
                        // Update display value when selection changes
                        const subject = subjects.find((s) => s.id === id);
                        if (subject) {
                          setSelectedValues((prev) => ({
                            ...prev,
                            subject: { code: subject.code, id },
                          }));
                        }
                      }}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              !isDataLoaded ? "Loading..." : "Select Subject"
                            }
                          >
                            {selectedValues.subject.code}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="text-xl bg-white">
                        <div className="p-2">
                          <Input
                            placeholder="Search subject..."
                            className="w-full border rounded-md p-2"
                            onChange={(e) => setSearchSubject(e.target.value)}
                          />
                        </div>
                        {subjects
                          .filter((subject) =>
                            subject.code
                              .toLowerCase()
                              .includes(searchSubject.toLowerCase())
                          )
                          .map((subject) => (
                            <SelectItem
                              key={subject.id}
                              value={subject.id.toString()}
                            >
                              {subject.code}
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
                name="fieldId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const id = Number(value);
                        field.onChange(id);
                        // Update display value when selection changes
                        const fieldItem = fields.find((f) => f.id === id);
                        if (fieldItem) {
                          setSelectedValues((prev) => ({
                            ...prev,
                            field: { name: fieldItem.name, id },
                          }));
                        }
                      }}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              !isDataLoaded ? "Loading..." : "Select Field"
                            }
                          >
                            {selectedValues.field.name}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="text-xl bg-white">
                        <Input
                          placeholder="Search field..."
                          className="w-full border rounded-md p-2"
                          onChange={(e) => setSearchField(e.target.value)}
                        />
                        {fields
                          .filter((field) =>
                            field.name
                              .toLowerCase()
                              .includes(searchField.toLowerCase())
                          )
                          .map((f) => (
                            <SelectItem key={f.id} value={f.id.toString()}>
                              {f.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            </div>
            

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting || !isDataLoaded}
              >
                {isSubmitting
                  ? "Updating..."
                  : !isDataLoaded
                  ? "Loading..."
                  : "Update Group"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGroupDialog;
