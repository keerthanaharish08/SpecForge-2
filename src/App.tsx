import React, { useState } from 'react';
import {
  UserRole,
  WorkflowStep,
  CourseOutcome,
  SyllabusModule,
  DefectItem,
  WorkflowStage,
  AuditLogEntry,
  AISettings,
  CourseMetadata
} from './types';
import {
  INITIAL_COS,
  INITIAL_MODULES,
  INITIAL_DEFECTS,
  INITIAL_STAGES,
  INITIAL_AUDIT_LOG,
  DEFAULT_AI_SETTINGS,
  DEFAULT_COURSE_METADATA
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AISettingsModal } from './components/AISettingsModal';
import { FacultyGuidelinesModal } from './components/FacultyGuidelinesModal';
import { DashboardView } from './components/views/DashboardView';
import { UploadView } from './components/views/UploadView';
import { SpecificationView } from './components/views/SpecificationView';
import { ArticulationMapView } from './components/views/ArticulationMapView';
import { CurriculumAuditView } from './components/views/CurriculumAuditView';
import { GovernanceWorkflowView } from './components/views/GovernanceWorkflowView';
import { ExportPackView } from './components/views/ExportPackView';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('author');

  const [courseMeta, setCourseMeta] = useState<CourseMetadata>(DEFAULT_COURSE_METADATA);
  const [outcomes, setOutcomes] = useState<CourseOutcome[]>(INITIAL_COS);
  const [modules, setModules] = useState<SyllabusModule[]>(INITIAL_MODULES);
  const [defects, setDefects] = useState<DefectItem[]>(INITIAL_DEFECTS);
  const [stages, setStages] = useState<WorkflowStage[]>(INITIAL_STAGES);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOG);
  const [aiSettings, setAiSettings] = useState<AISettings>(DEFAULT_AI_SETTINGS);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [isEditMetaOpen, setIsEditMetaOpen] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);
  const [hasUpload, setHasUpload] = useState(false);

  // Edit metadata form draft
  const [metaDraft, setMetaDraft] = useState<CourseMetadata>(courseMeta);

  const unresolvedDefectsCount = defects.filter((d) => d.status === 'unresolved').length;

  const handleUpdateOutcome = (updatedOutcome: CourseOutcome) => {
    setOutcomes((prev) =>
      prev.map((co) => (co.id === updatedOutcome.id ? updatedOutcome : co))
    );
  };

  const handleAddOutcome = (newOutcome: CourseOutcome) => {
    setOutcomes((prev) => [...prev, newOutcome]);
    handleAddAuditLog('Course Outcome Added', `Created ${newOutcome.code} (${newOutcome.bloomLevel} - ${newOutcome.bloomName}).`);
  };

  const handleDeleteOutcome = (id: string) => {
    setOutcomes((prev) => prev.filter((co) => co.id !== id));
    handleAddAuditLog('Course Outcome Removed', `Deleted outcome ${id}.`);
  };

  const handleAddModule = (newModule: SyllabusModule) => {
    setModules((prev) => [...prev, newModule]);
    handleAddAuditLog('Syllabus Unit Added', `Created Unit ${newModule.unitNumber}: ${newModule.title}.`);
  };

  const handleDeleteModule = (id: string) => {
    setModules((prev) => prev.filter((m) => m.id !== id));
    handleAddAuditLog('Syllabus Unit Removed', `Deleted unit ${id}.`);
  };

  const handleApplyExtractedSpec = (meta: Partial<CourseMetadata>, newOutcomes: CourseOutcome[]) => {
    setCourseMeta((prev) => ({
      ...prev,
      ...meta,
      credits: { ...prev.credits, ...(meta.credits || {}) }
    }));
    if (newOutcomes.length > 0) {
      setOutcomes(newOutcomes);
    }
    setHasUpload(true);
    handleAddAuditLog('Specification Ingested', `Ingested course parameters and ${newOutcomes.length} outcomes.`);
  };

  // Dynamic spec validation against real outcomes
  const handleValidateSpec = () => {
    const newDefects: DefectItem[] = [];

    if (!courseMeta.code && !courseMeta.title) {
      newDefects.push({
        id: 'def-meta',
        code: 'META-MISSING',
        severity: 'high',
        section: 'Section 1: Course Summary',
        sectionCode: 'sec2',
        title: 'Course Identification Missing',
        description: 'Course Code and Title have not been declared in the specification.',
        ruleViolated: 'Autonomous Institutional Mandate — Course Specification Catalog Standard',
        suggestedAction: 'Enter official course code, title, and credit distribution in Course Details.',
        status: 'unresolved'
      });
    }

    if (outcomes.length === 0) {
      newDefects.push({
        id: 'def-no-co',
        code: 'CO-COUNT-ZERO',
        severity: 'high',
        section: 'Section 2: Course Outcomes',
        sectionCode: 'sec2',
        title: 'No Course Outcomes Defined',
        description: 'Specification lacks course outcomes. NBA accreditation requires 4 to 6 measurable outcomes.',
        ruleViolated: 'NBA Criterion 2.1 — Measurable Learning Outcomes',
        suggestedAction: 'Author at least 4 course outcomes formulated under Bloom revised taxonomy.',
        status: 'unresolved'
      });
    } else if (outcomes.length < 4) {
      newDefects.push({
        id: 'def-co-few',
        code: 'CO-COUNT-LOW',
        severity: 'medium',
        section: 'Section 2: Course Outcomes',
        sectionCode: 'sec2',
        title: 'Fewer than 4 Course Outcomes Defined',
        description: `Only ${outcomes.length} course outcome(s) defined. Standard curriculum design mandates 4 to 6 outcomes.`,
        ruleViolated: 'NBA Criterion 2.1 — Outcome Granularity',
        suggestedAction: 'Formulate additional outcomes to cover remaining course units.',
        status: 'unresolved'
      });
    }

    // Check for passive verbs
    const passiveVerbs = ['understand', 'know', 'learn', 'study', 'familiar', 'comprehend'];
    outcomes.forEach((co) => {
      const lower = co.statement.toLowerCase();
      const found = passiveVerbs.find((v) => lower.includes(v));
      if (found) {
        newDefects.push({
          id: `def-verb-${co.id}`,
          code: `BLOOM-${co.code}-01`,
          severity: 'high',
          section: 'Section 2: Course Outcomes',
          sectionCode: 'sec2',
          title: `Passive Verb in ${co.code} Statement`,
          description: `${co.code} contains passive term "${found}", violating Washington Accord Tier-1 requirement for demonstrable action verbs.`,
          ruleViolated: 'NBA Criterion 2.1 — Observable Cognitive Performance',
          suggestedAction: `Substitute "${found}" with a measurable Bloom verb such as "Apply", "Analyze", or "Design".`,
          status: 'unresolved'
        });
      }

      // Check if this outcome has zero correlations
      const nonZeroMappings = Object.values(co.poMappings).filter((v) => v > 0);
      if (nonZeroMappings.length === 0) {
        newDefects.push({
          id: `def-map-${co.id}`,
          code: `MAP-${co.code}-NONE`,
          severity: 'medium',
          section: 'Section 3: CO-PO Matrix',
          sectionCode: 'sec3',
          title: `Uncorrelated Outcome (${co.code})`,
          description: `${co.code} has no correlation mapping to any Program Outcome (PO1–PO12).`,
          ruleViolated: 'NBA Criterion 3.1 — Curriculum-Program Alignment',
          suggestedAction: 'Assign correlation levels (1, 2, or 3) and provide justification in Step 3.',
          status: 'unresolved'
        });
      }
    });

    setDefects(newDefects);
    handleAddAuditLog(
      'Curriculum Audit Executed',
      `Scanned specification. Found ${newDefects.length} compliance item(s).`
    );
    setCurrentStep('checks');
  };

  const handleRemediateDefect = (id: string) => {
    setDefects((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'remediated' } : d))
    );
    const def = defects.find((d) => d.id === id);
    handleAddAuditLog(
      'Defect Auto-Remediated',
      `${def?.code || id}: Applied suggested calibration.`
    );
  };

  const handleOverrideDefect = (id: string) => {
    setDefects((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'overridden' } : d))
    );
    const def = defects.find((d) => d.id === id);
    handleAddAuditLog(
      'Faculty Override Granted',
      `${def?.code || id}: Exception authorized under autonomous academic autonomy.`
    );
  };

  const handleRemediateAllDefects = () => {
    setDefects((prev) =>
      prev.map((d) => (d.status === 'unresolved' ? { ...d, status: 'remediated' } : d))
    );
    handleAddAuditLog(
      'Batch Remediation Completed',
      'All unresolved curriculum compliance flags marked resolved.'
    );
  };

  const handleAdvanceStage = () => {
    const activeIdx = stages.findIndex((s) => s.status === 'active');
    if (activeIdx < stages.length - 1) {
      const updated = stages.map((s, idx) => {
        if (idx === activeIdx) return { ...s, status: 'completed' as const };
        if (idx === activeIdx + 1) return { ...s, status: 'active' as const };
        return s;
      });
      setStages(updated);
      handleAddAuditLog(
        `Stage Advanced: ${stages[activeIdx + 1].name}`,
        `Sign-off granted by ${currentRole.toUpperCase()}. Forwarded to ${stages[activeIdx + 1].roleTitle}.`
      );
    }
  };

  const handleRevertStage = (reason: string) => {
    const updated = stages.map((s, idx) => {
      if (idx === 0) return { ...s, status: 'active' as const };
      return { ...s, status: 'queued' as const };
    });
    setStages(updated);
    handleAddAuditLog(
      'Specification Reverted to Draft',
      `Remediation requested by ${currentRole.toUpperCase()}: "${reason}". Revision cycle bumped.`
    );
  };

  const handleAddAuditLog = (action: string, details: string) => {
    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      author: currentRole === 'author' ? 'Course Author' : currentRole === 'reviewer' ? 'PAC Reviewer' : 'HOD',
      role: currentRole.toUpperCase(),
      action,
      details
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const handleSaveDraft = () => {
    setSavedNotification(true);
    handleAddAuditLog('Draft Saved', 'Course specification draft cached to institutional database.');
    setTimeout(() => setSavedNotification(false), 2000);
  };

  const handleRecalculate = () => {
    handleAddAuditLog(
      'Matrices Recalculated',
      'Refreshed CO-PO correlation coefficients and direct attainment models.'
    );
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  const handleOpenEditMeta = () => {
    setMetaDraft(courseMeta);
    setIsEditMetaOpen(true);
  };

  const handleSaveMeta = () => {
    setCourseMeta(metaDraft);
    setIsEditMetaOpen(false);
    handleAddAuditLog('Course Metadata Updated', `Configured course ${metaDraft.code}: ${metaDraft.title}`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans">
      <Navbar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        unresolvedDefectsCount={unresolvedDefectsCount}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onSaveDraft={handleSaveDraft}
        onValidateSpec={handleValidateSpec}
        currentStep={currentStep}
        savedNotification={savedNotification}
        courseMeta={courseMeta}
      />

      <Sidebar
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        unresolvedCount={unresolvedDefectsCount}
        onOpenGuidelines={() => setIsGuidelinesOpen(true)}
        hasOutcomes={outcomes.length > 0}
        hasUpload={hasUpload}
        courseMeta={courseMeta}
      />

      <main className="pl-60 md:pl-64 pt-14 min-h-screen p-4 md:p-6 bg-[#030712]">
        {currentStep === 'dashboard' && (
          <DashboardView
            courseMeta={courseMeta}
            outcomes={outcomes}
            defects={defects}
            onNavigate={setCurrentStep}
            onAutoRemediateAll={handleRemediateAllDefects}
            onRecalculate={handleRecalculate}
            onEditCourseMeta={handleOpenEditMeta}
          />
        )}

        {currentStep === 'upload' && (
          <UploadView
            onNavigate={setCurrentStep}
            onApplyExtractedSpec={handleApplyExtractedSpec}
            hasSyllabus={hasUpload}
          />
        )}

        {currentStep === 'specification' && (
          <SpecificationView
            courseMeta={courseMeta}
            outcomes={outcomes}
            modules={modules}
            onNavigate={setCurrentStep}
            onUpdateOutcome={handleUpdateOutcome}
            onAddOutcome={handleAddOutcome}
            onDeleteOutcome={handleDeleteOutcome}
            onAddModule={handleAddModule}
            onDeleteModule={handleDeleteModule}
            onAcceptAllCorrections={() => {}}
            onEditCourseMeta={handleOpenEditMeta}
          />
        )}

        {currentStep === 'matrix' && (
          <ArticulationMapView
            outcomes={outcomes}
            onUpdateOutcome={handleUpdateOutcome}
            onNavigate={setCurrentStep}
          />
        )}

        {currentStep === 'checks' && (
          <CurriculumAuditView
            defects={defects}
            onRemediate={handleRemediateDefect}
            onOverride={handleOverrideDefect}
            onRemediateAll={handleRemediateAllDefects}
            onNavigate={setCurrentStep}
          />
        )}

        {currentStep === 'governance' && (
          <GovernanceWorkflowView
            currentRole={currentRole}
            stages={stages}
            auditLogs={auditLogs}
            onAdvanceStage={handleAdvanceStage}
            onRevertStage={handleRevertStage}
            onAddLog={handleAddAuditLog}
            onNavigate={setCurrentStep}
          />
        )}

        {currentStep === 'export' && (
          <ExportPackView
            courseMeta={courseMeta}
            outcomes={outcomes}
            modules={modules}
            stages={stages}
          />
        )}
      </main>

      {/* Edit Course Metadata Modal */}
      {isEditMetaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#090d16] border border-slate-800 rounded-xl w-full max-w-xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-400 text-[18px]">school</span>
                Course Identification & Parameters
              </h3>
              <button
                onClick={() => setIsEditMetaOpen(false)}
                className="w-7 h-7 rounded hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-slate-300 font-semibold mb-1">Course Code</label>
                  <input
                    type="text"
                    value={metaDraft.code}
                    onChange={(e) => setMetaDraft({ ...metaDraft, code: e.target.value })}
                    placeholder="e.g. CS302"
                    className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Course Title</label>
                  <input
                    type="text"
                    value={metaDraft.title}
                    onChange={(e) => setMetaDraft({ ...metaDraft, title: e.target.value })}
                    placeholder="e.g. Advanced Algorithms & Distributed Systems"
                    className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department</label>
                  <input
                    type="text"
                    value={metaDraft.department}
                    onChange={(e) => setMetaDraft({ ...metaDraft, department: e.target.value })}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Institution</label>
                  <input
                    type="text"
                    value={metaDraft.institution}
                    onChange={(e) => setMetaDraft({ ...metaDraft, institution: e.target.value })}
                    placeholder="e.g. National Institute of Technology"
                    className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Lectures (L)</label>
                  <input
                    type="number"
                    value={metaDraft.credits.lecture}
                    onChange={(e) =>
                      setMetaDraft({
                        ...metaDraft,
                        credits: {
                          ...metaDraft.credits,
                          lecture: parseInt(e.target.value) || 0,
                          totalUnits: (parseInt(e.target.value) || 0) + metaDraft.credits.tutorial + metaDraft.credits.practical / 2
                        }
                      })
                    }
                    className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Tutorials (T)</label>
                  <input
                    type="number"
                    value={metaDraft.credits.tutorial}
                    onChange={(e) =>
                      setMetaDraft({
                        ...metaDraft,
                        credits: {
                          ...metaDraft.credits,
                          tutorial: parseInt(e.target.value) || 0,
                          totalUnits: metaDraft.credits.lecture + (parseInt(e.target.value) || 0) + metaDraft.credits.practical / 2
                        }
                      })
                    }
                    className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Practical (P)</label>
                  <input
                    type="number"
                    value={metaDraft.credits.practical}
                    onChange={(e) =>
                      setMetaDraft({
                        ...metaDraft,
                        credits: {
                          ...metaDraft.credits,
                          practical: parseInt(e.target.value) || 0,
                          totalUnits: metaDraft.credits.lecture + metaDraft.credits.tutorial + (parseInt(e.target.value) || 0) / 2
                        }
                      })
                    }
                    className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Units (Credits)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={metaDraft.credits.totalUnits}
                    onChange={(e) =>
                      setMetaDraft({
                        ...metaDraft,
                        credits: {
                          ...metaDraft.credits,
                          totalUnits: parseFloat(e.target.value) || 0
                        }
                      })
                    }
                    className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Course Narrative & Description
                </label>
                <textarea
                  rows={3}
                  value={metaDraft.summary}
                  onChange={(e) => setMetaDraft({ ...metaDraft, summary: e.target.value })}
                  placeholder="Enter high-level course description, scope, and target engineering batch..."
                  className="w-full bg-[#0d1424] border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 text-xs pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsEditMetaOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMeta}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
              >
                Save Course Details
              </button>
            </div>
          </div>
        </div>
      )}

      <AISettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={aiSettings}
        onSave={(newSettings) => {
          setAiSettings(newSettings);
          handleAddAuditLog(
            'AI Ruleset Updated',
            `Configured LLM to ${newSettings.llmProvider} with ${newSettings.bloomStrictness} rigor.`
          );
        }}
      />

      <FacultyGuidelinesModal
        isOpen={isGuidelinesOpen}
        onClose={() => setIsGuidelinesOpen(false)}
      />
    </div>
  );
};

export default App;
