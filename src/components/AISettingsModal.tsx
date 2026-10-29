import React from 'react';
import { AISettings } from '../types';

interface AISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AISettings;
  onSave: (settings: AISettings) => void;
}

export const AISettingsModal: React.FC<AISettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  const [draft, setDraft] = React.useState<AISettings>(settings);

  React.useEffect(() => {
    setDraft(settings);
  }, [settings, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-[#090d16] border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800 text-sky-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">SpecForge AI Engine & OBE Ruleset</h2>
              <p className="text-xs text-slate-400">Configure LLM parsing parameters, Bloom rigor and NBA constraints</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-sm">
          {/* Section: LLM Model Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Active Autonomous Intelligence Model
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', tag: 'Fast / Low Latency' },
                { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', tag: 'Deep Complex Audit' },
                { id: 'internal-academic-v4', name: 'Academic Fine-tuned', tag: 'Tier-1 NBA Parser' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setDraft({ ...draft, llmProvider: m.id as any })}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    draft.llmProvider === m.id
                      ? 'border-sky-500 bg-[#0f233d] text-white shadow-sm'
                      : 'border-slate-800 bg-[#0d1424] text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-xs">{m.name}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{m.tag}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section: Inference Temperature */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Determinism / Temperature</span>
              <span className="font-mono text-sky-400 font-bold">{draft.temperature.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="0.8"
              step="0.05"
              value={draft.temperature}
              onChange={(e) => setDraft({ ...draft, temperature: parseFloat(e.target.value) })}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>0.0 (Strictly Deterministic / Statutory)</span>
              <span>0.8 (Creative Pedagogy Suggestions)</span>
            </div>
          </div>

          {/* Section: Accreditation Framework & Bloom Strictness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Accreditation Standards Benchmark
              </label>
              <select
                value={draft.accreditationRuleset}
                onChange={(e) => setDraft({ ...draft, accreditationRuleset: e.target.value as any })}
                className="w-full bg-[#0d1424] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="Washington Accord 2024 Tier-1">Washington Accord 2024 Tier-1 (Autonomous)</option>
                <option value="NBA 2021 Manual">NBA 2021 Engineering Manual (Tier-2 Affiliated)</option>
                <option value="AICTE Model Curriculum">AICTE Model Curriculum Standards</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Bloom Taxonomy Strictness
              </label>
              <select
                value={draft.bloomStrictness}
                onChange={(e) => setDraft({ ...draft, bloomStrictness: e.target.value as any })}
                className="w-full bg-[#0d1424] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="Strict K3-K6">Strict K3-K6 (Reject passive verbs)</option>
                <option value="Standard K2-K6">Standard K2-K6 (Allow Explain in Unit 1)</option>
                <option value="Flexible">Flexible (Informational warnings only)</option>
              </select>
            </div>
          </div>

          {/* Section: Automated Checks Switches */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Automated Synthesis Guardrails
            </span>

            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1424] border border-slate-800/80 cursor-pointer hover:border-slate-700">
                <div>
                  <div className="text-xs font-medium text-slate-200">Auto-Remediate on Specification Sync</div>
                  <div className="text-[11px] text-slate-400">Instantly replace uncalibrated verbs with Bloom measurable action verbs</div>
                </div>
                <input
                  type="checkbox"
                  checked={draft.autoRemediateOnSync}
                  onChange={(e) => setDraft({ ...draft, autoRemediateOnSync: e.target.checked })}
                  className="w-4 h-4 accent-sky-400 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1424] border border-slate-800/80 cursor-pointer hover:border-slate-700">
                <div>
                  <div className="text-xs font-medium text-slate-200">Detect Taxonomy Drift & Verb Dilution</div>
                  <div className="text-[11px] text-slate-400">Flag outcome statements when laboratory contact hours fall below 2 hrs/week</div>
                </div>
                <input
                  type="checkbox"
                  checked={draft.detectTaxonomyDrift}
                  onChange={(e) => setDraft({ ...draft, detectTaxonomyDrift: e.target.checked })}
                  className="w-4 h-4 accent-sky-400 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1424] border border-slate-800/80 cursor-pointer hover:border-slate-700">
                <div>
                  <div className="text-xs font-medium text-slate-200">Enforce CIE / SEE Contact Hour Parity</div>
                  <div className="text-[11px] text-slate-400">Verify 50:50 continuous internal evaluation parity against final exam</div>
                </div>
                <input
                  type="checkbox"
                  checked={draft.enforceContactHourParity}
                  onChange={(e) => setDraft({ ...draft, enforceContactHourParity: e.target.checked })}
                  className="w-4 h-4 accent-sky-400 rounded"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-[#0d1424]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(draft);
              onClose();
            }}
            className="px-4 py-2 text-xs rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors shadow-md flex items-center gap-1.5"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">check</span>
            <span>Save Ruleset Configuration</span>
          </button>
        </div>
      </div>
    </div>
  );
};
