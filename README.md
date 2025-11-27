# TeamPulse - Productivity Dashboard

> **Live Demo:** [https://team-pulse-dashboard-three.vercel.app/]

A comprehensive dashboard application built to manage team statuses and task assignments. This project was developed to demonstrate proficiency in **React, Redux Toolkit, and Modern UI implementation**.

## 🏗 Architectural Decisions

### 1. State Management (Redux Toolkit)
The application uses a centralized Redux store with two distinct slices:
- `membersSlice`: Manages complex array manipulation for team members, including deep updates for task progress and status changes.
- `roleSlice`: Handles the global view state (Admin vs. User), allowing for seamless role simulation without page reloads.

### 2. Styling Strategy (Tailwind CSS)
I utilized Tailwind CSS for a utility-first approach, ensuring:
- **Consistency:** Global color palette using custom configuration.
- **Responsiveness:** Mobile-first design for the sidebar and grid layouts.
- **Dark Mode:** Implemented using Tailwind's `darkMode: 'class'` strategy for instant theme switching.

### 3. Performance & Persistence
- **LocalStorage Integration:** The Redux store subscribes to changes and persists state to `localStorage`, preventing data loss on refresh.
- **Auto-Reset Optimization:** Uses `useCallback` and cleanup functions in `useEffect` to prevent memory leaks while tracking user inactivity (10-minute timeout).

## ✨ Key Features
- **Role-Based Access Control (RBAC):** Simulate Admin (Lead) and Standard User (Member) roles.
- **Data Visualization:** Real-time Doughnut chart using `chart.js` to visualize team availability.
- **Smart Filtering:** sort members by workload (active tasks) or filter by live status.
- **Task Workflow:** Full cycle task management: Assign -> Track Progress -> Complete.

## 🛠 Tech Stack
- **Frontend:** React 18 (Vite)
- **State:** Redux Toolkit (RTK)
- **Styling:** Tailwind CSS
- **Charts:** React-Chartjs-2
- **Icons:** Lucide React

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repo-link]
