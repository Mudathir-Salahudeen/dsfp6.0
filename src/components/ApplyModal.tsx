import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Trash2,
  Send,
  Building2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useJobs } from '../context/JobContext';

export const ApplyModal: React.FC = () => {
  const { applyingJob, setApplyingJob, submitApplication, setCandidateTab } = useJobs();

  const [fullName, setFullName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [phone, setPhone] = useState('+1 (555) 349-1823');
  const [linkedIn, setLinkedIn] = useState('https://linkedin.com/in/alexmorgan');
  const [portfolio, setPortfolio] = useState('https://github.com/alexmorgan');
  const [experience, setExperience] = useState('3-5 years');
  const [coverLetter, setCoverLetter] = useState(
    'I am extremely excited about this opportunity. With my background in building resilient applications and collaborating closely with cross-functional product teams, I believe I can make an immediate positive impact at your company.'
  );

  const [resumeFile, setResumeFile] = useState<{ name: string; size: string } | null>({
    name: 'Alex_Morgan_Resume_2026.pdf',
    size: '1.8 MB',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!applyingJob) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setResumeFile({
        name: file.name,
        size: `${sizeMB} MB`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in your name, email, and phone number.');
      return;
    }

    if (!resumeFile) {
      setError('Please attach your resume (PDF or DOCX).');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate network latency for realism
    setTimeout(() => {
      submitApplication({
        jobId: applyingJob.id,
        jobTitle: applyingJob.title,
        company: applyingJob.company,
        candidateName: fullName,
        candidateEmail: email,
        candidatePhone: phone,
        candidateLinkedIn: linkedIn,
        candidatePortfolio: portfolio,
        yearsOfExperience: experience,
        coverLetter: coverLetter,
        resumeFileName: resumeFile.name,
        resumeFileSize: resumeFile.size,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0ea5e9', '#38bdf8', '#7dd3fc', '#0284c7', '#34d399'],
      });
    }, 600);
  };

  const handleFinish = (goToApplications: boolean = false) => {
    setApplyingJob(null);
    setIsSubmitted(false);
    if (goToApplications) {
      setCandidateTab('my-applications');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-sky-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-5 sm:p-6 text-white flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-sky-100 font-semibold tracking-wide uppercase">
                Application for {applyingJob.company}
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-white line-clamp-1">
                {applyingJob.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => handleFinish(false)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Either Form or Success Screen */}
        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-2 border-emerald-200 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                Submitted to Recruiter
              </span>
              <h3 className="text-2xl font-extrabold text-slate-800">
                Application Submitted!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, <strong className="text-slate-800">{fullName}</strong>! Your application for{' '}
                <strong className="text-slate-800">{applyingJob.title}</strong> at{' '}
                <strong className="text-slate-800">{applyingJob.company}</strong> has been received and is now in review.
              </p>
            </div>

            <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-4 max-w-md w-full text-left text-xs text-sky-900 space-y-1">
              <p className="font-semibold text-sky-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-sky-600" />
                Attached Resume: {resumeFile?.name}
              </p>
              <p className="text-slate-600">Confirmation sent to: <strong>{email}</strong></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md pt-2">
              <button
                onClick={() => handleFinish(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/20 transition-all"
              >
                <span>Track in My Applications</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleFinish(false)}
                className="flex-1 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
              >
                Explore Other Jobs
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-5 flex-1">
            
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Candidate Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jane@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Years of Experience
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm transition-all bg-white"
                >
                  <option value="Entry-level (< 1 yr)">Entry-level (&lt; 1 yr)</option>
                  <option value="1-3 years">1 - 3 years</option>
                  <option value="3-5 years">3 - 5 years</option>
                  <option value="5-8 years">5 - 8 years</option>
                  <option value="8+ years">8+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Portfolio / GitHub URL
                </label>
                <input
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm transition-all"
                />
              </div>
            </div>

            {/* Resume Upload Section */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Resume / CV (PDF or DOCX) <span className="text-red-500">*</span>
              </label>

              {resumeFile ? (
                <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-500 text-white flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-1">
                        {resumeFile.name}
                      </p>
                      <p className="text-[11px] text-slate-500">{resumeFile.size} • Ready for upload</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setResumeFile(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-sky-200 hover:border-sky-400 rounded-2xl p-6 text-center flex flex-col items-center justify-center cursor-pointer transition-colors bg-sky-50/30">
                  <UploadCloud className="w-8 h-8 text-sky-500 mb-2" />
                  <p className="text-xs sm:text-sm font-semibold text-slate-700">
                    Click to select resume or drag and drop
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    PDF, DOC, DOCX up to 10MB
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Cover Letter / Additional Notes (Optional)
              </label>
              <textarea
                rows={3}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Share why you're a great fit for this team..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm transition-all resize-none"
              ></textarea>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setApplyingJob(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/25 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

