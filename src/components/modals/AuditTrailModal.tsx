import { X, ShieldCheck, Clock, CheckCircle2, FileText } from 'lucide-react';

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  author: string;
  impact: string;
}

interface AuditTrailModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: AuditEntry[];
}

export function AuditTrailModal({ isOpen, onClose, logs }: AuditTrailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-slate-700 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-[#0d1322] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-800/80 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Executive Action Audit Trail
                <span className="text-xs font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                  {logs.length} entries
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Immutable compliance log of governance decisions, task rebalances, and budget adjustments.
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

        {/* List of entries */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1 text-xs">
          {logs.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p>No actions logged yet in this executive review session.</p>
              <p className="text-[11px] text-slate-500 mt-1">Actions triggered in the AI Risk Engine will appear here.</p>
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {log.action}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {log.timestamp}
                  </span>
                </div>
                <p className="text-slate-300">
                  {log.details}
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[11px]">
                  <span className="text-slate-400">Authorized by: <strong className="text-slate-200">{log.author}</strong></span>
                  <span className="text-emerald-400 font-medium">{log.impact}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0d1322] flex items-center justify-between text-xs text-slate-400">
          <span>Cryptographically validated session state</span>
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
