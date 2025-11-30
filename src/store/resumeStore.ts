import { create } from 'zustand';
import type { Resume, JobPosting, JobHistory } from '../types';

interface ResumeStore {
  resume: Resume;
  jobPosting: JobPosting | null;
  setJobPosting: (posting: JobPosting) => void;
  setWorkExperience: (jobs: JobHistory[]) => void;
  updateResume: (updates: Partial<Resume>) => void;
  updatePersonalInfo: (info: Resume['personalInfo']) => void;
  updateSummary: (summary: string) => void;
  updateObjective: (objective: string) => void;
  updateSkills: (skills: string[]) => void;
}

const defaultResume: Resume = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  objective: '',
  skills: [],
  workExperience: [],
  education: [],
};

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: defaultResume,
  jobPosting: null,
  setJobPosting: (posting) => set({ jobPosting: posting }),
  setWorkExperience: (jobs) =>
    set((state) => ({
      resume: {
        ...state.resume,
        workExperience: jobs,
      },
    })),
  updateResume: (updates) =>
    set((state) => ({
      resume: {
        ...state.resume,
        ...updates,
      },
    })),
  updatePersonalInfo: (info) =>
    set((state) => ({
      resume: {
        ...state.resume,
        personalInfo: info,
      },
    })),
  updateSummary: (summary) =>
    set((state) => ({
      resume: {
        ...state.resume,
        summary,
      },
    })),
  updateObjective: (objective) =>
    set((state) => ({
      resume: {
        ...state.resume,
        objective,
      },
    })),
  updateSkills: (skills) =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills,
      },
    })),
}));