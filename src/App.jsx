import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchRole } from './redux/slices/roleSlice';
import { updateMemberStatus } from './redux/slices/membersSlice';
import TeamLeadView from './components/TeamLeadView';
import TeamMemberView from './components/TeamMemberView';
import { LayoutDashboard, Users, Settings, FolderKanban } from 'lucide-react';

function App() {
  const { currentRole, currentUser } = useSelector(state => state.role);
  const dispatch = useDispatch();

  // --- AUTO-RESET LOGIC (BONUS) ---
  const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 Minutes

  const handleInactivity = useCallback(() => {
    // Assuming the current user is ID 1 (Natalie Gibson) for this demo
    // In a real app, you'd check the logged-in user's ID
    dispatch(updateMemberStatus({ id: 1, status: 'Offline' }));
    console.log("User set to offline due to inactivity");
  }, [dispatch]);

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleInactivity, INACTIVITY_LIMIT);
    };

    // Listen for user activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    // Initialize timer
    resetTimer();

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [handleInactivity]);
  // --------------------------------

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col shadow-xl">
        <div className="p-6 text-2xl font-bold flex items-center gap-3 tracking-tight">
          <LayoutDashboard className="text-blue-400" /> 
          <span>TeamPulse</span>
        </div>
        <nav className="mt-6 flex-1 px-4 space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 bg-blue-700 text-white rounded-lg shadow-md transition-all cursor-pointer">
            <Users size={20} /> <span className="font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-all cursor-pointer">
            <FolderKanban size={20} /> <span className="font-medium">Projects</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-all cursor-pointer">
            <Settings size={20} /> <span className="font-medium">Settings</span>
          </div>
        </nav>
        <div className="p-4 text-xs text-slate-500 text-center">
          v1.0.0 Stable
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center z-10">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            {currentRole === 'lead' ? 'Team Overview' : 'My Workspace'}
          </h1>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="font-bold text-gray-900 leading-tight">{currentUser}</p>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">{currentRole}</p>
            </div>
            
            <div className="h-8 w-[1px] bg-gray-300 hidden sm:block"></div>

            {/* Role Toggle Switch */}
            <button
              onClick={() => dispatch(switchRole(currentRole === 'lead' ? 'member' : 'lead'))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                ${currentRole === 'lead' ? 'bg-blue-600' : 'bg-gray-400'}`}
            >
              <span className="sr-only">Switch Role</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${currentRole === 'lead' ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
            <span className="text-sm font-medium text-gray-600">
                {currentRole === 'lead' ? 'Lead View' : 'Member View'}
            </span>
          </div>
        </header>

        {/* Dashboard Content - Scrollable Area */}
        <div className="flex-1 overflow-auto p-8">
          {currentRole === 'lead' ? <TeamLeadView /> : <TeamMemberView />}
        </div>
      </main>
    </div>
  );
}

export default App;