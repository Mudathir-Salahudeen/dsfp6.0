import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  ExternalLink, 
  FileText, 
  Star, 
  Send, 
  Clock, 
  CheckCircle2, 
  Briefcase, 
  MessageSquare,
  Sparkles,
  Download
} from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import { ApplicationStatus } from '../../types/job';

export const CandidateDetailModal: React.FC = () => {
  const { 
    selectedApplication, 
    setSelectedApplication, 
    updateApplicationStatus, 
    updateApplicationRating, 
    addRecruiterNote 
  } = useJobs();

  const [newNote, setNewNote] = useState('');

  if (!selectedApplication) return null;

  const app = selectedApplication;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      addRecruiterNote(app.id, newNote.trim(), 'Sarah Jenkins (Recruiter)');
      setNewNote('');
    }
  };

  const STAGES: { id: ApplicationStatus; label: string; activeColor: string }[] = [
    { id: 'applied', label: '📥 Inbound Applied', activeColor: 'bg-sky-500 text-white' },
    { id: 'reviewing', label: '🔍 Under Screening', activeColor: 'bg-amber-500 text-white' },
    { id: 'interview', label: '🗣️ In Interview', activeColor: 'bg-indigo-500 text-white' },
    { id: 'offer', label: '🎉 Offer Extended', activeColor: 'bg-emerald-500 text-white' },
    { id: 'rejected', label: '❌ Archived / Rejected', activeColor: 'bg-slate-500 text-white' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-sky-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 p-6 text-white flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xl font-black">
              {app.candidateName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {app.candidateName}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 text-white font-semibold">
                  {app.yearsOfExperience}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-sky-100 mt-0.5">
                Applied for <strong className="text-white">{app.jobTitle}</strong> at {app.company}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedApplication(null)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700">
          
          {/* Quick Contact & Links Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            <a
              href={`mailto:${app.candidateEmail}`}
              className="p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-sky-700 transition-colors"
            >
              <Mail className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <span className="truncate">{app.candidateEmail}</span>
            </a>

            <a
              href={`tel:${app.candidatePhone}`}
              className="p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-sky-700 transition-colors"
            >
              <Phone className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <span className="truncate">{app.candidatePhone}</span>
            </a>

            {app.candidateLinkedIn && (
              <a
                href={app.candidateLinkedIn}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-sky-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span className="truncate">LinkedIn Profile</span>
              </a>
            )}

            {app.candidatePortfolio && (
              <a
                href={app.candidatePortfolio}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-sky-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span className="truncate">Portfolio / GitHub</span>
              </a>
            )}
          </div>

          {/* Hiring Stage & Recruiter Rating */}
          <div className="bg-sky-50/70 rounded-2xl p-4 sm:p-5 border border-sky-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Update Candidate Stage:
                </label>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-600 mr-1">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => updateApplicationRating(app.id, star)}
                    className="p-1 hover:scale-125 transition-transform"
                    title={`Rate ${star} star`}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        (app.rating || 0) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Stage Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {STAGES.map((s) => {
                const isSelected = app.status === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => updateApplicationStatus(app.id, s.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? `${s.activeColor} shadow-md`
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resume Card */}
          {app.resumeFileName && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    {app.resumeFileName}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {app.resumeFileSize || '2.1 MB'} • PDF Candidate Resume
                  </p>
                </div>
              </div>

              <button
                onClick={() => alert(`Simulated downloading resume: ${app.resumeFileName}`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>View / Download</span>
              </button>
            </div>
          )}

          {/* Cover Letter */}
          {app.coverLetter && (
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-sky-500" />
                Candidate Statement / Cover Letter
              </h3>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                "{app.coverLetter}"
              </div>
            </div>
          )}

          {/* Internal Recruiter Notes */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-500" />
              Internal Recruiter Notes & Feedback
            </h3>

            {/* Add note input */}
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log interview feedback, salary expectations, or screening notes..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save Note</span>
              </button>
            </form>

            {/* Past notes feed */}
            <div className="space-y-2.5 pt-2">
              {app.recruiterNotes && app.recruiterNotes.length > 0 ? (
                app.recruiterNotes.map((note) => (
                  <div key={note.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-500">
                      <strong className="text-slate-800">{note.author}</strong>
                      <span className="text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{note.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No internal notes added yet.</p>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={() => setSelectedApplication(null)}
            className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-500/25 transition-all"
          >
            Done Reviewing
          </button>
        </div>

      </div>
    </div>
  );
};

