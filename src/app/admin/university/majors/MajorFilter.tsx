import SearchBar from '@/components/SearchBar';
import { useParamsStore } from '@/hooks/useParamsStore';
import { Button } from 'flowbite-react';

interface MajorFilterProps {
  status: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function MajorFilter({status, setSearch, setStatus, setPageIndex}: MajorFilterProps) {
  return (
    <div className="flex flex-row justify-between items-center w-full mb-5">
      <div className="flex gap-5 mt-3">
        <Button
          className={`btn ${status === '' ? 'btn--primary' : 'btn--primary--outline'}`}
          onClick={() => 
            {
              setStatus('');
              setPageIndex(1);
            }
          }
        >
          All
        </Button>
        <Button
          className={`btn ${status === 'active' ? 'btn--primary' : 'btn--primary--outline'}`}
          onClick={() => 
            {
              setStatus('active');
              setPageIndex(1);
            }
          }
        >
          Active
        </Button>
        <Button
          className={`btn ${status === 'inactive' ? 'btn--primary' : 'btn--primary--outline'}`}
          onClick={() => 
            {
              setStatus('inactive');
              setPageIndex(1);
            }
          }
        >
          Inactive
        </Button>
      </div>

      {/* search bar */}
      <div className="flex justify-end min-w-[700px]">
        <SearchBar setSearch={setSearch} />
      </div>
    </div>
  );
};