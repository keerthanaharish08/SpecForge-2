import React, { useState } from 'react';
import { CourseOutcome, SyllabusModule, WorkflowStep, CourseMetadata, BloomLevel } from '../../types';

interface SpecificationViewProps {
  courseMeta: CourseMetadata;
  outcomes: CourseOutcome[];
  modules: SyllabusModule[];
  onNavigate: (step: WorkflowStep) => void;
  onUpdateOutcome: (outcome: CourseOutcome) => void;
  onAddOutcome: (outcome: CourseOutcome) => void;
  onDeleteOutcome: (id: string) => void;
  onAddModule: (module: SyllabusModule) => void;
  onDeleteModule: (id: string) => void;
  onAcceptAllCorrections: () => void;
  onEditCourseMeta: () => void;
}

export const SpecificationView: React.FC<SpecificationViewProps> = ({
  courseMeta,
  outcomes,
  modules,
  onNavigate,
  onUpdateOutcome,
  onAddOutcome,
  onDeleteOutcome,
  onAddModule,
  onDeleteModule,
  onAcceptAllCorrections,
  onEditCourseMeta
}) => {
  const [showDiff, setShowDiff] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    summary: true,
    outcomes: true,
    modules: true,
    labs: false,
    eval: false,
    textbooks: false
  });

  // New Outcome Form State
  const [showNewCOModal, setShowNewCOModal] = useState(false);
  const [newCOStatement, setNewCOStatement] = useState('');
  const [newCOBloom, setNewCOBloom] = useState<BloomLevel>('K3');
  const [newCOHours, setNewCOHours] = useState(10);
  const [newCOWeight, setNewCOWeight] = useState(20);

  // New Module Form State
  const [showNewModuleModal, setShowNewModuleModal] = useState(false);
  const [newModTitle, setNewModTitle] = useState('');
  const [newModHours, setNewModHours] = useState(10);
  const [newModTopics, setNewModTopics] = useState('');
  const [newModCOs, setNewModCOs] = useState('CO1');

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCreateOutcome = () => {
    if (!newCOStatement.trim()) return;

    const nextNum = outcomes.length + 1;
    const bloomMap: Record<BloomLevel, string> = {
      K1: 'Remember',
      K2: 'Understand',
      K3: 'Apply',
      K4: 'Analyze',
      K5: 'Evaluate',
      K6: 'Create'
    };

    const newCO: CourseOutcome = {
      id: `co-${Date.now()}`,
      code: `CO${nextNum}`,
      statement: newCOStatement.trim(),
      bloomLevel: newCOBloom,
      bloomName: bloomMap[newCOBloom],
      hours: newCOHours,
      weightagePercent: newCOWeight,
      poMappings: {
        PO1: 2,
        PO2: 2,
        PO3: 2
      },
      justifications: {}
    };

    onAddOutcome(newCO);
    setNewCOStatement('');
    setShowNewCOModal(false);
  };

  const handleCreateModule = () => {
    if (!newModTitle.trim()) return;

    const unitNum = modules.length + 1;
    const newMod: SyllabusModule = {
      id: `mod-${Date.now()}`,
      unitNumber: unitNum,
      title: newModTitle.trim(),
      hours: newModHours,
      topics: newModTopics.split('\n').filter((t) => t.trim().length > 0),
      mappedCOs: newModCOs.split(',').map((c) => c.trim()).filter(Boolean),
      pedagogy: 'Lecture + Case Analysis'
    };

    onAddModule(newMod);
    setNewModTitle('');
    setNewModTopics('');
    setShowNewModuleModal(false);
  };

  const hasCourse = Boolean(courseMeta.code || courseMeta.title);

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#111827] p-5 rounded-xl border border-slate-800 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#1e293b] text-sky-400 font-mono text-xs font-semibold uppercase">
              STEP 02 OF 06
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider">
              SPECIFICATION AUTHORING
            </span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">
            Course Specification & Outcome Definition
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Formulate measurable course outcomes, credit distribution, and modular syllabus structure.
          </p>
        </div>

        {/* Global Action Panel */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setShowNewCOModal(true)}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-sm flex items-center gap-1.5"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
            <span>Add Course Outcome</span>
          </button>

          {outcomes.length > 0 && (
            <button
              onClick={() => setShowDiff(!showDiff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                showDiff
                  ? 'bg-sky-950 text-sky-300 border-sky-800'
                  : 'bg-[#1e293b] text-slate-300 border-slate-700 hover:text-white'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">difference</span>
              <span>Diff View</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('matrix')}
            className="px-3 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#27364f] text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1"
            type="button"
          >
            <span>Go to Matrix</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: COURSE SUMMARY */}
      <section className="bg-[#111827] rounded-xl border border-slate-800 overflow-hidden shadow-md">
        <div
          onClick={() => toggleSection('summary')}
          className="flex items-center justify-between px-5 py-3.5 bg-[#0d1424] cursor-pointer hover:bg-[#131d2e] transition-colors select-none"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400 text-[20px]">
              {expandedSections.summary ? 'expand_more' : 'chevron_right'}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-500">01</span>
              <h2 className="text-sm font-semibold text-white">Course Summary & Metadata</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {hasCourse ? `${courseMeta.code || 'Course'} • ${courseMeta.regulation}` : 'Not Configured'}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditCourseMeta();
            }}
            className="px-2.5 py-1 rounded bg-[#1e293b] hover:bg-slate-700 text-xs text-sky-300 font-medium border border-slate-700 flex items-center gap-1"
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]">edit</span>
            <span>Edit Metadata</span>
          </button>
        </div>

        {expandedSections.summary && (
          <div className="p-5 space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-lg bg-[#090d16] border border-slate-800/80">
              <p>
                {courseMeta.summary ||
                  'No course description entered yet. Click "Edit Metadata" to enter course title, scope, department, and credit allocation.'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-2.5 rounded bg-[#0d1424] border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Course Code</span>
                <span className="font-bold text-white">{courseMeta.code || '—'}</span>
              </div>
              <div className="p-2.5 rounded bg-[#0d1424] border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Credits (L-T-P)</span>
                <span className="font-bold text-sky-400">
                  {courseMeta.credits.lecture}-{courseMeta.credits.tutorial}-{courseMeta.credits.practical} ({courseMeta.credits.totalUnits} Units)
                </span>
              </div>
              <div className="p-2.5 rounded bg-[#0d1424] border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Department</span>
                <span className="font-bold text-white">{courseMeta.department || '—'}</span>
              </div>
              <div className="p-2.5 rounded bg-[#0d1424] border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Academic Year</span>
                <span className="font-bold text-white">{courseMeta.academicYear || '—'}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 2: COURSE OUTCOMES (COs) */}
      <section className="bg-[#111827] rounded-xl border border-slate-800 overflow-hidden shadow-md">
        <div
          onClick={() => toggleSection('outcomes')}
          className="flex items-center justify-between px-5 py-3.5 bg-[#0d1424] cursor-pointer hover:bg-[#131d2e] transition-colors select-none"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400 text-[20px]">
              {expandedSections.outcomes ? 'expand_more' : 'chevron_right'}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-500">02</span>
              <h2 className="text-sm font-semibold text-white">Course Outcomes (COs) & Bloom Rigor</h2>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#1e293b] text-sky-300 text-[11px] font-mono">
              {outcomes.length} Defined
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowNewCOModal(true);
            }}
            className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-xs text-white font-medium flex items-center gap-1 shadow-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            <span>Add CO</span>
          </button>
        </div>

        {expandedSections.outcomes && (
          <div className="p-5 space-y-4">
            {outcomes.length === 0 ? (
              <div className="p-6 text-center bg-[#090d16] rounded-lg border border-dashed border-slate-800 text-slate-400">
                <p className="text-xs">No Course Outcomes formulated yet.</p>
                <button
                  onClick={() => setShowNewCOModal(true)}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  Create First Course Outcome
                </button>
              </div>
            ) : (
              outcomes.map((co) => (
                <div
                  key={co.id}
                  className="p-4 rounded-xl bg-[#090d16] border border-slate-800 flex flex-col gap-3 transition-colors hover:border-slate-700"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-xs font-bold">
                        {co.code}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#1e293b] text-sky-300 font-mono text-xs">
                        Bloom Level: {co.bloomLevel} ({co.bloomName})
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span>{co.hours} Contact Hours</span>
                      <span>•</span>
                      <span>{co.weightagePercent}% Exam Weight</span>
                      <button
                        onClick={() => onDeleteOutcome(co.id)}
                        className="text-slate-500 hover:text-red-400 p-1"
                        title="Delete Course Outcome"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {co.statement}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      {/* SECTION 3: SYLLABUS MODULES */}
      <section className="bg-[#111827] rounded-xl border border-slate-800 overflow-hidden shadow-md">
        <div
          onClick={() => toggleSection('modules')}
          className="flex items-center justify-between px-5 py-3.5 bg-[#0d1424] cursor-pointer hover:bg-[#131d2e] transition-colors select-none"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400 text-[20px]">
              {expandedSections.modules ? 'expand_more' : 'chevron_right'}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-500">03</span>
              <h2 className="text-sm font-semibold text-white">Syllabus Curriculum Modules</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {modules.length} Units Defined
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowNewModuleModal(true);
            }}
            className="px-2.5 py-1 rounded bg-[#1e293b] hover:bg-slate-700 text-xs text-sky-300 font-medium border border-slate-700 flex items-center gap-1"
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            <span>Add Unit</span>
          </button>
        </div>

        {expandedSections.modules && (
          <div className="p-5 space-y-4">
            {modules.length === 0 ? (
              <div className="p-6 text-center bg-[#090d16] rounded-lg border border-dashed border-slate-800 text-slate-400">
                <p className="text-xs">No syllabus units defined yet.</p>
                <button
                  onClick={() => setShowNewModuleModal(true)}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  Add Unit 1
                </button>
              </div>
            ) : (
              modules.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-xl bg-[#090d16] border border-slate-800 flex flex-col gap-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-sky-400">
                        Unit {m.unitNumber}:
                      </span>
                      <h3 className="text-xs font-semibold text-white">{m.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#1e293b] text-slate-300 font-mono text-[11px]">
                        {m.hours} Hours
                      </span>
                      <button
                        onClick={() => onDeleteModule(m.id)}
                        className="text-slate-500 hover:text-red-400 p-1"
                      >
                        <span className="material-symbols-outlined text-[15px]">delete</span>
                      </button>
                    </div>
                  </div>

                  <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                    {m.topics.map((t, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      {/* New Course Outcome Modal */}
      {showNewCOModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#090d16] border border-slate-800 rounded-xl w-full max-w-lg p-5 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-400 text-[18px]">add_circle</span>
                Add Course Outcome (CO{outcomes.length + 1})
              </h3>
              <button
                onClick={() => setShowNewCOModal(false)}
                className="w-7 h-7 rounded hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Outcome Statement (Use Bloom Action Verbs: Apply, Analyze, Evaluate, Design...)
                </label>
                <textarea
                  rows={3}
                  value={newCOStatement}
                  onChange={(e) => setNewCOStatement(e.target.value)}
                  placeholder="e.g. Analyze computational complexity and algorithmic trade-offs under large scale data constraints."
                  className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Bloom Level</label>
                  <select
                    value={newCOBloom}
                    onChange={(e) => setNewCOBloom(e.target.value as BloomLevel)}
                    className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2 text-xs text-white"
                  >
                    <option value="K1">K1 - Remember</option>
                    <option value="K2">K2 - Understand</option>
                    <option value="K3">K3 - Apply</option>
                    <option value="K4">K4 - Analyze</option>
                    <option value="K5">K5 - Evaluate</option>
                    <option value="K6">K6 - Create</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Contact Hours</label>
                  <input
                    type="number"
                    value={newCOHours}
                    onChange={(e) => setNewCOHours(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Weight (%)</label>
                  <input
                    type="number"
                    value={newCOWeight}
                    onChange={(e) => setNewCOWeight(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 text-xs pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowNewCOModal(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOutcome}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
              >
                Add Outcome
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Module Modal */}
      {showNewModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#090d16] border border-slate-800 rounded-xl w-full max-w-lg p-5 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-400 text-[18px]">add_circle</span>
                Add Syllabus Unit {modules.length + 1}
              </h3>
              <button
                onClick={() => setShowNewModuleModal(false)}
                className="w-7 h-7 rounded hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Unit Title</label>
                <input
                  type="text"
                  value={newModTitle}
                  onChange={(e) => setNewModTitle(e.target.value)}
                  placeholder="e.g. Asynchronous Communication & Messaging Queues"
                  className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Lecture Hours</label>
                  <input
                    type="number"
                    value={newModHours}
                    onChange={(e) => setNewModHours(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Mapped COs (comma separated)</label>
                  <input
                    type="text"
                    value={newModCOs}
                    onChange={(e) => setNewModCOs(e.target.value)}
                    placeholder="CO1, CO2"
                    className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Topics (one per line)</label>
                <textarea
                  rows={4}
                  value={newModTopics}
                  onChange={(e) => setNewModTopics(e.target.value)}
                  placeholder="Topic 1: Fundamental models&#10;Topic 2: Design patterns and architecture&#10;Topic 3: Industrial case studies"
                  className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 text-xs pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowNewModuleModal(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateModule}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
              >
                Add Unit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
