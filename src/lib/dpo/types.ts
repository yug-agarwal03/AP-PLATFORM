export type Status = 'available' | 'limited' | 'at-capacity' | 'no-data';

export interface KPI {
    label: string;
    value: string | number;
    trend: number[];
    change: string;
    isPositive: boolean;
}

export interface ResourceData {
    category: string;
    allocated: number;
    utilized: number;
}

export interface Facility {
    id: string;
    name: string;
    region: string;
    status: Status;
    utilization: number;
}

export interface RegionRisk {
    id: string;
    name: string;
    riskLevel: 'low' | 'medium' | 'high';
    coverage: number;
}

export interface CDPOPerformance {
    id: number;
    name: string;
    officer: string;
    mandals: number;
    awcs: number;
    children: number;
    screened: number;
    coverage: number;
    lowRisk: number;
    medRisk: number;
    highRisk: number;
    critRisk: number;
    escalations: number;
    referralsPending: number;
    referralsDone: number;
    avgResolution: number;
    performanceScore: number;
}

export interface Escalation {
    id: string;
    priority: 'low' | 'amber' | 'high' | 'critical';
    title: string;
    daysOpen: number;
    childName: string;
    childAge: string;
    childGender: 'M' | 'F';
    location: {
        awc: string;
        mandal: string;
        cdpo: string;
    };
    path: string[];
    history: {
        event: string;
        date: string;
    }[];
    notes?: string;
    assignedTo?: string;
    progressNotes?: string;
    resolutionOutcome?: 'Resolved' | 'Referred' | 'Transferred' | 'Other';
    resolvedBy?: string;
    resolvedDate?: string;
}

export enum DpoTab {
    DASHBOARD = 'Dashboard',
    CDPOS = 'CDPOs',
    SCREENING = 'Screening',
    RISK_ANALYSIS = 'Risk Analysis',
    ESCALATIONS = 'Escalations',
    REFERRAL_PIPELINE = 'Referral Pipeline',
    FACILITY_HEALTH = 'Facility Health',
    RESOURCES = 'Resources',
    WORKFORCE = 'Workforce',
    CHILDREN = 'Children',
    REPORTS = 'Reports',
    SETTINGS = 'Settings'
}
