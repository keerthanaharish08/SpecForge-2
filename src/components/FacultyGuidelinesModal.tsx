import React from 'react';

interface FacultyGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FacultyGuidelinesModal: React.FC<FacultyGuidelinesModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-[#090d16] border border-slate-800 rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-sky-400 text-[22px]">menu_book</span>
            <div>
              <h2 className="text-base font-semibold text-white">Autonomous OBE Faculty Handbook</h2>
              <p className="text-xs text-slate-400">NBA Washington Accord Tier-1 Formulation Guidelines</p>
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

        <div className="p-6 space-y-5 text-xs text-slate-300 leading-relaxed">
          <section className="space-y-1.5">
            <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              1. Course Outcome (CO) Action Verbs (Bloom's Revised Taxonomy)
            </h3>
            <p>
              Each course must specify <strong>exactly 4 to 6 Course Outcomes</strong>. Avoid unmeasurable verbs such as
              <em>"Understand", "Know", "Learn", "Be familiar with"</em>. Tier-1 accreditation strictly mandates observable,
              assessable actions:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-sky-400 font-bold block">K3 (Apply):</span>
                Calculate, Solve, Implement, Demonstrate, Employ
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold block">K4 (Analyze):</span>
                Differentiate, Formulate, Examine, Benchmark, Model
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-purple-400 font-bold block">K5 (Evaluate):</span>
                Critique, Optimize, Validate, Verify, Appraise
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold block">K6 (Create):</span>
                Design, Synthesize, Architect, Construct, Invent
              </div>
            </div>
          </section>

          <section className="space-y-1.5 border-t border-slate-800/80 pt-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              2. CO-PO & CO-PSO Articulation Correlation Levels
            </h3>
            <p>
              Correlation indices indicate the degree to which a course outcome contributes to program graduate attributes:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li><strong>Level 3 (Substantial / High):</strong> Supported by ≥ 40% of classroom hours, a dedicated lab assessment, or continuous project delivery.</li>
              <li><strong>Level 2 (Moderate / Medium):</strong> Supported by 20% to 39% of course topics and at least one direct mid-term question.</li>
              <li><strong>Level 1 (Slight / Low):</strong> Incidental coverage (&lt; 20% hours) or referenced in case discussion.</li>
              <li><strong>Dash (— / 0):</strong> No demonstrable alignment.</li>
            </ul>
          </section>

          <section className="space-y-1.5 border-t border-slate-800/80 pt-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              3. Continuous Internal Evaluation (CIE) Parity
            </h3>
            <p>
              For courses with practical components (4-0-2), CIE must allocate:
              25 Marks Midterm Theory, 15 Marks Continuous Lab Experiments, 10 Marks Micro-projects & Quizzes.
              The total marks equal 50 CIE + 50 SEE (Semester End Exam) = 100 Marks.
            </p>
          </section>
        </div>

        <div className="px-6 py-3 border-t border-slate-800 bg-[#0d1424] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
            type="button"
          >
            Close Guidelines
          </button>
        </div>
      </div>
    </div>
  );
};
