import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { assignTask } from '../redux/slices/membersSlice';
import StatusChart from './StatusChart';
import { CheckCircle, Clock, Coffee, WifiOff, Calendar, UserPlus, Filter, ArrowUpDown } from 'lucide-react';

const TeamLeadView = () => {
  const members = useSelector(state => state.members.members);
  const dispatch = useDispatch();
  
  // Form State
  const [selectedMember, setSelectedMember] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  // FILTER & SORT STATE (Mandatory Requirement)
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Logic to process the list based on filter/sort
  const processedMembers = [...members]
    .filter(member => {
      if (filterStatus === 'All') return true;
      return member.status === filterStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'tasks') {
        // Sort by active tasks (descending)
        const aActive = a.tasks.filter(t => !t.completed).length;
        const bActive = b.tasks.filter(t => !t.completed).length;
        return bActive - aActive; 
      }
      return 0; // Default sort by ID/Name
    });

  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedMember || !taskTitle) return;
    dispatch(assignTask({ memberId: selectedMember, task: { title: taskTitle, dueDate } }));
    setTaskTitle('');
    setDueDate('');
  };

  const getStatusCount = (status) => members.filter(m => m.status === status).length;

  // Widget Config
  const availabilityWidgets = [
    { label: 'Working', count: getStatusCount('Working'), icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Meeting', count: getStatusCount('Meeting'), icon: Clock, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Break', count: getStatusCount('Break'), icon: Coffee, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Offline', count: getStatusCount('Offline'), icon: WifiOff, color: 'text-gray-500', bg: 'bg-gray-50' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* TOP SECTION: Widgets and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* 1. Availability Widgets */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="font-bold text-lg mb-6 text-gray-800 dark:text-white">Team Availability</h3>
            <div className="grid grid-cols-2 gap-4">
              {availabilityWidgets.map((item) => (
                <div key={item.label} className={`p-4 rounded-xl ${item.bg} dark:bg-slate-700/30 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1`}>
                   <item.icon className={`mb-2 ${item.color}`} size={28} />
                   <span className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wide">{item.label}</span>
                   <span className={`text-2xl font-bold ${item.color}`}>{item.count}</span>
                </div>
              ))}
            </div>
         </div>

         {/* 2. Chart Widget */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col items-center justify-center relative">
             <h3 className="absolute top-6 left-6 font-bold text-lg text-gray-800 dark:text-white">Status Overview</h3>
             <div className="w-full h-48 mt-8">
               <StatusChart members={members} />
             </div>
             <div className="mt-4 text-center">
                <span className="text-3xl font-bold text-gray-800 dark:text-white">{members.length}</span>
                <p className="text-sm text-gray-400">Total Members</p>
             </div>
         </div>

         {/* 3. Assign Task Widget */}
         <div className="bg-[#2D2B55] p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
             <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[#FF4081] rounded-full opacity-20 blur-2xl"></div>
             
             <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Calendar size={18}/> Quick Assign</h3>
             <form onSubmit={handleAssign} className="space-y-4 relative z-10">
               <div className="bg-white/10 rounded-lg p-2 flex items-center border border-white/10">
                  <UserPlus size={16} className="text-gray-300 mr-2"/>
                  <select 
                    className="bg-transparent w-full text-sm outline-none text-white placeholder-gray-300 [&>option]:text-black"
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                  >
                    <option value="" className="text-black">Select Member</option>
                    {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
               </div>
               <input 
                  type="text" 
                  placeholder="Task Title"
                  className="w-full bg-white/10 rounded-lg p-2.5 text-sm outline-none text-white placeholder-gray-300 border border-white/10 focus:border-white/30 transition-colors"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
               <input 
                  type="date" 
                  className="w-full bg-white/10 rounded-lg p-2.5 text-sm outline-none text-white/80 border border-white/10"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
               <button type="submit" className="w-full bg-[#FF4081] hover:bg-[#e6306c] text-white py-2.5 rounded-lg font-semibold text-sm transition-all shadow-md active:scale-95">
                 Assign Task
               </button>
             </form>
         </div>
      </div>

      {/* BOTTOM SECTION: Team List with Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Member Status Monitor</h2>
            
            {/* Filter & Sort Controls - RESTORED & STYLED */}
            <div className="flex gap-3">
              <div className="relative">
                <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select 
                  className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Working">Working</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Break">Break</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              <div className="relative">
                <ArrowUpDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select 
                  className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Sort by Name</option>
                  <option value="tasks">Sort by Active Tasks</option>
                </select>
              </div>
            </div>
        </div>
        
        <div className="space-y-4">
          {processedMembers.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p>No members match the current filter.</p>
            </div>
          ) : (
            processedMembers.map(member => (
              <div key={member.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                
                {/* Avatar & Name */}
                <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                  <img 
                      src={`https://ui-avatars.com/api/?name=${member.name}&background=random`} 
                      alt={member.name}
                      className="w-12 h-12 rounded-full shadow-sm"
                  />
                  <div>
                      <p className="font-bold text-gray-800 dark:text-white">{member.name}</p>
                      <p className="text-xs text-gray-400">UI/UX Designer</p> 
                  </div>
                </div>

                {/* Active Tasks Metric */}
                <div className="hidden sm:flex flex-col items-center px-6 border-l border-r border-gray-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Tasks</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white">{member.tasks.filter(t => !t.completed).length}</p>
                </div>

                {/* Status Pill */}
                <div className="flex items-center justify-end w-full sm:w-32">
                  <span className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold w-full justify-center shadow-sm
                    ${member.status === 'Working' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300' : 
                      member.status === 'Meeting' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300' : 
                      member.status === 'Break' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300' :
                      'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-400'}`}>
                    <span className={`w-2 h-2 rounded-full animate-pulse ${
                      member.status === 'Working' ? 'bg-green-500' : 
                      member.status === 'Meeting' ? 'bg-purple-500' : 
                      member.status === 'Break' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}></span>
                    {member.status}
                  </span>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamLeadView;