export type RiskLevel = 'low' | 'medium' | 'high' | 'critical' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface KPIData {
    label: string;
    value: string | number;
    delta: number;
    isUp: boolean;
}

export interface Referral {
    id: string;
    childName: string;
    age: string;
    mandal: string;
    awc: string;
    risk: RiskLevel;
    status: 'Pending' | 'Review' | 'Escalated' | 'Completed';
    lastScreening: string;
}

export interface AnalyticsData {
    name: string;
    value: number;
    risk?: RiskLevel;
}

export enum NavItemType {
    DASHBOARD = 'Dashboard',
    MANDALS = 'Mandals',
    SCREENING = 'Screening',
    FLAGS = 'Flags & Escalations',
    REFERRAL = 'Referral Pipeline',
    PERFORMANCE = 'AWW Performance',
    CHILDREN = 'Children',
    REPORTS = 'Reports',
    SETTINGS = 'Settings'
}
