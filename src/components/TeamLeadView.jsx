import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { assignTask } from '../redux/slices/membersSlice';
import StatusChart from './StatusChart'; // We will create this in Step 2

const TeamLeadView = () => {
  const members = useSelector(state => state.members.members);
  const dispatch = useDispatch();
  
  // State for Form, Filter, and Sort
  const [selectedMember, setSelectedMember] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // New: Filter state
  const [sortBy, setSortBy] = useState('name'); // New: Sort state

  // Logic to Filter and Sort Members
  const processedMembers = [...members]
    .filter(member => {
      if (filterStatus === 'All') return true;
      return member.status === filterStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'tasks') {
        // Sort by number of active (incomplete) tasks
        const aActive = a.tasks.filter(t => !t.completed).length;
        const bActive = b.tasks.filter(t => !t.completed).length;
        return bActive - aActive; // Descending order
      }
      return 0; // Default (no sort/ID sort)
    });

  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedMember || !taskTitle) return;
    dispatch(assignTask({ memberId: selectedMember, task: { title: taskTitle, dueDate } }));
    setTaskTitle('');
    setDueDate('');
  };

  const getStatusCount = (status) => members.filter(m => m.status === status).length;

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Counts Grid */}
         <div className="grid grid-cols-2 gap-4">
            {['Working', 'Meeting', 'Break', 'Offline'].map(status => (
              <div key={status} className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500 flex flex-col justify-center">
                <h3 className="text-gray-500 text-sm font-medium">{status}</h3>
                <p className="text-3xl font-bold text-gray-800">{getStatusCount(status)}</p>
              </div>
            ))}
         </div>
         {/* Chart Placeholder (Will appear after Step 2) */}
         <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center">
             <StatusChart members={members} />
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Task Assignment */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Assign Tasks</h2>
          <form onSubmit={handleAssign} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team Member</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                required
              >
                <option value="">Select Member</option>
                {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input 
                type="date" 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">
              Assign Task
            </button>
          </form>
        </div>

        {/* Right Column: Member List with Filter/Sort */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-gray-800">Team Status Monitor</h2>
            
            {/* Filter & Sort Controls */}
            <div className="flex gap-2">
              <select 
                className="p-2 border rounded text-sm bg-gray-50"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Working">Working</option>
                <option value="Meeting">Meeting</option>
                <option value="Break">Break</option>
                <option value="Offline">Offline</option>
              </select>

              <select 
                className="p-2 border rounded text-sm bg-gray-50"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="tasks">Sort by Active Tasks</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {processedMembers.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No members match the current filter.</p>
            ) : (
              processedMembers.map(member => (
                <div key={member.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                  <div className="mb-2 sm:mb-0">
                    <p className="font-bold text-gray-800">{member.name}</p>
                    <p className="text-xs text-gray-500">
                      {member.tasks.filter(t => !t.completed).length} Active Tasks
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                     {/* Status Badge */}
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                      ${member.status === 'Working' ? 'bg-green-100 text-green-700' : 
                        member.status === 'Meeting' ? 'bg-purple-100 text-purple-700' : 
                        member.status === 'Break' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-200 text-gray-600'}`}>
                      {member.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeadView;