'use client'

import React, { useState } from 'react';
import UniversityInfoHeader from './UniversityInfoHeader';
import MajorsListing from './majors/MajorsListing';
import SubjectsListing from './subjects/SubjectsListing';
import FieldsListing from './fields/FieldsListing';
import SemestersListing from './semesters/SemestersListing';
import SkillsListing from './skills/SkillsListing';

export default function UniversityInformation() {
  const [activeTab, setActiveTab] = useState<'major' | 'subject' | 'field' | 'semester' | 'skill'>('major');
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
        {activeTab === 'subject' && <SubjectsListing />}
        {activeTab === 'field' && <FieldsListing />}
        {activeTab === 'semester' && <SemestersListing />}
        {activeTab === 'skill' && <SkillsListing />}
      </div>
    </div>
  );
}
