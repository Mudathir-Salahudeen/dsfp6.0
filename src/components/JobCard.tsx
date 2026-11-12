import React from 'react';
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  ArrowUpRight, 
  Users, 
  Sparkles,
  Building2
} from 'lucide-react';
import { Job } from '../types/job';
import { useJobs } from '../context/JobContext';

interface JobCardProps {
  job: Job;
  hasApplied?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, hasApplied = false }) => {
  const { savedJobIds, toggleSaveJob, setSelectedJob, setApplyingJob } = useJobs();
  const isSaved = savedJobIds.includes(job.id);

  const formatSalary = (min: number, max: number, currency: string) => {
    const minK = Math.round(min / 1000);
    const maxK = Math.round(max / 1000);
    return `${currency}${minK}k - ${currency}${maxK}k / yr`;
  };

  const getWorkplaceBadgeColor = (type: string) => {
    switch (type) {
      case 'Remote':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Hybrid':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-sky-100 hover:border-sky-300 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
      
      {/* Top Banner & Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-100 via-sky-50 to-white border border-sky-200 flex items-center justify-center text-sky-600 shadow-sm group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-500 flex items-center gap-1.5">
                {job.company}
                {job.featured && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                    Featured
                  </span>
                )}
              </h4>
              <h3 
                onClick={() => setSelectedJob(job)}
                className="text-lg font-bold text-slate-800 hover:text-sky-600 cursor-pointer transition-colors line-clamp-1"
                title={job.title}
              >
                {job.title}
              </h3>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveJob(job.id);
            }}
            className={`p-2 rounded-xl transition-all ${
              isSaved
                ? 'bg-sky-50 text-sky-600 ring-1 ring-sky-200'
                : 'text-slate-400 hover:text-sky-600 hover:bg-slate-50'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save job opening'}
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5 fill-sky-500 text-sky-600" /> : <Bookmark className="w-5 h-5" />}
          </button>
        </div>

        {/* Location & Key Info */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-600 mt-2">
          <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 font-medium">
            <MapPin className="w-3.5 h-3.5 text-sky-500" />
            {job.location}
          </span>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs font-semibold ${getWorkplaceBadgeColor(job.workplaceType)}`}>
            {job.workplaceType}
          </span>
          <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 font-medium">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            {job.type}
          </span>
          <span className="flex items-center gap-1 bg-sky-50/70 text-sky-800 px-2.5 py-1 rounded-md border border-sky-100 font-semibold">
            <DollarSign className="w-3.5 h-3.5 text-sky-600" />
            {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
          </span>
        </div>

        {/* Short description excerpt */}
        <p className="text-slate-600 text-xs sm:text-sm mt-3.5 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {job.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-700 transition-colors"
            >
              {tag}
            </span>
          ))}
          {job.tags.length > 4 && (
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
              +{job.tags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Metadata & CTAs */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {job.postedDate}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {job.applicantCount || 0} applicants
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedJob(job)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-sky-700 hover:bg-sky-50 transition-colors"
          >
            Details
          </button>
          
          {hasApplied ? (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Applied
            </span>
          ) : (
            <button
              onClick={() => setApplyingJob(job)}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white shadow-sm shadow-sky-500/20 transition-all hover:gap-1.5"
            >
              <span>Apply</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

