import React, { useState } from 'react';
import { CourseOutcome, SyllabusModule, WorkflowStage, CourseMetadata } from '../../types';

interface ExportPackViewProps {
  courseMeta: CourseMetadata;
  outcomes: CourseOutcome[];
  modules: SyllabusModule[];
  stages: WorkflowStage[];
}

export const ExportPackView: React.FC<ExportPackViewProps> = ({
  courseMeta,
  outcomes,
  modules,
  stages
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);
  const [includeJustifications, setIncludeJustifications] = useState<boolean>(true);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const poKeys = ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'];
  const psoKeys = ['PSO1', 'PSO2', 'PSO3'];

  const hasCourse = Boolean(courseMeta.code || courseMeta.title);

  // Handle actual JSON export
  const handleExportJSON = () => {
    const exportData = {
      institution: courseMeta.institution || 'Autonomous Engineering Institute',
      department: courseMeta.department || 'Department of Engineering',
      accreditationTier: 'NBA Tier-1 / Washington Accord Compliant',
      course: {
        code: courseMeta.code || 'COURSE',
        title: courseMeta.title || 'Untitled Course',
        revision: '1.0-FINAL',
        regulation: courseMeta.regulation,
        credits: courseMeta.credits,
        summary: courseMeta.summary
      },
      outcomes: outcomes.map((co) => ({
        code: co.code,
        statement: co.statement,
        bloomLevel: co.bloomLevel,
        bloomCategory: co.bloomName,
        contactHours: co.hours,
        weightPercent: co.weightagePercent,
        poMappings: co.poMappings,
        justifications: co.justifications
      })),
      modules: modules.map((m) => ({
        unit: m.unitNumber,
        title: m.title,
        hours: m.hours,
        topics: m.topics,
        mappedCOs: m.mappedCOs,
        pedagogy: m.pedagogy
      })),
      workflowStatus: stages.map((s) => ({
        stage: s.name,
        signoffBy: s.owner,
        role: s.roleTitle,
        timestamp: s.timestamp,
        status: s.status
      })),
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${courseMeta.code || 'Course'}_OBE_Tier1_Dossier_Manifest.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess('JSON Manifest exported successfully');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#111827] p-5 rounded-xl border border-slate-800 shadow-md no-print">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#1e293b] text-sky-400 font-mono text-xs font-semibold uppercase">
              STEP 06 OF 06 • AUTONOMOUS OBE EXPORT PACK
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs text-slate-400 tracking-wider uppercase">
              INSTITUTIONAL DOSSIER
            </span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">
            Course Specification Export & Dossier Generation
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 max-w-3xl">
            Generate statutory NBA Tier-1 accreditation packs, print-ready course catalog sheets, and machine-readable JSON manifests for Board of Studies archiving.
          </p>
        </div>

        {/* Toolbar & Controls */}
        <div className="flex items-center gap-2 bg-[#0d1424] p-1.5 rounded-xl border border-slate-800 shrink-0 self-start lg:self-center">
          <div className="flex items-center px-2 py-1 rounded bg-[#111827] text-slate-300 text-xs gap-1">
            <span className="material-symbols-outlined text-[15px] text-sky-400">zoom_in</span>
            <button
              onClick={() => setZoomLevel((z) => Math.max(75, z - 25))}
              className="hover:text-white px-1 text-slate-400"
              title="Zoom out"
            >
              -
            </button>
            <span className="text-white font-mono font-semibold">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(125, z + 25))}
              className="hover:text-white px-1 text-slate-400"
              title="Zoom in"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-1 bg-[#111827] px-2 py-1 rounded text-xs">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="text-slate-400 hover:text-white disabled:opacity-30"
              title="Previous Page"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <span className="text-white font-medium px-1 font-mono">
              Page {currentPage} of 3
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              disabled={currentPage === 3}
              className="text-slate-400 hover:text-white disabled:opacity-30"
              title="Next Page"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div className="px-2.5 py-1 rounded bg-[#1e293b] text-sky-300 text-xs font-semibold flex items-center gap-1 font-mono">
            <span className="material-symbols-outlined text-[14px] text-emerald-400">verified</span>
            <span>Rev: v1.0</span>
          </div>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Two-Column Asymmetric Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Institutional White Paper Sheet (8 cols) */}
        <section className="xl:col-span-8 flex flex-col items-center">
          <div
            id="paperCanvas"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-[820px] bg-white text-slate-900 rounded-sm shadow-2xl p-6 sm:p-10 transition-all select-text print-sheet relative overflow-hidden"
          >
            {/* Watermark */}
            {showWatermark && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none rotate-[-30deg]">
                <span className="text-8xl font-black text-slate-900 uppercase">
                  NBA Tier-1 Approved
                </span>
              </div>
            )}

            {/* University Academic Crest and Title Block Header */}
            <div className="flex flex-col items-center text-center pb-5 mb-5 bg-slate-50/80 p-4 rounded border border-slate-200">
              <div className="flex items-center justify-between w-full mb-3 px-2">
                {/* Institutional Emblem */}
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center shadow-sm shrink-0 p-2 text-white">
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 40 40">
                    <path d="M20 2L4 9v11c0 9.8 6.8 19 16 21 9.2-2 16-11.2 16-21V9L20 2zm0 5l12 5.3v8c0 7.3-5.1 14.1-12 15.6-6.9-1.5-12-8.3-12-15.6v-8L20 7z" />
                    <path d="M19 12h2v10h-2zm0 12h2v2h-2z" />
                  </svg>
                </div>

                <div className="flex flex-col text-center px-4">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                    {courseMeta.institution || 'Autonomous Engineering Institute'}
                  </h2>
                  <span className="text-[10px] uppercase tracking-widest text-slate-600 font-medium">
                    (Autonomous Institution • Accredited 'A++' by NAAC • Washington Accord Signatory)
                  </span>
                  <span className="text-[11px] font-semibold text-slate-800 mt-0.5">
                    {courseMeta.department || 'Department of Computer Science & Engineering'}
                  </span>
                </div>

                {/* Accreditation Stamp Pill */}
                <div className="shrink-0 px-2.5 py-1 bg-slate-200 rounded text-center border border-slate-300">
                  <span className="block text-[9px] uppercase font-bold text-slate-700 tracking-wider">
                    NBA Tier-1
                  </span>
                  <span className="block text-[10px] font-bold text-slate-900">
                    Approved
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-slate-300 my-1"></div>
              <h1 className="text-base font-bold text-slate-900 mt-1 uppercase tracking-wide">
                Course Specification Dossier: {hasCourse ? `${courseMeta.code} — ${courseMeta.title}` : 'Untitled Course Specification'}
              </h1>
              <div className="flex items-center gap-3 text-xs text-slate-600 mt-0.5 font-mono">
                <span>Regulation: {courseMeta.regulation}</span>
                <span>•</span>
                <span>
                  Credits: {courseMeta.credits.lecture}-{courseMeta.credits.tutorial}-{courseMeta.credits.practical} ({courseMeta.credits.totalUnits} Units)
                </span>
                <span>•</span>
                <span>BOS Docket: AY {courseMeta.academicYear}</span>
              </div>
            </div>

            {/* PAGE 1: Course Summary & Outcomes */}
            {currentPage === 1 && (
              <div className="space-y-6 text-xs text-slate-800">
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    1. Course Narrative & Scope
                  </h3>
                  <p className="leading-relaxed text-justify">
                    {courseMeta.summary ||
                      'No course summary has been provided yet. You can author course description and scope in Step 2.'}
                  </p>
                </section>

                <section>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    2. Course Outcomes (COs) Formulated Under Bloom's Revised Taxonomy
                  </h3>
                  {outcomes.length === 0 ? (
                    <p className="text-slate-500 italic p-3 bg-slate-50 rounded">
                      No course outcomes defined yet. Please author outcomes in Step 2.
                    </p>
                  ) : (
                    <table className="w-full border-collapse border border-slate-300 text-left">
                      <thead>
                        <tr className="bg-slate-100 text-[11px] font-semibold">
                          <th className="border border-slate-300 p-2 w-12 text-center">CO</th>
                          <th className="border border-slate-300 p-2">Course Outcome Statement</th>
                          <th className="border border-slate-300 p-2 w-20 text-center">Bloom Level</th>
                          <th className="border border-slate-300 p-2 w-16 text-center">Hours</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-300 text-[11px]">
                        {outcomes.map((co) => (
                          <tr key={co.id}>
                            <td className="border border-slate-300 p-2 text-center font-bold font-mono">
                              {co.code}
                            </td>
                            <td className="border border-slate-300 p-2 leading-relaxed">
                              {co.statement}
                            </td>
                            <td className="border border-slate-300 p-2 text-center font-mono">
                              {co.bloomLevel} ({co.bloomName})
                            </td>
                            <td className="border border-slate-300 p-2 text-center font-mono">
                              {co.hours}h
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </section>

                <section>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    3. Curriculum Units & Contact Hours Allocation
                  </h3>
                  {modules.length === 0 ? (
                    <p className="text-slate-500 italic p-3 bg-slate-50 rounded">
                      No curriculum units defined yet.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {modules.map((m) => (
                        <div key={m.id} className="text-[11px]">
                          <div className="flex justify-between font-semibold text-slate-900">
                            <span>Unit {m.unitNumber}: {m.title}</span>
                            <span className="font-mono">{m.hours} Hours • {m.mappedCOs.join(', ')}</span>
                          </div>
                          <p className="text-slate-600 text-[10px] leading-relaxed">
                            {m.topics.join('; ')}.
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            )}

            {/* PAGE 2: CO-PO-PSO Articulation Matrix */}
            {currentPage === 2 && (
              <div className="space-y-6 text-xs text-slate-800">
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    4. Program Outcomes & Program Specific Outcomes Articulation Matrix
                  </h3>
                  <p className="text-[11px] text-slate-600 mb-3">
                    Correlation Levels: 3 = Substantial (High), 2 = Moderate (Medium), 1 = Slight (Low), — = No Correlation.
                  </p>

                  {outcomes.length === 0 ? (
                    <p className="text-slate-500 italic p-3 bg-slate-50 rounded">
                      No outcomes to display in matrix.
                    </p>
                  ) : (
                    <table className="w-full border-collapse border border-slate-300 text-center text-[10px]">
                      <thead>
                        <tr className="bg-slate-100 font-bold font-mono">
                          <th className="border border-slate-300 p-1.5 text-left">Outcome</th>
                          <th className="border border-slate-300 p-1.5">Bloom</th>
                          {poKeys.map((pk) => (
                            <th key={pk} className="border border-slate-300 p-1">{pk}</th>
                          ))}
                          {psoKeys.map((pk) => (
                            <th key={pk} className="border border-slate-300 p-1 bg-slate-200">{pk}</th>
                          ))}
                          <th className="border border-slate-300 p-1.5">Mean</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-300 font-mono">
                        {outcomes.map((co) => {
                          let sum = 0;
                          let count = 0;
                          [...poKeys, ...psoKeys].forEach((k) => {
                            const v = co.poMappings[k] || 0;
                            if (v > 0) {
                              sum += v;
                              count++;
                            }
                          });
                          const mean = count > 0 ? (sum / count).toFixed(2) : '—';

                          return (
                            <tr key={co.id}>
                              <td className="border border-slate-300 p-1.5 text-left font-bold text-slate-900">
                                {co.code}
                              </td>
                              <td className="border border-slate-300 p-1.5">{co.bloomLevel}</td>
                              {poKeys.map((pk) => {
                                const v = co.poMappings[pk] || 0;
                                return (
                                  <td key={pk} className="border border-slate-300 p-1">
                                    {v > 0 ? v : '—'}
                                  </td>
                                );
                              })}
                              {psoKeys.map((pk) => {
                                const v = co.poMappings[pk] || 0;
                                return (
                                  <td key={pk} className="border border-slate-300 p-1 bg-slate-50 font-semibold">
                                    {v > 0 ? v : '—'}
                                  </td>
                                );
                              })}
                              <td className="border border-slate-300 p-1.5 font-bold text-slate-900">
                                {mean}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </section>

                {includeJustifications && outcomes.length > 0 && (
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                      5. Sample Justification Statements for High Correlation Indices
                    </h3>
                    <div className="space-y-2 text-[10px] text-slate-700">
                      {outcomes.slice(0, 3).map((co) => (
                        <div key={co.id} className="p-2 bg-slate-50 rounded border border-slate-200">
                          <span className="font-bold text-slate-900">{co.code} Justifications: </span>
                          {Object.entries(co.justifications).length > 0 ? (
                            Object.entries(co.justifications).map(([pk, just]) => (
                              <span key={pk} className="mr-3">
                                <strong>[{pk}]:</strong> {just}{' '}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 italic">No custom justification recorded.</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* PAGE 3: Institutional Sign-offs */}
            {currentPage === 3 && (
              <div className="space-y-6 text-xs text-slate-800">
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    6. Assessment Scheme & Credit Allocation
                  </h3>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200 text-[11px]">
                    <span className="font-bold block text-slate-900 mb-1">
                      Continuous Internal Evaluation (CIE) & Semester End Exam (SEE)
                    </span>
                    <p className="text-slate-700">
                      CIE: 50 Marks (Midterm, Lab & Continuous Assessment) • SEE: 50 Marks (Comprehensive Theory / Practical Exam).
                    </p>
                  </div>
                </section>

                <section className="pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-4">
                    7. Institutional Signatures & Ratification
                  </h3>

                  <div className="grid grid-cols-3 gap-6 pt-6 text-center text-[11px]">
                    <div className="flex flex-col items-center">
                      <div className="w-28 h-10 border-b border-slate-400 mb-1 flex items-end justify-center font-serif italic text-slate-600">
                        {stages[0]?.owner || 'Author'}
                      </div>
                      <span className="font-bold text-slate-900">{stages[0]?.owner || 'Author'}</span>
                      <span className="text-[10px] text-slate-500">Course Author</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-28 h-10 border-b border-slate-400 mb-1 flex items-end justify-center font-serif italic text-slate-600">
                        {stages[2]?.owner || 'PAC Chair'}
                      </div>
                      <span className="font-bold text-slate-900">{stages[2]?.owner || 'PAC Chair'}</span>
                      <span className="text-[10px] text-slate-500">PAC Committee Chair</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-28 h-10 border-b border-slate-400 mb-1 flex items-end justify-center font-serif italic text-slate-600">
                        {stages[3]?.owner || 'HOD'}
                      </div>
                      <span className="font-bold text-slate-900">{stages[3]?.owner || 'HOD'}</span>
                      <span className="text-[10px] text-slate-500">HOD / BOS Chairman</span>
                    </div>
                  </div>

                  <div className="mt-8 p-3 bg-slate-100 rounded border border-slate-300 text-center text-[10px] text-slate-600 font-mono">
                    Official OBE Curriculum Specification Docket • {courseMeta.regulation}
                  </div>
                </section>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: Download & Document Controls (4 cols) */}
        <section className="xl:col-span-4 flex flex-col gap-4 no-print">
          <div className="bg-[#111827] rounded-xl p-5 border border-slate-800 shadow-md flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Statutory Pack Downloads
            </h3>

            <div className="space-y-2.5">
              <button
                onClick={handlePrint}
                className="w-full py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print Dossier / Save as PDF</span>
              </button>

              <button
                onClick={handleExportJSON}
                className="w-full py-2.5 px-3 rounded-lg bg-[#0d1424] hover:bg-[#131d2e] text-sky-300 font-medium text-xs transition-colors border border-sky-800/80 flex items-center justify-center gap-2"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">data_object</span>
                <span>Export Machine JSON Manifest</span>
              </button>
            </div>
          </div>

          <div className="bg-[#111827] rounded-xl p-5 border border-slate-800 shadow-md space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Dossier Sheet Layout Controls
            </h3>

            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between p-2 rounded-lg bg-[#0d1424] border border-slate-800 cursor-pointer">
                <span className="text-slate-300">Display Institutional Watermark</span>
                <input
                  type="checkbox"
                  checked={showWatermark}
                  onChange={(e) => setShowWatermark(e.target.checked)}
                  className="w-4 h-4 accent-sky-400 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg bg-[#0d1424] border border-slate-800 cursor-pointer">
                <span className="text-slate-300">Include Audit Justification Annexure</span>
                <input
                  type="checkbox"
                  checked={includeJustifications}
                  onChange={(e) => setIncludeJustifications(e.target.checked)}
                  className="w-4 h-4 accent-sky-400 rounded"
                />
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
