"use client";

import GroupsListing from "@/components/groups/GroupsListing";

export default function MyGroups() {
  // Display my groups
  return <GroupsListing isForUser={true} viewMode="Card" />;
}
