'use client'

import { useParamsStore } from '@/hooks/useParamsStore';
import { useSubjectStore } from '@/hooks/useSubjectStore';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { getData } from '../../actions/subjectAction';
import Paginator from '../../components/Paginator';

export default function Listings() {
  // Loading state
  const [loading, setLoading] = useState(true);

  // Put all params into a single object
  const params = useParamsStore(useShallow(state => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
    search: state.search
  })));

  // Put all data into a paged object
  const data = useSubjectStore(useShallow(state => ({
    subjects: state.subjects,
    totalCount: state.totalCount,
    pageCount: state.pageCount
  })))

  const setData = useSubjectStore(state => state.setData);
  const setParams = useParamsStore(state => state.setParams);
  const resetParams = useParamsStore(state => state.reset);
  
  // Create a query string for fetching data with filters
  const url = queryString.stringifyUrl({url: '', query: params})

  function setPageIndex(pageIndex: number) {
    setParams({pageIndex})
  }

  // Rerender component depends on pageNumber
  useEffect(() => {
    resetParams();
    getData(url).then(data => {
      setData(data);
      setLoading(false);
    })
  }, [url, setData])

  if(loading) return <h3>Loading...</h3>
  return (
    <div>
      <div>Subjects list here</div>
      <div className='flex justify-center mt-4'>
          <Paginator pageChanged={setPageIndex} 
            currentPage={params.pageIndex} pageCount={data.pageCount} />
      </div>
    </div>
  )
}
