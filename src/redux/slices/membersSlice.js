import { createSlice } from '@reduxjs/toolkit';

// Mock Initial Data [cite: 8]
const initialState = {
  members: [
    { id: 1, name: "Natalie Gibson", status: "Working", tasks: [] },
    { id: 2, name: "Peter Piper", status: "Meeting", tasks: [] },
    { id: 3, name: "John Doe", status: "Offline", tasks: [] },
  ]
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    // Member updates their own status [cite: 25]
    updateMemberStatus: (state, action) => {
      const { id, status } = action.payload;
      const member = state.members.find(m => m.id === id);
      if (member) member.status = status;
    },
    // Lead assigns a task [cite: 19]
    assignTask: (state, action) => {
      const { memberId, task } = action.payload;
      const member = state.members.find(m => m.id === parseInt(memberId));
      if (member) {
        member.tasks.push({
          id: Date.now(),
          ...task,
          progress: 0,
          completed: false
        });
      }
    },
    // Update task progress in 10% steps [cite: 30]
    updateTaskProgress: (state, action) => {
      const { memberId, taskId, increment } = action.payload;
      const member = state.members.find(m => m.id === memberId);
      const task = member.tasks.find(t => t.id === taskId);
      
      if (task) {
        let newProgress = task.progress + (increment ? 10 : -10);
        // Clamp between 0 and 100
        newProgress = Math.max(0, Math.min(100, newProgress));
        
        task.progress = newProgress;
        task.completed = newProgress === 100;
      }
    }
  }
});

export const { updateMemberStatus, assignTask, updateTaskProgress } = membersSlice.actions;
export default membersSlice.reducer;