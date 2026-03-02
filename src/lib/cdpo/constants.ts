import { NavItemType } from './types';

export const RISK_COLORS = {
    LOW: '#22C55E',
    MEDIUM: '#F59E0B',
    HIGH: '#F97316',
    CRITICAL: '#EF4444'
};

export const NAV_ITEMS = [
    { id: NavItemType.DASHBOARD, icon: 'LayoutGrid', label: 'Dashboard' },
    { id: NavItemType.MANDALS, icon: 'Map', label: 'Mandals' },
    { id: NavItemType.SCREENING, icon: 'Scan', label: 'Screening' },
    { id: NavItemType.FLAGS, icon: 'Flag', label: 'Flags & Escalations' },
    { id: NavItemType.REFERRAL, icon: 'Send', label: 'Referral Pipeline' },
    { id: NavItemType.PERFORMANCE, icon: 'Users', label: 'AWW Performance' },
    { id: NavItemType.CHILDREN, icon: 'User', label: 'Children' },
    { id: NavItemType.REPORTS, icon: 'FileText', label: 'Reports' },
    { id: NavItemType.SETTINGS, icon: 'Settings', label: 'Settings' },
];

export const EXECUTIVE_KPIS = [
    { label: 'TOTAL CHILDREN', value: '6,240', delta: '+120 this month', isUp: true },
    { label: 'SCREENED', value: '3,890', delta: '+340', isUp: true },
    { label: 'COVERAGE', value: '62%', delta: '+4%', isUp: true },
    { label: 'OPEN FLAGS', value: '48', delta: '-8', isUp: false, urgent: '5 urgent' },
    { label: 'PENDING REFERRALS', value: '23', delta: '+7', isUp: true, isBadUp: true },
];

export const PREVIOUS_REPORTS = [
    { id: 1, name: 'Monthly Summary — January 2026', period: 'Jan 2026', scope: 'All Mandals', generatedBy: 'Dr. S. K. Rao', date: '1 Feb 2026', size: '2.4 MB', format: 'PDF' },
    { id: 2, name: 'Quarterly Review — Q4 2025', period: 'Oct - Dec 2025', scope: 'All Mandals', generatedBy: 'Admin Team', date: '5 Jan 2026', size: '4.8 MB', format: 'PDF' },
    { id: 3, name: 'Mandal Performance Export', period: 'Dec 2025', scope: 'Kondapur Mandal', generatedBy: 'Dr. S. K. Rao', date: '28 Dec 2025', size: '840 KB', format: 'CSV' },
    { id: 4, name: 'Monthly Summary — November 2025', period: 'Nov 2025', scope: 'All Mandals', generatedBy: 'Dr. S. K. Rao', date: '1 Dec 2025', size: '2.1 MB', format: 'PDF' },
    { id: 5, name: 'High-Risk Children Drill-down', period: 'Nov 2025', scope: 'All Mandals', generatedBy: 'Dr. S. K. Rao', date: '15 Nov 2025', size: '1.2 MB', format: 'PDF' },
];

export const REFERRAL_PIPELINE_KPIS = [
    { label: 'TOTAL REFERRALS', value: '89', color: '#111111' },
    { label: 'PENDING', value: '23', color: '#F59E0B' },
    { label: 'SCHEDULED', value: '18', color: '#3B82F6' },
    { label: 'COMPLETED', value: '42', color: '#22C55E' },
    { label: 'OVERDUE', value: '6', color: '#EF4444' },
];

export const REFERRAL_FUNNEL_DATA = [
    { stage: 'Generated', count: 89, rate: '' },
    { stage: 'Sent', count: 72, rate: '81% sent' },
    { stage: 'Scheduled', count: 48, rate: '67% scheduled' },
    { stage: 'Completed', count: 42, rate: '88% completed' },
];

