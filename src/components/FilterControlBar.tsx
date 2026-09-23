import { useState } from 'react';
import { 
  RotateCw, 
  Download, 
  ChevronDown, 
  SlidersHorizontal, 
  Calendar, 
  Check, 
  FileText, 
  Table, 
  Code, 
  Sparkles
} from 'lucide-react';
import { DepartmentOption, ManagerOption, TimeframeOption } from '../types';

interface FilterControlBarProps {
  manager: ManagerOption;
  setManager: (mgr: ManagerOption) => void;
  healthFilter: string;
  setHealthFilter: (health: string) => void;
  timeframe: TimeframeOption;
  setTimeframe: (tf: TimeframeOption) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onExport: (format: 'pdf' | 'csv' | 'json') => void;
}

export function FilterControlBar({
  manager,
  setManager,
  healthFilter,
  setHealthFilter,
  timeframe,
  setTimeframe,
  onRefresh,
  isRefreshing,
  onExport,
}: FilterControlBarProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showCustomDateModal, setShowCustomDateModal] = useState(false);
  const [customRange, setCustomRange] = useState({ start: '2026-06-01', end: '2026-09-16' });

  return (
    <section className="mb-8">
      <div className="bg-[#111827] border border-slate-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Quick Filters:</span>
            </div>

            {/* Manager Filter */}
            <div className="relative">
              <select
                value={manager}
                onChange={(e) => setManager(e.target.value as ManagerOption)}
                aria-label="Manager filter"
                className="appearance-none bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-medium rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="All">Manager: All</option>
                <option value="Marcus Chen">Manager: Marcus Chen</option>
                <option value="Sarah Lin">Manager: Sarah Lin</option>
                <option value="Alex Vance">Manager: Alex Vance</option>
                <option value="Elena Rostova">Manager: Elena Rostova</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* Health Quick Filter Button: Health: At-Risk (12) */}
            <button
              onClick={() => setHealthFilter(healthFilter === 'At-Risk' ? 'All' : 'At-Risk')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                healthFilter === 'At-Risk'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 ring-1 ring-amber-500/30'
                  : 'bg-slate-900 border-slate-700 hover:border-amber-700/60 text-slate-300 hover:text-amber-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${healthFilter === 'At-Risk' ? 'bg-amber-400' : 'bg-slate-500'}`} />
              <span>Health: At-Risk (12)</span>
            </button>

            {healthFilter !== 'All' && healthFilter !== 'At-Risk' && (
              <span className="text-xs text-indigo-400 font-medium bg-indigo-950/60 px-2 py-1 rounded border border-indigo-800/60">
                Filtered: {healthFilter}
              </span>
            )}
          </div>

          {/* Timeframe & Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
            
            {/* Timeframe Toggle */}
            <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setTimeframe('30d')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  timeframe === '30d'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                30d
              </button>
              <button
                onClick={() => setTimeframe('90d')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  timeframe === '90d'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                90d
              </button>
              <button
                onClick={() => {
                  setTimeframe('custom');
                  setShowCustomDateModal(true);
                }}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                  timeframe === 'custom'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Calendar className="w-3 h-3" />
                <span>Custom</span>
              </button>
            </div>

            {/* Actions: Refresh & Export */}
            <div className="flex items-center gap-2">
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 active:scale-95 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition cursor-pointer disabled:opacity-50"
                title="Refresh portfolio state and re-calculate risks"
              >
                <RotateCw className={`w-3.5 h-3.5 text-slate-400 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
                <span>{isRefreshing ? 'Updating...' : 'Refresh'}</span>
              </button>

              {/* Export Report Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Report</span>
                  <ChevronDown className="w-3 h-3 ml-0.5" />
                </button>

                {showExportMenu && (
                  <div className="absolute right-0 mt-1 w-52 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 z-40">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      Report Formats
                    </div>
                    <button
                      onClick={() => {
                        onExport('pdf');
                        setShowExportMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-rose-400" />
                      <div>
                        <div className="font-medium">Executive Summary (PDF)</div>
                        <div className="text-[10px] text-slate-400">Board-ready visual deck</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        onExport('csv');
                        setShowExportMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Table className="w-3.5 h-3.5 text-emerald-400" />
                      <div>
                        <div className="font-medium">Projects & Tasks (CSV)</div>
                        <div className="text-[10px] text-slate-400">Raw spreadsheet records</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        onExport('json');
                        setShowExportMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Code className="w-3.5 h-3.5 text-indigo-400" />
                      <div>
                        <div className="font-medium">Risk Engine Payload (JSON)</div>
                        <div className="text-[10px] text-slate-400">API telemetry metrics</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Custom Date Modal */}
      {showCustomDateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-700 rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              Custom Analysis Timeframe
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Select date window to recalculate velocity and task completions.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Start Date</label>
                <input
                  type="date"
                  value={customRange.start}
                  onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">End Date</label>
                <input
                  type="date"
                  value={customRange.end}
                  onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowCustomDateModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCustomDateModal(false);
                  onRefresh();
                }}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                Apply Range
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
