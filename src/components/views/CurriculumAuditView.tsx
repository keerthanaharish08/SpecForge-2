import React, { useState } from 'react';
import { DefectItem, WorkflowStep } from '../../types';

interface CurriculumAuditViewProps {
  defects: DefectItem[];
  onRemediate: (id: string) => void;
  onOverride: (id: string) => void;
  onRemediateAll: () => void;
  onNavigate: (step: WorkflowStep) => void;
}

export const CurriculumAuditView: React.FC<CurriculumAuditViewProps> = ({
  defects,
  onRemediate,
  onOverride,
  onRemediateAll,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [sectionFilter, setSectionFilter] = useState<'all' | 'sec2' | 'sec3' | 'sec5'>('all');
  const [statusTab, setStatusTab] = useState<'unresolved' | 'remediated' | 'overridden'>('unresolved');

  const unresolvedCount = defects.filter((d) => d.status === 'unresolved').length;
  const remediatedCount = defects.filter((d) => d.status === 'remediated').length;
  const overriddenCount = defects.filter((d) => d.status === 'overridden').length;

  const criticalHaltsCount = defects.filter((d) => d.status === 'unresolved' && d.severity === 'high').length;
  const warningsCount = defects.filter((d) => d.status === 'unresolved' && d.severity === 'medium').length;

  // Calculate audit score
  const total = defects.length;
  const resolved = total - unresolvedCount;
  const auditScorePercent = total > 0 ? Math.round(75 + (resolved / total) * 23) : 100;

  // Filtered defects
  const filteredDefects = defects.filter((d) => {
    if (d.status !== statusTab) return false;
    if (severityFilter !== 'all' && d.severity !== severityFilter) return false;
    if (sectionFilter !== 'all' && d.sectionCode !== sectionFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        d.code.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.ruleViolated.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111827] p-5 rounded-xl border border-slate-800 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#1e293b] text-sky-400 font-mono text-xs font-semibold uppercase">
              STEP 04 OF 06
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider">
              CURRICULUM AUDIT & REMEDIATION
            </span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">
            Accreditation Audit & Defect Remediation Center
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Identify taxonomy drifts, unanchored tool claims, and contact-hour parity violations before Board of Studies sign-off.
          </p>
        </div>

        {unresolvedCount > 0 ? (
          <button
            onClick={onRemediateAll}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-md flex items-center gap-1.5 self-start sm:self-center shrink-0"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
            <span>Remediate All ({unresolvedCount})</span>
          </button>
        ) : (
          <button
            onClick={() => onNavigate('governance')}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors shadow-md flex items-center gap-1.5 self-start sm:self-center shrink-0"
            type="button"
          >
            <span>Proceed to Routing</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        )}
      </div>

      {/* Top Summary Metrics (4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Critical BOS Halts */}
        <div className="bg-[#111827] rounded-xl p-4 border border-slate-800 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-950 text-red-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">cancel</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                Critical Halts
              </span>
              <span className="text-lg font-bold text-red-400">
                {criticalHaltsCount} Defects
              </span>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-red-950/60 text-red-300 font-mono">
            {criticalHaltsCount > 0 ? 'BOS Halt' : 'Passed'}
          </span>
        </div>

        {/* Compliance Warnings */}
        <div className="bg-[#111827] rounded-xl p-4 border border-slate-800 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-950 text-amber-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                Warnings
              </span>
              <span className="text-lg font-bold text-amber-300">
                {warningsCount} Warnings
              </span>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#1e293b] text-slate-300 font-mono">
            Advisory
          </span>
        </div>

        {/* Verified Passed */}
        <div className="bg-[#111827] rounded-xl p-4 border border-slate-800 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                Passed Checks
              </span>
              <span className="text-lg font-bold text-emerald-400">12 Verified</span>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">
            100% Valid
          </span>
        </div>

        {/* Audit Compliance Score */}
        <div className="bg-[#111827] rounded-xl p-4 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              Compliance Score
            </span>
            <span className="text-lg font-bold text-sky-400">{auditScorePercent}.0% Index</span>
            <span className="text-[11px] text-slate-400 block">
              {unresolvedCount === 0 ? 'Fully BOS Ready' : 'Remediation Active'}
            </span>
          </div>
          <div className="relative w-11 h-11 shrink-0">
            <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-sky-400"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${auditScorePercent}, 100`}
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-white font-bold">
              {auditScorePercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Controls Toolbar */}
      <section className="bg-[#111827] rounded-xl p-4 border border-slate-800 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-slate-500">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search defect code, section, or rule..."
            className="w-full bg-[#090d16] text-white placeholder:text-slate-500 pl-9 pr-3 py-2 rounded-lg text-xs border border-slate-700 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as any)}
            className="bg-[#0d1424] text-white border border-slate-700 px-3 py-2 rounded-lg focus:outline-none focus:border-sky-500"
          >
            <option value="all">All Severities</option>
            <option value="high">Critical (High)</option>
            <option value="medium">Warning (Medium)</option>
            <option value="low">Advisory (Low)</option>
          </select>

          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value as any)}
            className="bg-[#0d1424] text-white border border-slate-700 px-3 py-2 rounded-lg focus:outline-none focus:border-sky-500"
          >
            <option value="all">All Sections</option>
            <option value="sec2">Section 2: Course Outcomes</option>
            <option value="sec3">Section 3: CO-PO Matrix</option>
            <option value="sec5">Section 5: CIE/SEE Scheme</option>
          </select>

          {/* Status Tabs */}
          <div className="flex items-center bg-[#090d16] p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setStatusTab('unresolved')}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                statusTab === 'unresolved'
                  ? 'bg-[#1e293b] text-sky-300 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              type="button"
            >
              Unresolved ({unresolvedCount})
            </button>
            <button
              onClick={() => setStatusTab('remediated')}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                statusTab === 'remediated'
                  ? 'bg-[#1e293b] text-emerald-300 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              type="button"
            >
              Auto-Remediated ({remediatedCount})
            </button>
            <button
              onClick={() => setStatusTab('overridden')}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                statusTab === 'overridden'
                  ? 'bg-[#1e293b] text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              type="button"
            >
              Overridden ({overriddenCount})
            </button>
          </div>
        </div>
      </section>

      {/* Defect Cards List */}
      <div className="space-y-4">
        {filteredDefects.length === 0 ? (
          <div className="bg-[#111827] rounded-xl p-8 border border-slate-800 text-center text-slate-400">
            <span className="material-symbols-outlined text-[36px] text-emerald-400 mb-2 block">
              verified
            </span>
            <p className="text-sm font-semibold text-white">No items found in this filter view</p>
            <p className="text-xs text-slate-500 mt-1">
              All compliance items for this criterion have been resolved.
            </p>
          </div>
        ) : (
          filteredDefects.map((defect) => (
            <div
              key={defect.id}
              className="bg-[#111827] rounded-xl p-5 border border-slate-800 shadow-md flex flex-col gap-3.5 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold ${
                      defect.severity === 'high'
                        ? 'bg-red-950 text-red-300 border border-red-800'
                        : defect.severity === 'medium'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-[#1e293b] text-slate-300 border border-slate-700'
                    }`}
                  >
                    {defect.severity.toUpperCase()}
                  </span>
                  <span className="font-mono text-xs text-sky-400 font-bold">{defect.code}</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-xs text-slate-400 font-medium">{defect.section}</span>
                </div>

                <div className="flex items-center gap-2">
                  {defect.status === 'unresolved' && (
                    <>
                      <button
                        onClick={() => onOverride(defect.id)}
                        className="px-2.5 py-1 rounded bg-[#1e293b] hover:bg-[#27364f] text-slate-400 hover:text-white text-xs transition-colors"
                        type="button"
                      >
                        Override Flag
                      </button>
                      <button
                        onClick={() => onRemediate(defect.id)}
                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center gap-1 shadow-sm"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
                        <span>Apply Auto-Remedy</span>
                      </button>
                    </>
                  )}
                  {defect.status === 'remediated' && (
                    <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                      <span>Remediation Active</span>
                    </span>
                  )}
                  {defect.status === 'overridden' && (
                    <span className="px-2.5 py-1 rounded bg-[#1e293b] text-slate-300 text-xs font-mono">
                      Faculty Override Granted
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">{defect.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{defect.description}</p>
              </div>

              {/* Violated Rule & AI Proposed Fix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#0d1424] border border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                    Accreditation Constraint
                  </span>
                  <span className="font-medium text-slate-300 mt-0.5 block">{defect.ruleViolated}</span>
                </div>

                <div className="p-3 rounded-lg bg-[#0f233d] border border-sky-900/60">
                  <span className="text-[10px] font-mono text-sky-400 uppercase block">
                    Synthesized Remediation Pathway
                  </span>
                  <span className="font-medium text-sky-200 mt-0.5 block">{defect.suggestedAction}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