export const REFERRALS_BY_TYPE = [
    { type: 'Paediatrics', count: 28 },
    { type: 'Therapist-OT', count: 18 },
    { type: 'Therapist-Speech', count: 15 },
    { type: 'ENT', count: 12 },
    { type: 'Nutrition', count: 9 },
    { type: 'Psychologist', count: 5 },
    { type: 'Ophthalmology', count: 2 },
];

export const REFERRALS_BY_MANDAL = [
    { name: 'Kondapur', pending: 8, completed: 15 },
    { name: 'Miyapur', pending: 5, completed: 10 },
    { name: 'Gachibowli', pending: 4, completed: 6 },
    { name: 'Nallagandla', pending: 2, completed: 4 },
    { name: 'Lingampally', pending: 3, completed: 3 },
    { name: 'Madinaguda', pending: 1, completed: 4 },
];

export const OVERDUE_REFERRALS = [
    { child: 'Aarav Kumar', type: 'Paediatrics', urgency: 'Urgent', mandal: 'Rampur', createdDate: '28 Jan 2024', daysSince: 21, status: 'Pending' },
    { child: 'Sana Khan', type: 'ENT', urgency: 'Urgent', mandal: 'Kondapur', createdDate: '02 Feb 2024', daysSince: 16, status: 'Sent' },
    { child: 'Vihaan G.', type: 'Nutrition', urgency: 'Routine', mandal: 'Old Miyapur', createdDate: '05 Feb 2024', daysSince: 13, status: 'Sent' },
    { child: 'Ishita S.', type: 'Therapist-OT', urgency: 'Urgent', mandal: 'Gachibowli', createdDate: '07 Feb 2024', daysSince: 11, status: 'Pending' },
];

export const ALL_REFERRALS_TABLE = [
    { id: 1, child: 'Aarav Kumar', age: '3y 2m', mandal: 'Rampur', type: 'Paediatrics', urgency: 'Urgent', facility: 'Kondapur Gen. Hosp', status: 'Pending', created: '28 Jan', lastUpdate: '1h ago' },
    { id: 2, child: 'Sana Khan', age: '2y 6m', mandal: 'Kondapur', type: 'ENT', urgency: 'Urgent', facility: 'District PHC', status: 'Sent', created: '02 Feb', lastUpdate: '3h ago' },
    { id: 3, child: 'Vihaan G.', age: '4y 1m', mandal: 'Miyapur', type: 'Nutrition', urgency: 'Routine', facility: 'Kondapur Gen. Hosp', status: 'Scheduled', created: '05 Feb', lastUpdate: 'Yesterday' },
    { id: 4, child: 'Ishita S.', age: '1y 11m', mandal: 'Gachibowli', type: 'Therapist-OT', urgency: 'Urgent', facility: 'City Rehab Center', status: 'Completed', created: '07 Feb', lastUpdate: '2 days ago' },
    { id: 5, child: 'Karthik R.', age: '5y 0m', mandal: 'Kondapur', type: 'Paediatrics', urgency: 'Emergency', facility: 'Emergency Trauma', status: 'Completed', created: '10 Feb', lastUpdate: '1 day ago' },
];

