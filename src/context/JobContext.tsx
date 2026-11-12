import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, Application, UserRole, ApplicationStatus, RecruiterNote } from '../types/job';
import { INITIAL_JOBS, INITIAL_APPLICATIONS } from '../data/mockData';

interface JobContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  jobs: Job[];
  applications: Application[];
  savedJobIds: string[];
  
  // Navigation tabs
  candidateTab: 'browse' | 'my-applications' | 'saved';
  setCandidateTab: (tab: 'browse' | 'my-applications' | 'saved') => void;
  adminTab: 'dashboard' | 'jobs' | 'ats';
  setAdminTab: (tab: 'dashboard' | 'jobs' | 'ats') => void;
  
  // Modals & Drawers
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  applyingJob: Job | null;
  setApplyingJob: (job: Job | null) => void;
  isCreateJobOpen: boolean;
  setIsCreateJobOpen: (open: boolean) => void;
  editingJob: Job | null;
  setEditingJob: (job: Job | null) => void;
  selectedApplication: Application | null;
  setSelectedApplication: (app: Application | null) => void;

  // Actions
  addJob: (newJob: Omit<Job, 'id' | 'postedDate' | 'applicantCount'>) => void;
  updateJob: (id: string, updated: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  toggleJobStatus: (id: string) => void;
  submitApplication: (appData: Omit<Application, 'id' | 'appliedAt' | 'status'>) => void;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  updateApplicationRating: (appId: string, rating: number) => void;
  addRecruiterNote: (appId: string, text: string, author?: string) => void;
  withdrawApplication: (appId: string) => void;
  toggleSaveJob: (jobId: string) => void;
  resetToDefaults: () => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const STORAGE_KEYS = {
  JOBS: 'talentwave_jobs_v1',
  APPLICATIONS: 'talentwave_applications_v1',
  SAVED_JOBS: 'talentwave_saved_jobs_v1',
  ROLE: 'talentwave_role_v1',
};

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved === 'admin' || saved === 'candidate') ? saved : 'candidate';
  });

  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading jobs from localStorage', e);
    }
    return INITIAL_JOBS;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading applications from localStorage', e);
    }
    return INITIAL_APPLICATIONS;
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading saved jobs from localStorage', e);
    }
    return ['job-1', 'job-2'];
  });

  const [candidateTab, setCandidateTab] = useState<'browse' | 'my-applications' | 'saved'>('browse');
  const [adminTab, setAdminTab] = useState<'dashboard' | 'jobs' | 'ats'>('dashboard');

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const addJob = (newJobData: Omit<Job, 'id' | 'postedDate' | 'applicantCount'>) => {
    const newJob: Job = {
      ...newJobData,
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      applicantCount: 0,
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const updateJob = (id: string, updated: Partial<Job>) => {
    setJobs(prev => prev.map(job => (job.id === id ? { ...job, ...updated } : job)));
    if (selectedJob && selectedJob.id === id) {
      setSelectedJob(prev => prev ? { ...prev, ...updated } : null);
    }
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
    if (selectedJob?.id === id) setSelectedJob(null);
  };

  const toggleJobStatus = (id: string) => {
    setJobs(prev =>
      prev.map(job => {
        if (job.id === id) {
          const nextStatus = job.status === 'active' ? 'closed' : 'active';
          return { ...job, status: nextStatus };
        }
        return job;
      })
    );
  };

  const submitApplication = (appData: Omit<Application, 'id' | 'appliedAt' | 'status'>) => {
    const newApplication: Application = {
      ...appData,
      id: `app-${Date.now()}`,
      appliedAt: new Date().toISOString(),
      status: 'applied',
      rating: 0,
      recruiterNotes: [],
    };

    setApplications(prev => [newApplication, ...prev]);

    // Increment applicant count on job
    setJobs(prev =>
      prev.map(job => (job.id === appData.jobId ? { ...job, applicantCount: (job.applicantCount || 0) + 1 } : job))
    );
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    setApplications(prev =>
      prev.map(app => (app.id === appId ? { ...app, status } : app))
    );
    if (selectedApplication && selectedApplication.id === appId) {
      setSelectedApplication(prev => prev ? { ...prev, status } : null);
    }
  };

  const updateApplicationRating = (appId: string, rating: number) => {
    setApplications(prev =>
      prev.map(app => (app.id === appId ? { ...app, rating } : app))
    );
    if (selectedApplication && selectedApplication.id === appId) {
      setSelectedApplication(prev => prev ? { ...prev, rating } : null);
    }
  };

  const addRecruiterNote = (appId: string, text: string, author: string = 'Recruitment Team') => {
    const newNote: RecruiterNote = {
      id: `note-${Date.now()}`,
      author,
      text,
      createdAt: new Date().toISOString(),
    };

    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId) {
          const notes = app.recruiterNotes || [];
          return { ...app, recruiterNotes: [newNote, ...notes] };
        }
        return app;
      })
    );

    if (selectedApplication && selectedApplication.id === appId) {
      setSelectedApplication(prev => {
        if (!prev) return null;
        const notes = prev.recruiterNotes || [];
        return { ...prev, recruiterNotes: [newNote, ...notes] };
      });
    }
  };

  const withdrawApplication = (appId: string) => {
    setApplications(prev => prev.filter(app => app.id !== appId));
    if (selectedApplication?.id === appId) setSelectedApplication(null);
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const resetToDefaults = () => {
    setJobs(INITIAL_JOBS);
    setApplications(INITIAL_APPLICATIONS);
    setSavedJobIds(['job-1', 'job-2']);
    localStorage.removeItem(STORAGE_KEYS.JOBS);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.SAVED_JOBS);
  };

  return (
    <JobContext.Provider
      value={{
        role,
        setRole,
        jobs,
        applications,
        savedJobIds,
        candidateTab,
        setCandidateTab,
        adminTab,
        setAdminTab,
        selectedJob,
        setSelectedJob,
        applyingJob,
        setApplyingJob,
        isCreateJobOpen,
        setIsCreateJobOpen,
        editingJob,
        setEditingJob,
        selectedApplication,
        setSelectedApplication,
        addJob,
        updateJob,
        deleteJob,
        toggleJobStatus,
        submitApplication,
        updateApplicationStatus,
        updateApplicationRating,
        addRecruiterNote,
        withdrawApplication,
        toggleSaveJob,
        resetToDefaults,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

