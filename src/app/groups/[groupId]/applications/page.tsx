'use client'

import ApplicationsListing from "@/components/applications/ApplicationsListing";

export default function GroupApplications() {
  // Display and manage group's applications
  return (
    <ApplicationsListing isForUser={false} />
  );
}
