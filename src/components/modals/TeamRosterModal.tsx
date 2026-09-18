import { useState } from 'react';
import { X, Users, Search, CheckCircle2, Shield, ArrowUpRight } from 'lucide-react';
import { teamMembers } from '../../data/portfolioData';

interface TeamRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TeamRosterModal({ isOpen, onClose }: TeamRosterModalProps) {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  if (!isOpen) return null;

  // 40 members simulated roster with realistic data
  const departments = [
    { name: 'Engineering', count: 24, lead: 'Marcus Chen' },
    { name: 'Product & Design', count: 8, lead: 'Sarah Lin' },
    { name: 'Infrastructure & DevOps', count: 5, lead: 'Alex Vance' },
    { name: 'Program Management', count: 3, lead: 'Elena Rostova' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-slate-700 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-[#0d1322] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-800/80 flex items-center justify-center text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Enterprise Talent & Team Directory
                <span className="text-xs font-normal text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-800">
                  40 Active Members
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Staff allocation across active squads, capacity utilization, and project assignments.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Department breakdown pills */}
        <div className="p-4 bg-slate-900/60 border-b border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {departments.map((dept) => (
            <div key={dept.name} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">{dept.name}</div>
              <div className="text-base font-bold text-white mt-0.5">{dept.count} members</div>
              <div className="text-[10px] text-slate-500 truncate">Lead: {dept.lead}</div>
            </div>
          ))}
        </div>

        {/* Member list */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Squad Leads & Key Contributors
          </div>
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="p-3 bg-slate-900/70 border border-slate-800 rounded-xl flex items-center justify-between text-xs hover:border-slate-700 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-indigo-300 text-xs">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-white">{member.name}</div>
                  <div className="text-slate-400 text-[11px]">{member.role} · <span className="text-slate-500">{member.dept}</span></div>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  member.capacity.includes('overloaded')
                    ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                    : member.capacity.includes('free')
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {member.capacity}
                </span>
                <div className="text-[10px] text-indigo-400 mt-1">
                  {member.currentProjects.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0d1322] flex items-center justify-between text-xs text-slate-400">
          <span>Overall capacity index: <strong>88.4% optimal</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
