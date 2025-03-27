import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Major, Subject, Semester, Field, Group } from "@/types";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/hooks/GroupFilterStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useGroupStore } from "@/hooks/useGroupStore";
import { getAllMajors } from "@/actions/majorActions";
import { getAllSubjects } from "@/actions/subjectAction";
import { getAllSemesters } from "@/actions/semesterActions";
import { getAllFields } from "@/actions/fieldActions";

export function GroupFilters({ searchTerm = "" }: { searchTerm?: string }) {
  const {
    majors,
    subjects,
    semesters,
    fields,
    selectedMajors,
    selectedSubjects,
    selectedSemesters,
    selectedFields,
    setMajors,
    setSubjects,
    setSemesters,
    setFields,
    toggleMajor,
    toggleSubject,
    toggleSemester,
    toggleField,
    clearFilters,
    setLoadingState,
    isLoadingMajors,
    isLoadingSubjects,
    isLoadingSemesters,
  } = useFilterStore();

  const groups = useGroupStore((state) => state.groups);
  const setData = useGroupStore((state) => state.setData);

  const [originalData, setOriginalData] = useState<{
    data: Group[];
    count: number;
    pageSize: number;
  } | null>(null);

  const totalActiveFilters =
    selectedMajors.length +
    selectedSubjects.length +
    selectedSemesters.length +
    selectedFields.length;

  useEffect(() => {
    if (groups.length > 0 && totalActiveFilters === 0 && !originalData) {
      console.log("Storing original data:", groups);
      setOriginalData({
        data: groups,
        count: useGroupStore.getState().totalCount,
        pageSize: useGroupStore.getState().pageCount,
      });
    }
  }, [groups, totalActiveFilters, originalData]);

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        setLoadingState("majors", true);
        const result = await getAllMajors("?pageSize=300");
        setMajors(result.data);
      } catch (error) {
        toast.error("Failed to load majors");
        console.error(error);
      } finally {
        setLoadingState("majors", false);
      }
    };

    const fetchSubjects = async () => {
      try {
        setLoadingState("subjects", true);
        const result = await getAllSubjects("?pageSize=300");
        setSubjects(result.data);
      } catch (error) {
        toast.error("Failed to load subjects");
        console.error(error);
      } finally {
        setLoadingState("subjects", false);
      }
    };

    const fetchSemesters = async () => {
      try {
        setLoadingState("semesters", true);
        const result = await getAllSemesters("?pageSize=300");
        setSemesters(result.data);
      } catch (error) {
        toast.error("Failed to load semesters");
        console.error(error);
      } finally {
        setLoadingState("semesters", false);
      }
    };

    const fetchFields = async () => {
      try {
        setLoadingState("fields", true);
        const result = await getAllFields("?pageSize=300");
        setFields(result.data);
      } catch (error) {
        toast.error("Failed to load fields");
        console.error(error);
      }
    };

    fetchMajors();
    fetchSubjects();
    fetchSemesters();
    fetchFields();
  }, []);

  useEffect(() => {
    if (!originalData || !originalData.data.length) return;
    if (totalActiveFilters === 0 && !searchTerm) {
      setData({
        data: originalData.data,
        count: originalData.count,
        pageSize: originalData.pageSize,
      });
      return;
    }

    let filteredGroups = [...originalData.data];

    if (selectedMajors.length > 0) {
      const majorIds = selectedMajors.map((m) => m.id);

      filteredGroups = filteredGroups.filter((group) => {
        const matchingSubject = subjects.find(
          (s) => s.code === group.subjectCode
        );

        if (matchingSubject) {
          return majorIds.some((majorId) => {
            const major = majors.find((m) => m.id === majorId);
            return (
              major &&
              major.subjects &&
              major.subjects.some((s) => s.id === matchingSubject.id)
            );
          });
        }
        return false;
      });
    }

    if (selectedSubjects.length > 0) {
      const selectedSubjectCodes = selectedSubjects.map((s) => s.code);
      filteredGroups = filteredGroups.filter((group) =>
        selectedSubjectCodes.includes(group.subjectCode)
      );
    }

    if (selectedSemesters.length > 0) {
      const selectedSemesterNames = selectedSemesters.map((s) => s.name);
      filteredGroups = filteredGroups.filter((group) =>
        selectedSemesterNames.includes(group.semesterName)
      );
    }

    if (selectedFields.length > 0) {
      const selectedFieldNames = selectedFields.map((f) => f.name);
      filteredGroups = filteredGroups.filter((group) =>
        selectedFieldNames.includes(group.fieldName)
      );
    }
    if (searchTerm && typeof searchTerm === "string") {
      const searchLower = searchTerm.toLowerCase();
      filteredGroups = filteredGroups.filter((group) =>
        group.name.toLowerCase().includes(searchLower)
      );
    }

    setData({
      data: filteredGroups,
      count: filteredGroups.length,
      pageSize: originalData.pageSize,
    });
  }, [
    originalData,
    selectedMajors,
    selectedSubjects,
    selectedSemesters,
    selectedFields,
    majors,
    subjects,
    semesters,
    fields,
    searchTerm,
  ]);

  const handleClearFilters = () => {
    console.log("Clearing all filters");
    clearFilters();
    if (originalData) {
      console.log(
        "Restoring original data with",
        originalData.data.length,
        "items"
      );

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const searchFiltered = originalData.data.filter((group) =>
          group.name.toLowerCase().includes(searchLower)
        );

        setData({
          data: searchFiltered,
          count: searchFiltered.length,
          pageSize: originalData.pageSize,
        });
      } else {
        setData({
          data: originalData.data,
          count: originalData.count,
          pageSize: originalData.pageSize,
        });
      }
    }
  };

  return (
    <div className="flex flex-col space-y-4 mb-8 mt-5">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold">Filters:</h2>

        {/* Major Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border-dashed">
              <span>Major</span>
              {selectedMajors.length > 0 && (
                <Badge variant="secondary" className="ml-2 rounded-sm">
                  {selectedMajors.length}
                </Badge>
              )}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0" align="start">
            <Command className="bg-white">
              <CommandInput placeholder="Search majors..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {isLoadingMajors ? (
                    <div className="flex items-center justify-center p-4">
                      <span className="text-sm text-muted-foreground">
                        Loading...
                      </span>
                    </div>
                  ) : (
                    majors.map((major) => {
                      const isSelected = selectedMajors.some(
                        (m) => m.id === major.id
                      );
                      return (
                        <CommandItem
                          key={major.id}
                          onSelect={() => toggleMajor(major)}
                          className="flex items-center justify-between"
                        >
                          <span>{major.name}</span>
                          <Check
                            className={cn(
                              "h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      );
                    })
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Subject Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border-dashed">
              <span>Subject</span>
              {selectedSubjects.length > 0 && (
                <Badge variant="secondary" className="ml-2 rounded-sm">
                  {selectedSubjects.length}
                </Badge>
              )}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0" align="start">
            <Command className="bg-white">
              <CommandInput placeholder="Search subjects..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {isLoadingSubjects ? (
                    <div className="flex items-center justify-center p-4">
                      <span className="text-sm text-muted-foreground">
                        Loading...
                      </span>
                    </div>
                  ) : (
                    subjects.map((subject) => {
                      const isSelected = selectedSubjects.some(
                        (s) => s.id === subject.id
                      );
                      return (
                        <CommandItem
                          key={subject.id}
                          onSelect={() => toggleSubject(subject)}
                          className="flex items-center justify-between"
                        >
                          <span>{subject.code}</span>
                          <Check
                            className={cn(
                              "h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      );
                    })
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Semester Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border-dashed">
              <span>Semester</span>
              {selectedSemesters.length > 0 && (
                <Badge variant="secondary" className="ml-2 rounded-sm">
                  {selectedSemesters.length}
                </Badge>
              )}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0" align="start">
            <Command className="bg-white">
              <CommandInput placeholder="Search semesters..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {isLoadingSemesters ? (
                    <div className="flex items-center justify-center p-4">
                      <span className="text-sm text-muted-foreground">
                        Loading...
                      </span>
                    </div>
                  ) : (
                    semesters.map((semester) => {
                      const isSelected = selectedSemesters.some(
                        (s) => s.id === semester.id
                      );
                      return (
                        <CommandItem
                          key={semester.id}
                          onSelect={() => toggleSemester(semester)}
                          className="flex items-center justify-between"
                        >
                          <span>{semester.name}</span>
                          <Check
                            className={cn(
                              "h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      );
                    })
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {totalActiveFilters > 0 && (
          <Button
            variant="ghost"
            onClick={handleClearFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedMajors.map((major) => (
            <Badge
              key={`major-${major.id}`}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {major.name}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleMajor(major)}
              />
            </Badge>
          ))}

          {selectedSubjects.map((subject) => (
            <Badge
              key={`subject-${subject.id}`}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {subject.code}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleSubject(subject)}
              />
            </Badge>
          ))}

          {selectedSemesters.map((semester) => (
            <Badge
              key={`semester-${semester.id}`}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {semester.name}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleSemester(semester)}
              />
            </Badge>
          ))}

          {selectedFields.map((field) => (
            <Badge
              key={`field-${field.id}`}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {field.name}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleField(field)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
