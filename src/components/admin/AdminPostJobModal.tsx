import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Briefcase
} from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import { WorkplaceType, JobType, ExperienceLevel, JobStatus } from '../../types/job';

export const AdminPostJobModal: React.FC = () => {
  const { 
    isCreateJobOpen, 
    setIsCreateJobOpen, 
    editingJob, 
    setEditingJob, 
    addJob, 
    updateJob 
  } = useJobs();

  const isOpen = isCreateJobOpen || !!editingJob;

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('Skyline Cloud Systems');
  const [department, setDepartment] = useState('Engineering');
  const [location, setLocation] = useState('Remote (US)');
  const [workplaceType, setWorkplaceType] = useState<WorkplaceType>('Remote');
  const [type, setType] = useState<JobType>('Full-time');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Senior');
  const [salaryMin, setSalaryMin] = useState<number>(130000);
  const [salaryMax, setSalaryMax] = useState<number>(165000);
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<JobStatus>('active');

  // Dynamic lists
  const [responsibilities, setResponsibilities] = useState<string[]>([
    'Design and build high-quality scalable user interfaces.',
    'Collaborate with product designers and engineers in agile sprints.',
  ]);
  const [newResp, setNewResp] = useState('');

  const [requirements, setRequirements] = useState<string[]>([
    '4+ years of hands-on professional software engineering experience.',
    'Strong knowledge of TypeScript, component design, and unit testing.',
  ]);
  const [newReq, setNewReq] = useState('');

  const [benefits, setBenefits] = useState<string[]>([
    'Full health, dental, and vision insurance with zero premium',
    'Unlimited PTO and flexible working hours',
    'Annual home office setup stipend',
  ]);
  const [newBen, setNewBen] = useState('');

  const [tagsInput, setTagsInput] = useState('React, TypeScript, Tailwind');
  const [error, setError] = useState<string | null>(null);

  // Sync state if editing an existing job
  useEffect(() => {
    if (editingJob) {
      setTitle(editingJob.title);
      setCompany(editingJob.company);
      setDepartment(editingJob.department);
      setLocation(editingJob.location);
      setWorkplaceType(editingJob.workplaceType);
      setType(editingJob.type);
      setExperienceLevel(editingJob.experienceLevel);
      setSalaryMin(editingJob.salaryMin);
      setSalaryMax(editingJob.salaryMax);
      setDescription(editingJob.description);
      setResponsibilities(editingJob.responsibilities || []);
      setRequirements(editingJob.requirements || []);
      setBenefits(editingJob.benefits || []);
      setTagsInput(editingJob.tags?.join(', ') || '');
      setFeatured(!!editingJob.featured);
      setStatus(editingJob.status);
    } else {
      // Defaults for new job
      setTitle('');
      setCompany('Skyline Cloud Systems');
      setDepartment('Engineering');
      setLocation('San Francisco, CA (or Remote)');
      setWorkplaceType('Remote');
      setType('Full-time');
      setExperienceLevel('Senior');
      setSalaryMin(125000);
      setSalaryMax(160000);
      setDescription('We are looking for a passionate team member to join our high-impact squad...');
      setResponsibilities([
        'Design and implement scalable systems.',
        'Collaborate across cross-functional teams to deliver customer value.',
      ]);
      setRequirements([
        '3+ years relevant industry experience.',
        'Strong problem-solving and communication abilities.',
      ]);
      setBenefits([
        'Competitive equity and 401(k) matching',
        'Unlimited PTO policy',
        'Health & wellness perks',
      ]);
      setTagsInput('TypeScript, React, Cloud');
      setFeatured(false);
      setStatus('active');
    }
  }, [editingJob, isCreateJobOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsCreateJobOpen(false);
    setEditingJob(null);
    setError(null);
  };

  const handleAddResponsibility = () => {
    if (newResp.trim()) {
      setResponsibilities([...responsibilities, newResp.trim()]);
      setNewResp('');
    }
  };

  const handleAddRequirement = () => {
    if (newReq.trim()) {
      setRequirements([...requirements, newReq.trim()]);
      setNewReq('');
    }
  };

  const handleAddBenefit = () => {
    if (newBen.trim()) {
      setBenefits([...benefits, newBen.trim()]);
      setNewBen('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim() || !description.trim()) {
      setError('Please provide a job title, company name, and job description.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const jobPayload = {
      title,
      company,
      department,
      location,
      workplaceType,
      type,
      experienceLevel,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      currency: '$',
      description,
      responsibilities,
      requirements,
      benefits,
      status,
      featured,
      tags: tags.length > 0 ? tags : ['General'],
    };

    if (editingJob) {
      updateJob(editingJob.id, jobPayload);
    } else {
      addJob(jobPayload);
    }

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-sky-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 p-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">
                {editingJob ? 'Edit Job Opening' : 'Post New Job Opening'}
              </h2>
              <p className="text-xs text-sky-100">
                {editingJob ? 'Update existing requirements and status' : 'Publish a new role to the talent career portal'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Primary Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Skyline Cloud Systems"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm bg-white"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Product">Product</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
                <option value="HR & People">HR & People</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA or Remote"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Workplace Mode
              </label>
              <select
                value={workplaceType}
                onChange={(e) => setWorkplaceType(e.target.value as WorkplaceType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm bg-white"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Job Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as JobType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm bg-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm bg-white"
              >
                <option value="Entry-level">Entry-level</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Salary Minimum ($/year)
              </label>
              <input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Salary Maximum ($/year)
              </label>
              <input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the role, team, and mission..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm"
            ></textarea>
          </div>

          {/* Key Responsibilities Builder */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Key Responsibilities
            </label>
            <div className="space-y-2 mb-2">
              {responsibilities.map((resp, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <span className="flex-1 pr-2">{resp}</span>
                  <button
                    type="button"
                    onClick={() => setResponsibilities(responsibilities.filter((_, idx) => idx !== i))}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newResp}
                onChange={(e) => setNewResp(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddResponsibility();
                  }
                }}
                placeholder="Add a responsibility and click +"
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none"
              />
              <button
                type="button"
                onClick={handleAddResponsibility}
                className="px-3 py-2 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Requirements Builder */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Requirements & Qualifications
            </label>
            <div className="space-y-2 mb-2">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <span className="flex-1 pr-2">{req}</span>
                  <button
                    type="button"
                    onClick={() => setRequirements(requirements.filter((_, idx) => idx !== i))}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newReq}
                onChange={(e) => setNewReq(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddRequirement();
                  }
                }}
                placeholder="Add a requirement and click +"
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none"
              />
              <button
                type="button"
                onClick={handleAddRequirement}
                className="px-3 py-2 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Benefits Builder */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Benefits & Perks
            </label>
            <div className="space-y-2 mb-2">
              {benefits.map((ben, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <span className="flex-1 pr-2">{ben}</span>
                  <button
                    type="button"
                    onClick={() => setBenefits(benefits.filter((_, idx) => idx !== i))}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newBen}
                onChange={(e) => setNewBen(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddBenefit();
                  }
                }}
                placeholder="Add a perk or benefit and click +"
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none"
              />
              <button
                type="button"
                onClick={handleAddBenefit}
                className="px-3 py-2 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Tags & Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tags / Skills (comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="React, TypeScript, GraphQL"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Posting Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as JobStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm bg-white"
              >
                <option value="active">Active (Visible to Job Seekers)</option>
                <option value="draft">Draft (Hidden)</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featuredCheck"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
            />
            <label htmlFor="featuredCheck" className="text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Mark as Featured Opening (Pivotal highlight on career portal)
            </label>
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/25 transition-all"
            >
              {editingJob ? 'Save Changes' : 'Publish Job Opening'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

