import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  Sparkles, 
  Briefcase, 
  X,
  Compass,
  CheckCircle,
  SlidersHorizontal
} from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import { JobCard } from '../JobCard';
import { WorkplaceType, ExperienceLevel, JobType } from '../../types/job';

export const CandidateHome: React.FC = () => {
  const { jobs, applications } = useJobs();

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedWorkplace, setSelectedWorkplace] = useState<string>('All');
  const [selectedJobType, setSelectedJobType] = useState<string>('All');
  const [selectedExpLevel, setSelectedExpLevel] = useState<string>('All');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Departments list extracted dynamically from jobs
  const departments = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach(j => {
      if (j.department) set.add(j.department);
    });
    return ['All', ...Array.from(set)];
  }, [jobs]);

  // Active filter count
  const activeFiltersCount = (selectedDepartment !== 'All' ? 1 : 0) +
    (selectedWorkplace !== 'All' ? 1 : 0) +
    (selectedJobType !== 'All' ? 1 : 0) +
    (selectedExpLevel !== 'All' ? 1 : 0) +
    (featuredOnly ? 1 : 0);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Must be active job for candidate view
      if (job.status !== 'active') return false;

      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesLocation = job.location.toLowerCase().includes(query);
        const matchesTags = job.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCompany && !matchesLocation && !matchesTags) {
          return false;
        }
      }

      // Department
      if (selectedDepartment !== 'All' && job.department !== selectedDepartment) {
        return false;
      }

      // Workplace
      if (selectedWorkplace !== 'All' && job.workplaceType !== selectedWorkplace) {
        return false;
      }

      // Job Type
      if (selectedJobType !== 'All' && job.type !== selectedJobType) {
        return false;
      }

      // Experience Level
      if (selectedExpLevel !== 'All' && job.experienceLevel !== selectedExpLevel) {
        return false;
      }

      // Featured
      if (featuredOnly && !job.featured) {
        return false;
      }

      return true;
    });
  }, [jobs, searchQuery, selectedDepartment, selectedWorkplace, selectedJobType, selectedExpLevel, featuredOnly]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All');
    setSelectedWorkplace('All');
    setSelectedJobType('All');
    setSelectedExpLevel('All');
    setFeaturedOnly(false);
  };

  const appliedJobIds = new Set(applications.map(a => a.jobId));

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-b from-sky-100/70 via-sky-50 to-white border border-sky-100 p-6 sm:p-12 overflow-hidden shadow-sm">
        {/* Decorative backdrop elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-sky-300/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-60 h-60 rounded-full bg-sky-400/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-sky-800 text-xs font-bold shadow-sm border border-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Discover your next career milestone</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Find the job that fits <br />
            <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 bg-clip-text text-transparent">
              your true potential.
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Search verified opportunities from top tier technology and creative companies. Submit your application in under 2 minutes.
          </p>

          {/* Large Hero Search Input */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="bg-white p-2 rounded-2xl shadow-lg shadow-sky-500/10 border border-sky-200 flex flex-col sm:flex-row items-center gap-2">
              <div className="flex items-center gap-2.5 px-3 w-full sm:flex-1">
                <Search className="w-5 h-5 text-sky-500 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, skills, or company name..."
                  className="w-full py-2 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="w-full sm:w-auto flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 sm:pl-2">
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="sm:hidden flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  <Filter className="w-3.5 h-3.5 text-sky-500" />
                  <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                </button>

                <div className="hidden sm:block">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="py-2.5 px-3 rounded-xl border-none text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 outline-none cursor-pointer"
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d === 'All' ? 'All Departments' : d}
                      </option>
                    ))}
                  </select>
                </div>

                <button 
                  onClick={() => {}}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>

          {/* Popular Tag Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-500">
            <span className="font-medium text-slate-400">Popular:</span>
            {['React', 'TypeScript', 'Figma', 'Kubernetes', 'Go', 'Marketing'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-slate-600 hover:text-sky-600 border border-sky-100 text-xs font-medium transition-colors shadow-2xs"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        
        {/* Filter Bar (Desktop & Expanded Mobile) */}
        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Department Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none text-xs font-semibold">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl transition-all ${
                  selectedDepartment === dept
                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-50 text-slate-600 hover:bg-sky-50 hover:text-sky-700'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Dropdown Filters (Workplace, Job Type, Exp) */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedWorkplace}
              onChange={(e) => setSelectedWorkplace(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold outline-none focus:border-sky-500"
            >
              <option value="All">All Workplaces</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>

            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold outline-none focus:border-sky-500"
            >
              <option value="All">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>

            <select
              value={selectedExpLevel}
              onChange={(e) => setSelectedExpLevel(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold outline-none focus:border-sky-500"
            >
              <option value="All">All Experience</option>
              <option value="Entry-level">Entry-level</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>

            <button
              onClick={() => setFeaturedOnly(!featuredOnly)}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                featuredOnly
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Featured Only</span>
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="px-3 py-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold transition-colors flex items-center gap-1"
                title="Reset all active filters"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-1">
          <p>
            Showing <strong className="text-slate-800 font-bold">{filteredJobs.length}</strong> active openings
            {selectedDepartment !== 'All' && <span> in <strong className="text-sky-600">{selectedDepartment}</strong></span>}
          </p>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Sort:</span>
            <span className="font-semibold text-slate-700">Most Recent</span>
          </div>
        </div>

        {/* Jobs Listing Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredJobs.map((job) => (
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
              <Compass className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">No matching jobs found</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                We couldn't find any openings matching your selected filters. Try broadening your search or resetting filters.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

