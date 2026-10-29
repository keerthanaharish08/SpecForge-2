import React from 'react';
import { UserRole, WorkflowStep, CourseMetadata } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  unresolvedDefectsCount: number;
  onOpenSettings: () => void;
  onSaveDraft: () => void;
  onValidateSpec: () => void;
  currentStep: WorkflowStep;
  savedNotification: boolean;
  courseMeta: CourseMetadata;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  setCurrentRole,
  unresolvedDefectsCount,
  onOpenSettings,
  onSaveDraft,
  onValidateSpec,
  savedNotification,
  courseMeta
}) => {
  const hasCourse = Boolean(courseMeta.code || courseMeta.title);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#090d16] z-40 border-b border-slate-800 flex items-center justify-between px-3 md:px-6">
      {/* Brand & Course Context */}
      <div className="flex items-center gap-3 md:gap-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#081b2e] border border-[#173454] flex items-center justify-center shadow-sm shrink-0 p-1">
            <svg className="w-full h-full" fill="none" viewBox="0 0 70 70">
              <path
                d="M8 8 L38 8 C42 8 45 11 45 15 L45 28 C45 32 42 35 38 35 L8 35 C4 35 1 32 1 28 L1 15 C1 11 4 8 8 8 Z"
                fill="#38bdf8"
              />
              <circle cx="58" cy="21.5" fill="#60a5fa" r="9" />
              <line stroke="#ffffff" strokeLinecap="round" strokeWidth="2.5" x1="45" x2="58" y1="21.5" y2="21.5" />
              <circle cx="32" cy="21.5" fill="#081b2e" r="2.5" />
              <path
                d="M8 43 L22 43 C26 43 29 46 29 50 L29 59 C29 63 26 66 22 66 L8 66 C4 66 1 63 1 59 L1 50 C1 46 4 43 8 43 Z"
                fill="#1d4ed8"
              />
              <path
                d="M37 43 L61 43 C65 43 68 46 68 50 L68 59 C68 63 65 66 61 66 L37 66 C33 66 30 63 30 59 L30 50 C30 46 33 43 37 43 Z"
                fill="#38bdf8"
              />
            </svg>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="text-[17px] font-bold tracking-tight text-white">
              Spec<span className="text-[#38bdf8]">Forge</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">
              OBE
            </span>
          </div>
        </div>

        <div className="h-4 w-px bg-slate-800 hidden lg:block"></div>

        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded bg-[#0f172a] text-slate-300 border border-slate-800 font-mono text-xs">
          <span className="material-symbols-outlined text-[16px] text-slate-400">school</span>
          <span>
            {hasCourse
              ? `${courseMeta.code ? courseMeta.code + ': ' : ''}${courseMeta.title || 'Untitled Course'}`
              : 'New Specification (No Course Loaded)'}
          </span>
        </div>
      </div>

      {/* Center/Right Toolbar */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Role Switcher */}
        <div className="flex items-center bg-[#0f172a] border border-slate-800 p-0.5 rounded-lg">
          <button
            onClick={() => setCurrentRole('author')}
            className={`px-2 md:px-2.5 py-1 text-xs rounded transition-colors ${
              currentRole === 'author'
                ? 'bg-[#1e293b] text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
            type="button"
          >
            Author
          </button>
          <button
            onClick={() => setCurrentRole('reviewer')}
            className={`px-2 md:px-2.5 py-1 text-xs rounded transition-colors ${
              currentRole === 'reviewer'
                ? 'bg-[#1e293b] text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
            type="button"
          >
            Reviewer
          </button>
          <button
            onClick={() => setCurrentRole('hod')}
            className={`px-2 md:px-2.5 py-1 text-xs rounded transition-colors ${
              currentRole === 'hod'
                ? 'bg-[#1e293b] text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
            type="button"
          >
            HOD
          </button>
        </div>

        {/* Status Badge */}
        {unresolvedDefectsCount > 0 ? (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{unresolvedDefectsCount} Pending Audit Checks</span>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            <span>Draft Ready</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={onSaveDraft}
            className="px-2.5 md:px-3 py-1.5 text-xs rounded-lg border border-slate-700 text-slate-200 bg-[#0f172a] hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            type="button"
            title="Save Current Draft"
          >
            <span className="material-symbols-outlined text-[15px]">
              {savedNotification ? 'done' : 'save'}
            </span>
            <span className="hidden md:inline">
              {savedNotification ? 'Saved!' : 'Save Draft'}
            </span>
          </button>

          <button
            onClick={onValidateSpec}
            className="px-2.5 md:px-3 py-1.5 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-500 shadow-sm transition-colors flex items-center gap-1.5 font-medium"
            type="button"
            title="Validate Curriculum against Tier-1 OBE Rules"
          >
            <span className="material-symbols-outlined text-[15px]">rule</span>
            <span className="hidden md:inline">Validate Spec</span>
          </button>

          {/* AI Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            title="SpecForge AI Settings & Ruleset"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">settings_suggest</span>
          </button>
        </div>
      </div>
    </header>
  );
};
