import { createSlice } from '@reduxjs/toolkit';

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    currentRole: 'lead', // Default to Team Lead
    currentUser: 'Dylan Hunter' // Mock user name from design
  },
  reducers: {
    switchRole: (state, action) => {
      // Toggle between Team Lead and Team Member views 
      state.currentRole = action.payload;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    }
  }
});

export const { switchRole, setUser } = roleSlice.actions;
export default roleSlice.reducer;