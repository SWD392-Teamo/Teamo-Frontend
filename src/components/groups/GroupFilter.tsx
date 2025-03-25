import { getData as getSemestersData } from "@/actions/semesterActions";
import { getData as getSubjectsData } from "@/actions/subjectAction";
import { useSemesterStore } from "@/hooks/useSemesterStore";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/shallow";
import DropdownSelect, { DropdownOption } from "../DropdownSelect";
import Link from "next/link";
import { useSubjectStore } from "@/hooks/useSubjectStore";
import { Button } from "flowbite-react";

interface GroupFilterProps {
  semesterId: string;
  subjectId: string;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setSemesterId: React.Dispatch<React.SetStateAction<string>>;
  setSubjectId: React.Dispatch<React.SetStateAction<string>>;
}
export default function GroupFilter({
  semesterId,
  subjectId,
  status,
  setSemesterId,
  setSubjectId,
  setStatus,
}: GroupFilterProps) {
  /** GLOBAL STATE MANAGEMENT */
  const semesters = useSemesterStore((state) => state.semesters);
  const setSemesters = useSemesterStore((state) => state.setSemesters);
  const subjects = useSubjectStore((state) => state.subjects);
  const setSubjects = useSubjectStore((state) => state.setData);

  //FETCH SEMESTER
  useEffect(() => {
    getSemestersData("")
      .then((data) => {
        setSemesters(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      });
  }, []);

  // FETCH SUBJECTS
  useEffect(() => {
    getSubjectsData("")
      .then((data) => {
        setSubjects(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      });
  }, []);

  /** FILTER CONFIGURATION */
  const semesterOptions: DropdownOption[] = [
    { value: "", label: "All" },
    ...semesters.map((semester) => ({
      value: semester.id.toString(),
      label: semester.name,
    })),
  ];
  const subjectOptions: DropdownOption[] = [
    { value: "", label: "All" },
    ...subjects.map((subject) => ({
      value: subject.id.toString(),
      label: subject.code,
    })),
  ];
  const statusOptions: DropdownOption[] = [
    { value: "", label: "All" },
    { value: "Recruiting", label: "Recruiting" },
    { value: "Full", label: "Full" },
    { value: "Archived", label: "Archived" },
    { value: "Deleted", label: "Deleted" },
  ];

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex gap-4">
        {/* Filter semester */}
        <DropdownSelect
          value={semesterId || ""}
          onChange={(value) => setSemesterId(value)}
          options={semesterOptions}
          placeholder="All Semesters"
        />
        {/* Filter subject */}
        <DropdownSelect
          value={subjectId || ""}
          onChange={(value) => setSubjectId(value)}
          options={subjectOptions}
          placeholder="All Subjects"
        />
        {/* Filter status */}
        <DropdownSelect
          value={status || ""}
          onChange={(value) => setStatus(value)}
          options={statusOptions}
          placeholder="All Status"
        />
      </div>
    </div>
  );
}