export const AWW_PERFORMANCE_SCORECARD = [
    { id: 1, name: 'Lakshmi Devi', mandal: 'Kondapur', awc: 'Rampur AWC', children: 85, questionnaires: 78, coverage: 91, observations: 12, flags: 3, visits: 45, lastActive: '2h ago', status: 'online', score: 88 },
    { id: 2, name: 'Saritha B.', mandal: 'Hafeezpet', awc: 'Hafeezpet AWC 2', children: 54, questionnaires: 5, coverage: 9, observations: 2, flags: 1, visits: 8, lastActive: '7+ days', status: 'offline', score: 12 },
    { id: 3, name: 'Anjali P.', mandal: 'Rampur', awc: 'Rampur Village North', children: 62, questionnaires: 8, coverage: 12, observations: 4, flags: 0, visits: 12, lastActive: '3 days ago', status: 'away', score: 28 },
    { id: 4, name: 'Savita Bai', mandal: 'Kondapur', awc: 'Kondapur Main', children: 120, questionnaires: 110, coverage: 91, observations: 24, flags: 5, visits: 60, lastActive: '1h ago', status: 'online', score: 94 },
    { id: 5, name: 'Meena K.', mandal: 'Miyapur', awc: 'Old Miyapur', children: 48, questionnaires: 9, coverage: 18, observations: 3, flags: 2, visits: 10, lastActive: '4 days ago', status: 'offline', score: 32 },
    { id: 6, name: 'Vani S.', mandal: 'Nallagandla', awc: 'Nallagandla Ext', children: 40, questionnaires: 14, coverage: 35, observations: 6, flags: 1, visits: 15, lastActive: '5 days ago', status: 'away', score: 41 },
    { id: 7, name: 'Priya S.', mandal: 'Kondapur', awc: 'Vasant Vihar', children: 70, questionnaires: 68, coverage: 97, observations: 18, flags: 0, visits: 52, lastActive: 'Yesterday', status: 'away', score: 91 },
    { id: 8, name: 'Jaya L.', mandal: 'Kondapur', awc: 'Kondapur Basti', children: 66, questionnaires: 25, coverage: 37, observations: 10, flags: 4, visits: 28, lastActive: 'Yesterday', status: 'away', score: 48 },
    { id: 9, name: 'Sunitha T.', mandal: 'Madinaguda', awc: 'Madinaguda West', children: 55, questionnaires: 18, coverage: 32, observations: 5, flags: 2, visits: 20, lastActive: 'Today', status: 'online', score: 45 },
    { id: 10, name: 'Swapna D.', mandal: 'Rampur', awc: 'Rampur South', children: 58, questionnaires: 23, coverage: 39, observations: 7, flags: 3, visits: 22, lastActive: '2 days ago', status: 'away', score: 52 },
];

export const INACTIVE_AWWS = [
    { name: 'Saritha B.', mandal: 'Hafeezpet', awc: 'Hafeezpet AWC 2', lastActive: '14 Feb 2024', daysInactive: 12, childrenAffected: 49 },
    { name: 'Meena K.', mandal: 'Miyapur', awc: 'Old Miyapur', lastActive: '18 Feb 2024', daysInactive: 8, childrenAffected: 39 },
    { name: 'Vani S.', mandal: 'Nallagandla', awc: 'Nallagandla Ext', lastActive: '20 Feb 2024', daysInactive: 6, childrenAffected: 26 },
];

export const COMPLIANCE_DISTRIBUTION = [
    { range: '0-20%', count: 8 },
    { range: '20-40%', count: 14 },
    { range: '40-60%', count: 22 },
    { range: '60-80%', count: 48 },
    { range: '80-100%', count: 64 },
];

export const HEATMAP_DATA = Array.from({ length: 84 }, (_, i) => {
    const baseValue = Math.floor(Math.random() * 30);
    const dayOfWeek = i % 7;
    const finalValue = (dayOfWeek === 5 || dayOfWeek === 6) ? Math.floor(baseValue * 0.2) : baseValue;
    return {
        index: i,
        value: finalValue,
        date: `Day ${i + 1}`,
    };
});

