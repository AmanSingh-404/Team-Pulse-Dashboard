# Team Pulse Dashboard

A React-based productivity monitoring dashboard that allows Team Leads to assign tasks and monitor status, while Team Members can track their progress and update their availability.

## 🚀 Live Demo
[Insert your Netlify/Vercel link here]

## 🛠 Tech Stack
- **Frontend:** React (Vite)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Charts:** Chart.js & React-Chartjs-2
- **Icons:** Lucide React

## ✨ Features
### 👑 Team Lead View
- **Status Monitor:** Real-time dashboard showing who is Working, on Break, or Offline.
- **Task Assignment:** Assign tasks with titles and due dates to specific members.
- **Data Visualization:** Pie chart showing the distribution of team availability.
- **Filtering & Sorting:** Filter members by status and sort by workload.

### 👤 Team Member View
- **Status Updates:** Toggle status between Working, Meeting, Break, and Offline.
- **Task Management:** View assigned tasks and update progress in 10% increments.
- **Progress Tracking:** Visual progress bars for active tasks.

### ⚙️ Technical Highlights
- **Role Switching:** Global state toggle between Admin and User views.
- **Persistence:** Data is saved to LocalStorage, so it persists after page refreshes.
- **Auto-Reset:** Automatically marks users as "Offline" after 10 minutes of inactivity.

## 📦 Installation
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`