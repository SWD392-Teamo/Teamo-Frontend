import { getData as getGroupData, getUserGroups } from '@/actions/groupActions';
import { getData as getSemesterData } from '@/actions/semesterActions';
import { useGroupStore } from '@/hooks/useGroupStore';
import { useLoading } from '@/providers/LoadingProvider';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/shallow';
import GroupCard from '../../components/groups/GroupCard';
import HandlePaging from '@/components/HandlePaging';
import { useSemesterStore } from '@/hooks/useSemesterStore';
import { useParamsStore } from '@/hooks/useParamsStore';
import GenericTable from '../GenericTable';
import { Group } from '@/types';
import AppPagination from '../AppPagination';
import DropdownSelect from '../DropdownSelect';
import GroupFilter from './GroupFilter';
import SemesterNavbar from './SemesterNavbar';
import SearchBar from '../SearchBar';
import BackButton from '../BackButton';
import { useRouter } from 'next/navigation';
import { Link, PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface Props {
  isForUser?: boolean;
  viewMode: string;
}

export default function GroupsListing({ isForUser, viewMode }: Props) {
  /** LOCAL STATE MANAGEMENT */
  const [search, setSearch] = useState<string>('');
  const [semesterId, setSemesterId] = useState<string>('');
  const [subjectId, setSubjectId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [sort, setSort] = useState<string>('');

  const { showLoading, hideLoading } = useLoading();

  const [visibleItems, setVisibleItems] = useState<number>(2);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const incrementSize = 2;

  const router = useRouter();

  /** GLOBAL STATE MANAGEMENT */

  const data = useGroupStore(
    useShallow((state) => ({
      groups: state.groups,
      totalCount: state.totalCount,
      pageSize: state.pageCount,
    }))
  );

  const setData = useGroupStore((state) => state.setData);

  const url = queryString.stringifyUrl({
    url: '',
    query: {
      pageIndex,
      pageSize,
      semesterId,
      subjectId,
      status,
      sort,
      ...(search.trim() ? { search } : {}),
    },
  });
  console.log(url);
  /** FETCH DATA */

  //FETCH GROUP
  useEffect(() => {
    const fetchGroups = async () => {
      showLoading();
      try {
        const groups = isForUser
          ? await getUserGroups(url)
          : await getGroupData(url);
        console.log(groups);
        // Format Created Date
        const formattedGroups = {
          ...groups,
          data: groups.data.map((group) => ({
            ...group,
            createdAt: new Date(group.createdAt).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }),
          })),
        };

        setData(formattedGroups);
      } catch (error) {
        toast.error('Failed to load groups');
      } finally {
        hideLoading();
      }
    };

    fetchGroups();
  }, [url, isForUser]);

  /** TABLE CONFIGURATIONS */
  // COLLUMNS
  const columns = [
    { header: 'ID', key: 'id' },
    { header: 'Name', key: 'name' },
    { header: 'Created By', key: 'createdByUserName' },
    { header: 'Created At', key: 'createdAt' },
    { header: 'Subject Code', key: 'subjectCode' },
    { header: 'Semester Name', key: 'semesterName' },
    { header: 'Status', key: 'status' },
  ];

  /** HANDLE ACTIONS */
  const handleRowClick = (id: number) => {
    router.push(`groups/details/${id}`);
  };

  const handleSeeMore = () => {
    // Check if we need to fetch more data
    if (visibleItems >= data.groups.length && visibleItems < data.totalCount) {
      setPageSize((prev) => prev + incrementSize);
    }
    // Increase visible items
    setVisibleItems((prev) => Math.min(prev + incrementSize, data.totalCount));
  };
  const handleSeeLess = () => {
    // Reset visible items to initial value
    setVisibleItems(incrementSize);
  };
  const handleResetFilter = () => {
    setSemesterId('');
    setSubjectId('');
    setSearch('');
    setStatus('');
    setSort('');
  };

  return (
    <div className=' mb-10'>
      <div className='mb-10'>
        {/* Title */}
        <div className='flex items-center space-x-3 py-4 px-2'>
          <h1 className='page-title'>{isForUser ? 'My Groups' : 'Groups'}</h1>
          <span className='text-gray-600 mt-4'>({data.totalCount} groups)</span>
        </div>
        {/* search bar */}
        <div className='flex items-center justify-between pr-10'>
          <SearchBar setSearch={setSearch} />
          {isForUser && (
            <Button onClick={() => router.push('/groups/create')}>
              <PlusIcon className='mr-2 h-4 w-4' />
              Create Group
            </Button>
          )}
        </div>
      </div>

      <div>
        {viewMode === 'Card' ? (
          <div>
            {/* Semester navbar */}
            <SemesterNavbar
              semesterId={semesterId}
              setSemesterId={setSemesterId}
            />
            {/* Group Cards */}
            <div className='grid grid-cols-2 gap-6'>
              {data.groups &&
                data.groups
                  .slice(0, visibleItems)
                  .map((group) => <GroupCard key={group.id} group={group} />)}
            </div>
            {/* paging */}
            <HandlePaging
              visibleItems={visibleItems}
              totalItems={data.totalCount}
              initialItems={incrementSize}
              handleSeeMore={handleSeeMore}
              handleSeeLess={handleSeeLess}
            />
          </div>
        ) : (
          <div>
            {/* Filter */}
            <div className='mb-10'>
              <GroupFilter
                semesterId={semesterId}
                subjectId={subjectId}
                status={status}
                sort={sort}
                setSemesterId={setSemesterId}
                setSubjectId={setSubjectId}
                setStatus={setStatus}
                setSort={setSort}
                setSearch={setSearch}
              />
            </div>
            {/* Table */}
            {data.groups.length > 0 ? (
              <div className='mb-5'>
                <GenericTable<Group>
                  data={data.groups}
                  columns={columns}
                  onRowClick={handleRowClick}
                />
              </div>
            ) : (
              <div className='flex flex-col gap-2 justify-center items-center shadow-lg p-5 mt-5 bg-tertiary'>
                <h1 className='page-title'>Empty Result</h1>
              </div>
            )}
            {/* paging */}
            {data.totalCount > data.pageSize && (
              <div className='flex justify-end mt-5'>
                <AppPagination
                  currentPage={pageIndex}
                  pageSize={data.pageSize}
                  totalCount={data.totalCount}
                  pageChanged={setPageIndex}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
