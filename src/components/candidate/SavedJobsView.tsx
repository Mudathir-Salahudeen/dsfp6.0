import React from 'react';
import { Bookmark, Compass, ArrowRight } from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import { JobCard } from '../JobCard';

export const SavedJobsView: React.FC = () => {
  const { jobs, savedJobIds, applications, setCandidateTab } = useJobs();

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));
  const appliedJobIds = new Set(applications.map((a) => a.jobId));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-sky-100">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Saved Job Openings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Positions you have bookmarked for easy reference and application.
          </p>
        </div>

        <button
          onClick={() => setCandidateTab('browse')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold text-xs border border-sky-200 transition-all self-start sm:self-auto"
        >
          <Compass className="w-4 h-4 text-sky-500" />
          <span>Explore All Roles</span>
        </button>
      </div>

      {savedJobs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {savedJobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job} 
              hasApplied={appliedJobIds.has(job.id)} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-sky-100 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mx-auto border border-sky-100">
            <Bookmark className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">No saved jobs yet</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Click the bookmark icon on any job card to save roles you want to review and apply to later.
            </p>
          </div>
          <button
            onClick={() => setCandidateTab('browse')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all"
          >
            <span>Browse Available Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

