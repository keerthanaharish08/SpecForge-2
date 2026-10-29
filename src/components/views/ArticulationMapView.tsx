import React, { useState } from 'react';
import { CourseOutcome, WorkflowStep } from '../../types';
import { PO_DEFINITIONS } from '../../data/mockData';

interface ArticulationMapViewProps {
  outcomes: CourseOutcome[];
  onUpdateOutcome: (outcome: CourseOutcome) => void;
  onNavigate: (step: WorkflowStep) => void;
}

export const ArticulationMapView: React.FC<ArticulationMapViewProps> = ({
  outcomes,
  onUpdateOutcome,
  onNavigate
}) => {
  const [selectedCell, setSelectedCell] = useState<{ coId: string; poKey: string } | null>({
    coId: 'co1',
    poKey: 'PO5'
  });

  const [heatmapMode, setHeatmapMode] = useState<'standard' | 'weighted' | 'attainment'>('standard');
  const [justificationText, setJustificationText] = useState<string>('');

  const poKeys = ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'];
  const psoKeys = ['PSO1', 'PSO2', 'PSO3'];
  const allTargetKeys = [...poKeys, ...psoKeys];

  // Selected Outcome & PO definition
  const activeCO = outcomes.find((c) => c.id === selectedCell?.coId) || outcomes[0];
  const activePOKey = selectedCell?.poKey || 'PO5';
  const activePO = PO_DEFINITIONS[activePOKey] || { title: activePOKey, short: '' };
  const currentVal = activeCO?.poMappings[activePOKey] || 0;

  React.useEffect(() => {
    if (activeCO) {
      setJustificationText(activeCO.justifications[activePOKey] || '');
    }
  }, [selectedCell, activeCO, activePOKey]);

  // Compute PO column averages
  const poAverages: Record<string, number> = {};
  allTargetKeys.forEach((key) => {
    let sum = 0;
    let count = 0;
    outcomes.forEach((co) => {
      const v = co.poMappings[key] || 0;
      if (v > 0) {
        sum += v;
        count++;
      }
    });
    poAverages[key] = count > 0 ? parseFloat((sum / count).toFixed(2)) : 0;
  });

  // Overall index
  const nonZeroAverages = Object.values(poAverages).filter((v) => v > 0);
  const overallIndex =
    nonZeroAverages.length > 0
      ? (nonZeroAverages.reduce((a, b) => a + b, 0) / nonZeroAverages.length).toFixed(2)
      : '0.00';

  const handleCellClick = (coId: string, poKey: string) => {
    setSelectedCell({ coId, poKey });
  };

  const handleSetCorrelation = (val: number) => {
    if (!activeCO) return;
    const updated = {
      ...activeCO,
      poMappings: {
        ...activeCO.poMappings,
        [activePOKey]: val
      }
    };
    onUpdateOutcome(updated);
  };

  const handleSaveJustification = () => {
    if (!activeCO) return;
    const updated = {
      ...activeCO,
      justifications: {
        ...activeCO.justifications,
        [activePOKey]: justificationText
      }
    };
    onUpdateOutcome(updated);
  };

  if (outcomes.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-12 bg-[#111827] rounded-xl border border-slate-800 text-center text-slate-400 mt-6 shadow-md">
        <span className="material-symbols-outlined text-[48px] text-slate-600 mb-3 block">grid_off</span>
        <h2 className="text-lg font-bold text-white mb-2">No Course Outcomes Defined Yet</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
          The articulation matrix maps course outcomes against Graduate Attributes (PO1–PO12 and PSO1–PSO3). Please define outcomes in Step 2 or upload a syllabus in Step 1.
        </p>
        <button
          onClick={() => onNavigate('specification')}
          className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md transition-colors"
        >
          Go to Step 2: Define Course Outcomes
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header & KPI Card */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#111827] p-5 rounded-xl border border-slate-800 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#1e293b] text-sky-400 font-mono text-xs font-semibold uppercase">
              STEP 03 OF 06
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider">
              ARTICULATION MATRIX
            </span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">
            CO-PO-PSO Articulation Matrix & Direct Attainment Map
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Formulate correlation levels (1: Slight, 2: Moderate, 3: Substantial) and audit justifications.
          </p>
        </div>

        {/* Tier-1 Threshold Indicator KPI Card */}
        <div className="flex items-center gap-4 bg-[#0d1424] px-4 py-2.5 rounded-lg border border-slate-800 shadow-sm shrink-0">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              <circle
                className="text-slate-800"
                cx="24"
                cy="24"
                fill="transparent"
                r="20"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <circle
                className="text-sky-400"
                cx="24"
                cy="24"
                fill="transparent"
                r="20"
                stroke="currentColor"
                strokeDasharray="125.6"
                strokeDashoffset="24.2"
                strokeWidth="3.5"
              />
            </svg>
            <span className="absolute font-mono text-xs font-bold text-sky-300">
              {overallIndex}
            </span>
          </div>
          <div className="flex flex-col text-xs">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-white">Tier-1 OBE Met</span>
              <span className="material-symbols-outlined text-[15px] text-emerald-400">verified</span>
            </div>
            <span className="text-slate-400 text-[11px]">Threshold Target ≥ 2.00 Index</span>
            <span className="text-sky-400 text-[11px] font-medium">91.4% Program Criteria Coverage</span>
          </div>
        </div>
      </div>

      {/* Legend & Rule Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#111827] px-4 py-2.5 rounded-lg border border-slate-800 text-xs text-slate-300">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-slate-400 uppercase font-semibold font-mono text-[11px]">
            Correlation Legend:
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-[11px]">
              3
            </span>
            <span>Very Strong (3)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-sky-950 text-sky-300 border border-sky-800 flex items-center justify-center font-bold text-[11px]">
              2
            </span>
            <span>Strong (2)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-[#1e293b] text-slate-300 flex items-center justify-center font-bold text-[11px]">
              1
            </span>
            <span>Moderate (1)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-[#090d16] text-slate-600 flex items-center justify-center font-medium text-[11px]">
              —
            </span>
            <span>None (0)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px]">Heatmap View:</span>
          <div className="inline-flex p-0.5 rounded bg-[#090d16] border border-slate-800">
            {(['standard', 'weighted', 'attainment'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setHeatmapMode(mode)}
                className={`px-2.5 py-0.5 rounded text-[11px] capitalize transition-colors ${
                  heatmapMode === mode
                    ? 'bg-[#1e293b] text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                type="button"
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Workspace Grid: Matrix Left, Active Cell Inspector Drawer Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Central Matrix Container (8 cols) */}
        <div className="xl:col-span-8 flex flex-col gap-2 bg-[#111827] p-4 rounded-xl border border-slate-800 overflow-x-auto shadow-md">
          <table className="w-full text-left border-collapse select-none">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="py-2.5 px-3 min-w-[70px] bg-[#111827] sticky left-0 z-20">Outcome</th>
                <th className="py-2.5 px-2 min-w-[65px] text-center">Bloom</th>
                {poKeys.map((pk) => {
                  const isSelected = selectedCell?.poKey === pk;
                  return (
                    <th
                      key={pk}
                      className={`py-2 px-1 text-center min-w-[34px] cursor-help transition-colors ${
                        isSelected ? 'bg-sky-500/20 text-sky-300 font-bold' : 'hover:text-white'
                      }`}
                      title={PO_DEFINITIONS[pk]?.title}
                    >
                      {pk}
                    </th>
                  );
                })}
                <th className="w-1 bg-slate-800 p-0"></th>
                {psoKeys.map((pk) => {
                  const isSelected = selectedCell?.poKey === pk;
                  return (
                    <th
                      key={pk}
                      className={`py-2 px-1 text-center min-w-[38px] text-sky-400 font-medium cursor-help transition-colors ${
                        isSelected ? 'bg-sky-500/20 font-bold' : 'hover:text-sky-300'
                      }`}
                      title={PO_DEFINITIONS[pk]?.title}
                    >
                      {pk}
                    </th>
                  );
                })}
                <th className="py-2.5 px-2 text-right min-w-[50px] font-semibold text-white">Mean</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              {outcomes.map((co) => {
                // Compute CO row mean
                let rSum = 0;
                let rCount = 0;
                allTargetKeys.forEach((k) => {
                  const v = co.poMappings[k] || 0;
                  if (v > 0) {
                    rSum += v;
                    rCount++;
                  }
                });
                const rowMean = rCount > 0 ? (rSum / rCount).toFixed(2) : '—';

                return (
                  <tr key={co.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-2.5 px-3 bg-[#111827] sticky left-0 z-10 font-bold text-white">
                      {co.code}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#1e293b] text-sky-300">
                        {co.bloomLevel}
                      </span>
                    </td>

                    {/* PO Columns */}
                    {poKeys.map((pk) => {
                      const val = co.poMappings[pk] || 0;
                      const isSelected = selectedCell?.coId === co.id && selectedCell?.poKey === pk;

                      let cellBg = 'bg-[#0d1424] text-slate-600 hover:border-slate-600';
                      if (val === 3) cellBg = 'bg-blue-600 text-white font-bold';
                      else if (val === 2) cellBg = 'bg-sky-950 text-sky-300 font-semibold border border-sky-800/60';
                      else if (val === 1) cellBg = 'bg-[#1e293b] text-slate-200';

                      return (
                        <td key={pk} className="p-1 text-center">
                          <button
                            type="button"
                            onClick={() => handleCellClick(co.id, pk)}
                            className={`w-7 h-7 rounded text-xs transition-all flex items-center justify-center mx-auto border ${
                              isSelected
                                ? 'ring-2 ring-sky-400 border-white'
                                : 'border-transparent'
                            } ${cellBg}`}
                          >
                            {val > 0 ? val : '—'}
                          </button>
                        </td>
                      );
                    })}

                    <td className="w-1 bg-slate-800 p-0"></td>

                    {/* PSO Columns */}
                    {psoKeys.map((pk) => {
                      const val = co.poMappings[pk] || 0;
                      const isSelected = selectedCell?.coId === co.id && selectedCell?.poKey === pk;

                      let cellBg = 'bg-[#0d1424] text-slate-600 hover:border-slate-600';
                      if (val === 3) cellBg = 'bg-blue-600 text-white font-bold';
                      else if (val === 2) cellBg = 'bg-sky-950 text-sky-300 font-semibold border border-sky-800/60';
                      else if (val === 1) cellBg = 'bg-[#1e293b] text-slate-200';

                      return (
                        <td key={pk} className="p-1 text-center">
                          <button
                            type="button"
                            onClick={() => handleCellClick(co.id, pk)}
                            className={`w-7 h-7 rounded text-xs transition-all flex items-center justify-center mx-auto border ${
                              isSelected
                                ? 'ring-2 ring-sky-400 border-white'
                                : 'border-transparent'
                            } ${cellBg}`}
                          >
                            {val > 0 ? val : '—'}
                          </button>
                        </td>
                      );
                    })}

                    <td className="py-2.5 px-2 text-right font-bold text-sky-300">
                      {rowMean}
                    </td>
                  </tr>
                );
              })}

              {/* Column Averages */}
              <tr className="bg-[#090d16] font-bold text-white border-t-2 border-slate-700">
                <td className="py-2.5 px-3 sticky left-0 bg-[#090d16] z-10" colSpan={2}>
                  Mean Attainment
                </td>
                {poKeys.map((pk) => (
                  <td key={pk} className="py-2 px-1 text-center text-sky-400 text-[11px]">
                    {poAverages[pk] > 0 ? poAverages[pk] : '—'}
                  </td>
                ))}
                <td className="w-1 bg-slate-800 p-0"></td>
                {psoKeys.map((pk) => (
                  <td key={pk} className="py-2 px-1 text-center text-sky-400 text-[11px]">
                    {poAverages[pk] > 0 ? poAverages[pk] : '—'}
                  </td>
                ))}
                <td className="py-2.5 px-2 text-right text-emerald-400">
                  {overallIndex}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="p-3 bg-[#0d1424] rounded-lg border border-slate-800/80 text-xs text-slate-400 flex items-center justify-between mt-2">
            <span>Click any cell to edit correlation and inspect justification rationale.</span>
            <button
              onClick={() => onNavigate('checks')}
              className="text-sky-400 hover:underline flex items-center gap-1 font-medium"
              type="button"
            >
              <span>Next: Curriculum Audit Checks</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Active Cell Inspector Drawer (4 cols) */}
        <div className="xl:col-span-4 bg-[#111827] p-5 rounded-xl border border-slate-800 shadow-md flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-400 text-[18px]">tune</span>
              <h3 className="text-sm font-semibold text-white">Cell Articulation Inspector</h3>
            </div>
            <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-xs font-bold">
              {activeCO?.code} ➔ {activePOKey}
            </span>
          </div>

          {/* Target Attributes Definition */}
          <div className="space-y-1.5 p-3 rounded-lg bg-[#0d1424] border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 uppercase">
              Program Outcome Target
            </div>
            <div className="text-xs font-semibold text-white">{activePO.title}</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">{activePO.short}</p>
          </div>

          {/* Outcome Description */}
          <div className="space-y-1.5 p-3 rounded-lg bg-[#0d1424] border border-slate-800">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase">
              <span>Course Outcome Context</span>
              <span className="text-sky-400">{activeCO?.bloomLevel} ({activeCO?.bloomName})</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">{activeCO?.statement}</p>
          </div>

          {/* Correlation Level Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
              Correlation Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { val: 0, label: '0 (None)' },
                { val: 1, label: '1 (Low)' },
                { val: 2, label: '2 (Med)' },
                { val: 3, label: '3 (High)' }
              ].map((lvl) => (
                <button
                  key={lvl.val}
                  type="button"
                  onClick={() => handleSetCorrelation(lvl.val)}
                  className={`py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                    currentVal === lvl.val
                      ? 'bg-blue-600 text-white shadow-md ring-1 ring-sky-400'
                      : 'bg-[#0d1424] hover:bg-[#1e293b] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Justification Textarea */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Accreditation Justification</span>
              <span className="text-[10px] text-slate-500 font-mono">NBA Criterion 3.1</span>
            </div>
            <textarea
              rows={3}
              value={justificationText}
              onChange={(e) => setJustificationText(e.target.value)}
              placeholder="Explain how classroom topics, lab experiments or assessment questions demonstrate alignment..."
              className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500 placeholder:text-slate-600"
            />
            <button
              type="button"
              onClick={handleSaveJustification}
              className="w-full py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#27364f] text-sky-300 font-medium text-xs transition-colors border border-slate-700 flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[14px]">save</span>
              <span>Update Justification</span>
            </button>
          </div>

          {/* Direct Attainment Weight Card */}
          <div className="p-3 rounded-lg bg-[#0d1424] border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-sky-400">calculate</span>
              Attainment Calculation Model
            </div>
            <p>
              Direct Attainment = <strong>(0.8 × CIE Score) + (0.2 × SEE Score)</strong> normalized by correlation index ({currentVal}/3).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
