import React from 'react';
import { 
  Briefcase, 
  Users, 
  UserCheck, 
  Sparkles, 
  PlusCircle, 
  Clock, 
  ArrowUpRight, 
  CheckCircle2, 
  TrendingUp,
  Building2,
  Calendar
} from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import { ApplicationStatus } from '../../types/job';

export const AdminDashboard: React.FC = () => {
  const { 
    jobs, 
    applications, 
    setIsCreateJobOpen, 
    setAdminTab, 
    setSelectedApplication,
    updateApplicationStatus
  } = useJobs();

  const activeJobs = jobs.filter(j => j.status === 'active');
  const totalApplications = applications.length;
  const interviewingCount = applications.filter(a => a.status === 'interview').length;
  const offersCount = applications.filter(a => a.status === 'offer').length;
  const reviewingCount = applications.filter(a => a.status === 'reviewing').length;

  // Status breakdown calculations
  const statusCounts: Record<ApplicationStatus, number> = {
    applied: applications.filter(a => a.status === 'applied').length,
    reviewing: reviewingCount,
    interview: interviewingCount,
    offer: offersCount,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  // Applications by department
  const deptCounts: Record<string, number> = {};
  jobs.forEach(job => {
    deptCounts[job.department] = (deptCounts[job.department] || 0) + (job.applicantCount || 0);
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'applied':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'reviewing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'interview':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'offer':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'rejected':
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      
      {/* Dashboard Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 p-6 sm:p-8 text-white shadow-lg shadow-sky-500/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-200" />
            Recruitment Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Talent Acquisition Overview
          </h1>
          <p className="text-sky-100 text-xs sm:text-sm mt-1 max-w-xl">
            Manage your open headcount, screen inbound candidate submissions, and move applicants through the hiring pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsCreateJobOpen(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-sky-800 hover:bg-sky-50 font-bold text-sm shadow-md transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-sky-600" />
            <span>Post New Job</span>
          </button>

          <button
            onClick={() => setAdminTab('ats')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-sky-400/30 hover:bg-sky-400/40 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all"
          >
            <Users className="w-4 h-4" />
            <span>Pipeline (ATS)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Active Headcounts
            </p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">
              {activeJobs.length}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Out of {jobs.length} total postings
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Applicants
            </p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">
              {totalApplications}
            </h3>
            <p className="text-xs text-sky-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Active pipeline
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              In Interviews
            </p>
            <h3 className="text-3xl font-black text-indigo-700 mt-1">
              {interviewingCount}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {reviewingCount} currently under review
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Offers Extended
            </p>
            <h3 className="text-3xl font-black text-emerald-600 mt-1">
              {offersCount}
            </h3>
            <p className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Final stage
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Analytics Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pipeline Distribution */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-sky-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Pipeline Stage Breakdown
            </h3>
            <span className="text-xs font-semibold text-sky-600">
              {totalApplications} total
            </span>
          </div>

          <div className="space-y-3.5">
            {[
              { key: 'applied', label: '📥 Application Received', count: statusCounts.applied, color: 'bg-sky-500' },
              { key: 'reviewing', label: '🔍 Under Screening', count: statusCounts.reviewing, color: 'bg-amber-500' },
              { key: 'interview', label: '🗣️ Interview Stage', count: statusCounts.interview, color: 'bg-indigo-500' },
              { key: 'offer', label: '🎉 Offer Extended', count: statusCounts.offer, color: 'bg-emerald-500' },
              { key: 'rejected', label: '❌ Archived / Rejected', count: statusCounts.rejected, color: 'bg-slate-400' },
            ].map(item => {
              const pct = totalApplications > 0 ? Math.round((item.count / totalApplications) * 100) : 0;
              return (
                <div key={item.key} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>{item.label}</span>
                    <span className="text-slate-800">{item.count} ({pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setAdminTab('ats')}
            className="w-full py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Open Kanban ATS Board</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Recent Applications Feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl p-6 border border-sky-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Recent Inbound Applications
              </h3>
              <p className="text-xs text-slate-500">
                Latest candidates who applied to your open jobs
              </p>
            </div>
            <button
              onClick={() => setAdminTab('ats')}
              className="text-xs font-bold text-sky-600 hover:text-sky-700"
            >
              View All Candidates →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-3 rounded-l-lg">Candidate</th>
                  <th className="py-3 px-3">Position Applied</th>
                  <th className="py-3 px-3">Experience</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.slice(0, 5).map((app) => (
                  <tr key={app.id} className="hover:bg-sky-50/40 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-800">
                      <div>
                        {app.candidateName}
                        <p className="text-[11px] font-normal text-slate-400">{app.candidateEmail}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-medium max-w-[200px] truncate">
                      {app.jobTitle}
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-medium">
                      {app.yearsOfExperience}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border capitalize ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedApplication(app)}
                        className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 font-semibold border border-sky-200"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};

