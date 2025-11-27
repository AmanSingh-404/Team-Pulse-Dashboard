import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMemberStatus, updateTaskProgress } from '../redux/slices/membersSlice';
import { Play, Pause, Coffee, LogOut, Plus, Minus } from 'lucide-react';

const TeamMemberView = () => {
  // Simulating logged in user as ID 1 (Natalie Gibson) for this demo
  const myId = 1; 
  const member = useSelector(state => state.members.members.find(m => m.id === myId));
  const dispatch = useDispatch();

  if (!member) return <div>User not found</div>;

  const statuses = [
    { label: 'Working', icon: Play, color: 'bg-green-500' },
    { label: 'Meeting', icon: Pause, color: 'bg-purple-500' },
    { label: 'Break', icon: Coffee, color: 'bg-yellow-500' },
    { label: 'Offline', icon: LogOut, color: 'bg-gray-500' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* 1. Update Status Section [cite: 25] */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Current Status: <span className="text-blue-600">{member.status}</span></h2>
        <div className="flex gap-4">
          {statuses.map((stat) => (
            <button
              key={stat.label}
              onClick={() => dispatch(updateMemberStatus({ id: myId, status: stat.label }))}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all
                ${member.status === stat.label ? 'ring-4 ring-offset-2 ring-blue-300' : 'opacity-70 hover:opacity-100'}
                ${stat.color}`}
            >
              <stat.icon size={18} /> {stat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. My Tasks List [cite: 28] */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">My Tasks</h2>
        {member.tasks.length === 0 ? (
          <p className="text-gray-500">No tasks assigned yet.</p>
        ) : (
          <div className="space-y-4">
            {member.tasks.map(task => (
              <div key={task.id} className="border p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">{task.title}</h3>
                  <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
                </div>
                
                {/* Progress Bar & Controls [cite: 30] */}
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => dispatch(updateTaskProgress({ memberId: myId, taskId: task.id, increment: false }))}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <Minus size={16} />
                  </button>
                  
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${task.completed ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-300`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold min-w-[3rem]">{task.progress}%</span>

                  <button 
                    onClick={() => dispatch(updateTaskProgress({ memberId: myId, taskId: task.id, increment: true }))}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={task.completed}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMemberView;