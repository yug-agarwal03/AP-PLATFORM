'use client'

import React, { useState, useMemo } from 'react';
import {
    ArrowUpRight,
    ArrowDownRight,
    Scan,
    Flag,
    Users,
    PieChart as PieIcon,
} from 'lucide-react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from 'recharts';
import { NavItemType } from '@/lib/cdpo/types';
import {
    RISK_COLORS,
    EXECUTIVE_KPIS,
    MANDAL_HEATMAP_DATA,
} from '@/lib/cdpo/constants';

interface CdpoDashboardProps {
    initialStats?: {
        totalChildren: number
        screenedChildren: number
        coverage: number
        openFlags: number
        pendingReferrals: number
        delta: {
            children: string
            screened: string
            coverage: string
            flags: string
            referrals: string
        }
    }
    initialRiskDistribution?: Array<{
        name: string
        value: number
        color: string
    }>
    projectInfo?: {
        name: string
        mandalCount: number
        awcCount: number
    }
    initialMandalCoverage?: Array<{
        name: string
        count: number
        coverage: number
    }>
}

export default function CdpoDashboard({
    initialStats,
    initialRiskDistribution,
    projectInfo,
    initialMandalCoverage
}: CdpoDashboardProps) {
    const [timeFilter, setTimeFilter] = useState('This Month');

    const stats = initialStats || {
        totalChildren: 6240,
        screenedChildren: 3890,
        coverage: 62,
        openFlags: 48,
        pendingReferrals: 23,
        delta: {
            children: '+120 this month',
            screened: '+340',
            coverage: '+4%',
            flags: '-8',
            referrals: '+7'
        }
    };

    const riskDistribution = useMemo(() => initialRiskDistribution || [
        { name: 'Low', value: 2340, color: RISK_COLORS.LOW },
        { name: 'Medium', value: 934, color: RISK_COLORS.MEDIUM },
        { name: 'High', value: 467, color: RISK_COLORS.HIGH },
        { name: 'Critical', value: 149, color: RISK_COLORS.CRITICAL },
    ], [initialRiskDistribution]);

    const mandalCoverage = initialMandalCoverage || MANDAL_HEATMAP_DATA;

    const kpis = [
        { label: 'TOTAL CHILDREN', value: stats.totalChildren.toLocaleString(), delta: stats.delta.children, isUp: true },
        { label: 'SCREENED', value: stats.screenedChildren.toLocaleString(), delta: stats.delta.screened, isUp: true },
        { label: 'COVERAGE', value: `${stats.coverage}%`, delta: stats.delta.coverage, isUp: true },
        { label: 'OPEN FLAGS', value: stats.openFlags.toString(), delta: stats.delta.flags, isUp: false },
        { label: 'PENDING REFERRALS', value: stats.pendingReferrals.toString(), delta: stats.delta.referrals, isUp: true, isBadUp: true },
    ];

    const getHeatmapColor = (coverage: number) => {
        if (coverage === 0) return '#FFFFFF';
        if (coverage <= 25) return '#E5E5E5';
        if (coverage <= 50) return '#AAAAAA';
        if (coverage <= 75) return '#555555';
        return '#000000';
    };

    const getHeatmapTextColor = (coverage: number) => {
        return coverage > 50 ? '#FFFFFF' : '#000000';
    };

    return (
        <div className="animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-[24px] font-semibold mb-1">Executive Dashboard</h1>
                    <p className="text-[13px] text-[#888888]">
                        Project: {projectInfo?.name || 'Kondapur'} — {projectInfo?.mandalCount || 8} Mandals, {projectInfo?.awcCount || 156} AWCs
                    </p>
                </div>
                <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#E5E5E5] shadow-sm shrink-0">
                    {['This Week', 'This Month', 'Quarter', 'Year'].map((p) => (
                        <button key={p} onClick={() => setTimeFilter(p)} className={`px-4 py-[6px] text-[12px] font-medium rounded-full transition-all ${timeFilter === p ? 'bg-black text-white' : 'text-[#888888] hover:bg-[#F5F5F5]'}`}>{p}</button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-[12px] border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-widest">{kpi.label}</span>
                            <div className="text-[#888888] opacity-60">
                                {kpi.label.includes('CHILDREN') && <Users size={16} />}
                                {kpi.label.includes('SCREENED') && <Scan size={16} />}
                                {kpi.label.includes('COVERAGE') && <PieIcon size={16} />}
                                {kpi.label.includes('FLAGS') && <Flag size={16} />}
                            </div>
                        </div>
                        <div className="text-[32px] font-bold tracking-tight leading-none mb-2">{kpi.value}</div>
                        <div className="flex items-center justify-between">
                            <div className={`flex items-center gap-0.5 text-[12px] font-bold ${(kpi.isUp && !kpi.isBadUp) || (!kpi.isUp && kpi.label === 'OPEN FLAGS') ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                                {kpi.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {kpi.delta}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 mb-4">
                <div className="lg:col-span-6 bg-white p-6 rounded-[12px] border border-[#E5E5E5] shadow-sm">
                    <h3 className="text-[14px] font-semibold text-[#888888] uppercase tracking-widest mb-6">SCREENING COVERAGE BY MANDAL</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {mandalCoverage.map((m, idx) => (
                            <div key={idx} className="aspect-square p-4 rounded-lg flex flex-col justify-between cursor-pointer transition-transform hover:scale-[1.02] border border-[#E5E5E5]" style={{ backgroundColor: getHeatmapColor(m.coverage), color: getHeatmapTextColor(m.coverage) }}>
                                <span className="text-[11px] uppercase font-bold opacity-80">{m.name}</span>
                                <div>
                                    <div className="text-[18px] font-bold">{m.coverage}%</div>
                                    <div className="text-[10px] opacity-70">{m.count} children</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-4 bg-white p-6 rounded-[12px] border border-[#E5E5E5] shadow-sm flex flex-col">
                    <h3 className="text-[14px] font-semibold text-[#888888] uppercase tracking-widest mb-6">RISK DISTRIBUTION</h3>
                    <div className="flex-1 flex flex-col items-center justify-center relative min-h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={riskDistribution} innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                                    {riskDistribution.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <div className="text-[20px] font-bold">{stats.screenedChildren.toLocaleString()}</div>
                            <div className="text-[10px] text-[#888888] font-bold uppercase">Screened</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
