import React from 'react';
import { Button } from 'flowbite-react';
import DropdownSelect from '../DropdownSelect';
import { useParamsStore } from '@/hooks/useParamsStore';

interface ApplicationFilterProps {
  status: string;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function ApplicationFilter({status, sort, setSort, setStatus, setPageIndex}: ApplicationFilterProps) {
  const sortOptions = [
    { value: 'dateAsc', label: 'Date (Oldest First)' },
    { value: 'dateDesc', label: 'Date (Newest First)' }
  ];

  return (
    <div className="flex flex-row justify-between items-center w-full mb-5">
      <div className="flex gap-5">
        <Button
          className={`btn ${status === '' ? 'btn--primary' : 'btn--primary--outline'}`}
          onClick={() => 
            {
              setStatus('');
              setPageIndex(1);
            }
          }
        >
          Requested
        </Button>
        <Button
          className={`btn ${status === 'approved' ? 'btn--primary' : 'btn--primary--outline'}`}
          onClick={() => 
            {
              setStatus('approved');
              setPageIndex(1);
            }
          }
        >
          Approved
        </Button>
        <Button
          className={`btn ${status === 'rejected' ? 'btn--primary' : 'btn--primary--outline'}`}
          onClick={() => 
            {
              setStatus('rejected');
              setPageIndex(1);
            }
          }
        >
          Rejected
        </Button>
      </div>
      <div>
        <DropdownSelect
          value={sort || 'dateDesc'}
          onChange={(value) => setSort(value)}
          options={sortOptions}
          placeholder="Sort by date"
        />
      </div>
    </div>
  );
};