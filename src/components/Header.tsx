import React from 'react';
import { 
  Briefcase, 
  Users, 
  UserCheck, 
  PlusCircle, 
  Bookmark, 
  FileText, 
  Compass, 
  LayoutDashboard, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useJobs } from '../context/JobContext';

export const Header: React.FC = () => {
  const { 
    role, 
    setRole, 
    candidateTab, 
    setCandidateTab, 
    adminTab, 
    setAdminTab,
    jobs,
    applications,
    savedJobIds,
    setIsCreateJobOpen,
    resetToDefaults
  } = useJobs();

  const activeJobsCount = jobs.filter(j => j.status === 'active').length;
  const userApplicationsCount = applications.length;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 ring-2 ring-sky-100">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 bg-clip-text text-transparent">
                  TalentWave
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
                  <Sparkles className="w-3 h-3 mr-1 text-sky-500" />
                  Tracker & ATS
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Smart Job Discovery & Hiring Platform
              </p>
            </div>
          </div>

          {/* Navigation Tabs based on Role */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {role === 'candidate' ? (
              <>
                <button
                  onClick={() => setCandidateTab('browse')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    candidateTab === 'browse'
                      ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-200'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  <Compass className="w-4 h-4 text-sky-500" />
                  <span>Explore Jobs</span>
                  <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-bold">
                    {activeJobsCount}
                  </span>
                </button>

                <button
                  onClick={() => setCandidateTab('my-applications')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    candidateTab === 'my-applications'
                      ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-200'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-4 h-4 text-sky-500" />
                  <span>My Applications</span>
                  {userApplicationsCount > 0 && (
                    <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-sky-500 text-white font-bold">
                      {userApplicationsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setCandidateTab('saved')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    candidateTab === 'saved'
                      ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-200'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className="w-4 h-4 text-sky-500" />
                  <span>Saved Roles</span>
                  <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px]">
                    {savedJobIds.length}
                  </span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setAdminTab('dashboard')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    adminTab === 'dashboard'
                      ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-200'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-sky-500" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => setAdminTab('jobs')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    adminTab === 'jobs'
                      ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-200'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-sky-500" />
                  <span>Job Postings</span>
                  <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-bold">
                    {jobs.length}
                  </span>
                </button>

                <button
                  onClick={() => setAdminTab('ats')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    adminTab === 'ats'
                      ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-200'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  <Users className="w-4 h-4 text-sky-500" />
                  <span>Applicant Pipeline</span>
                  <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-sky-500 text-white font-bold">
                    {applications.length}
                  </span>
                </button>
              </>
            )}
          </nav>

          {/* Right Controls: Role Switcher & Post Job */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Post Job for Admin */}
            {role === 'admin' && (
              <button
                onClick={() => setIsCreateJobOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm shadow-md shadow-sky-500/20 transition-all transform active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Post Opening</span>
                <span className="sm:hidden">Post</span>
              </button>
            )}

            {/* Role Switcher Pill */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200/80">
              <button
                onClick={() => setRole('candidate')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  role === 'candidate'
                    ? 'bg-white text-sky-700 shadow-sm border border-sky-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Switch to Candidate / Job Seeker View"
              >
                <UserCheck className="w-3.5 h-3.5 text-sky-500" />
                <span>Job Seeker</span>
              </button>

              <button
                onClick={() => setRole('admin')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  role === 'admin'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Switch to Admin / Recruiter View"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {/* Reset data helper */}
            <button
              onClick={() => {
                if (confirm('Reset application to original sample demo data? This will refresh all jobs and applicants.')) {
                  resetToDefaults();
                }
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden border-t border-slate-100 py-2 justify-around">
          {role === 'candidate' ? (
            <>
              <button
                onClick={() => setCandidateTab('browse')}
                className={`flex items-center gap-1 text-xs font-semibold py-1 px-2 rounded-md ${
                  candidateTab === 'browse' ? 'text-sky-600 bg-sky-50' : 'text-slate-500'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                Explore ({activeJobsCount})
              </button>
              <button
                onClick={() => setCandidateTab('my-applications')}
                className={`flex items-center gap-1 text-xs font-semibold py-1 px-2 rounded-md ${
                  candidateTab === 'my-applications' ? 'text-sky-600 bg-sky-50' : 'text-slate-500'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Applied ({userApplicationsCount})
              </button>
              <button
                onClick={() => setCandidateTab('saved')}
                className={`flex items-center gap-1 text-xs font-semibold py-1 px-2 rounded-md ${
                  candidateTab === 'saved' ? 'text-sky-600 bg-sky-50' : 'text-slate-500'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                Saved ({savedJobIds.length})
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setAdminTab('dashboard')}
                className={`flex items-center gap-1 text-xs font-semibold py-1 px-2 rounded-md ${
                  adminTab === 'dashboard' ? 'text-sky-600 bg-sky-50' : 'text-slate-500'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </button>
              <button
                onClick={() => setAdminTab('jobs')}
                className={`flex items-center gap-1 text-xs font-semibold py-1 px-2 rounded-md ${
                  adminTab === 'jobs' ? 'text-sky-600 bg-sky-50' : 'text-slate-500'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Jobs ({jobs.length})
              </button>
              <button
                onClick={() => setAdminTab('ats')}
                className={`flex items-center gap-1 text-xs font-semibold py-1 px-2 rounded-md ${
                  adminTab === 'ats' ? 'text-sky-600 bg-sky-50' : 'text-slate-500'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                ATS Pipeline ({applications.length})
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