export const MANDAL_COMPARISON_DATA = [
    { id: 1, name: 'Kondapur', awcs: 24, children: 1240, screened: 1091, coverage: 88, low: 820, med: 180, high: 70, crit: 21, flags: 12, referrals: '4/18', score: 8.2 },
    { id: 2, name: 'Nallagandla', awcs: 18, children: 540, screened: 496, coverage: 92, low: 410, med: 50, high: 25, crit: 11, flags: 4, referrals: '1/12', score: 9.1 },
    { id: 3, name: 'Miyapur', awcs: 22, children: 980, screened: 705, coverage: 72, low: 510, med: 120, high: 55, crit: 20, flags: 8, referrals: '3/15', score: 7.8 },
    { id: 4, name: 'Lingampally', awcs: 16, children: 720, screened: 460, coverage: 64, low: 340, med: 80, high: 30, crit: 10, flags: 3, referrals: '2/10', score: 7.2 },
    { id: 5, name: 'Madinaguda', awcs: 14, children: 700, screened: 357, coverage: 51, low: 250, med: 65, high: 32, crit: 10, flags: 6, referrals: '5/12', score: 6.8 },
    { id: 6, name: 'Gachibowli', awcs: 20, children: 850, screened: 382, coverage: 45, low: 220, med: 100, high: 45, crit: 17, flags: 9, referrals: '6/14', score: 5.9 },
    { id: 7, name: 'Rampur', awcs: 12, children: 610, screened: 170, coverage: 28, low: 110, med: 40, high: 15, crit: 5, flags: 2, referrals: '1/8', score: 4.8 },
    { id: 8, name: 'Hafeezpet', awcs: 14, children: 600, screened: 90, coverage: 15, low: 60, med: 20, high: 8, crit: 2, flags: 4, referrals: '1/9', score: 3.5 },
];

export const MANDAL_HEATMAP_DATA = [
    { name: 'Kondapur', count: 1240, coverage: 88 },
    { name: 'Miyapur', count: 980, coverage: 72 },
    { name: 'Gachibowli', count: 850, coverage: 45 },
    { name: 'Lingampally', count: 720, coverage: 64 },
    { name: 'Rampur', count: 610, coverage: 28 },
    { name: 'Nallagandla', count: 540, coverage: 92 },
    { name: 'Madinaguda', count: 700, coverage: 51 },
    { name: 'Hafeezpet', count: 600, coverage: 15 },
];

export const COVERAGE_TREND_DATA = [
    { month: 'Jul 23', coverage: 42 },
    { month: 'Aug 23', coverage: 45 },
    { month: 'Sep 23', coverage: 48 },
    { month: 'Oct 23', coverage: 50 },
    { month: 'Nov 23', coverage: 54 },
    { month: 'Dec 23', coverage: 56 },
    { month: 'Jan 24', coverage: 58 },
    { month: 'Feb 24', coverage: 59 },
    { month: 'Mar 24', coverage: 60 },
    { month: 'Apr 24', coverage: 61 },
    { month: 'May 24', coverage: 62 },
    { month: 'Jun 24', coverage: 64 },
];

export const RISK_TREND_DATA = [
    { month: 'Jan', LOW: 1800, MEDIUM: 600, HIGH: 300, CRITICAL: 100 },
    { month: 'Feb', LOW: 1950, MEDIUM: 650, HIGH: 320, CRITICAL: 110 },
    { month: 'Mar', LOW: 2100, MEDIUM: 780, HIGH: 380, CRITICAL: 125 },
    { month: 'Apr', LOW: 2200, MEDIUM: 850, HIGH: 410, CRITICAL: 135 },
    { month: 'May', LOW: 2340, MEDIUM: 934, HIGH: 467, CRITICAL: 149 },
];

export const DOMAIN_CONCERN_DATA = [
    { domain: 'GM', avg: 42, label: 'Gross Motor', color: RISK_COLORS.LOW },
    { domain: 'FM', avg: 58, label: 'Fine Motor', color: RISK_COLORS.MEDIUM },
    { domain: 'LC', avg: 84, label: 'Language & Comm.', color: RISK_COLORS.CRITICAL },
    { domain: 'COG', avg: 65, label: 'Cognitive', color: RISK_COLORS.HIGH },
    { domain: 'SE', avg: 31, label: 'Social & Emotional', color: RISK_COLORS.LOW },
];

