import { Pagination } from 'flowbite-react'
import React from 'react'

type Props = {
    currentPage: number
    totalCount: number
    pageSize: number
    pageChanged: (page: number) => void
}

export default function AppPagination({currentPage, pageSize, totalCount, pageChanged}: Props) {
  const totalPages = pageSize > 0 ? Math.ceil(totalCount / pageSize) : 1;

  return (
    <Pagination 
        currentPage={currentPage}
        onPageChange={e => pageChanged(e)}
        totalPages={totalPages}
        layout='pagination'
        showIcons={true}
        theme={{
          base: "pagination",
          pages: {
            base: "pagination--pages",
            showIcon: "inline-flex",
            previous: {
              base: "pagination--page pagination--prev pagination--page--primary flex items-center justify-center gap-2 min-w-[100px] px-3",
              icon: "w-4 h-4"
            },
            next: {
              base: "pagination--page pagination--next pagination--page--primary flex items-center justify-center gap-2 min-w-[100px] px-3",
              icon: "w-4 h-4"
            },
            selector: {
              base: "pagination--page pagination--page--primary",
              active: "active",
              disabled: "opacity-50 cursor-not-allowed"
            }
          }
        }}
    />
  )
}
