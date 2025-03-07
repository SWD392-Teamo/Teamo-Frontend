import ApplicationsListing from '@/components/applications/ApplicationsListing'
import React from 'react'

export default function MyApplication() {
  // Display and manage user's applications
  return (
    <ApplicationsListing isForUser={true}/>
  )
}
