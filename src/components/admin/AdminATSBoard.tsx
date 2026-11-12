import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Eye, 
  Layers, 
  List,
  Sparkles
} from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import { Application, ApplicationStatus } from '../../types/job';

export const AdminATSBoard: React.FC = () => {
  const { 
    applications, 
    jobs, 
    updateApplicationStatus, 
    setSelectedApplication 
  } = useJobs();

  const [jobFilter, setJobFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'board' | 'table'>('board');

  const STAGES: { id: ApplicationStatus; title: string; color: string; dot: string; border: string }[] = [
    { id: 'applied', title: '📥 Inbound Applied', color: 'bg-sky-50 text-sky-700', dot: 'bg-sky-500', border: 'border-sky-200' },
    { id: 'reviewing', title: '🔍 Under Screening', color: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500', border: 'border-amber-200' },
    { id: 'interview', title: '🗣️ In Interview', color: 'bg-indigo-50 text-indigo-700', dot: 'bg-indigo-500', border: 'border-indigo-200' },
    { id: 'offer', title: '🎉 Offer Extended', color: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-200' },
    { id: 'rejected', title: '❌ Archived', color: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400', border: 'border-slate-200' },
  ];

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (jobFilter !== 'all' && app.jobId !== jobFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          app.candidateName.toLowerCase().includes(q) ||
          app.candidateEmail.toLowerCase().includes(q) ||
          app.jobTitle.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [applications, jobFilter, searchQuery]);

  const moveCandidate = (appId: string, currentStatus: ApplicationStatus, direction: 'forward' | 'backward') => {
    const stageOrder: ApplicationStatus[] = ['applied', 'reviewing', 'interview', 'offer', 'rejected'];
    const currentIndex = stageOrder.indexOf(currentStatus);
    if (direction === 'forward' && currentIndex < stageOrder.length - 1) {
      updateApplicationStatus(appId, stageOrder[currentIndex + 1]);
    } else if (direction === 'backward' && currentIndex > 0) {
      updateApplicationStatus(appId, stageOrder[currentIndex - 1]);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-sky-100">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Applicant Tracking Pipeline (ATS)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Visual recruitment pipeline. Drag or advance candidates across review stages.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('board')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'board'
                ? 'bg-white text-sky-700 shadow-sm border border-sky-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Kanban Board</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'table'
                ? 'bg-white text-sky-700 shadow-sm border border-sky-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate name, email, or role..."
            className="w-full text-xs text-slate-700 bg-transparent outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <label className="text-slate-500 font-medium hidden sm:inline">Filter by Job:</label>
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold outline-none"
          >
            <option value="all">All Job Postings ({applications.length} candidates)</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ATS Board View */}
      {viewMode === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-6">
          {STAGES.map((stage) => {
            const candidatesInStage = filteredApplications.filter((app) => app.status === stage.id);

            return (
              <div 
                key={stage.id} 
                className="bg-slate-100/70 rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 flex flex-col min-w-[240px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${stage.dot}`}></span>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800">
                      {stage.title}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-slate-600 shadow-2xs border border-slate-200">
                    {candidatesInStage.length}
                  </span>
                </div>

                {/* Candidates Cards List */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[680px]">
                  {candidatesInStage.length > 0 ? (
                    candidatesInStage.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => setSelectedApplication(app)}
                        className="bg-white rounded-xl p-3.5 border border-slate-200/80 hover:border-sky-300 shadow-2xs hover:shadow-md transition-all cursor-pointer group space-y-2.5"
                      >
                        {/* Candidate Name & Job */}
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-sky-600 transition-colors">
                              {app.candidateName}
                            </h4>
                            {app.rating ? (
                              <div className="flex items-center gap-0.5 text-amber-500">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="text-[10px] font-bold">{app.rating}</span>
                              </div>
                            ) : null}
                          </div>
                          <p className="text-[11px] font-semibold text-slate-500 line-clamp-1">
                            {app.jobTitle}
                          </p>
                        </div>

                        {/* Experience & Resume */}
                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                          <span className="text-slate-600 font-medium">
                            {app.yearsOfExperience}
                          </span>
                          {app.resumeFileName && (
                            <span className="flex items-center gap-1 text-sky-600 font-semibold" title={app.resumeFileName}>
                              <FileText className="w-3 h-3" />
                              CV
                            </span>
                          )}
                        </div>

                        {/* Move candidate arrows */}
                        <div 
                          className="flex items-center justify-between pt-1 border-t border-slate-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => moveCandidate(app.id, app.status, 'backward')}
                            disabled={stage.id === 'applied'}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20"
                            title="Move back"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setSelectedApplication(app)}
                            className="text-[11px] font-bold text-sky-600 hover:text-sky-700"
                          >
                            Review
                          </button>

                          <button
                            onClick={() => moveCandidate(app.id, app.status, 'forward')}
                            disabled={stage.id === 'rejected'}
                            className="p-1 rounded text-slate-400 hover:text-sky-600 hover:bg-sky-50 disabled:opacity-20"
                            title="Advance candidate"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    ))
                  ) : (
                    <div className="h-28 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-xs italic">
                      No candidates in this stage
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Candidate Name</th>
                  <th className="py-3 px-4">Applied Role</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-sky-50/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800">
                      <div>
                        {app.candidateName}
                        <p className="text-[11px] font-normal text-slate-400">{app.candidateEmail}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">
                      {app.jobTitle}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {app.yearsOfExperience}
                    </td>
                    <td className="py-3 px-4">
                      {app.rating ? (
                        <span className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          {app.rating} / 5
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">Unrated</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 capitalize outline-none"
                      >
                        <option value="applied">📥 Applied</option>
                        <option value="reviewing">🔍 Reviewing</option>
                        <option value="interview">🗣️ Interview</option>
                        <option value="offer">🎉 Offer</option>
                        <option value="rejected">❌ Archived</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedApplication(app)}
                        className="px-3 py-1 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold text-xs border border-sky-200"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

