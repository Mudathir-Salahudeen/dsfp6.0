import React, { useState, useMemo } from 'react';
import { 
  PlusCircle, 
  Search, 
  Edit3, 
  Trash2, 
  Users, 
  ToggleLeft, 
  ToggleRight, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Calendar,
  ExternalLink,
  Building2,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import { Job, JobStatus } from '../../types/job';

export const AdminJobList: React.FC = () => {
  const { 
    jobs, 
    toggleJobStatus, 
    deleteJob, 
    setIsCreateJobOpen, 
    setEditingJob, 
    setSelectedJob,
    setAdminTab 
  } = useJobs();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const departments = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach(j => {
      if (j.department) set.add(j.department);
    });
    return ['all', ...Array.from(set)];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      if (statusFilter !== 'all' && job.status !== statusFilter) return false;
      if (departmentFilter !== 'all' && job.department !== departmentFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [jobs, searchQuery, statusFilter, departmentFilter]);

  const formatSalary = (min: number, max: number, currency: string) => {
    return `${currency}${Math.round(min / 1000)}k - ${currency}${Math.round(max / 1000)}k`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-sky-100">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Job Openings Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, edit, toggle active status, and track candidate volume for all company postings.
          </p>
        </div>

        <button
          onClick={() => setIsCreateJobOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/20 transition-all self-start sm:self-auto transform active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Job</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jobs by title or location..."
            className="w-full text-xs text-slate-700 bg-transparent outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs w-full sm:w-auto">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold outline-none"
          >
            <option value="all">All Departments</option>
            {departments.filter(d => d !== 'all').map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="closed">Closed / Inactive</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="py-4 px-4 sm:px-6">Position & Company</th>
                <th className="py-4 px-4">Department</th>
                <th className="py-4 px-4">Location & Type</th>
                <th className="py-4 px-4">Salary Range</th>
                <th className="py-4 px-4 text-center">Applicants</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-sky-50/30 transition-colors">
                    
                    {/* Position */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 
                            onClick={() => setSelectedJob(job)}
                            className="font-bold text-slate-800 hover:text-sky-600 cursor-pointer transition-colors"
                          >
                            {job.title}
                          </h4>
                          <p className="text-xs text-slate-400 font-medium">
                            {job.company} • Posted {job.postedDate}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                        {job.department}
                      </span>
                    </td>

                    {/* Location & Type */}
                    <td className="py-4 px-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-sky-500" />
                        {job.location}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {job.workplaceType} • {job.type}
                      </div>
                    </td>

                    {/* Salary */}
                    <td className="py-4 px-4 text-xs font-semibold text-slate-700">
                      {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                    </td>

                    {/* Applicants */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => setAdminTab('ats')}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-colors"
                        title="View applicants in ATS"
                      >
                        <Users className="w-3.5 h-3.5 text-sky-500" />
                        <span>{job.applicantCount || 0}</span>
                      </button>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => toggleJobStatus(job.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          job.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle status"
                      >
                        {job.status === 'active' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-slate-400" />
                            <span>Closed</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                          title="Preview Job"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setEditingJob(job)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                          title="Edit Job"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${job.title}"? This cannot be undone.`)) {
                              deleteJob(job.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                    No job postings found matching your query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

