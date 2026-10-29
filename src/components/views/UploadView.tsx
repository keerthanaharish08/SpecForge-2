import React, { useState } from 'react';
import { WorkflowStep, CourseMetadata, CourseOutcome } from '../../types';

interface UploadViewProps {
  onNavigate: (step: WorkflowStep) => void;
  onApplyExtractedSpec: (meta: Partial<CourseMetadata>, outcomes: CourseOutcome[]) => void;
  hasSyllabus: boolean;
}

export const UploadView: React.FC<UploadViewProps> = ({
  onNavigate,
  onApplyExtractedSpec,
  hasSyllabus
}) => {
  const [syllabusFile, setSyllabusFile] = useState<{
    name: string;
    size: string;
    type: string;
    checksum: string;
    cos: number;
  } | null>(null);

  const [blueprintFile, setBlueprintFile] = useState<{
    name: string;
    size: string;
    type: string;
    marks: number;
  } | null>(null);

  const [isParsing, setIsParsing] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [rawText, setRawText] = useState('');
  const [showPasteModal, setShowPasteModal] = useState(false);

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'spec' | 'blueprint') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setParseProgress(30);

    setTimeout(() => {
      setParseProgress(75);
    }, 300);

    setTimeout(() => {
      setParseProgress(100);
      setIsParsing(false);

      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      const hash = Math.random().toString(16).substring(2, 8);

      if (type === 'spec') {
        setSyllabusFile({
          name: file.name,
          size: sizeStr,
          type: file.type || 'Document File',
          checksum: hash,
          cos: 5
        });

        // Derive course code or name from filename
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
        const codeMatch = file.name.match(/([A-Z]{2,4}\d{3,4})/i);
        const courseCode = codeMatch ? codeMatch[1].toUpperCase() : 'COURSE';

        // Provide 5 default OBE outcomes matching the uploaded course
        const sampleOutcomes: CourseOutcome[] = [
          {
            id: 'co1',
            code: 'CO1',
            bloomLevel: 'K3',
            bloomName: 'Apply',
            hours: 9,
            weightagePercent: 20,
            statement: `Apply fundamental principles and architectural models governing ${cleanName}.`,
            poMappings: { PO1: 3, PO2: 2, PO3: 2, PO5: 2, PSO1: 3 },
            justifications: { PO1: 'Demonstrates application of engineering principles.' }
          },
          {
            id: 'co2',
            code: 'CO2',
            bloomLevel: 'K4',
            bloomName: 'Analyze',
            hours: 10,
            weightagePercent: 20,
            statement: `Analyze performance boundaries, consistency trade-offs, and failure modes in ${cleanName}.`,
            poMappings: { PO1: 2, PO2: 3, PO4: 2, PSO1: 3 },
            justifications: { PO2: 'Formulates empirical validation benchmarks.' }
          },
          {
            id: 'co3',
            code: 'CO3',
            bloomLevel: 'K4',
            bloomName: 'Analyze',
            hours: 10,
            weightagePercent: 20,
            statement: `Examine data synchronization, state replication, and communication primitives across systems.`,
            poMappings: { PO2: 2, PO3: 3, PO5: 3, PSO2: 2 },
            justifications: { PO3: 'Designs state replication protocols.' }
          },
          {
            id: 'co4',
            code: 'CO4',
            bloomLevel: 'K5',
            bloomName: 'Evaluate',
            hours: 9,
            weightagePercent: 20,
            statement: `Evaluate fault-tolerance mechanisms, consensus protocols, and security models.`,
            poMappings: { PO2: 3, PO4: 3, PO8: 1, PSO3: 2 },
            justifications: { PO4: 'Synthesizes quantitative fault tolerance data.' }
          },
          {
            id: 'co5',
            code: 'CO5',
            bloomLevel: 'K6',
            bloomName: 'Create',
            hours: 10,
            weightagePercent: 20,
            statement: `Design and synthesize a production-grade scalable solution meeting industry standards.`,
            poMappings: { PO3: 3, PO5: 3, PO9: 2, PO11: 1, PSO1: 3, PSO2: 3, PSO3: 3 },
            justifications: { PO3: 'Comprehensive synthesis meeting design constraints.' }
          }
        ];

        onApplyExtractedSpec(
          {
            code: courseCode,
            title: cleanName,
            credits: { lecture: 3, tutorial: 0, practical: 2, totalUnits: 4.0 }
          },
          sampleOutcomes
        );
      } else {
        setBlueprintFile({
          name: file.name,
          size: sizeStr,
          type: 'Examination Blueprint',
          marks: 100
        });
      }
    }, 600);
  };

  const handleParsePastedText = () => {
    if (!rawText.trim()) return;

    // Parse lines or text into outcomes
    const lines = rawText.split('\n').filter((l) => l.trim().length > 10);
    const parsedOutcomes: CourseOutcome[] = lines.slice(0, 6).map((line, idx) => {
      const coNum = idx + 1;
      const lower = line.toLowerCase();
      let bloomLevel: any = 'K3';
      let bloomName = 'Apply';
      if (lower.includes('design') || lower.includes('create') || lower.includes('synthes')) {
        bloomLevel = 'K6';
        bloomName = 'Create';
      } else if (lower.includes('evaluat') || lower.includes('assess') || lower.includes('critiq')) {
        bloomLevel = 'K5';
        bloomName = 'Evaluate';
      } else if (lower.includes('analy') || lower.includes('examin') || lower.includes('differentiat')) {
        bloomLevel = 'K4';
        bloomName = 'Analyze';
      }

      return {
        id: `co-${coNum}`,
        code: `CO${coNum}`,
        bloomLevel,
        bloomName,
        hours: 10,
        weightagePercent: 20,
        statement: line.replace(/^CO\d+[:.\s]*/i, '').trim(),
        poMappings: { PO1: 3, PO2: 2, PO3: 2, PSO1: 2 },
        justifications: {}
      };
    });

    onApplyExtractedSpec({}, parsedOutcomes);
    setShowPasteModal(false);
    setRawText('');
    setSyllabusFile({
      name: 'Pasted_Syllabus_Specification.txt',
      size: `${rawText.length} bytes`,
      type: 'Text Extract',
      checksum: 'txt-ast',
      cos: parsedOutcomes.length
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111827] p-5 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#1e293b] text-sky-400 font-mono text-xs font-semibold uppercase">
              STEP 01 OF 06
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider">
              INGESTION PIPELINE
            </span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">
            Course Specification & Assessment Blueprint Ingestion
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Upload institutional syllabus documents (DOCX, PDF) or paste syllabus text to generate accredited course outcomes.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowPasteModal(true)}
            className="px-3.5 py-2 rounded-lg bg-[#1e293b] hover:bg-[#27364f] text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">content_paste</span>
            <span>Paste Syllabus Text</span>
          </button>

          <button
            onClick={() => onNavigate('specification')}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-md flex items-center gap-1.5"
            type="button"
          >
            <span>Continue to Spec Overview</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {isParsing && (
        <div className="bg-[#0f233d] border border-sky-800/80 p-4 rounded-xl flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-sky-300 font-medium">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
              Executing AI Specification Parser (Extracting Course Outcomes & Units)...
            </span>
            <span className="font-mono">{parseProgress}%</span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
            <div
              className="bg-sky-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${parseProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Two Ingestion Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Specification Document */}
        <section className="flex flex-col bg-[#111827] rounded-xl p-5 border border-slate-800 shadow-md">
          <div className="flex items-start justify-between pb-3 mb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white">Course Specification File</h2>
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono">
                  Mandatory
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Accepts .docx, .pdf, .txt • Max 25 MB</span>
            </div>
            <span className="material-symbols-outlined text-sky-400 text-[24px]">description</span>
          </div>

          {syllabusFile ? (
            <div className="bg-[#0d1424] rounded-lg p-3.5 border border-slate-800 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#1e293b] flex items-center justify-center shrink-0 text-sky-400">
                    <span className="material-symbols-outlined text-[22px]">article</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-white truncate">
                      {syllabusFile.name}
                    </span>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{syllabusFile.size}</span>
                      <span>•</span>
                      <span className="text-sky-300">{syllabusFile.type}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSyllabusFile(null)}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
                  title="Remove Course Specification"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1e293b] text-sky-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  Parsed: {syllabusFile.cos} Outcomes Ingested
                </span>
                <span className="font-mono text-slate-500">
                  Checksum: <span className="text-slate-300">{syllabusFile.checksum}</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-[#0d1424] border border-dashed border-slate-700 text-center text-xs text-slate-400">
              No syllabus attached. Please choose a syllabus file below.
            </div>
          )}

          {/* Upload Dropzone */}
          <label className="mt-4 border-2 border-dashed border-slate-700 hover:border-sky-500 rounded-lg p-5 flex flex-col items-center justify-center text-center bg-[#090d16] hover:bg-[#0c1424] transition-colors cursor-pointer group">
            <input
              type="file"
              accept=".docx,.pdf,.doc,.txt"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'spec')}
            />
            <div className="w-10 h-10 rounded-full bg-[#1e293b] group-hover:bg-blue-600 text-slate-300 group-hover:text-white flex items-center justify-center mb-2 transition-colors">
              <span className="material-symbols-outlined text-[20px]">upload_file</span>
            </div>
            <p className="text-xs text-white">
              Drop your syllabus file here, or{' '}
              <span className="text-sky-400 group-hover:underline font-semibold">Browse disk</span>
            </p>
            <span className="text-[10px] text-slate-500 mt-1">
              Extracts course outcomes, contact hours, and modules
            </span>
          </label>
        </section>

        {/* Assessment Blueprint Document */}
        <section className="flex flex-col bg-[#111827] rounded-xl p-5 border border-slate-800 shadow-md">
          <div className="flex items-start justify-between pb-3 mb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white">Question-Paper Blueprint</h2>
                <span className="px-1.5 py-0.5 rounded bg-[#1e293b] text-slate-300 text-[10px] font-mono">
                  Optional
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Accepts .docx, .pdf, .xlsx • Max 15 MB</span>
            </div>
            <span className="material-symbols-outlined text-sky-400 text-[24px]">assignment_turned_in</span>
          </div>

          {blueprintFile ? (
            <div className="bg-[#0d1424] rounded-lg p-3.5 border border-slate-800 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#1e293b] flex items-center justify-center shrink-0 text-sky-400">
                    <span className="material-symbols-outlined text-[22px]">quiz</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-white truncate">
                      {blueprintFile.name}
                    </span>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{blueprintFile.size}</span>
                      <span>•</span>
                      <span className="text-sky-300">{blueprintFile.type}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setBlueprintFile(null)}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
                  title="Remove Blueprint"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  CO Assessment Weights Detected
                </span>
                <span className="font-mono text-slate-400">{blueprintFile.marks} Total Marks</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-[#0d1424] border border-dashed border-slate-700 text-center text-xs text-slate-400">
              No examination blueprint attached.
            </div>
          )}

          {/* Upload Dropzone */}
          <label className="mt-4 border-2 border-dashed border-slate-700 hover:border-sky-500 rounded-lg p-5 flex flex-col items-center justify-center text-center bg-[#090d16] hover:bg-[#0c1424] transition-colors cursor-pointer group">
            <input
              type="file"
              accept=".docx,.pdf,.xlsx"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'blueprint')}
            />
            <div className="w-10 h-10 rounded-full bg-[#1e293b] group-hover:bg-sky-600 text-slate-300 group-hover:text-white flex items-center justify-center mb-2 transition-colors">
              <span className="material-symbols-outlined text-[20px]">add_task</span>
            </div>
            <p className="text-xs text-white">
              Drop evaluation scheme or{' '}
              <span className="text-sky-400 group-hover:underline font-semibold">Upload Blueprint</span>
            </p>
            <span className="text-[10px] text-slate-500 mt-1">Calculates Bloom-to-Question mark distribution</span>
          </label>
        </section>
      </div>

      {/* Paste Syllabus Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#090d16] border border-slate-800 rounded-xl w-full max-w-xl p-5 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-400 text-[20px]">content_paste</span>
                <h3 className="font-semibold text-sm text-white">Paste Syllabus or Course Outcome Statements</h3>
              </div>
              <button
                onClick={() => setShowPasteModal(false)}
                className="w-7 h-7 rounded hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Paste your course outcomes or syllabus lines (one per line). SpecForge will parse action verbs and categorize Bloom taxonomy levels:
            </p>
            <textarea
              rows={6}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="e.g.&#10;CO1: Apply foundational principles to solve engineering problems&#10;CO2: Analyze system performance under variable workloads&#10;CO3: Evaluate trade-offs and consistency guarantees&#10;CO4: Design scalable architecture adhering to safety standards"
              className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
            />
            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setShowPasteModal(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleParsePastedText}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
              >
                Parse & Apply Outcomes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
