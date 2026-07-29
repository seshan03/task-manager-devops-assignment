# Lecturer Teaching Companion System

## Group Information

- **Dinith Jayasinghe:** ITBIN-2414-0001 - Role: DevOps Engineer
- **Rashmika Prabod:** ITBIN-2414-0018 - Role: Full-Stack Developer

## Project Description

The Lecturer Teaching Companion System is a full-stack web application designed to improve lecturer memory efficiency by helping lecturers organize and track their upcoming teaching responsibilities.

The system focuses on reducing the mental workload of lecturers who manage multiple modules, intakes, lectures, and promised assignments or quizzes. Instead of relying on memory alone, lecturers can record and monitor their academic commitments through a centralized dashboard.

The application helps lecturers remember important teaching activities by providing structured management of lectures, assignments, and module information, allowing them to easily monitor upcoming tasks and avoid forgetting academic responsibilities.

## Live Deployment

🔗 **Live URL:** Deployment in progress

## Technologies Used

- HTML5 / CSS3 / JavaScript
- React.js with Vite
- Tailwind CSS
- Node.js / Express.js
- MongoDB with Mongoose
- GitHub Actions (CI/CD)
- Vercel (Deployment Platform - Configuration Prepared)

## Features

- **Lecturer Dashboard**: Provides lecturers with a centralized overview of upcoming lectures and pending academic responsibilities.
- **Lecture Management (CRUD)**: Allows lecturers to create, view, update, and delete lecture records.
- **Assignment Management (CRUD)**: Allows lecturers to manage promised assignments/quizzes and track completion status.
- **Module Management**: Organizes lectures and assignments under relevant modules.
- **Backend API Integration**: Enables communication between the React frontend and Express backend services.
- **Responsive User Interface**: Provides an accessible interface across different screen sizes.

## Branch Strategy

We followed a standard Git Flow branching model:

- `main` - Production branch (protected, auto-deploys on commit)
- `develop` - Development & integration branch (prerelease testing)
- `feature/*` - Individual developer work branches

## Individual Contributions

### Dinith Jayasinghe

- 
- 
- 

### Rashmika Prabod

- Initialized and developed the frontend application using React and Vite.
- Implemented the lecturer dashboard interface and frontend architecture.
- Developed lecture CRUD functionality including create, update, delete, and display flows.
- Developed assignment CRUD functionality including creation, editing, deletion, and completion tracking.
- Integrated frontend components with backend API endpoints.
- Improved user interface experience and responsive layouts using Tailwind CSS.
- Resolved frontend linting issues and verified application functionality through local testing.

## Setup & Installation Instructions

### Prerequisites

- Node.js (version 18 or higher)
- Git installed locally
- MongoDB instance

### Installation

1. Clone the repository:

```bash
git clone https://github.com/seshan03/task-manager-devops-assignment.git
```

2. Navigate into the project directory:

```bash
cd task-manager-devops-assignment
```

3. Install project dependencies:

```bash
npm install
```

4. Configure environment variables:

Create a `.env` file based on the provided `.env.sample` file and add the required database configuration values.

5. Run the development server:

```bash
npm run dev
```

## CI/CD Deployment Process

The project uses GitHub Actions workflows to automate code quality verification and deployment processes.

The CI workflow performs the following automated checks:

- Installing project dependencies.
- Running ESLint validation.
- Building the frontend application.
- Running automated tests.

Pull requests are verified through GitHub Actions before merging to ensure code quality, maintainability, and integration stability.

## Challenges & Resolutions

During development, the team faced several collaboration and configuration challenges:

- Merge conflicts occurred when integrating frontend CRUD development changes with deployment-related configuration changes.
- Conflicts in vite.config.js were resolved by combining frontend development proxy settings with deployment configurations.
- Duplicate and conflicting code sections in LecturerDashboard.jsx were identified and resolved during branch reconciliation.
- ESLint issues caused by unused variables and browser API definitions were identified and fixed.
- Team collaboration was maintained through feature branches, pull requests, code reviews, and structured Git workflow practices.

## Build Status

### CI Badge

[Insert GitHub Actions CI Badge Here]

### Deploy Badge

[Deployment not available yet]