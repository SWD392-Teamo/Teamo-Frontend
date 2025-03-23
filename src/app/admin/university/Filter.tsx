import SearchBar from '@/components/SearchBar';
import { Button } from 'flowbite-react';

interface FilterProps {
  status?: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setStatus?: React.Dispatch<React.SetStateAction<string>>;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Filter({status, setSearch, setStatus, setPageIndex}: FilterProps) {
  return (
    <div className="flex flex-row justify-between items-center w-full mb-5">
      {setStatus && 
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
      }

      {/* search bar */}
      <div className={`flex ${setStatus != undefined ? 'justify-end' : 'justify-start'} min-w-[700px]`}>
        <SearchBar setSearch={setSearch} />
      </div>
    </div>
  );
};