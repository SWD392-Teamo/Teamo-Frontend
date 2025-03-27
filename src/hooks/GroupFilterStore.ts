import { create } from 'zustand';
import { Major, Subject, Semester, Field } from '../types';

interface FilterState {
   selectedMajors: Major[];
   selectedSubjects: Subject[];
   selectedSemesters: Semester[];
   selectedFields: Field[];
   
   majors: Major[];
   subjects: Subject[];
   semesters: Semester[];
   fields: Field[];
   
   isLoadingMajors: boolean;
   isLoadingSubjects: boolean;
   isLoadingSemesters: boolean;
   isLoadingFields: boolean;
   
   setMajors: (majors: Major[]) => void;
   setSubjects: (subjects: Subject[]) => void;
   setSemesters: (semesters: Semester[]) => void;
   setFields: (fields: Field[]) => void;
   
   toggleMajor: (major: Major) => void;
   toggleSubject: (subject: Subject) => void;
   toggleSemester: (semester: Semester) => void;
   toggleField: (field: Field) => void;
   
   clearFilters: () => void;
   
   setLoadingState: (filterType: 'majors' | 'subjects' | 'semesters' | 'fields', isLoading: boolean) => void;
 }
 
 export const useFilterStore = create<FilterState>((set) => ({
   selectedMajors: [],
   selectedSubjects: [],
   selectedSemesters: [],
   selectedFields: [],
   
   majors: [],
   subjects: [],
   semesters: [],
   fields: [],
   
   isLoadingMajors: false,
   isLoadingSubjects: false,
   isLoadingSemesters: false,
   isLoadingFields: false,
   
   setMajors: (majors) => set({ majors }),
   setSubjects: (subjects) => set({ subjects }),
   setSemesters: (semesters) => set({ semesters }),
   setFields: (fields) => set({ fields }),
   
   toggleMajor: (major) => set((state) => {
     const isSelected = state.selectedMajors.some(m => m.id === major.id);
     return {
       selectedMajors: isSelected 
         ? state.selectedMajors.filter(m => m.id !== major.id)
         : [...state.selectedMajors, major]
     };
   }),
   
   toggleSubject: (subject) => set((state) => {
     const isSelected = state.selectedSubjects.some(s => s.id === subject.id);
     return {
       selectedSubjects: isSelected 
         ? state.selectedSubjects.filter(s => s.id !== subject.id)
         : [...state.selectedSubjects, subject]
     };
   }),
   
   toggleSemester: (semester) => set((state) => {
     const isSelected = state.selectedSemesters.some(s => s.id === semester.id);
     return {
       selectedSemesters: isSelected 
         ? state.selectedSemesters.filter(s => s.id !== semester.id)
         : [...state.selectedSemesters, semester]
     };
   }),
   
   toggleField: (field) => set((state) => {
     const isSelected = state.selectedFields.some(f => f.id === field.id);
     return {
       selectedFields: isSelected 
         ? state.selectedFields.filter(f => f.id !== field.id)
         : [...state.selectedFields, field]
     };
   }),
   
   clearFilters: () => set({
     selectedMajors: [],
     selectedSubjects: [],
     selectedSemesters: [],
     selectedFields: []
   }),
   
   setLoadingState: (filterType, isLoading) => set((state) => {
     switch (filterType) {
       case 'majors':
         return { isLoadingMajors: isLoading };
       case 'subjects':
         return { isLoadingSubjects: isLoading };
       case 'semesters':
         return { isLoadingSemesters: isLoading };
       case 'fields':
         return { isLoadingFields: isLoading };
       default:
         return state;
     }
   })
 }));