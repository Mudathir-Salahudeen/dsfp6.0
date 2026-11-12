import React from 'react';
import { JobProvider, useJobs } from './context/JobContext';
import { Header } from './components/Header';
import { CandidateHome } from './components/candidate/CandidateHome';
import { MyApplicationsView } from './components/candidate/MyApplicationsView';
import { SavedJobsView } from './components/candidate/SavedJobsView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminJobList } from './components/admin/AdminJobList';
import { AdminATSBoard } from './components/admin/AdminATSBoard';
import { JobDetailModal } from './components/JobDetailModal';
import { ApplyModal } from './components/ApplyModal';
import { AdminPostJobModal } from './components/admin/AdminPostJobModal';
import { CandidateDetailModal } from './components/admin/CandidateDetailModal';
import { Briefcase, Heart, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { role, candidateTab, adminTab } = useJobs();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-sky-200 selection:text-sky-900">
      
      {/* Top Header Navigation */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {role === 'candidate' ? (
          <>
            {candidateTab === 'browse' && <CandidateHome />}
            {candidateTab === 'my-applications' && <MyApplicationsView />}
            {candidateTab === 'saved' && <SavedJobsView />}
          </>
        ) : (
          <>
            {adminTab === 'dashboard' && <AdminDashboard />}
            {adminTab === 'jobs' && <AdminJobList />}
            {adminTab === 'ats' && <AdminATSBoard />}
          </>
        )}
      </main>

      {/* Global Interactive Modals */}
      <JobDetailModal />
      <ApplyModal />
      <AdminPostJobModal />
      <CandidateDetailModal />

      {/* Footer */}
      <footer className="border-t border-sky-100 bg-white py-8 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-sky-500 flex items-center justify-center text-white">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">TalentWave ATS & Job Board</span>
            <span className="text-slate-400">© 2026</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="inline-flex items-center gap-1 text-sky-600 font-semibold bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
              <Sparkles className="w-3 h-3 text-sky-500" />
              Primary Theme: Light Blue
            </span>
            <span className="text-slate-400">Admin Postings & Candidate Application Tracking</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <JobProvider>
      <AppContent />
    </JobProvider>
  );
};

export default App;

