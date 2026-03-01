'use client'

import React, { useState } from 'react';

// Icons as SVG components to maintain zero-dependency design
const Icons = {
    Check: ({ size = 16, strokeWidth = 2, className = "" }) => (
        <svg width={size} height={size} className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M5 13l4 4L19 7" />
        </svg>
    ),
    Circle: ({ size = 8, fill = "currentColor", className = "" }) => (
        <svg width={size} height={size} className={className} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill={fill} />
        </svg>
    ),
    Save: ({ size = 16 }) => (
        <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
    ),
    RotateCcw: ({ size = 16 }) => (
        <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    ),
    ChevronDown: ({ size = 14 }) => (
        <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    ),
    ChevronRight: ({ size = 14 }) => (
        <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    ),
    ShieldCheck: ({ size = 24 }) => (
        <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    AlertCircle: ({ size = 18, className = "" }) => (
        <svg width={size} height={size} className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Info: ({ size = 16 }) => (
        <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
};

type PermissionLevel = 'ALLOWED' | 'DENIED' | 'READ_ONLY';

interface PermissionRow {
    id: string;
    label: string;
    roles: Record<string, PermissionLevel>;
}

interface PermissionGroup {
    id: string;
    label: string;
    features: PermissionRow[];
}

const ROLES = [
    { id: 'AWW', label: 'AWW' },
    { id: 'SCREENER', label: 'Screener' },
    { id: 'CDPO', label: 'CDPO' },
    { id: 'DPO', label: 'DPO' },
    { id: 'COMMISSIONER', label: 'Commissioner' },
    { id: 'ADMIN', label: 'Admin' }
];

const INITIAL_PERMISSIONS: PermissionGroup[] = [
    {
        id: 'children',
        label: 'CHILDREN',
        features: [
            { id: 'reg_child', label: 'Register children', roles: { AWW: 'ALLOWED', SCREENER: 'DENIED', CDPO: 'DENIED', DPO: 'DENIED', COMMISSIONER: 'DENIED', ADMIN: 'ALLOWED' } },
            { id: 'view_own', label: 'View own AWC children', roles: { AWW: 'ALLOWED', SCREENER: 'DENIED', CDPO: 'DENIED', DPO: 'DENIED', COMMISSIONER: 'DENIED', ADMIN: 'ALLOWED' } },
            { id: 'view_mandal', label: 'View mandal children', roles: { AWW: 'DENIED', SCREENER: 'ALLOWED', CDPO: 'DENIED', DPO: 'DENIED', COMMISSIONER: 'DENIED', ADMIN: 'ALLOWED' } },
            { id: 'view_cdpo', label: 'View CDPO children', roles: { AWW: 'DENIED', SCREENER: 'DENIED', CDPO: 'ALLOWED', DPO: 'DENIED', COMMISSIONER: 'DENIED', ADMIN: 'ALLOWED' } },
            { id: 'view_district', label: 'View district children', roles: { AWW: 'DENIED', SCREENER: 'DENIED', CDPO: 'DENIED', DPO: 'ALLOWED', COMMISSIONER: 'DENIED', ADMIN: 'ALLOWED' } },
            { id: 'view_state', label: 'View state children', roles: { AWW: 'DENIED', SCREENER: 'DENIED', CDPO: 'DENIED', DPO: 'DENIED', COMMISSIONER: 'ALLOWED', ADMIN: 'ALLOWED' } },
        ]
    },
    {
        id: 'screening',
        label: 'SCREENING',
        features: [
            { id: 'conduct_q', label: 'Conduct questionnaire', roles: { AWW: 'ALLOWED', SCREENER: 'DENIED', CDPO: 'DENIED', DPO: 'DENIED', COMMISSIONER: 'DENIED', ADMIN: 'DENIED' } },
            { id: 'conduct_ai', label: 'Conduct AI protocols', roles: { AWW: 'DENIED', SCREENER: 'ALLOWED', CDPO: 'DENIED', DPO: 'DENIED', COMMISSIONER: 'DENIED', ADMIN: 'DENIED' } },
            { id: 'view_results', label: 'View screening results', roles: { AWW: 'DENIED', SCREENER: 'ALLOWED', CDPO: 'ALLOWED', DPO: 'ALLOWED', COMMISSIONER: 'ALLOWED', ADMIN: 'ALLOWED' } },
            { id: 'view_risk', label: 'View risk scores', roles: { AWW: 'DENIED', SCREENER: 'ALLOWED', CDPO: 'ALLOWED', DPO: 'ALLOWED', COMMISSIONER: 'ALLOWED', ADMIN: 'ALLOWED' } },
        ]
    },
    {
        id: 'flags',
        label: 'FLAGS & ESCALATIONS',
        features: [
            { id: 'raise_flags', label: 'Raise flags', roles: { AWW: 'ALLOWED', SCREENER: 'DENIED', CDPO: 'DENIED', DPO: 'DENIED', COMMISSIONER: 'DENIED', ADMIN: 'DENIED' } },
            { id: 'manage_flags', label: 'Manage flags', roles: { AWW: 'DENIED', SCREENER: 'ALLOWED', CDPO: 'DENIED', DPO: 'DENIED', COMMISSIONER: 'DENIED', ADMIN: 'DENIED' } },
            { id: 'view_escal', label: 'View escalations', roles: { AWW: 'DENIED', SCREENER: 'DENIED', CDPO: 'ALLOWED', DPO: 'ALLOWED', COMMISSIONER: 'ALLOWED', ADMIN: 'ALLOWED' } },
            { id: 'escal_further', label: 'Escalate further', roles: { AWW: 'DENIED', SCREENER: 'ALLOWED', CDPO: 'ALLOWED', DPO: 'ALLOWED', COMMISSIONER: 'ALLOWED', ADMIN: 'DENIED' } },
        ]
    },
    {
        id: 'referrals',
        label: 'REFERRALS & INTERVENTIONS',
        features: [
            { id: 'create_ref', label: 'Create referrals', roles: { AWW: 'DENIED', SCREENER: 'ALLOWED', CDPO: 'DENIED', DPO: 'DENIED', COMMISSIONER: 'DENIED', ADMIN: 'DENIED' } },
            { id: 'view_pipe', label: 'View referral pipeline', roles: { AWW: 'DENIED', SCREENER: 'ALLOWED', CDPO: 'ALLOWED', DPO: 'ALLOWED', COMMISSIONER: 'ALLOWED', ADMIN: 'ALLOWED' } },
        ]
    },
    {
        id: 'admin',
        label: 'ADMIN',
        features: [
            { id: 'manage_users', label: 'Manage users', roles: { AWW: 'DENIED', SCREENER: 'DENIED', CDPO: 'DENIED', DPO: 'DENIED', COMMISSIONER: 'DENIED', ADMIN: 'ALLOWED' } },
            { id: 'manage_hier', label: 'Manage hierarchy', roles: { AWW: 'DENIED', SCREENER: 'DENIED', CDPO: 'DENIED', DPO: 'DENIED', COMMISSIONER: 'DENIED', ADMIN: 'ALLOWED' } },
            { id: 'view_audit', label: 'View audit log', roles: { AWW: 'DENIED', SCREENER: 'DENIED', CDPO: 'DENIED', DPO: 'DENIED', COMMISSIONER: 'DENIED', ADMIN: 'ALLOWED' } },
        ]
    }
];

const PermissionCell = ({ level }: { level: PermissionLevel }) => {
    switch (level) {
        case 'ALLOWED':
            return (
                <div className="w-9 h-9 bg-green-50 text-green-600 rounded-lg flex items-center justify-center transition-all hover:bg-green-100">
                    <Icons.Check size={18} strokeWidth={3} />
                </div>
            );
        case 'READ_ONLY':
            return (
                <div className="w-9 h-9 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center transition-all hover:bg-amber-100">
                    <Icons.Circle size={10} fill="currentColor" />
                </div>
            );
        case 'DENIED':
            return (
                <div className="w-9 h-9 bg-gray-50 text-gray-300 rounded-lg flex items-center justify-center transition-all hover:bg-gray-100">
                    <div className="w-4 h-[2px] bg-gray-200 rounded-full" />
                </div>
            );
        default:
            return null;
    }
};

const RolePermissions: React.FC = () => {
    const [groups, setGroups] = useState<PermissionGroup[]>(INITIAL_PERMISSIONS);
    const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
    const [isDirty, setIsDirty] = useState(false);

    const toggleGroup = (groupId: string) => {
        const next = new Set(collapsedGroups);
        if (next.has(groupId)) next.delete(groupId);
        else next.add(groupId);
        setCollapsedGroups(next);
    };

    const togglePermission = (groupId: string, featureId: string, roleId: string) => {
        setGroups(prevGroups => prevGroups.map(group => {
            if (group.id !== groupId) return group;
            return {
                ...group,
                features: group.features.map(feature => {
                    if (feature.id !== featureId) return feature;
                    const current = feature.roles[roleId];
                    let next: PermissionLevel;
                    if (current === 'ALLOWED') next = 'READ_ONLY';
                    else if (current === 'READ_ONLY') next = 'DENIED';
                    else next = 'ALLOWED';

                    setIsDirty(true);
                    return {
                        ...feature,
                        roles: { ...feature.roles, [roleId]: next }
                    };
                })
            };
        }));
    };

    const handleSave = () => {
        setIsDirty(false);
        // Logic to save would go here
        alert('Permissions updated successfully.');
    };

    const handleReset = (e: React.MouseEvent) => {
        e.preventDefault();
        if (confirm('Reset all permissions to system defaults?')) {
            setGroups(INITIAL_PERMISSIONS);
            setIsDirty(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-[24px] font-semibold text-black leading-tight">Role Permissions</h1>
                    <p className="text-[13px] text-gray-500">Define what each role can access and do within the platform</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleReset}
                        className="text-[13px] font-bold text-gray-400 hover:text-black flex items-center space-x-2 transition-colors"
                    >
                        <Icons.RotateCcw size={16} />
                        <span>Reset to defaults</span>
                    </button>
                    <button
                        disabled={!isDirty}
                        onClick={handleSave}
                        className={`flex items-center space-x-2 px-8 py-2.5 rounded-lg text-[13px] font-bold transition-all shadow-lg ${isDirty
                                ? 'bg-black text-white shadow-black/10 hover:bg-gray-800'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <Icons.Save size={16} />
                        <span>Save Changes</span>
                    </button>
                </div>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black text-white text-[11px] font-bold uppercase tracking-widest">
                            <th className="px-8 py-5 w-1/3 min-w-[280px]">Feature / Permission</th>
                            {ROLES.map(role => (
                                <th key={role.id} className="px-4 py-5 text-center">{role.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map((group) => (
                            <React.Fragment key={group.id}>
                                {/* Group Header */}
                                <tr
                                    className="bg-gray-50 border-b border-gray-100 cursor-pointer group"
                                    onClick={() => toggleGroup(group.id)}
                                >
                                    <td colSpan={ROLES.length + 1} className="px-8 py-3">
                                        <div className="flex items-center space-x-2">
                                            <div className="text-gray-400 transition-transform duration-200">
                                                {collapsedGroups.has(group.id) ? <Icons.ChevronRight size={14} /> : <Icons.ChevronDown size={14} />}
                                            </div>
                                            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{group.label}</span>
                                        </div>
                                    </td>
                                </tr>

                                {/* Group Features */}
                                {!collapsedGroups.has(group.id) && group.features.map((feature) => (
                                    <tr key={feature.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-12 py-4">
                                            <span className="text-[14px] font-medium text-gray-800">{feature.label}</span>
                                        </td>
                                        {ROLES.map(role => (
                                            <td
                                                key={role.id}
                                                className="px-4 py-4"
                                                onClick={() => togglePermission(group.id, feature.id, role.id)}
                                            >
                                                <div className="flex justify-center cursor-pointer">
                                                    <PermissionCell level={feature.roles[role.id]} />
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Legend & Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 text-black mb-2">
                        <Icons.Info size={16} />
                        <h4 className="text-[12px] font-bold uppercase tracking-widest">Permission Legend</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-green-50 rounded flex items-center justify-center text-green-600">
                                <Icons.Check size={16} strokeWidth={3} />
                            </div>
                            <span className="text-[12px] text-gray-500 font-medium">Full Access</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-amber-50 rounded flex items-center justify-center text-amber-500">
                                <Icons.Circle size={8} fill="currentColor" />
                            </div>
                            <span className="text-[12px] text-gray-500 font-medium">Read Only</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center text-gray-200">
                                <div className="w-4 h-px bg-gray-300" />
                            </div>
                            <span className="text-[12px] text-gray-500 font-medium">Denied</span>
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 flex items-start space-x-4">
                    <div className="p-2 bg-white rounded-lg text-amber-500 shadow-sm shrink-0">
                        <Icons.ShieldCheck size={24} />
                    </div>
                    <div>
                        <h4 className="text-[14px] font-bold text-amber-900 leading-none mb-1">Security Notice</h4>
                        <p className="text-[12px] text-amber-700 leading-relaxed">
                            Updating role permissions will propagate changes to all active users immediately.
                            Users might need to refresh their session to see updated interface components.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RolePermissions;
