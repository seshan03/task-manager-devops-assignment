# Lecturer Teaching Companion System

## Project Overview

The Lecturer Teaching Companion System is a full-stack application designed to help university lecturers manage their teaching activities, track lesson progress, record assignments promised to students, and receive reminders for upcoming lectures.

The system acts as a personal teaching assistant by helping lecturers maintain organized teaching records across different modules and student intakes.

## Problem Being Solved

Lecturers often manage multiple modules, meetings, student project supervision tasks, and lecture schedules. This can lead to:

- Forgetting what was taught in previous lectures.
- Forgetting planned assignments or promised tasks.
- Losing track of upcoming lessons for different student intakes.
- Difficulty maintaining consistent teaching records.

This system provides a centralized platform to manage these responsibilities.

## Technology Stack

### Frontend
- React.js
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Additional Services
- JWT Authentication
- Email Notifications
- Scheduled Reminders

## Project Structure
lecturer-teaching-companion/

├── src/
│ ├── frontend/
│ └── backend/
│
├── .github/
│ └── workflows/
│
├── AI_RULES.md
├── AI_AGENT_SYSTEM_PROMPT.md
├── README.md
├── package.json
└── .gitignore


## Development Workflow

The project follows a feature-based Git workflow:

- `main` - Production branch
- `develop` - Integration branch
- `feature/*` - Individual feature development branches

All changes must follow conventional commit messages.

Example:
eat: add lesson tracking feature
fix: resolve reminder scheduling issue
docs: update project documentation


## Current Development Status

Project foundation setup is in progress.