export const HIGH_RISK_CHILDREN = [
    { id: 'CH-102', name: 'Aarav Kumar', age: '3y 2m', awc: 'Rampur North', mandal: 'Rampur', risk: 'CRITICAL', score: 92, conditions: 'SAM, Motor delay', referral: 'Referred' },
    { id: 'CH-105', name: 'Sana Khan', age: '2y 6m', awc: 'Kondapur Basti', mandal: 'Kondapur', risk: 'CRITICAL', score: 88, conditions: 'ASD indicators', referral: 'Pending' },
    { id: 'CH-109', name: 'Vihaan G.', age: '4y 1m', awc: 'Old Miyapur', mandal: 'Miyapur', risk: 'HIGH', score: 78, conditions: 'Severe Stunting', referral: 'Referred' },
    { id: 'CH-112', name: 'Ishita S.', age: '1y 11m', awc: 'Gachibowli Slum', mandal: 'Gachibowli', risk: 'HIGH', score: 75, conditions: 'Global Delay', referral: 'Not yet' },
    { id: 'CH-115', name: 'Karthik R.', age: '5y 0m', awc: 'Tellapur Road', mandal: 'Kondapur', risk: 'HIGH', score: 72, conditions: 'Language delay', referral: 'Referred' },
];

export const ESCALATED_FLAGS = [
    {
        id: 'FL-001',
        priority: 'CRITICAL',
        title: 'Severe Motor Delay (T1 Protocol)',
        escalationTime: '3 days ago',
        child: { name: 'Priya Sharma', age: '8 months', gender: 'Female', photo: 'PS' },
        awc: 'Rampur',
        mandal: 'Kondapur',
        history: 'Raised by AWW Lakshmi (7 Feb) → Mandal acknowledged (8 Feb) → Unresolved → Auto-escalated (14 Feb)',
        mandalNotes: 'Screening scheduled but child was absent twice. Mother reported child is unwell but AWW reports child is at home and active.'
    },
    {
        id: 'FL-002',
        priority: 'HIGH',
        title: 'Failure to thrive - Persistent low weight',
        escalationTime: '1 day ago',
        child: { name: 'Aman V.', age: '14 months', gender: 'Male', photo: 'AV' },
        awc: 'Bollaram',
        mandal: 'Kondapur',
        history: 'Raised by AWW Meena (10 Feb) → Mandal flagged (12 Feb) → No home visit recorded → Escalated (16 Feb)',
        mandalNotes: 'Lack of staff in Bollaram sector this week. Awaiting additional support.'
    },
    {
        id: 'FL-003',
        priority: 'HIGH',
        title: 'ASD indicators flagged during home visit',
        escalationTime: '4 days ago',
        child: { name: 'Sunita R.', age: '3 years', gender: 'Female', photo: 'SR' },
        awc: 'Vasant Vihar',
        mandal: 'Kondapur',
        history: 'Raised by AWW Priya (5 Feb) → Mandal review pending (7 Feb) → Escalated for delay (13 Feb)',
        mandalNotes: 'Screener Dr. Anand was on leave. Re-assigned to secondary screener.'
    }
];

export const OPEN_FLAGS_TABLE = [
    { id: 1, priority: 'CRITICAL', child: 'Aarav Kumar', awc: 'Rampur North', mandal: 'Rampur', category: 'Health', status: 'In Review', daysOpen: 12, assignedTo: 'Mandal Screener' },
    { id: 2, priority: 'HIGH', child: 'Sana Khan', awc: 'Kondapur Basti', mandal: 'Kondapur', category: 'Developmental', status: 'Pending visit', daysOpen: 8, assignedTo: 'AWW Savita' },
    { id: 3, priority: 'MEDIUM', child: 'Vihaan G.', awc: 'Old Miyapur', mandal: 'Miyapur', category: 'Nutrition', status: 'Acknowledged', daysOpen: 4, assignedTo: 'Mandal Team' },
    { id: 4, priority: 'LOW', child: 'Ishita S.', awc: 'Gachibowli Slum', mandal: 'Gachibowli', category: 'Behavioral', status: 'Monitoring', daysOpen: 2, assignedTo: 'AWW Radha' },
    { id: 5, priority: 'CRITICAL', child: 'Karthik R.', awc: 'Tellapur Road', mandal: 'Kondapur', category: 'Motor', status: 'Escalated', daysOpen: 15, assignedTo: 'CDPO Rao' },
];

