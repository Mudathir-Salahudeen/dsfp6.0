# 🌊 TalentWave — Modern Job Tracking & ATS Application

A full-featured Job Tracking and Applicant Tracking System (ATS) built with **React**, **TypeScript**, and **Tailwind CSS**, styled in a clean, modern **Light Blue** palette (`#0ea5e9` / `#38bdf8` / Sky 500).

---

## 🚀 Key Features

### 👤 1. Job Seeker (Candidate) View
- **Explore Job Openings**: Search by keyword (title, company, skills) and filter by department, workplace type (Remote / Hybrid / On-site), job type (Full-time, Part-time, Contract, Internship), experience level, and featured postings.
- **Job Details Drawer**: Detailed job breakdown including company description, key responsibilities, requirements, benefits, and salary range.
- **Interactive Application Process**:
  - One-click application modal.
  - Candidate details (Full Name, Email, Phone, LinkedIn, Portfolio, Years of Experience).
  - Resume attachment simulation (PDF / DOCX upload preview with file size).
  - Custom cover letter / notes to the hiring team.
  - Celebratory confetti explosion upon successful submission.
- **My Applications Tracker**:
  - Live progress stepper through hiring stages: **Applied ➔ Under Review ➔ Interviewing ➔ Offer Extended / Decision**.
  - Direct view of submitted resume, date applied, and option to withdraw.
- **Saved Roles**: Quick bookmarking of job postings for later review and application.

### 👔 2. Admin (Recruiter & Hiring Manager) View
- **Recruitment Overview Dashboard**:
  - Real-time KPI cards: Total Active Openings, Total Applicants, Candidates in Interview, Offers Extended.
  - Visual stage distribution and departmental breakdown.
  - Inbound candidate feed with 1-click review action.
- **Job Openings Management**:
  - Create new job postings with rich fields: Title, Department, Workplace Mode, Job Type, Experience Level, Salary Range, Dynamic Responsibilities & Requirements lists, Benefits & Perks, and Tags.
  - Edit existing job openings.
  - 1-Click Status Toggle (**Active** vs **Closed**).
  - Delete job posting with confirmation.
- **Applicant Tracking Pipeline (ATS)**:
  - Interactive **Kanban Board** with stages:
    - 📥 **Inbound Applied**
    - 🔍 **Under Screening**
    - 🗣️ **In Interview**
    - 🎉 **Offer Extended**
    - ❌ **Archived / Rejected**
  - Alternative **Table View** for bulk sorting and quick filtering.
  - Filter candidates by specific job opening or search by candidate name/email.
- **Candidate Profile & Evaluation Modal**:
  - Contact links (Email, Phone, LinkedIn, Portfolio).
  - Direct resume review/download.
  - Interactive 1–5 Star candidate rating.
  - Stage advance / move buttons.
  - **Internal Recruiter Notes Log**: Add private notes, feedback, and interview evaluations with timestamps and author tagging.

### 🎨 3. Design & Theming
- Primary color: **Light Blue** (Sky 500 `#0ea5e9`, Sky 400 `#38bdf8`, Ice Blue tints `#f0f9ff`, slate contrasts).
- Fully responsive across desktop, tablet, and mobile devices.
- Seamless **Role Switcher** in the navigation header to toggle between **Job Seeker** and **Admin** views instantly.
- Local persistence using `localStorage` with preloaded realistic mock data and a "Reset to Demo Data" option.

---

## 🛠️ Tech Stack
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Celebration Animations**: Canvas Confetti

---

## 🏃 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

