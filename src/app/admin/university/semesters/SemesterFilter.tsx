import SearchBar from '@/components/SearchBar';
import { Button } from 'flowbite-react';

interface SemesterFilterProps {
  status?: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setStatus?: React.Dispatch<React.SetStateAction<string>>;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function SemesterFilter({status, setSearch, setStatus, setPageIndex}: SemesterFilterProps) {
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
            className={`btn ${status === 'ongoing' ? 'btn--primary' : 'btn--primary--outline'}`}
            onClick={() => 
              {
                setStatus('ongoing');
                setPageIndex(1);
              }
            }
          >
            OnGoing
          </Button>
          <Button
            className={`btn ${status === 'past' ? 'btn--primary' : 'btn--primary--outline'}`}
            onClick={() => 
              {
                setStatus('past');
                setPageIndex(1);
              }
            }
          >
            Past
          </Button>
          <Button
            className={`btn ${status === 'upcoming' ? 'btn--primary' : 'btn--primary--outline'}`}
            onClick={() => 
              {
                setStatus('upcoming');
                setPageIndex(1);
              }
            }
          >
            Upcoming
          </Button>
        </div>
      }

      {/* search bar */}
      <div className={`flex ${setStatus != undefined ? 'justify-end' : 'justify-start'} min-w-[600px]`}>
        <SearchBar setSearch={setSearch} />
      </div>
    </div>
  );
};