# 💻 Job Portal Frontend

## 📌 Overview

A modern and responsive Job Portal Frontend application built using React and Vite. The application provides separate experiences for Job Seekers and Recruiters, enabling job search, job applications, recruiter job management, applicant tracking, and dashboard analytics.

The frontend communicates with a Spring Boot REST API and implements secure JWT-based authentication with role-based UI rendering.

---

## 🚀 Features

### 👤 Authentication & Authorization

* User Registration
* User Login
* JWT Token Storage
* Protected Routes
* Role-Based Navigation
* Logout Functionality

#### Roles

* JOB_SEEKER
* RECRUITER

---

### 🔍 Job Search & Discovery

* View All Jobs
* Search Jobs
* Filter Jobs by Location
* Filter Jobs by Job Type
* View Job Details

---

### 📄 Job Applications

* Apply For Jobs
* Resume Upload
* View My Applications
* Withdraw Applications
* Track Application Status

---

### 📊 Recruiter Dashboard

* View Total Jobs
* View Total Applications
* Applications By Status
* Dashboard Statistics Cards

---

### 💼 Job Management

* Create Job Posting
* Edit Job Posting
* Delete Job Posting
* View Posted Jobs
* Manage Applicants

---

### 👥 Applicant Management

* View Applicants
* Update Application Status
* Status Workflow Validation
* Final Status Protection

---

## 🎨 UI Features

* Responsive Design
* Bootstrap 5 Components
* Mobile-Friendly Navigation
* Dashboard Cards
* Status Badges
* Loading Spinners
* Toast Notifications
* Search & Filter Interface
* Modern Card-Based Layout
* Role-Based UI Rendering

---

## 🧱 Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Axios
* Bootstrap 5
* React Toastify

---

## 🏗️ Architecture

```text
Pages
   ↓
Components
   ↓
Services
   ↓
REST API
   ↓
Spring Boot Backend
```

### Design Principles

* Component-Based Architecture
* Reusable UI Components
* Separation of Concerns
* API-Driven Design
* Responsive UI Development

---

## 🔐 Security Features

* JWT Token Storage
* Protected Routes
* Role-Based Navigation
* Automatic Logout Support
* Secure API Requests
* Frontend Authorization Checks

---

## 📱 Application Screens

### Public

* Home Page
* Login Page
* Register Page
* Job Details Page

---

### Job Seeker

* Browse Jobs
* Search Jobs
* Filter Jobs
* Apply For Job
* My Applications

---

### Recruiter

* Dashboard
* Manage Jobs
* Post Job
* Edit Job
* View Applicants

---

## 📂 Project Structure

```text
src
│
├── components
│   └── Navbar.jsx
│
├── context
│   └── AuthContext.jsx
│
├── pages
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── JobDetails.jsx
│   ├── ApplyJob.jsx
│   ├── MyApplications.jsx
│   ├── RecruiterDashboard.jsx
│   ├── ManageJobs.jsx
│   ├── PostJob.jsx
│   ├── EditJob.jsx
│   └── ViewApplicants.jsx
│
├── services
│   ├── authService.js
│   ├── jobService.js
│   ├── applicationService.js
│   └── recruiterJobService.js
│
├── styles
│   ├── Global.css
│   ├── Home.css
|   ├── navbar.css
|   └── RecuriterDashboard.css
│
├── App.jsx
└── main.jsx
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <frontend-repository-url>
```

### Navigate To Project

```bash
cd jobportal_frontend
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application will run on:

```text
http://localhost:5173
```

---

## 🌐 Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 📸 Screenshots

### Home Page

(Add Screenshot)

### Login Page

(Add Screenshot)

### Register Page

(Add Screenshot)

### Recruiter Dashboard

(Add Screenshot)

### Manage Jobs

(Add Screenshot)

### View Applicants

(Add Screenshot)

### My Applications

(Add Screenshot)

---

## 🎯 Key Learning Outcomes

* React Component Development
* React Router Navigation
* Protected Routes
* JWT Authentication Integration
* REST API Consumption using Axios
* State Management with Hooks
* Responsive UI Design
* Role-Based Frontend Rendering
* Form Handling & Validation
* Modern Frontend Architecture

---

## 📈 Future Enhancements

* Dark Mode
* Pagination
* Advanced Filters
* Saved Jobs
* Company Profiles
* Real-Time Notifications
* Docker Containerization
* Cloud Deployment
* CI/CD Pipeline

---

## 👨‍💻 Author

**Shivam Sharma**

Java Full Stack Developer

### Skills

* React
* JavaScript
* Bootstrap
* Axios
* React Router
* Spring Boot
* REST APIs
* JWT Authentication
