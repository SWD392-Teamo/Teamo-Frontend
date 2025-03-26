import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown, PlusIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { createGroup } from '@/actions/groupActions';
import { getData as getAllSkills } from '@/actions/skillActions';
import { getData as getAllSemesters } from '@/actions/semesterActions';
import { getData as getAllSubjects } from '@/actions/subjectAction';
import { getData as getAllFields } from '@/actions/fieldActions';
import { Field, Semester, Skill, Subject } from '@/types';
import { useRouter } from 'next/navigation';
import { addGroup } from '@/types/interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import BackButton from '@/components/BackButton';

interface CreateGroupStepProps {
  onSubmit: (data: addGroup) => Promise<any>;
  isSubmitting: boolean;
}

function cn(...inputs: any[]): string {
  return inputs.filter(Boolean).join(' ');
}

const groupSchema = z.object({
  name: z.string().min(1, 'Group name is required'),
  title: z.string().min(2, 'Group title must be at least 2 characters'),
  semesterId: z.number().min(1, 'Semester is required'),
  maxMember: z.number().min(1, 'Max members must be at least 1'),
  fieldId: z.number().optional(),
  subjectId: z.number().min(1, 'Subject is required'),
  description: z.string().optional(),
  groupPositions: z
    .array(
      z.object({
        name: z.string().min(1, 'Position name is required'),
        count: z.number().min(1, 'Count must be at least 1'),
        skillIds: z.array(z.number()).min(1, 'At least one skill is required'),
      })
    )
    .min(1, 'At least one group position is required'),
});

