export interface JobHistory {
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface Resume {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  objective: string;
  skills: string[];
  workExperience: JobHistory[];
  education: {
    school: string;
    degree: string;
    graduationDate: string;
  }[];
}

export interface JobPosting {
  description: string;
  title: string;
  company: string;
}