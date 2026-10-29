import React, { useState } from 'react';
import { UserRole, WorkflowStage, AuditLogEntry, WorkflowStep } from '../../types';

interface GovernanceWorkflowViewProps {
  currentRole: UserRole;
  stages: WorkflowStage[];
  auditLogs: AuditLogEntry[];
  onAdvanceStage: () => void;
  onRevertStage: (reason: string) => void;
  onAddLog: (action: string, details: string) => void;
  onNavigate: (step: WorkflowStep) => void;
}

export const GovernanceWorkflowView: React.FC<GovernanceWorkflowViewProps> = ({
  currentRole,
  stages,
  auditLogs,
  onAdvanceStage,
  onRevertStage,
  onAddLog,
  onNavigate
}) => {
  const [commentText, setCommentText] = useState('');
  const [showRevertDialog, setShowRevertDialog] = useState(false);
  const [revertReason, setRevertReason] = useState('');

  const activeStageIndex = stages.findIndex((s) => s.status === 'active');
  const activeStage = stages[activeStageIndex] || stages[stages.length - 1];

  const handlePostComment = () => {
    if (!commentText.trim()) return;
    onAddLog(
      'Faculty Comment Added',
      `${currentRole.toUpperCase()}: ${commentText.trim()}`
    );
    setCommentText('');
  };

  const handleRevertConfirm = () => {
    if (!revertReason.trim()) return;
    onRevertStage(revertReason);
    setRevertReason('');
    setShowRevertDialog(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111827] p-5 rounded-xl border border-slate-800 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#1e293b] text-sky-400 font-mono text-xs font-semibold uppercase">
              STEP 05 OF 06
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider">
              GOVERNANCE & APPROVALS
            </span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">
            Institutional Approval Workflow & Audit Trail
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Sequential sign-off from Course Author through Subject Matter Expert, PAC Committee, and HOD BOS Ratification.
          </p>
        </div>

        <button
          onClick={() => onNavigate('export')}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-md flex items-center gap-1.5 self-start sm:self-center shrink-0"
          type="button"
        >
          <span>Continue to Export Pack</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* WORKFLOW PROGRESS STEPPER WITH CONNECTOR TRACKS */}
      <section className="bg-[#111827] rounded-xl p-5 border border-slate-800 shadow-md flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sequential Routing Line
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#1e293b] text-sky-300 font-mono">
              Stage {activeStageIndex + 1} of {stages.length}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <span className="material-symbols-outlined text-[15px] text-sky-400">update</span>
            <span>SLA Target: 48h Remaining</span>
          </div>
        </div>

        {/* Stepper Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {stages.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isActive = stage.status === 'active';

            return (
              <div
                key={stage.id}
                className={`flex flex-col p-3 rounded-lg border transition-all ${
                  isActive
                    ? 'bg-[#0f233d] border-sky-500 shadow-lg ring-1 ring-sky-500/30'
                    : isCompleted
                    ? 'bg-[#0d1424] border-slate-800'
                    : 'bg-[#090d16] border-slate-900 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] ${
                      isCompleted
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : isActive
                        ? 'bg-blue-600 text-white font-bold animate-pulse'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isCompleted ? (
                      <span className="material-symbols-outlined text-[15px]">check</span>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider ${
                      isActive
                        ? 'text-sky-300'
                        : isCompleted
                        ? 'text-emerald-400'
                        : 'text-slate-600'
                    }`}
                  >
                    {isActive ? 'Current' : isCompleted ? 'Done' : 'Queued'}
                  </span>
                </div>

                <span className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-slate-200'}`}>
                  {stage.name}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 truncate">{stage.owner}</span>
                <span className="text-[10px] text-slate-500 mt-1 font-mono">{stage.timestamp}</span>
              </div>
            );
          })}
        </div>

        {/* Return State Exception Pathway Banner */}
        <div className="p-3.5 rounded-lg bg-[#0d1424] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-red-950 text-red-400 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">undo</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider font-mono">
                  Exception Branch:
                </span>
                <span className="font-semibold text-white">Returned for Remediation</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                If flagged at Reviewer or HOD level, specification is reverted to Draft, editing locks are released for Author, and revision increments to <code className="text-sky-300 font-mono">Rev 2.5</code>.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowRevertDialog(true)}
            className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-medium border border-red-800 transition-colors shrink-0"
            type="button"
          >
            Revert to Draft
          </button>
        </div>
      </section>

      {/* Revert Dialog */}
      {showRevertDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#090d16] border border-red-800/80 rounded-xl w-full max-w-md p-5 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2 text-red-400">
              <span className="material-symbols-outlined text-[20px]">warning</span>
              <h3 className="font-bold text-sm text-white">Revert Specification to Draft</h3>
            </div>
            <p className="text-xs text-slate-300">
              Please enter the remediation requirement or defect explanation for the Course Author:
            </p>
            <textarea
              rows={3}
              value={revertReason}
              onChange={(e) => setRevertReason(e.target.value)}
              placeholder="e.g. Unit 4 practical hours need adjustment to match lab experiments..."
              className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-red-500"
            />
            <div className="flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setShowRevertDialog(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleRevertConfirm}
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium shadow-sm"
                type="button"
              >
                Confirm Revert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Stage Sign-off Panel */}
      <section className="bg-[#111827] rounded-xl p-5 border border-slate-800 shadow-md flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-400 text-[20px]">how_to_reg</span>
            <h3 className="text-sm font-semibold text-white">Active Stage Actions & Committee Review</h3>
          </div>
          <span className="text-xs text-slate-400">
            Acting as: <strong className="text-white capitalize">{currentRole}</strong>
          </span>
        </div>

        <div className="p-4 rounded-lg bg-[#0d1424] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">{activeStage?.name}</span>
              <span className="text-[10px] font-mono text-sky-400 px-2 py-0.5 rounded bg-[#1e293b]">
                {activeStage?.roleTitle}
              </span>
            </div>
            <p className="text-xs text-slate-300">{activeStage?.comments}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeStageIndex < stages.length - 1 ? (
              <button
                onClick={onAdvanceStage}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors shadow-md flex items-center gap-1.5"
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">check_circle</span>
                <span>Sign-Off & Advance Stage</span>
              </button>
            ) : (
              <span className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>Final Approval Ratified</span>
              </span>
            )}
          </div>
        </div>

        {/* Comment Input */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
            Add Audit Observation or Reviewer Note
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Enter remark for Board of Studies record..."
              className="flex-1 bg-[#090d16] text-white placeholder:text-slate-500 px-3 py-2 rounded-lg text-xs border border-slate-700 focus:outline-none focus:border-sky-500"
              onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
            />
            <button
              onClick={handlePostComment}
              className="px-4 py-2 rounded-lg bg-[#1e293b] hover:bg-[#27364f] text-sky-300 font-medium text-xs transition-colors border border-slate-700 flex items-center gap-1"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">send</span>
              <span>Post</span>
            </button>
          </div>
        </div>
      </section>

      {/* Audit Log Trail */}
      <section className="bg-[#111827] rounded-xl p-5 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-400 text-[18px]">history</span>
            <h3 className="text-sm font-semibold text-white">Official Curriculum Audit Trail</h3>
          </div>
          <span className="font-mono text-xs text-slate-500">Immutable Log</span>
        </div>

        <div className="space-y-3">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-lg bg-[#0d1424] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-slate-400 text-[18px] mt-0.5">
                  notes
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{log.action}</span>
                    <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-[#1e293b]">
                      {log.author} ({log.role})
                    </span>
                  </div>
                  <p className="text-slate-300 mt-0.5">{log.details}</p>
                </div>
              </div>
              <span className="font-mono text-[11px] text-slate-500 shrink-0 self-end sm:self-center">
                {log.timestamp}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
