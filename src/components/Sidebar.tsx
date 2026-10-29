import React from 'react';
import { WorkflowStep, CourseMetadata } from '../types';

interface SidebarProps {
  currentStep: WorkflowStep;
  setCurrentStep: (step: WorkflowStep) => void;
  unresolvedCount: number;
  onOpenGuidelines: () => void;
  hasOutcomes: boolean;
  hasUpload: boolean;
  courseMeta: CourseMetadata;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentStep,
  setCurrentStep,
  unresolvedCount,
  onOpenGuidelines,
  hasOutcomes,
  hasUpload,
  courseMeta
}) => {
  const steps: { id: WorkflowStep; label: string; number: string; isDone?: boolean }[] = [
    { id: 'dashboard', label: 'Executive Dashboard', number: '0' },
    { id: 'upload', label: '1. Upload Ingestion', number: '1', isDone: hasUpload },
    { id: 'specification', label: '2. Spec Overview & Diff', number: '2', isDone: hasOutcomes },
    { id: 'matrix', label: '3. CO-PO-PSO Map', number: '3', isDone: hasOutcomes },
    { id: 'checks', label: '4. Checks & Audit', number: '4' },
    { id: 'governance', label: '5. Workflow Routing', number: '5' },
    { id: 'export', label: '6. Export Pack', number: '6' }
  ];

  return (
    <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-60 md:w-64 bg-[#090d16] border-r border-slate-800 z-30 flex flex-col justify-between p-3 select-none">
      <div className="flex flex-col gap-3">
        <div className="px-2 pt-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Academic Workflow
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {steps.map((s) => {
            const isActive = currentStep === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentStep(s.id)}
                className={`group flex items-center justify-between px-3 py-2 rounded text-left transition-all ${
                  isActive
                    ? 'bg-[#131d2e] text-blue-400 font-semibold border-l-2 border-blue-500'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
                type="button"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {s.id === 'dashboard' ? (
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">dashboard</span>
                    </span>
                  ) : s.isDone ? (
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700 flex items-center justify-center text-xs">
                      <span className="material-symbols-outlined text-[13px]">check</span>
                    </span>
                  ) : (
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[11px] ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {s.number}
                    </span>
                  )}
                  <span className="text-xs truncate">{s.label}</span>
                </div>

                {/* Right pill */}
                {s.id === 'checks' && unresolvedCount > 0 ? (
                  <span className="px-1.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-[10px]">
                    {unresolvedCount}
                  </span>
                ) : s.id === 'checks' && unresolvedCount === 0 && hasOutcomes ? (
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-[10px]">
                    Pass
                  </span>
                ) : s.isDone ? (
                  <span className="font-mono text-[10px] text-slate-500">Done</span>
                ) : isActive ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Institutional Metadata & Faculty Guidelines */}
      <div className="border-t border-slate-800 pt-3 px-2 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-400 text-[18px]">domain</span>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-white truncate">
              {courseMeta.department || 'Department of Engineering'}
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              {courseMeta.institution || 'Autonomous Tier-1'}
            </span>
          </div>
        </div>

        <button
          onClick={onOpenGuidelines}
          className="flex items-center gap-2 py-1 text-slate-400 hover:text-white text-xs transition-colors text-left"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px] text-sky-400">help</span>
          <span>Faculty OBE Guidelines</span>
        </button>
      </div>
    </aside>
  );
};
