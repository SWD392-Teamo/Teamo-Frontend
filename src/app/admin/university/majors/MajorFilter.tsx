import { useParamsStore } from '@/hooks/useParamsStore';
import { Button } from 'flowbite-react';

export default function MajorFilter() {
  const setParams = useParamsStore(state => state.setParams)
  const status = useParamsStore(state => state.status)

  return (
    <div className="flex flex-row justify-between items-center w-full mb-5">
      <div className="flex gap-5 mt-3">
        <Button
          className={`btn ${status === undefined ? 'btn--primary' : 'btn--primary--outline'}`}
          onClick={() => setParams({status: undefined})}
        >
          All
        </Button>
        <Button
          className={`btn ${status === 'active' ? 'btn--primary' : 'btn--primary--outline'}`}
          onClick={() => setParams({status: 'active'})}
        >
          Active
        </Button>
        <Button
          className={`btn ${status === 'inactive' ? 'btn--primary' : 'btn--primary--outline'}`}
          onClick={() => setParams({status: 'inactive'})}
        >
          Inactive
        </Button>
      </div>
    </div>
  );
};