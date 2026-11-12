import React from 'react';
import { 
  FileText, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  ExternalLink, 
  Trash2, 
  Compass, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import { ApplicationStatus } from '../../types/job';

export const MyApplicationsView: React.FC = () => {
  const { applications, jobs, setSelectedJob, withdrawApplication, setCandidateTab } = useJobs();

  const getStatusConfig = (status: ApplicationStatus) => {
    switch (status) {
      case 'applied':
        return {
          label: 'Application Received',
          color: 'bg-sky-50 text-sky-700 border-sky-200',
          dotColor: 'bg-sky-500',
          stepIndex: 1,
          description: 'Your application has been received and is waiting for recruiter review.',
        };
      case 'reviewing':
        return {
          label: 'Under Review',
          color: 'bg-amber-50 text-amber-700 border-amber-200',
          dotColor: 'bg-amber-500',
          stepIndex: 2,
          description: 'The hiring team is currently evaluating your profile and resume.',
        };
      case 'interview':
        return {
          label: 'Interview Stage',
          color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotColor: 'bg-indigo-500',
          stepIndex: 3,
          description: 'You have been shortlisted for an interview! Check your email for scheduling.',
        };
      case 'offer':
        return {
          label: 'Offer Extended 🎉',
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotColor: 'bg-emerald-500',
          stepIndex: 4,
          description: 'Congratulations! An offer has been extended by the hiring manager.',
        };
      case 'rejected':
        return {
          label: 'Archived',
          color: 'bg-slate-100 text-slate-600 border-slate-200',
          dotColor: 'bg-slate-400',
          stepIndex: 2,
          description: 'The company has decided to proceed with other candidates at this time.',
        };
    }
  };

  const stages = [
    { key: 'applied', label: 'Submitted' },
    { key: 'reviewing', label: 'Reviewing' },
    { key: 'interview', label: 'Interview' },
    { key: 'offer', label: 'Decision' },
  ];

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-sky-100">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Job Applications
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track the live progress of all roles you have applied for.
          </p>
        </div>

        <button
          onClick={() => setCandidateTab('browse')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold text-xs border border-sky-200 transition-all self-start sm:self-auto"
        >
          <Compass className="w-4 h-4 text-sky-500" />
          <span>Browse More Roles</span>
        </button>
      </div>

      {/* Applications List */}
      {applications.length > 0 ? (
        <div className="space-y-5">
          {applications.map((app) => {
            const config = getStatusConfig(app.status);
            const matchingJob = jobs.find((j) => j.id === app.jobId);

            return (
              <div 
                key={app.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-sky-100 hover:border-sky-300 shadow-sm p-6 transition-all space-y-6"
              >
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-100 to-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 flex-shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          {app.company}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${config.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></span>
                          {config.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                        {app.jobTitle}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-sky-400" />
                          Applied on {formatDate(app.appliedAt)}
                        </span>
                        {app.resumeFileName && (
                          <span className="flex items-center gap-1 text-slate-600 font-medium">
                            <FileText className="w-3.5 h-3.5 text-sky-500" />
                            {app.resumeFileName}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {matchingJob && (
                      <button
                        onClick={() => setSelectedJob(matchingJob)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors"
                      >
                        <span>View Job Opening</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (confirm(`Withdraw your application for ${app.jobTitle}?`)) {
                          withdrawApplication(app.id);
                        }
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Withdraw application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Stepper Bar */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100">
                  <div className="flex items-center justify-between relative max-w-2xl mx-auto">
                    
                    {/* Connecting line */}
                    <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-slate-200 -z-0">
                      <div 
                        className="h-full bg-sky-500 transition-all duration-500"
                        style={{
                          width: app.status === 'rejected' 
                            ? '33%' 
                            : app.status === 'offer'
                            ? '100%'
                            : app.status === 'interview'
                            ? '75%'
                            : app.status === 'reviewing'
                            ? '50%'
                            : '20%'
                        }}
                      ></div>
                    </div>

                    {stages.map((stage, sIdx) => {
                      const isComplete = config.stepIndex >= sIdx + 1;
                      const isCurrent = (
                        (stage.key === 'applied' && app.status === 'applied') ||
                        (stage.key === 'reviewing' && app.status === 'reviewing') ||
                        (stage.key === 'interview' && app.status === 'interview') ||
                        (stage.key === 'offer' && app.status === 'offer')
                      );

                      return (
                        <div key={stage.key} className="flex flex-col items-center relative z-10">
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                              isCurrent
                                ? 'bg-sky-500 text-white ring-4 ring-sky-100 scale-110'
                                : isComplete
                                ? 'bg-sky-600 text-white'
                                : 'bg-white border-2 border-slate-300 text-slate-400'
                            }`}
                          >
                            {isComplete && !isCurrent ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              sIdx + 1
                            )}
                          </div>
                          <span className={`text-[11px] font-semibold mt-2 ${
                            isCurrent ? 'text-sky-700' : isComplete ? 'text-slate-700' : 'text-slate-400'
                          }`}>
                            {stage.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Status explanation note */}
                  <p className="text-center text-xs text-slate-600 mt-4 pt-3 border-t border-slate-200/60 font-medium">
                    {config.description}
                  </p>
                </div>

                {/* Cover letter excerpt */}
                {app.coverLetter && (
                  <div className="text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-slate-100">
                    <p className="font-semibold text-slate-700 mb-1">Your Submitted Note:</p>
                    <p className="italic text-slate-500 line-clamp-2">"{app.coverLetter}"</p>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-sky-100 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mx-auto border border-sky-100">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">No applications submitted yet</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse our open positions and submit your profile. You'll be able to track every stage of the review right here.
            </p>
          </div>
          <button
            onClick={() => setCandidateTab('browse')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all"
          >
            <span>Explore Open Roles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};