export const RESOLVED_FLAGS_TABLE = [
    { id: 1, priority: 'HIGH', child: 'Rohan J.', awc: 'Nallagandla', mandal: 'Nallagandla', category: 'Immunization', status: 'Resolved', daysToResolve: 5, resolution: 'Shot administered at PHC.', resolvedBy: 'AWW Saritha', date: '12 Feb' },
    { id: 2, priority: 'MEDIUM', child: 'Kavya B.', awc: 'Hafeezpet', mandal: 'Hafeezpet', category: 'Absenteeism', status: 'Resolved', daysToResolve: 3, resolution: 'Home visit completed. Child was visiting grandparents.', resolvedBy: 'AWW Jaya', date: '10 Feb' },
];

export const FLAG_METRICS = {
    avgResolutionTime: '5.3 days',
    escalationRate: '10%',
    resolutionRate: '79%',
    trend: [30, 45, 35, 50, 40, 60, 48]
};

export const UNSCREENED_BREAKDOWN = [
    { reason: 'No AWW visit yet', count: 1240 },
    { reason: 'AWW visited, no questionnaire', count: 450 },
    { reason: 'Questionnaire done, no screen', count: 320 },
    { reason: 'Absent / Migrated', count: 240 },
    { reason: 'Refused', count: 100 },
];

export const BOTTOM_10_AWCS = [
    { awc: 'Hafeezpet AWC 2', mandal: 'Hafeezpet', aww: 'Saritha B.', children: 54, screened: 5, coverage: 9, lastActivity: '2 days ago' },
    { awc: 'Rampur Village North', mandal: 'Rampur', aww: 'Anjali P.', children: 62, screened: 8, coverage: 12, lastActivity: 'Yesterday' },
    { awc: 'Old Miyapur', mandal: 'Miyapur', aww: 'Meena K.', children: 48, screened: 9, coverage: 18, lastActivity: '4 days ago' },
    { awc: 'Gachibowli Slum 1', mandal: 'Gachibowli', aww: 'Radha R.', children: 85, screened: 20, coverage: 23, lastActivity: 'Today' },
    { awc: 'Hafeezpet Colony', mandal: 'Hafeezpet', aww: 'Latha M.', children: 42, screened: 11, coverage: 26, lastActivity: '3 days ago' },
    { awc: 'Lingampally Rly', mandal: 'Lingampally', aww: 'Deepa G.', children: 70, screened: 22, coverage: 31, lastActivity: 'Yesterday' },
    { awc: 'Madinaguda West', mandal: 'Madinaguda', aww: 'Sunitha T.', children: 55, screened: 18, coverage: 32, lastActivity: 'Today' },
    { awc: 'Nallagandla Ext', mandal: 'Nallagandla', aww: 'Vani S.', children: 40, screened: 14, coverage: 35, lastActivity: '5 days ago' },
    { awc: 'Kondapur Basti', mandal: 'Kondapur', aww: 'Jaya L.', children: 66, screened: 25, coverage: 37, lastActivity: 'Yesterday' },
    { awc: 'Rampur South', mandal: 'Rampur', aww: 'Swapna D.', children: 58, screened: 23, coverage: 39, lastActivity: '2 days ago' },
];

export const AGE_GROUP_DISTRIBUTION = [
    { group: '0-6m', screened: 120, unscreened: 340 },
    { group: '6-12m', screened: 450, unscreened: 220 },
    { group: '12-18m', screened: 580, unscreened: 180 },
    { group: '18-24m', screened: 620, unscreened: 150 },
    { group: '2-3y', screened: 780, unscreened: 420 },
    { group: '3-4y', screened: 650, unscreened: 380 },
    { group: '4-5y', screened: 420, unscreened: 290 },
    { group: '5-6y', screened: 270, unscreened: 370 },
];

