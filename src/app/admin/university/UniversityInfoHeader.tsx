'use client'

import React from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

type Tab = 'major' | 'subject' | 'field';

interface UniversityInfoHeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function UniversityInfoHeader({
  activeTab,
  setActiveTab,
  setSearch,
}: UniversityInfoHeaderProps) {
  const tabs: { id: Tab; name: string }[] = [
    { id: 'major', name: 'Majors' },
    { id: 'subject', name: 'Subjects' },
    { id: 'field', name: 'Fields' },
  ];

  return (
    <div className="mb-10">
      {/* search bar */}
      <div className="my-10">
        <SearchBar setSearch={setSearch} />
      </div>

      {/* Navigation Bar */}
      <div className="w-full border-t border-b border-gray-200">
        <div className="overflow-x-auto">
          <nav className="flex justify-start content-around gap-10 px-4">
            {tabs.map((tab, index) => {
              const isActive = tab.id === activeTab;
              return (
                <React.Fragment key={tab.id}>
                  <Link
                    href="#"
                    onClick={() => setActiveTab(tab.id)}
                    className={`link ${isActive ? "active" : ""} p-5`}
                  >
                    {tab.name}
                  </Link>
                  {index < tabs.length - 1 && (
                    <span className="sr-only">, </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      </div>
      {/* Title */}
      <h1 className="page-title">University Information</h1>
    </div>
  );
}
