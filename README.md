# ResumeCraft — AI-Powered Resume Builder 🚀

**Build stunning, ATS-friendly resumes in minutes — powered by AI.**

ResumeCraft is a full-stack web application that helps job seekers create professional resumes with AI assistance, real-time preview, and one-click PDF download. Built with modern web technologies and designed for a seamless user experience.

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

---

## ✨ Key Features

### 📝 Resume Builder
- **6-Step Wizard** — Guided form with Personal Info → Education → Experience → Projects → Certifications → Skills
- **5 Professional Templates** — Modern, Professional, Creative, Minimal, and Compact designs
- **Profile Photo Upload** — Drag-and-drop image upload with auto-crop and circular preview
- **Multiple Entries** — Add unlimited education, experience, projects, and certification entries
- **Drag-and-Drop Reordering** — Rearrange resume sections with intuitive drag handles
- **Live Preview** — See your resume update in real-time as you type
- **PDF Download** — One-click export to a high-quality PDF

### 🤖 AI-Powered Features (Google Gemini)
- **AI Content Improvement** — Enhance job descriptions and education summaries with a single click
- **AI Resume Scoring** — Get a real-time score based on completeness and quality of your resume
- **AI Job Matcher** — Paste a job description and see how well your resume matches
- **AI Cover Letter Generator** — Generate tailored cover letters based on your resume and job description
- **AI Skill Suggestions** — Get role-specific skill recommendations based on your job title

### 💾 Smart Editing
- **Auto-Save** — Resume data auto-saves every 5 seconds with a live "Saved X seconds ago" indicator
- **Undo / Redo** — Full history support with `Ctrl+Z` / `Ctrl+Shift+Z` keyboard shortcuts
- **Draft Management** — Save, edit, and manage multiple resume drafts from your dashboard

### 🔗 Sharing & Collaboration
- **Public Shareable Links** — Generate unique share URLs for any resume
- **QR Code Generation** — Share resumes via QR code — perfect for networking events and business cards
- **Copy Link** — One-click copy to clipboard

### 🔐 Authentication
- **Google OAuth** — Secure sign-in with Google via NextAuth.js
- **User Dashboard** — View, edit, delete, and share all saved resumes

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Authentication** | NextAuth.js (Google OAuth) |
| **Database** | PostgreSQL (Prisma ORM) |
| **AI** | Google Gemini 1.5 Flash |
| **PDF Generation** | html-to-image + jsPDF |
| **Animations** | Framer Motion |
| **Drag & Drop** | @dnd-kit |
| **QR Codes** | qrcode.react |
| **Toast Notifications** | Sonner |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── ai/
│   │   │   ├── cover-letter/    # AI cover letter generation
│   │   │   ├── improve/         # AI text improvement
│   │   │   ├── suggest-skills/  # AI skill suggestions
│   │   │   └── analyze-match/   # AI job matching
│   │   ├── auth/                # NextAuth configuration
│   │   └── resumes/             # CRUD + share API
│   ├── buildResume/             # Resume builder page
│   ├── dashboard/               # User dashboard
│   ├── share/[shareId]/         # Public resume viewer
│   ├── templates/               # Template preview page
│   └── [name]/                  # Resume preview page
├── component/
│   ├── ai/                      # AI-powered components
│   ├── steps/                   # Wizard step components
│   ├── templates/               # 5 resume templates
│   └── ui/                      # Reusable UI components
├── hooks/
│   ├── useAutoSave.ts           # Auto-save hook
│   └── useUndoRedo.ts           # Undo/redo hook
└── types/
    └── FormInput.ts             # Shared type definitions
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Google OAuth credentials
- Google Gemini API key

### Installation

```bash
# Clone the repository
git clone https://github.com/abdulwasay0245/dynamic-resume-builder.git
cd dynamic-resume-builder

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your DATABASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, 
# NEXTAUTH_SECRET, NEXTAUTH_URL, and GEMINI_API_KEY

# Push database schema
npx prisma db push

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start building your resume.

---

## 📸 What Makes This Project Stand Out

- **Production-Quality Architecture** — Clean separation of concerns with shared types, custom hooks, and reusable components
- **Real AI Integration** — Not mock data — actual Google Gemini API calls for content improvement, scoring, job matching, cover letters, and skill suggestions
- **Full CRUD with Auth** — Complete user flow from OAuth sign-in to resume creation, editing, saving, sharing, and deletion
- **Modern UX Patterns** — Auto-save, undo/redo, drag-and-drop, toast notifications, keyboard shortcuts, and responsive design
- **Type-Safe End-to-End** — TypeScript from form inputs to API routes to database queries

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [Abdul Wasay](https://github.com/abdulwasay0245)