export const RECENT_ACTIVITY = [
    { type: 'flag', description: 'Flag escalated: Priya Sharma', mandal: 'Kondapur Mandal', time: '2h ago' },
    { type: 'screening', description: 'Screening complete: Aarav Roy', mandal: 'Miyapur Mandal', time: '3h ago' },
    { type: 'referral', description: 'Referral sent: Ishaan Reddy', mandal: 'Gachibowli Mandal', time: '5h ago' },
    { type: 'flag', description: 'Flag raised: Samira K.', mandal: 'Rampur Mandal', time: 'Yesterday' },
    { type: 'performance', description: 'AWC monthly report submitted', mandal: 'Madinaguda Mandal', time: 'Yesterday' },
];

export const AWC_BREAKDOWN_DATA = [
    { name: 'Rampur AWC', aww: 'Lakshmi Devi', children: 85, screened: 78, coverage: 91, flags: 1, last: '1h ago' },
    { name: 'Kondapur Main', aww: 'Savita Bai', children: 120, screened: 110, coverage: 91, flags: 3, last: '3h ago' },
    { name: 'Gowlidoddy', aww: 'Anjali R.', children: 95, screened: 42, coverage: 44, flags: 2, last: '5h ago' },
    { name: 'Vasant Vihar', aww: 'Priya S.', children: 70, screened: 68, coverage: 97, flags: 0, last: 'Yesterday' },
    { name: 'Bollaram', aww: 'Meena K.', children: 110, screened: 95, coverage: 86, flags: 4, last: 'Yesterday' },
    { name: 'Tellapur Road', aww: 'Rupa J.', children: 105, screened: 100, coverage: 95, flags: 2, last: '2 days ago' },
];

export const MANDAL_REFERRAL_FUNNEL = [
    { stage: 'Generated', count: 18 },
    { stage: 'Sent', count: 14 },
    { stage: 'Scheduled', count: 10 },
    { stage: 'Completed', count: 4 },
];

export const MANDAL_REFERRAL_TYPES = [
    { type: 'Paediatrics', count: 4 },
    { type: 'Therapist', count: 2 },
    { type: 'ENT', count: 1 },
    { type: 'Nutrition', count: 1 },
];

export const AWC_CHILDREN_LIST = [
    { id: 'CH-001', name: 'Aarav Kumar', age: '3y 2m', gender: 'Male', lastScreening: '2024-05-18', risk: 'CRITICAL', flags: 1, lastActivity: 'Referral generated' },
    { id: 'CH-002', name: 'Priya Sharma', age: '8 months', gender: 'Female', lastScreening: '2024-05-17', risk: 'HIGH', flags: 2, lastActivity: 'Flag raised' },
    { id: 'CH-003', name: 'Ishaan Reddy', age: '2y 8m', gender: 'Male', lastScreening: '2024-05-15', risk: 'LOW', flags: 0, lastActivity: 'Screening done' },
    { id: 'CH-004', name: 'Ananya Rao', age: '1y 11m', gender: 'Female', lastScreening: '2024-05-10', risk: 'MEDIUM', flags: 0, lastActivity: 'Observation recorded' },
    { id: 'CH-005', name: 'Karthik S.', age: '5y 0m', gender: 'Male', lastScreening: '2024-05-01', risk: 'LOW', flags: 0, lastActivity: 'Height update' },
    { id: 'CH-006', name: 'Sana Khan', age: '3y 6m', gender: 'Female', lastScreening: 'None', risk: 'None', flags: 0, lastActivity: 'Registration' },
    { id: 'CH-007', name: 'Vihaan G.', age: '2y 1m', gender: 'Male', lastScreening: '2024-05-12', risk: 'HIGH', flags: 1, lastActivity: 'Escalated' },
];

export const AWC_ACTIVITY_METRICS = {
    registrations: 5,
    questionnaires: 12,
    observations: 8,
    flags: 3,
    visits: 18,
};

export const AWC_RECENT_OBSERVATIONS = [
    { date: '2024-05-18', child: 'Aarav Kumar', category: 'Nutrition', text: 'Significant weight drop observed since last month. Appetite reduced.' },
    { date: '2024-05-17', child: 'Priya Sharma', category: 'Behavior', text: 'Difficulty interacting with peers during play sessions. Withdrawn.' },
    { date: '2024-05-16', child: 'Ishaan Reddy', category: 'Health', text: 'Completed all required immunization shots for the current age group.' },
];

