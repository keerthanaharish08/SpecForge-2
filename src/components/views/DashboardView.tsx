import React from 'react';
import { CourseOutcome, DefectItem, WorkflowStep, CourseMetadata } from '../../types';
import { PO_DEFINITIONS } from '../../data/mockData';

interface DashboardViewProps {
  courseMeta: CourseMetadata;
  outcomes: CourseOutcome[];
  defects: DefectItem[];
  onNavigate: (step: WorkflowStep) => void;
  onAutoRemediateAll: () => void;
  onRecalculate: () => void;
  onEditCourseMeta: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  courseMeta,
  outcomes,
  defects,
  onNavigate,
  onAutoRemediateAll,
  onRecalculate,
  onEditCourseMeta
}) => {
  const unresolvedDefects = defects.filter((d) => d.status === 'unresolved');
  const remediatedDefects = defects.filter((d) => d.status === 'remediated');

  // Compute Bloom depth: percentage of outcomes with Bloom K3, K4, K5, or K6
  const higherBloomCount = outcomes.filter((co) => ['K3', 'K4', 'K5', 'K6'].includes(co.bloomLevel)).length;
  const bloomDepthPercent = outcomes.length > 0 ? Math.round((higherBloomCount / outcomes.length) * 100) : 0;

  // Calculate real completeness (Course Meta + Outcomes + Modules + Matrix + Checks + Routing)
  let completedSections = 0;
  if (courseMeta.code && courseMeta.title) completedSections++;
  if (outcomes.length >= 4) completedSections += 2;
  else if (outcomes.length > 0) completedSections += 1;
  const matrixValuesCount = outcomes.reduce(
    (acc, co) => acc + Object.values(co.poMappings).filter((v) => v > 0).length,
    0
  );
  if (matrixValuesCount > 0) completedSections++;
  if (defects.length > 0 && unresolvedDefects.length === 0) completedSections++;
  const completenessPercent = Math.min(100, Math.round((completedSections / 6) * 100));

  // Compute average correlation for PO keys
  const poKeys = ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO9', 'PO12', 'PSO1', 'PSO2', 'PSO3'];
  const poAverages: Record<string, number> = {};
  poKeys.forEach((k) => {
    let sum = 0;
    let count = 0;
    outcomes.forEach((co) => {
      const val = co.poMappings[k] || 0;
      if (val > 0) {
        sum += val;
        count++;
      }
    });
    poAverages[k] = count > 0 ? parseFloat((sum / count).toFixed(2)) : 0;
  });

  const hasCourse = Boolean(courseMeta.code || courseMeta.title);

  return (
    <div className="flex flex-col gap-6">
      {/* Course Context Sub-Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#111827] px-5 py-3.5 rounded-xl border border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400 px-2 py-0.5 rounded bg-[#1e293b]">
              {courseMeta.regulation || 'OBE Tier-1 Template'}
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-sm font-semibold text-white truncate">
              {hasCourse
                ? `${courseMeta.code ? courseMeta.code + ': ' : ''}${courseMeta.title}`
                : 'Untitled Course Specification'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span>
              Credits: {courseMeta.credits.lecture}-{courseMeta.credits.tutorial}-{courseMeta.credits.practical} ({courseMeta.credits.totalUnits.toFixed(1)} Units)
            </span>
            <span className="text-slate-600">·</span>
            <span>AY: {courseMeta.academicYear}</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400 font-semibold">NBA / Washington Accord</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onEditCourseMeta}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1e293b] hover:bg-[#27364f] text-slate-200 hover:text-white transition-colors text-xs font-medium border border-slate-700 shadow-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">edit</span>
            <span>{hasCourse ? 'Edit Course Details' : 'Configure Course'}</span>
          </button>

          {outcomes.length > 0 && (
            <button
              onClick={onRecalculate}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0d1424] hover:bg-[#131d2e] text-sky-300 transition-colors text-xs font-medium border border-sky-800/80 shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">sync</span>
              <span>Recalculate</span>
            </button>
          )}
        </div>
      </div>

      {/* When no course metadata is entered, show a setup banner */}
      {!hasCourse && (
        <div className="bg-[#0d1424] border border-sky-900/50 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-950 text-sky-400 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">post_add</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Start New Course Specification</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Configure your course code, title, and credits, or upload a syllabus document in Step 1 to extract outcome statements automatically.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onEditCourseMeta}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-sm transition-colors"
              type="button"
            >
              Enter Course Details
            </button>
            <button
              onClick={() => onNavigate('upload')}
              className="px-3.5 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#27364f] text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
              type="button"
            >
              Upload Syllabus
            </button>
          </div>
        </div>
      )}

      {/* Top Summary Metrics (4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Course Outcomes */}
        <div className="flex flex-col justify-between bg-[#111827] p-4 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Outcome Matrix
            </span>
            <span className="p-1.5 rounded-lg bg-[#1e293b] text-sky-400">
              <span className="material-symbols-outlined text-[18px]">account_tree</span>
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-white">
                {outcomes.length} Defined
              </span>
              <span className="text-xs text-slate-400">/ 4–6 Reqd</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] bg-[#1e293b] text-sky-300 font-mono">
              Bloom Depth: {bloomDepthPercent}% (K3–K6)
            </span>
            <span className="text-slate-400 text-[11px]">
              {bloomDepthPercent >= 80 ? 'High Rigor' : outcomes.length === 0 ? 'Pending' : 'In Progress'}
            </span>
          </div>
        </div>

        {/* Card 2: Dossier Completeness */}
        <div className="flex flex-col justify-between bg-[#111827] p-4 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Dossier Completeness
            </span>
            <span className="p-1.5 rounded-lg bg-[#1e293b] text-blue-400">
              <span className="material-symbols-outlined text-[18px]">fact_check</span>
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold tracking-tight text-white">
                {completedSections} of 6 Stages
              </span>
              <span className="text-sm font-bold text-sky-400">{completenessPercent}%</span>
            </div>
            <div className="w-full bg-[#090d16] h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                className="bg-sky-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${completenessPercent}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>{completenessPercent === 100 ? 'Complete' : 'Draft In Progress'}</span>
            <span className="text-sky-300 font-medium">BOS Docket</span>
          </div>
        </div>

        {/* Card 3: Pending Checks */}
        <div className="flex flex-col justify-between bg-[#111827] p-4 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Accreditation Advisory
            </span>
            <span
              className={`p-1.5 rounded-lg ${
                unresolvedDefects.length > 0 ? 'bg-amber-950/60 text-amber-400' : 'bg-slate-800 text-slate-400'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {unresolvedDefects.length > 0 ? 'flag' : 'check_circle'}
              </span>
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-white">
                {unresolvedDefects.length} Flags
              </span>
              <span
                className={`text-xs font-medium ${
                  unresolvedDefects.length > 0 ? 'text-amber-400' : 'text-slate-400'
                }`}
              >
                {unresolvedDefects.length > 0 ? 'Action Recommended' : 'No Active Flags'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded text-[11px] bg-[#1e293b] text-slate-300 truncate">
              {unresolvedDefects.length > 0
                ? `${unresolvedDefects[0].title}`
                : outcomes.length > 0
                ? 'Ready for validation scan'
                : 'No outcomes defined yet'}
            </span>
          </div>
        </div>

        {/* Card 4: Syllabus Pre-Flight */}
        <div className="flex flex-col justify-between bg-[#111827] p-4 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Specification Status
            </span>
            <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-emerald-400">
                {outcomes.length > 0 ? 'Active Spec' : 'Clean State'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {outcomes.length} COs
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>OBE Tier-1 Compliant</span>
            <span className="text-emerald-400 font-medium">Ready</span>
          </div>
        </div>
      </div>

      {/* 6-Step Workflow Navigator Cards */}
      <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-md">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              End-to-End Course Specification Pipeline
            </h2>
            <p className="text-xs text-slate-400">
              Follow institutional workflow to author course specifications, map graduate attributes, and export accreditation packs
            </p>
          </div>
          <span className="px-2.5 py-1 rounded bg-[#1e293b] text-sky-400 font-mono text-xs">
            Stages 1 to 6
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              id: 'upload' as WorkflowStep,
              num: '01',
              title: 'Upload Specification',
              desc: 'Ingest syllabus DOCX/PDF and exam scheme blueprint.',
              status: outcomes.length > 0 ? 'Completed' : 'Ready to Ingest',
              icon: 'upload_file'
            },
            {
              id: 'specification' as WorkflowStep,
              num: '02',
              title: 'Spec Overview & CO Authoring',
              desc: 'Author course outcomes, syllabus units, and Bloom levels.',
              status: outcomes.length > 0 ? `${outcomes.length} COs Defined` : 'Configure COs',
              icon: 'difference'
            },
            {
              id: 'matrix' as WorkflowStep,
              num: '03',
              title: 'CO-PO-PSO Articulation Map',
              desc: 'Map correlation levels (1/2/3) and record justifications.',
              status: matrixValuesCount > 0 ? 'Matrix Formulated' : 'Ready to Map',
              icon: 'grid_view'
            },
            {
              id: 'checks' as WorkflowStep,
              num: '04',
              title: 'Curriculum Audit & Defect Fixes',
              desc: 'Scan against NBA criteria with one-click auto-remedy.',
              status: unresolvedDefects.length > 0 ? `${unresolvedDefects.length} Flags` : 'Audit Center',
              icon: 'rule'
            },
            {
              id: 'governance' as WorkflowStep,
              num: '05',
              title: 'Governance & Approval Routing',
              desc: 'Sequential Author -> Coordinator -> PAC -> HOD sign-offs.',
              status: 'Draft Stage',
              icon: 'approval'
            },
            {
              id: 'export' as WorkflowStep,
              num: '06',
              title: 'Export Institutional Dossier',
              desc: 'Generate NBA SAR Exhibit, BOS Docket, and printable PDF.',
              status: outcomes.length > 0 ? 'Ready to Export' : 'Pending Data',
              icon: 'description'
            }
          ].map((step) => (
            <button
              key={step.id}
              onClick={() => onNavigate(step.id)}
              className="flex flex-col text-left p-3.5 rounded-lg bg-[#0d1424] hover:bg-[#131d2e] border border-slate-800/80 hover:border-sky-500/50 transition-all group shadow-sm"
              type="button"
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="font-mono text-xs text-sky-400 font-bold">{step.num}</span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    step.status.includes('Flags')
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : step.status.includes('Completed') || step.status.includes('Defined') || step.status.includes('Formulated')
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-[#1e293b] text-sky-300 border border-slate-700'
                  }`}
                >
                  {step.status}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-[18px] text-slate-300 group-hover:text-sky-400 transition-colors">
                  {step.icon}
                </span>
                <span className="text-xs font-semibold text-white group-hover:text-sky-300 transition-colors">
                  {step.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">{step.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Articulation Snapshot or Empty State */}
      <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-md flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-400 text-[20px]">table_chart</span>
            <h3 className="text-sm font-semibold text-white">CO-PO-PSO Articulation Snapshot</h3>
          </div>
          <button
            onClick={() => onNavigate(outcomes.length > 0 ? 'matrix' : 'specification')}
            className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1"
            type="button"
          >
            <span>{outcomes.length > 0 ? 'Open Full Matrix' : 'Define Outcomes in Step 2'}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {outcomes.length === 0 ? (
          <div className="p-8 text-center bg-[#090d16] rounded-lg border border-dashed border-slate-800 text-slate-400 flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-[36px] text-slate-600 mb-2">grid_off</span>
            <p className="text-sm font-semibold text-white">No Course Outcomes Defined Yet</p>
            <p className="text-xs text-slate-500 mt-1 max-w-md">
              The articulation matrix will appear here once course outcomes are authored in Step 2 or ingested from your syllabus file in Step 1.
            </p>
            <button
              onClick={() => onNavigate('specification')}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-md"
              type="button"
            >
              Add Course Outcomes
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="py-2 px-2.5">CO</th>
                  <th className="py-2 px-2 text-center">Bloom</th>
                  {poKeys.map((pk) => (
                    <th key={pk} className="py-2 px-1 text-center min-w-[28px]" title={PO_DEFINITIONS[pk]?.title}>
                      {pk}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                {outcomes.map((co) => (
                  <tr key={co.id} className="hover:bg-slate-900/50">
                    <td className="py-2 px-2.5 font-bold text-white">{co.code}</td>
                    <td className="py-2 px-2 text-center">
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#1e293b] text-sky-300">
                        {co.bloomLevel}
                      </span>
                    </td>
                    {poKeys.map((pk) => {
                      const val = co.poMappings[pk] || 0;
                      let bg = 'text-slate-600';
                      if (val === 3) bg = 'bg-blue-600/80 text-white font-bold rounded';
                      else if (val === 2) bg = 'bg-sky-950 text-sky-300 font-semibold rounded';
                      else if (val === 1) bg = 'bg-[#1e293b] text-slate-300 rounded';
                      return (
                        <td key={pk} className="py-2 px-1 text-center">
                          <span className={`inline-block w-6 py-0.5 ${bg}`}>
                            {val > 0 ? val : '—'}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {/* Average Row */}
                <tr className="bg-[#0d1424] font-bold text-white">
                  <td className="py-2.5 px-2.5" colSpan={2}>
                    Mean Correlation
                  </td>
                  {poKeys.map((pk) => (
                    <td key={pk} className="py-2.5 px-1 text-center text-sky-300 text-[11px]">
                      {poAverages[pk] > 0 ? poAverages[pk] : '—'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
