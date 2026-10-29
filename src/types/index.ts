export type UserRole = 'author' | 'reviewer' | 'hod';

export type WorkflowStep =
  | 'dashboard'
  | 'upload'
  | 'specification'
  | 'matrix'
  | 'checks'
  | 'governance'
  | 'export';

export type BloomLevel = 'K1' | 'K2' | 'K3' | 'K4' | 'K5' | 'K6';

export interface BloomInfo {
  level: BloomLevel;
  name: string;
  verbs: string[];
  color: string;
}

export interface CourseMetadata {
  code: string;
  title: string;
  department: string;
  institution: string;
  academicYear: string;
  regulation: string;
  credits: {
    lecture: number;
    tutorial: number;
    practical: number;
    totalUnits: number;
  };
  summary: string;
}

export interface CourseOutcome {
  id: string;
  code: string;
  statement: string;
  originalStatement?: string;
  bloomLevel: BloomLevel;
  bloomName: string;
  hours: number;
  weightagePercent: number;
  poMappings: Record<string, number>; // PO1..PO12, PSO1..PSO3 -> 0, 1, 2, 3
  justifications: Record<string, string>;
}

export interface SyllabusModule {
  id: string;
  unitNumber: number;
  title: string;
  hours: number;
  topics: string[];
  mappedCOs: string[];
  pedagogy: string;
}

export interface DefectItem {
  id: string;
  code: string;
  severity: 'high' | 'medium' | 'low';
  section: string;
  sectionCode: 'sec2' | 'sec3' | 'sec5';
  title: string;
  description: string;
  ruleViolated: string;
  suggestedAction: string;
  status: 'unresolved' | 'remediated' | 'overridden';
}

export interface WorkflowStage {
  id: number;
  name: string;
  owner: string;
  roleTitle: string;
  timestamp: string;
  status: 'completed' | 'active' | 'queued';
  comments?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  author: string;
  role: string;
  action: string;
  details: string;
}

export interface AISettings {
  llmProvider: 'gemini-2.5-flash' | 'gemini-1.5-pro' | 'internal-academic-v4';
  temperature: number;
  bloomStrictness: 'Strict K3-K6' | 'Standard K2-K6' | 'Flexible';
  accreditationRuleset: 'Washington Accord 2024 Tier-1' | 'NBA 2021 Manual' | 'AICTE Model Curriculum';
  tier1Threshold: number;
  autoRemediateOnSync: boolean;
  detectTaxonomyDrift: boolean;
  enforceContactHourParity: boolean;
}
