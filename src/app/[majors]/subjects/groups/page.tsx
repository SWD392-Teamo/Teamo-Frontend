import BackButton from '@/app/components/BackButton';
import SearchBar from '@/app/components/SearchBar';
import { GroupList } from '@/app/interfaces/Group';
import React from 'react'

export const Listings: React.FC<GroupList> = ({ subjects, groups }) => {  
  // const groupData: Record<string, string[]> = {
  //   EXE101: ["Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4",],
  //   SWP391: ["Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4",],
  //   SWD392: ["Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4",],
  //   SSG104: ["Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4",],
  //   EXE201: ["Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4",],
  //   PRM392: ["Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4",],
  //   IOT102: ["Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4",],
  //   SEP490: ["Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4", "Group 1", "Group 2", "Group 3", "Group 4",],
  // };
  // const { subjects } = await params;
  // const groups = groupData[subjects] || "Unknown Subjects";

  return (
    <div className="mb-10">
      <div className="flex items-center">
        <BackButton />
        <h1 className="subject-back-text ml-4">{subjects}</h1>
      </div>
      <div className="">
        <h1 className="page-title">Choose Groups</h1>
      </div>
      <div className="my-10">
        <SearchBar />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {groups.map((group, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{group.name}</h2>
            <p className="text-gray-600 mb-2">{group.members}</p>
            <div className="text-sm text-gray-500 space-x-2">
              {group.position.map((pos, idx) => (
                <span key={idx} className="border-r last:border-none pr-2">
                  {pos}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
