import {
  CourseMetadata,
  CourseOutcome,
  SyllabusModule,
  DefectItem,
  WorkflowStage,
  AuditLogEntry,
  AISettings
} from '../types';

export const PO_DEFINITIONS: Record<string, { title: string; short: string }> = {
  PO1: { title: 'Engineering Knowledge', short: 'Apply mathematics, science & engineering fundamentals' },
  PO2: { title: 'Problem Analysis', short: 'Identify, formulate & analyze complex engineering problems' },
  PO3: { title: 'Design/Development of Solutions', short: 'Design solutions for complex systems meeting safety/needs' },
  PO4: { title: 'Conduct Investigations', short: 'Research-based knowledge & methods to synthesize data' },
  PO5: { title: 'Modern Tool Usage', short: 'Create, select & apply modern engineering & IT tools' },
  PO6: { title: 'The Engineer and Society', short: 'Contextual knowledge to assess societal, legal & cultural issues' },
  PO7: { title: 'Environment and Sustainability', short: 'Understand impact in societal & environmental contexts' },
  PO8: { title: 'Ethics', short: 'Commit to professional ethics & responsibilities' },
  PO9: { title: 'Individual and Team Work', short: 'Function effectively as individual & in diverse teams' },
  PO10: { title: 'Communication', short: 'Communicate effectively on complex engineering activities' },
  PO11: { title: 'Project Management and Finance', short: 'Apply engineering & management principles to projects' },
  PO12: { title: 'Life-long Learning', short: 'Recognize need and ability to engage in independent learning' },
  PSO1: { title: 'Program Specific Outcome 1', short: 'Domain-specific design, synthesis and architecture' },
  PSO2: { title: 'Program Specific Outcome 2', short: 'Modern toolchains, infrastructure and operational practice' },
  PSO3: { title: 'Program Specific Outcome 3', short: 'Advanced systems analysis, scalability and optimization' },
};

export const DEFAULT_COURSE_METADATA: CourseMetadata = {
  code: '',
  title: '',
  department: '',
  institution: '',
  academicYear: '2024–2025',
  regulation: 'Autonomous OBE Tier-1 (R2024)',
  credits: {
    lecture: 3,
    tutorial: 0,
    practical: 0,
    totalUnits: 3.0
  },
  summary: ''
};

// Clean state without hardcoded demo data
export const INITIAL_COS: CourseOutcome[] = [];

export const INITIAL_MODULES: SyllabusModule[] = [];

export const INITIAL_DEFECTS: DefectItem[] = [];

export const INITIAL_AUDIT_LOG: AuditLogEntry[] = [];

export const INITIAL_STAGES: WorkflowStage[] = [
  {
    id: 1,
    name: '1. Draft',
    owner: 'Course Author',
    roleTitle: 'Course Author / Subject Expert',
    timestamp: 'Active Draft',
    status: 'active',
    comments: 'Authoring course specification and outcome statements.'
  },
  {
    id: 2,
    name: '2. Submitted',
    owner: 'Course Coordinator',
    roleTitle: 'Course Coordinator',
    timestamp: 'Queued',
    status: 'queued',
    comments: 'Pending credit and curriculum verification.'
  },
  {
    id: 3,
    name: '3. Under Review',
    owner: 'PAC Committee Chair',
    roleTitle: 'PAC / Syllabus Sub-Committee',
    timestamp: 'Queued',
    status: 'queued',
    comments: 'Pending accreditation scrutiny.'
  },
  {
    id: 4,
    name: '4. Pending HOD',
    owner: 'Head of Department',
    roleTitle: 'HOD Approval',
    timestamp: 'Queued',
    status: 'queued',
    comments: 'Pending departmental Board of Studies docket.'
  },
  {
    id: 5,
    name: '5. Approved',
    owner: 'BOS Ratification Council',
    roleTitle: 'Dean Academics & Academic Council',
    timestamp: 'Terminal Stage',
    status: 'queued',
    comments: 'Final institutional seal and catalog archival.'
  }
];

export const DEFAULT_AI_SETTINGS: AISettings = {
  llmProvider: 'gemini-2.5-flash',
  temperature: 0.2,
  bloomStrictness: 'Strict K3-K6',
  accreditationRuleset: 'Washington Accord 2024 Tier-1',
  tier1Threshold: 2.0,
  autoRemediateOnSync: true,
  detectTaxonomyDrift: true,
  enforceContactHourParity: true
};