const CreateGroupStep: React.FC<CreateGroupStepProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [fieldss, setFieldss] = useState<Field[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const [searchSubject, setSearchSubject] = useState<string>('');
  const [searchField, setSearchField] = useState<string>('');

  const form = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: '',
      title: '',
      semesterId: undefined as unknown as number,
      maxMember: 1,
      fieldId: undefined as unknown as number,
      subjectId: undefined as unknown as number,
      description: '',
      groupPositions: [
        {
          name: '',
          count: 1,
          skillIds: [],
        },
      ],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'groupPositions',
  });

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [
          skillsData,
          ongoingSemestersData,
          upcomingSemesterData,
          subjectsData,
          fieldssData,
        ] = await Promise.all([
          getAllSkills(''),
          getAllSemesters('?status=ongoing'),
          getAllSemesters('?status=upcoming'),
          getAllSubjects('?status=Active'),
          getAllFields(''),
        ]);

        setSkills(skillsData.data);
        setSemesters([
          ...ongoingSemestersData.data,
          ...upcomingSemesterData.data,
        ]);
        setSubjects(subjectsData.data);
        setFieldss(fieldssData.data);
      } catch (error) {
        toast.error('Error fetching data!');
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const subscription = form.watch(() => {
      // Check if all required fields are filled
      const formValues = form.getValues();
      const requiredFieldsFilled =
        formValues.name?.trim() !== '' &&
        formValues.title?.trim() !== '' &&
        formValues.semesterId !== undefined &&
        formValues.subjectId !== undefined &&
        formValues.maxMember > 0;

      const hasValidPositions =
        formValues.groupPositions.length > 0 &&
        formValues.groupPositions.every(
          (position) =>
            position.name?.trim() !== '' &&
            position.count > 0 &&
            position.skillIds.length > 0
        );

      setIsFormValid(requiredFieldsFilled && hasValidPositions);
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const handleSubmit = async (data: z.infer<typeof groupSchema>) => {
    try {
      await onSubmit(data as addGroup);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const getSkillNames = (skillIds: number[]): string[] => {
    return skillIds
      .map((id) => skills.find((skill) => skill.id === id)?.name)
      .filter(Boolean) as string[];
  };

  return (
    <Card className='w-full mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl'>Create New Group</CardTitle>
        <CardDescription className='text-xl'>
          Fill in the details to create a new group
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
            {/* Basic Group Details */}
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xl'>Group Name</FormLabel>
                    <FormControl>
                      <Input
                        className='text-xl'
                        placeholder='Enter group name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xl'>Group Title</FormLabel>
                    <FormControl>
                      <Input
                        className='text-xl'
                        placeholder='Enter group title'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Group Description */}
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Group Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className='resize-none min-h-[100px]'
                      placeholder='Enter a description for your group...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Semester and Subject Selection */}
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='semesterId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xl'>Semester</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className='text-xl'
                            placeholder='Select Semester'
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='text-xl bg-white'>
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
                name='subjectId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xl'>Subject</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder='Select Subject'
                            className='text-xl'
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='text-xl bg-white'>
                        <div className='p-2'>
                          <Input
                            placeholder='Search subject...'
                            className='w-full border rounded-md p-2'
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
                name='fieldId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xl'>Field</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className='text-xl'
                            placeholder='Select Field'
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='text-xl bg-white'>
                        <Input
                          placeholder='Search field...'
                          className='w-full border rounded-md p-2'
                          onChange={(e) => setSearchField(e.target.value)}
                        />
                        {fieldss
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
                name='maxMember'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xl'>Maximum Members</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Maximum number of members'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Dynamic Group Positions */}
            <div className='space-y-4'>
              <Label className='block text-xl font-medium '>
                Group Positions
              </Label>
              {fields.map((field, index) => (
                <div key={field.id} className='space-y-2 p-4 border rounded-lg'>
                  <div className='grid grid-cols-3 gap-4 items-center'>
                    <FormField
                      control={form.control}
                      name={`groupPositions.${index}.name`}
                      render={({ field: inputField }) => (
                        <FormItem>
                          <FormLabel>Position Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='e.g., Frontend Developer'
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
                              type='number'
                              placeholder='Number of positions'
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
                                  variant='outline'
                                  role='combobox'
                                  className={cn(
                                    'w-full justify-between',
                                    !selectField.value &&
                                      'text-muted-foreground'
                                  )}
                                >
                                  {selectField.value?.length > 0
                                    ? `${selectField.value.length} skills selected`
                                    : 'Select skills'}
                                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className='w-full p-0'>
                              <Command className='bg-white'>
                                <CommandInput placeholder='Search skills...' />
                                <CommandList>
                                  <CommandEmpty>No skills found.</CommandEmpty>
                                  <CommandGroup >
                                    {skills.map((skill) => (
                                      <CommandItem
                                        className='bg-white'
                                        key={skill.id}
                                        value={skill.name}
                                        onSelect={() => {
                                          const currentSkills =
                                            selectField.value || [];
                                          const newSkills =
                                            currentSkills.includes(skill.id)
                                              ? currentSkills.filter(
                                                  (id) => id !== skill.id
                                                )
                                              : [...currentSkills, skill.id];

                                          selectField.onChange(newSkills);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            'mr-2 h-4 w-4 ',
                                            (selectField.value || []).includes(
                                              skill.id
                                            )
                                              ? 'opacity-100'
                                              : 'opacity-0'
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
                        type='button'
                        variant='destructive'
                        size='icon'
                        onClick={() => remove(index)}
                        className='mt-1'
                      >
                        <Trash2Icon className='h-4 w-4' />
                      </Button>
                    )}
                  </div>

                  {/* Display selected skills */}
                  {form.watch(`groupPositions.${index}.skillIds`).length >
                    0 && (
                    <div className='flex flex-wrap gap-2 mt-2'>
                      {getSkillNames(
                        form.watch(`groupPositions.${index}.skillIds`)
                      ).map((skillName) => (
                        <Badge key={skillName} variant='secondary'>
                          {skillName}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button
                type='button'
                variant='outline'
                onClick={() =>
                  append({
                    name: '',
                    count: 1,
                    skillIds: [],
                  })
                }
                className='mt-2'
              >
                <PlusIcon className='mr-2 h-4 w-4' />
                Add Position
              </Button>
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              className='w-full'
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Group and Continue'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateGroupStep;
