# Lecturer Teaching Companion System

## Group Information
- **Dinith Jayasinghe:** ITBIN-2414-0001 - Role: DevOps Engineer
- **Rashmika Prabod:** ITBIN-2414-0018 - Role: Full-Stack Developer

## Project Description

The Lecturer Teaching Companion System is a full-stack web application designed to improve lecturer memory efficiency by helping lecturers organize and track their upcoming teaching responsibilities.

The system focuses on reducing the mental workload of lecturers who manage multiple modules, intakes, lectures, and promised assignments or quizzes. Instead of relying on memory alone, lecturers can record and monitor their academic commitments through a centralized dashboard.

The application helps lecturers remember important teaching activities by providing structured management of lectures, assignments, and module information, allowing them to easily monitor upcoming tasks and avoid forgetting academic responsibilities.

## Live Deployment

🔗 **Live URL:** https://task-manager-devops-assignment.vercel.app

## Technologies Used
- HTML5 / CSS3 / JavaScript
- React.js with Vite
- Tailwind CSS
- Node.js / Express.js
- MongoDB with Mongoose
- GitHub Actions (CI/CD)
- Vercel (Deployment Platform)

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

### Dinith Jayasinghe (DevOps Engineer)
- Set up the GitHub repository structure, `.gitignore`, and initial project scaffolding.
- Configured branch protection rules on `main` requiring pull request review before merge.
- Built and configured the CI pipeline (`.github/workflows/ci.yml`) to run linting, build, and tests on pushes and pull requests.
- Built and configured the CD pipeline (`.github/workflows/deploy.yml`) to automate production deployment to Vercel on merge to `main`.
- Restructured the backend for Vercel serverless deployment (`api/index.js`, `vercel.json`).
- Set up the MongoDB Atlas cluster, database user, and network access configuration for production use.
- Configured Vercel project settings and environment variables (`MONGODB_URI`) for the deployed application.
- Added the required GitHub Actions secrets (`VERCEL_TOKEN`, `ORG_ID`, `PROJECT_ID`) for automated deployment.
- Resolved merge conflicts between `develop` and `feature/vercel-deployment`, including reconciling `vite.config.js` and duplicate/conflicting logic in `LecturerDashboard.jsx`.
- Managed the `develop` → `main` merge process and verified the CI/CD pipeline's first successful production deployment.

### Rashmika Prabod (Full-Stack Developer)
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

The CI workflow (`ci.yml`) performs the following automated checks on every push and pull request to `main`, `develop`, and `feature/**` branches:
- Installing project dependencies.
- Running ESLint validation.
- Building the frontend application.
- Running automated tests.

The CD workflow (`deploy.yml`) triggers automatically on every push to `main`. It installs the Vercel CLI, pulls the production environment configuration, builds the project artifacts, and deploys the build directly to Vercel's production environment using a secured deployment token (`VERCEL_TOKEN`, `ORG_ID`, `PROJECT_ID` stored as GitHub Actions secrets).

Pull requests are verified through GitHub Actions before merging to ensure code quality, maintainability, and integration stability. The first production deployment via this pipeline completed successfully following the `develop` → `main` merge.

## Challenges & Resolutions

During development, the team faced several collaboration and configuration challenges:

- Merge conflicts occurred when integrating frontend CRUD development changes with deployment-related configuration changes.
- Conflicts in `vite.config.js` were resolved by combining frontend development proxy settings with deployment configurations.
- Duplicate and conflicting code sections in `LecturerDashboard.jsx` were identified and resolved during branch reconciliation, including a stray brace left behind after conflict resolution that broke the build; this was found and fixed before merging.
- ESLint issues caused by unused variables and browser API definitions were identified and fixed.
- The initial Vercel deployment returned a 404 because the production branch (`main`) had not yet been merged with the Vercel-ready configuration on `develop`; this was resolved by completing the `develop` → `main` merge, after which the deployment went live successfully.
- Team collaboration was maintained through feature branches, pull requests, code reviews, and structured Git workflow practices.

## Build Status

### CI Badge
![CI Pipeline](https://github.com/seshan03/task-manager-devops-assignment/actions/workflows/ci.yml/badge.svg)

### Deploy Badge
![Deploy to Production](https://github.com/seshan03/task-manager-devops-assignment/actions/workflows/deploy.yml/badge.svg)