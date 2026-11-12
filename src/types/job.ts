export type WorkplaceType = 'Remote' | 'Hybrid' | 'On-site';
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type ExperienceLevel = 'Entry-level' | 'Mid-level' | 'Senior' | 'Lead' | 'Executive';
export type JobStatus = 'active' | 'draft' | 'closed';

export type ApplicationStatus = 'applied' | 'reviewing' | 'interview' | 'offer' | 'rejected';

export interface RecruiterNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  department: string;
  location: string;
  workplaceType: WorkplaceType;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  status: JobStatus;
  postedDate: string;
  deadline?: string;
  applicantCount: number;
  featured?: boolean;
  tags: string[];
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateLinkedIn?: string;
  candidatePortfolio?: string;
  yearsOfExperience: string;
  coverLetter?: string;
  resumeFileName?: string;
  resumeFileSize?: string;
  appliedAt: string;
  status: ApplicationStatus;
  rating?: number; // 1 to 5 stars
  recruiterNotes?: RecruiterNote[];
}

export type UserRole = 'candidate' | 'admin';

export interface FilterState {
  search: string;
  department: string;
  workplaceType: string;
  jobType: string;
  experienceLevel: string;
  salaryMin?: number;
  featuredOnly: boolean;
}

