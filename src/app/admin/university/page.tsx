'use client'

import React, { useState } from 'react';
import UniversityInfoHeader from './UniversityInfoHeader';
import MajorsListing from './majors/MajorsListing';

export default function UniversityInformation() {
  const [activeTab, setActiveTab] = useState<'major' | 'subject' | 'field'>('major');
  const [search, setSearch] = useState('');

  return (
    <div className="container mx-auto px-4">
      <UniversityInfoHeader 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSearch={setSearch}
      />
      
      {/* Content area - you can replace these with actual components */}
      <div className="mt-6">
        {activeTab === 'major' && <MajorsListing />}
        {activeTab === 'subject' && <div>Subjects View</div>}
        {activeTab === 'field' && <div>Fields View</div>}
      </div>
    </div>
  );
}