export const AWC_FLAGS_LIST = [
    { priority: 'CRITICAL', child: 'Aarav Kumar', title: 'Severe Acute Malnutrition', status: 'Escalated' },
    { priority: 'HIGH', child: 'Priya Sharma', title: 'Developmental Delay suspected', status: 'Acknowledged' },
    { priority: 'MEDIUM', child: 'Vihaan G.', title: 'Frequent absenteeism', status: 'Raised' },
];

export const CHILD_RECORD_DATA = {
    basicInfo: {
        id: 'CH-002',
        name: 'Priya Sharma',
        age: '8 months',
        gender: 'Female',
        dob: '16/06/2023',
        awc: 'Rampur Centre',
        aww: 'Lakshmi Devi',
        mandal: 'Kondapur',
        riskScore: 74,
        riskLevel: 'HIGH',
        mother: 'Meena Sharma',
        father: 'Suresh Sharma',
        phone: '+91 98765 43210',
        address: 'H.No 4-12, Rampur Village',
        panchayat: 'Kondapur Panchayat',
        regDate: '2023-10-05',
        regMode: 'Direct Registration'
    },
    prenatalHistory: {
        gestationalAge: '36 weeks',
        birthWeight: '2.4 kg',
        delivery: 'C-Section',
        nicu: 'Yes (3 days)',
        complications: 'Mild respiratory distress',
        maternalConditions: 'Gestational Diabetes',
        familyHistory: 'No specific history recorded'
    },
    riskDomains: [
        { name: 'GM', score: 65, color: RISK_COLORS.HIGH, label: 'Gross Motor' },
        { name: 'FM', score: 82, color: RISK_COLORS.MEDIUM, label: 'Fine Motor' },
        { name: 'LC', score: 45, color: RISK_COLORS.CRITICAL, label: 'Language & Comm.' },
        { name: 'COG', score: 78, color: RISK_COLORS.HIGH, label: 'Cognitive' },
        { name: 'SE', score: 90, color: RISK_COLORS.LOW, label: 'Social & Emotional' },
    ],
    screeningHistory: [
        { date: '2024-05-17', type: 'Baseline', screener: 'Dr. Anand', risk: 'HIGH', score: 74 },
        { date: '2024-02-10', type: 'Early Check', screener: 'AWW Lakshmi', risk: 'MEDIUM', score: 82 }
    ],
    questionnaire: {
        domains: [
            {
                name: 'Gross Motor',
                questions: [
                    { text: 'Does your child roll from tummy to back?', response: 'Yes' },
                    { text: 'Does your child sit without support?', response: 'Sometimes' },
                    { text: 'Does your child pull to stand?', response: 'No' },
                ],
                summary: '3/6 Yes'
            },
            {
                name: 'Language & Comm.',
                questions: [
                    { text: 'Does your child babble or make sounds?', response: 'Yes' },
                    { text: 'Does your child look when you call their name?', response: 'No' },
                    { text: 'Does your child point to things?', response: 'No' },
                ],
                summary: '1/6 Yes'
            }
        ]
    },
    observations: [
        { date: '2024-05-17', aww: 'Lakshmi Devi', category: 'Behavior', text: 'Difficulty interacting with peers during play sessions. Withdrawn.', hasVoice: true, hasPhoto: true },
        { date: '2024-04-12', aww: 'Lakshmi Devi', category: 'Health', text: 'Frequent colds and respiratory issues reported by mother.', hasVoice: false, hasPhoto: false }
    ],
    flags: [
        { priority: 'HIGH', title: 'Developmental Delay suspected', status: 'Acknowledged', date: '2024-05-17' }
    ],
    referrals: [
        { type: 'Paediatrics', urgency: 'High', status: 'Generated', facility: 'Kondapur General Hospital', date: '2024-05-18' }
    ]
};
