import { getData } from '@/actions/semesterActions';
import { useSemesterStore } from '@/hooks/useSemesterStore';
import Link from 'next/link';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
interface Props {
  semesterId: string;
  setSemesterId: React.Dispatch<React.SetStateAction<string>>;
}
export default function SemesterNavbar({ semesterId, setSemesterId }: Props) {
  /** GLOBAL STATE MANAGEMENT */
  const semesters = useSemesterStore((state) => state.semesters);
  const setSemesters = useSemesterStore((state) => state.setSemesters);

  //FETCH SEMESTER
  useEffect(() => {
    getData('')
      .then((data) => {
        setSemesters(data);
      })
      .catch((error) => {
        toast.error(error.status + ' ' + error.message);
      });
  }, []);
  // SET DEFAULT SEMESTER ID
  useEffect(() => {
    if (semesters.length > 0 && !semesterId) {
      const ongoingSemester = semesters.find((s) => s.status === 'Ongoing');
      setSemesterId(
        ongoingSemester
          ? ongoingSemester.id.toString()
          : semesters[0].id.toString()
      );
    }
  }, [semesters]);

  return (
    <div>
      {/* Navigation Bar */}
      <div className='w-full border-t border-b border-gray-200 mb-5'>
        <div className='overflow-x-auto'>
          <nav className='flex justify-start content-around gap-10 px-4'>
            {semesters.map((semester, index) => {
              const isActive = semester.id.toString() === semesterId;
              return (
                <React.Fragment key={semester.name}>
                  <Link
                    href='#'
                    onClick={() => setSemesterId(semester.id.toString())}
                    className={`link ${isActive ? 'active' : ''} p-5`}
                  >
                    {semester.name}
                  </Link>
                  {index < semesters.length - 1 && (
                    <span className='sr-only'>, </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
