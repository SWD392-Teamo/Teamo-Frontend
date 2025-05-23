import { getData as getSemestersData } from '@/actions/semesterActions';
import { getData as getSubjectsData } from '@/actions/subjectAction';
import { useSemesterStore } from '@/hooks/useSemesterStore';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import DropdownSelect, { DropdownOption } from '../DropdownSelect';
import { useSubjectStore } from '@/hooks/useSubjectStore';
import { Button } from 'flowbite-react';

interface GroupFilterProps {
  semesterId: string;
  subjectId: string;
  status: string;
  sort: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setSemesterId: React.Dispatch<React.SetStateAction<string>>;
  setSubjectId: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
export default function GroupFilter({
  semesterId,
  subjectId,
  status,
  sort,
  setSemesterId,
  setSubjectId,
  setStatus,
  setSort,
  setSearch,
}: GroupFilterProps) {
  /** GLOBAL STATE MANAGEMENT */
  const semesters = useSemesterStore((state) => state.semesters);
  const setSemesters = useSemesterStore((state) => state.setSemesters);
  const subjects = useSubjectStore((state) => state.subjects);
  const setSubjects = useSubjectStore((state) => state.setData);

  //FETCH SEMESTER
  useEffect(() => {
    getSemestersData('?pageSize=100')
      .then((data) => {
        setSemesters(data);
      })
      .catch((error) => {
        toast.error(error.status + ' ' + error.message);
      });
  }, []);

  // FETCH SUBJECTS
  useEffect(() => {
    getSubjectsData('?pageSize=100')
      .then((data) => {
        setSubjects(data);
      })
      .catch((error) => {
        toast.error(error.status + ' ' + error.message);
      });
  }, []);

  /** FILTER CONFIGURATION */
  const semesterOptions: DropdownOption[] = [
    { value: '', label: 'All' },
    ...semesters.map((semester) => ({
      value: semester.id.toString(),
      label: semester.name,
    })),
  ];
  const subjectOptions: DropdownOption[] = [
    { value: '', label: 'All' },
    ...subjects.map((subject) => ({
      value: subject.id.toString(),
      label: subject.code,
    })),
  ];
  const statusOptions: DropdownOption[] = [
    { value: '', label: 'All' },
    { value: 'Recruiting', label: 'Recruiting' },
    { value: 'Full', label: 'Full' },
    { value: 'Archived', label: 'Archived' },
    { value: 'Deleted', label: 'Deleted' },
    { value: 'Banned', label: 'Banned' },
  ];
  const sortOptions: DropdownOption[] = [
    { value: 'DateDesc', label: 'Latest' },
    { value: 'DateAsc', label: 'Oldest' },
  ];

  /** HANDLE ACTIONS */
  const handleResetFilter = () => {
    setSemesterId('');
    setSubjectId('');
    setSearch('');
    setStatus('');
    setSort('');
    setSearch('');
  };

  return (
    <div>
      {/* Filter buttons */}
      <div className='flex gap-4 items-center justify-between'>
        <div className='flex gap-4'>
          {/* Filter semester */}
          <DropdownSelect
            value={semesterId || ''}
            onChange={(value) => setSemesterId(value)}
            options={semesterOptions}
            placeholder='All Semesters'
            showSearch={true}
          />
          {/* Filter subject */}
          <DropdownSelect
            value={subjectId || ''}
            onChange={(value) => setSubjectId(value)}
            options={subjectOptions}
            placeholder='All Subjects'
            showSearch={true}
          />
          {/* Filter status */}
          <DropdownSelect
            value={status || ''}
            onChange={(value) => setStatus(value)}
            options={statusOptions}
            placeholder='All Status'
          />
          {/* Sort */}
          <DropdownSelect
            value={sort || 'DateDesc'}
            onChange={(value) => setSort(value)}
            options={sortOptions}
            placeholder='Sort'
          />
        </div>

        {/* Reset Filter */}
        <Button
          onClick={handleResetFilter}
          className='btn btn--primary--outline'
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
