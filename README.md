# Task Manager DevOps Assignment

> Advanced Git & DevOps Team Collaboration Assignment

## Project Overview

This project is a collaborative Task Manager web application developed as part of the **Advanced Git & DevOps Team Collaboration Assignment**.

The project demonstrates professional Git workflows, team collaboration, Continuous Integration (CI), Continuous Deployment (CD), and version control best practices.

---

# Team Members

| Name | Role |
|------|------|
| Dinith Jayasinghe ITBIN-2414-0001| DevOps Engineer |
| Rashmika Prabod ITBIN-2414-0018| Full-Stack Developer |

---

# Project Objectives

- Develop a Task Manager web application
- Collaborate using Git and GitHub
- Follow a professional Git branching strategy
- Implement Continuous Integration (CI)
- Implement Continuous Deployment (CD)
- Deploy the application online

---

# Technologies Used

- HTML5
- CSS3
- JavaScript

*(Update this section if you use React or another framework.)*

## DevOps

- Git
- GitHub
- GitHub Actions
- GitHub Pages *(or Vercel/Netlify if used)*

---

# Repository Structure

```text
task-manager-devops-assignment/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── src/
│
├── README.md
├── .gitignore
└── package.json (if applicable)
```

---

# Branch Strategy

This project follows a Git Flow workflow.

```
main
│
└── develop
     │
     ├── feature/task-ui
     ├── feature/login
     └── feature/...
```

### Branch Purpose

| Branch | Purpose |
|---------|----------|
| main | Production-ready code |
| develop | Integration branch |
| feature/* | New feature development |

---

# Git Workflow

1. Create a feature branch from `develop`
2. Develop the feature
3. Commit changes using Conventional Commits
4. Push the feature branch
5. Create a Pull Request
6. Review the Pull Request
7. Merge into `develop`
8. Merge `develop` into `main`
9. Automatically deploy the application

---

# Conventional Commit Messages

Examples:

```
feat: add task creation feature

fix: resolve login validation bug

docs: update README

style: improve button styling

refactor: optimize task logic

test: add unit tests

chore: configure GitHub Actions
```

---

# DevOps Responsibilities

The DevOps Engineer is responsible for:

- Repository setup
- Branch management
- Branch protection rules
- GitHub Actions configuration
- Continuous Integration (CI)
- Continuous Deployment (CD)
- Pull Request reviews
- Deployment configuration

---

# Full-Stack Developer Responsibilities

The Full-Stack Developer is responsible for:

- Building the Task Manager application
- Implementing UI
- Writing application logic
- Fixing bugs
- Creating feature branches
- Submitting Pull Requests

---

# Continuous Integration (CI)

The CI pipeline will automatically:

- Checkout repository
- Install dependencies
- Build the application
- Run tests
- Verify code quality

Workflow:

```
.github/workflows/ci.yml
```

*(To be completed after the project setup.)*

---

# Continuous Deployment (CD)

The deployment pipeline will automatically deploy the application after successful merges into the `main` branch.

Workflow:

```
.github/workflows/deploy.yml
```

Deployment Platform:

- GitHub Pages *(or update if using another platform)*

---

# Installation

*(Complete this section after the application is created.)*

Example:

```bash
git clone https://github.com/seshan03/task-manager-devops-assignment.git

cd task-manager-devops-assignment

npm install

npm run dev
```

---

# Project Features

*(Update after development is complete.)*

Example:

- Add tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed
- Responsive design

---

# Deployment

Live Application:

```
Coming Soon
```

---

# Screenshots

*(Add screenshots after the project is completed.)*

---


# Repository

GitHub Repository:

https://github.com/seshan03/task-manager-devops-assignment