import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  Users, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  Gift, 
  Sparkles,
  Check,
  Building2
} from 'lucide-react';
import { useJobs } from '../context/JobContext';

export const JobDetailModal: React.FC = () => {
  const { 
    selectedJob, 
    setSelectedJob, 
    setApplyingJob, 
    savedJobIds, 
    toggleSaveJob,
    applications 
  } = useJobs();

  const [copied, setCopied] = useState(false);

  if (!selectedJob) return null;

  const isSaved = savedJobIds.includes(selectedJob.id);
  const hasApplied = applications.some(a => a.jobId === selectedJob.id);

  const formatSalary = (min: number, max: number, currency: string) => {
    return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()} per year`;
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-sky-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="relative bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 p-6 sm:p-8 text-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-inner">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sky-100 font-semibold text-sm sm:text-base">
                    {selectedJob.company}
                  </span>
                  {selectedJob.featured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-950">
                      <Sparkles className="w-3 h-3 text-amber-900 fill-amber-900" />
                      Featured
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {selectedJob.title}
                </h2>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedJob(null)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Meta Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-6 text-xs font-medium">
            <span className="bg-white/15 px-3 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-200" />
              {selectedJob.location}
            </span>
            <span className="bg-white/15 px-3 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-sky-200" />
              {selectedJob.workplaceType} • {selectedJob.type}
            </span>
            <span className="bg-white/15 px-3 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-sky-200" />
              {formatSalary(selectedJob.salaryMin, selectedJob.salaryMax, selectedJob.currency)}
            </span>
            <span className="bg-white/15 px-3 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sky-200" />
              Posted {selectedJob.postedDate}
            </span>
            <span className="bg-white/15 px-3 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-sky-200" />
              {selectedJob.applicantCount || 0} applicants
            </span>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700">
          
          {/* About Role */}
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs mb-2 text-sky-600">
              Role Overview
            </h3>
            <p className="leading-relaxed text-sm sm:text-base text-slate-600">
              {selectedJob.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-sky-500 rounded-full"></span>
                Key Responsibilities
              </h3>
              <ul className="space-y-2.5">
                {selectedJob.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {selectedJob.requirements && selectedJob.requirements.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-sky-500 rounded-full"></span>
                Requirements & Qualifications
              </h3>
              <ul className="space-y-2.5">
                {selectedJob.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 flex-shrink-0"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {selectedJob.benefits && selectedJob.benefits.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Gift className="w-4 h-4 text-sky-500" />
                Benefits & Perks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedJob.benefits.map((benefit, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-sky-50/60 border border-sky-100 text-xs sm:text-sm text-sky-900 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skill Tags */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Skills & Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedJob.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => toggleSaveJob(selectedJob.id)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                isSaved
                  ? 'bg-sky-50 text-sky-700 border-sky-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 fill-sky-500 text-sky-600" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 text-slate-400" />
                  <span>Save Job</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-slate-400" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>

          <div className="w-full sm:w-auto">
            {hasApplied ? (
              <div className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-center text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You Have Already Applied</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setApplyingJob(selectedJob);
                  setSelectedJob(null);
                }}
                className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Apply for this Position
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

