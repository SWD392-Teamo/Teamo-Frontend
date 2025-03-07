import React from 'react';
import { Button } from 'flowbite-react';
import DropdownSelect from '../DropdownSelect';
import { useParamsStore } from '@/hooks/useParamsStore';

export default function ApplicationFilter() {

  const setParams = useParamsStore(state => state.setParams)
  const sort = useParamsStore(state => state.sort)
  const status = useParamsStore(state => state.status)

  const sortOptions = [
    { value: 'dateAsc', label: 'Date (Oldest First)' },
    { value: 'dateDesc', label: 'Date (Newest First)' }
  ];

  return (
    <div className="flex flex-row justify-between items-center w-full mb-5">
      <div className="flex gap-5">
        <Button
          className={`btn ${status === undefined ? 'btn--primary' : 'btn--primary--outline'}`}
          onClick={() => setParams({status: undefined})}
        >
          All
        </Button>
        <Button
          className={`btn ${status === 'approved' ? 'btn--primary' : 'btn--primary--outline'}`}
          onClick={() => setParams({status: 'approved'})}
        >
          Approved
        </Button>
        <Button
          className={`btn ${status === 'rejected' ? 'btn--primary' : 'btn--primary--outline'}`}
          onClick={() => setParams({status: 'rejected'})}
        >
          Rejected
        </Button>
      </div>
      <div>
        <DropdownSelect
          value={sort || 'dateDesc'}
          onChange={(value) => setParams({sort: value})}
          options={sortOptions}
          placeholder="Sort by date"
        />
      </div>
    </div>
  );
};