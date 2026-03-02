'use client';

import React, { useState } from 'react';
import { Scorecard, PerformanceRing, CoverageMiniBar } from './DpoUI';
import { KPI } from '@/lib/dpo/types';
import { Search, Filter, ArrowUpRight, ChevronRight, Activity, Smartphone, CheckCircle2, AlertCircle, Clock, Users, Shield, Target, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DpoWorkforce: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'AWW' | 'Screeners' | 'CDPOs'>('AWW');
    const [showBelowTargetOnly, setShowBelowTargetOnly] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const kpis: KPI[] = [
        { label: 'TOTAL AWWS', value: '680', trend: [650, 660, 675, 680], change: '0', isPositive: true },
        { label: 'ACTIVE (30d)', value: '634', trend: [610, 620, 630, 634], change: '+12', isPositive: true },
        { label: 'AVG COMPLIANCE', value: '82%', trend: [78, 80, 81, 82], change: '+2%', isPositive: true },
        { label: 'BELOW TARGET', value: '46', trend: [55, 50, 48, 46], change: '-9', isPositive: true },
    ];

    const awwPerformanceData = [
        { id: 1, name: 'Saritha P.', cdpo: 'Central', mandal: 'Kondapur', awc: 'Rampur Main', children: 45, questionnaires: 42, coverage: 93, observations: 12, flags: 0, visits: 8, lastActive: '2h ago', score: 94 },
        { id: 2, name: 'Lakshmi V.', cdpo: 'North', mandal: 'Mandal B', awc: 'Colony Hub', children: 52, questionnaires: 21, coverage: 40, observations: 4, flags: 3, visits: 2, lastActive: '1d ago', score: 38 },
        { id: 3, name: 'B. Kavitha', cdpo: 'East', mandal: 'Mandal C', awc: 'Market Hub', children: 38, questionnaires: 24, coverage: 63, observations: 7, flags: 1, visits: 4, lastActive: '5h ago', score: 65 },
        { id: 4, name: 'T. Mary', cdpo: 'South', mandal: 'Mandal A', awc: 'Lakeview', children: 40, questionnaires: 35, coverage: 87, observations: 10, flags: 0, visits: 6, lastActive: '3h ago', score: 82 },
        { id: 5, name: 'R. Reddy', cdpo: 'North', mandal: 'Mandal B', awc: 'Forest Edge', children: 60, questionnaires: 15, coverage: 25, observations: 2, flags: 5, visits: 1, lastActive: '3d ago', score: 22 },
    ].sort((a, b) => a.score - b.score);

    const screenerData = [
        { name: 'Team Alpha', cdpo: 'Central', mandal: 'Kondapur', screenings: 450, quality: 92, referrals: 34, activeCases: 12, lastActive: 'Today' },
        { name: 'Team Beta', cdpo: 'North', mandal: 'Mandal B', screenings: 180, quality: 64, referrals: 15, activeCases: 28, lastActive: '2d ago' },
        { name: 'Team Gamma', cdpo: 'East', mandal: 'Mandal C', screenings: 310, quality: 85, referrals: 22, activeCases: 18, lastActive: 'Yesterday' },
    ];

    const cdpoOfficers = [
        { name: 'Dr. Anita Rao', cdpo: 'Central', mandals: 12, escalations: 4, reports: 24, lastLogin: '10m ago', status: 'active' },
        { name: 'K. Someshwar', cdpo: 'North', mandals: 10, escalations: 24, reports: 12, lastLogin: '2d ago', status: 'inactive' },
        { name: 'P. Lakshmi', cdpo: 'East', mandals: 8, escalations: 8, reports: 18, lastLogin: '5h ago', status: 'recent' },
    ];

    const heatmapRows = ['North', 'East', 'West', 'Central', 'South'];
    const heatmapWeeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];

    const getHeatmapColor = (cdpo: string, week: string) => {
        if (cdpo === 'North') return 'bg-red-500/80 hover:bg-red-600';
        if (cdpo === 'West') return 'bg-amber-400 hover:bg-amber-500';
        if (cdpo === 'Central') return 'bg-black hover:bg-gray-800';
        if (cdpo === 'South') return 'bg-gray-700 hover:bg-black';
        return 'bg-gray-400 hover:bg-gray-500';
    };

    const getStatusIndicator = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]';
            case 'recent': return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]';
            default: return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">Workforce Tracking</h1>
                    <p className="text-[14px] text-[#888888] font-medium flex items-center gap-2">
                        <Users size={14} />
                        680 Personnel • District Health Workforce Registry
                    </p>
                </div>
                <div className="flex bg-white shadow-sm border border-[#E5E5E5] rounded-xl p-1">
                    {['Activity', 'Audit', 'Governance'].map((pill) => (
                        <button
                            key={pill}
                            className={`px-6 py-1.5 text-[11px] font-black uppercase rounded-lg transition-all ${pill === 'Activity' ? 'bg-black text-white shadow-lg shadow-black/10' : 'text-[#888] hover:text-black hover:bg-gray-50'}`}
                        >
                            {pill}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-10 border-b border-[#F0F0F0] px-2 overflow-x-auto scrollbar-hide">
                {[
                    { id: 'AWW', label: 'AWW Performance' },
                    { id: 'Screeners', label: 'Screening Teams' },
                    { id: 'CDPOs', label: 'Officers' }
                ].map(tab => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`pb-4 text-[12px] font-black uppercase tracking-widest relative transition-all whitespace-nowrap ${isActive ? 'text-black' : 'text-[#AAAAAA] hover:text-[#888]'
                                }`}
                        >
                            {tab.label}
                            {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
                        </button>
                    );
                })}
            </div>

            {activeTab === 'AWW' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-700">
                    <div className="flex flex-nowrap gap-5 overflow-x-auto pb-4 scrollbar-hide">
                        {kpis.map(kpi => <Scorecard key={kpi.label} kpi={kpi} />)}
                    </div>

                    <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-[#F0F0F0] flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#fcfcfc]">
                            <div>
                                <h3 className="text-[14px] font-black uppercase tracking-widest text-black">Frontline Compliance Directory</h3>
                                <p className="text-[12px] text-[#888] font-medium">Real-time performance indexing for Anganwadi Workers</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-[#EEE] shadow-sm">
                                    <input
                                        type="checkbox"
                                        id="belowTarget"
                                        checked={showBelowTargetOnly}
                                        onChange={() => setShowBelowTargetOnly(!showBelowTargetOnly)}
                                        className="w-4 h-4 rounded border-[#DDD] text-black focus:ring-black cursor-pointer"
                                    />
                                    <label htmlFor="belowTarget" className="text-[11px] font-black text-black uppercase tracking-tight cursor-pointer">Laggard Filter</label>
                                </div>
                                <div className="relative group">
                                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAAAAA] group-focus-within:text-black transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search Personnel ID or Name..."
                                        className="pl-12 pr-6 h-11 bg-white border border-[#E5E5E5] rounded-xl text-[13px] w-[280px] focus:ring-1 focus:ring-black focus:border-black transition-all outline-none font-medium"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="flex items-center gap-2 px-5 py-2.5 h-11 bg-white border border-[#E5E5E5] rounded-xl text-[13px] font-bold text-[#555] hover:border-black hover:text-black transition-all">
                                    <Filter size={16} /> Advanced
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto min-h-[400px]">
                            <table className="w-full text-left text-[13px] border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-[#F0F0F0] text-[10px] font-black uppercase tracking-widest text-[#888]">
                                        <th className="px-8 py-5"># Rank</th>
                                        <th className="px-8 py-5">Personnel</th>
                                        <th className="px-8 py-5">Command Chain</th>
                                        <th className="px-8 py-5 text-center">Census/Registry</th>
                                        <th className="px-8 py-5 text-center">Coverage Index</th>
                                        <th className="px-8 py-5 text-center">Anomalies</th>
                                        <th className="px-8 py-5 text-center">Visits</th>
                                        <th className="px-8 py-5 text-right">Last Sync</th>
                                        <th className="px-8 py-5 text-center">Health</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F0F0F0]">
                                    {awwPerformanceData.map((aww, idx) => (
                                        <tr
                                            key={aww.id}
                                            onClick={() => router.push(`/dpo/workforce/aww/${aww.id}`)}
                                            className="hover:bg-gray-50/80 transition-all cursor-pointer group"
                                        >
                                            <td className="px-8 py-6 text-[#BBB] font-mono text-[11px]">{idx + 1}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 font-black text-black text-[14px]">
                                                    {aww.name}
                                                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <p className="text-[10px] font-bold text-[#AAA] tracking-widest uppercase">{aww.awc}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-black font-black uppercase tracking-tighter text-[11px]">{aww.cdpo} CDPO</p>
                                                <p className="text-[11px] text-[#AAA] font-medium">{aww.mandal}</p>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className="inline-flex items-baseline gap-1">
                                                    <span className="font-black text-black text-[16px]">{aww.children}</span>
                                                    <span className="text-[10px] font-black text-black/20 uppercase">Units</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="w-[120px] mx-auto">
                                                    <div className="flex justify-between items-center mb-1 text-[10px] font-black uppercase">
                                                        <span className={aww.coverage < 50 ? 'text-red-600' : 'text-black'}>{aww.coverage}%</span>
                                                        <span className="text-[#CCC]">Target 85%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-[#f0f0f0] rounded-full overflow-hidden">
                                                        <div className={`h-full transition-all duration-700 ${aww.coverage < 50 ? 'bg-red-500' : 'bg-black'}`} style={{ width: `${aww.coverage}%` }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg font-black text-[11px] ${aww.flags > 0 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-50 text-[#AAA] border border-gray-100'}`}>
                                                    {aww.flags > 0 ? <AlertCircle size={12} /> : null}
                                                    {aww.flags} Flags
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center text-black font-black text-[14px]">{aww.visits}</td>
                                            <td className="px-8 py-6 text-[#888] font-bold text-right text-[11px] uppercase tracking-widest">{aww.lastActive}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center group-hover:scale-110 transition-transform">
                                                    <PerformanceRing score={aww.score} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Target size={120} />
                        </div>
                        <h3 className="text-[14px] font-black uppercase tracking-widest text-black mb-10 flex items-center gap-2">
                            <Activity size={16} /> Historical Compliance Heatmap
                        </h3>
                        <div className="overflow-x-auto pb-4">
                            <table className="w-full text-center border-separate border-spacing-2">
                                <thead>
                                    <tr>
                                        <th className="text-left text-[10px] font-black uppercase text-[#BBB] tracking-[0.2em] pb-4 px-2">District Region</th>
                                        {heatmapWeeks.map(w => <th key={w} className="text-[10px] font-black uppercase text-[#BBB] tracking-widest pb-4">{w}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {heatmapRows.map(cdpo => (
                                        <tr key={cdpo}>
                                            <td className="text-left font-black text-[13px] text-black pr-8 uppercase tracking-tighter">{cdpo} CDPO Unit</td>
                                            {heatmapWeeks.map(week => (
                                                <td key={week} className="group relative">
                                                    <div className={`h-14 w-full rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm border-2 border-transparent hover:border-black/10 cursor-help ${getHeatmapColor(cdpo, week)}`}>
                                                        <span className="text-[11px] font-black text-white/50 group-hover:text-white transition-opacity uppercase font-mono">82%</span>
                                                    </div>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-black text-white text-[10px] font-black rounded-xl opacity-0 group-hover:opacity-100 transition-all z-20 pointer-events-none shadow-2xl uppercase tracking-widest whitespace-nowrap">
                                                        Metric: 82% Efficiency in {week}
                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black" />
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-10 flex items-center justify-center gap-8 border-t border-[#F9F9F9] pt-8">
                            <div className="flex items-center gap-2.5 bg-gray-50 px-4 py-2 rounded-xl"><div className="w-3 h-3 rounded-md bg-black" /> <span className="text-[10px] font-black uppercase text-[#888] tracking-widest">&gt;80% Optimum</span></div>
                            <div className="flex items-center gap-2.5 bg-gray-50 px-4 py-2 rounded-xl"><div className="w-3 h-3 rounded-md bg-amber-400" /> <span className="text-[10px] font-black uppercase text-[#888] tracking-widest">60-80% Warning</span></div>
                            <div className="flex items-center gap-2.5 bg-gray-50 px-4 py-2 rounded-xl"><div className="w-3 h-3 rounded-md bg-red-500" /> <span className="text-[10px] font-black uppercase text-[#888] tracking-widest">&lt;40% Critical Block</span></div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'Screeners' && (
                <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden animate-in slide-in-from-bottom-2 duration-500">
                    <div className="p-8 border-b border-[#F0F0F0] bg-[#fcfcfc] flex items-center gap-4">
                        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-lg shadow-black/10">
                            <Shield size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-[14px] font-black uppercase tracking-widest text-black">Observation Team Velocity</h3>
                            <p className="text-[12px] text-[#888] font-medium lowercase tracking-widest">Tactical screening unit performance metrics</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-[13px] border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-[#F0F0F0] text-[10px] font-black uppercase tracking-widest text-[#888]">
                                    <th className="px-8 py-5">Unit Designation</th>
                                    <th className="px-8 py-5">Deployment Node</th>
                                    <th className="px-8 py-5 text-center">Operations Log</th>
                                    <th className="px-8 py-5 text-center">Quality Audit</th>
                                    <th className="px-8 py-5 text-center">Cases Fulfilled</th>
                                    <th className="px-8 py-5 text-center">Active Queue</th>
                                    <th className="px-8 py-5 text-right">Last Signal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F0F0F0]">
                                {screenerData.map(s => (
                                    <tr key={s.name} className="hover:bg-gray-50/50 transition-all border-l-4 border-transparent hover:border-black group">
                                        <td className="px-8 py-6">
                                            <div className="font-black text-black text-[15px] uppercase tracking-tight">{s.name}</div>
                                            <code className="text-[10px] text-[#AAA] font-mono">DIU-SIGMA-4</code>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-black font-black uppercase tracking-tighter text-[11px]">{s.cdpo} Command</p>
                                            <p className="text-[11px] text-[#AAA] font-medium">{s.mandal}</p>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="inline-flex items-center gap-1.5 font-black text-black text-[16px]">
                                                {s.screenings}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center group-hover:scale-110 transition-transform">
                                                <PerformanceRing score={s.quality} />
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center font-black text-black text-[14px]">{s.referrals}</td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all ${s.activeCases > 20 ? 'bg-red-50 text-red-600 border-red-100 shadow-sm shadow-red-50' : 'bg-gray-50 text-black border-gray-100 shadow-sm shadow-gray-50'}`}>
                                                {s.activeCases} CASES
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-[#888] font-bold text-right text-[11px] uppercase tracking-widest">{s.lastActive}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'CDPOs' && (
                <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden animate-in slide-in-from-bottom-2 duration-500">
                    <div className="p-8 border-b border-[#F0F0F0] bg-black text-white flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                                <Shield size={28} className="text-black" />
                            </div>
                            <div>
                                <h3 className="text-[16px] font-black uppercase tracking-[0.2em]">Commanding Officers Activity</h3>
                                <p className="text-[12px] text-white/40 font-medium">District Regional Governance Oversight</p>
                            </div>
                        </div>
                        <div className="hidden md:flex gap-8">
                            <div className="text-center">
                                <div className="text-[20px] font-black">100%</div>
                                <div className="text-[9px] text-white/40 font-black uppercase tracking-widest">Uptime</div>
                            </div>
                            <div className="text-center">
                                <div className="text-[20px] font-black">5/5</div>
                                <div className="text-[9px] text-white/40 font-black uppercase tracking-widest">Regions</div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-[13px] border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-[#F0F0F0] text-[10px] font-black uppercase tracking-widest text-[#888]">
                                    <th className="px-8 py-5">Officer Identity</th>
                                    <th className="px-8 py-5">Regional Command</th>
                                    <th className="px-8 py-5 text-center">Nodes Managed</th>
                                    <th className="px-8 py-5 text-center">Escalations</th>
                                    <th className="px-8 py-5 text-center">Audit Files</th>
                                    <th className="px-8 py-5">Last Terminal Log</th>
                                    <th className="px-8 py-5 text-center">Signal Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F0F0F0]">
                                {cdpoOfficers.map(off => (
                                    <tr key={off.name} className="hover:bg-gray-50 transition-all group">
                                        <td className="px-8 py-7">
                                            <div className="font-black text-black text-[15px] underline decoration-black/10 underline-offset-4 uppercase tracking-tighter">{off.name}</div>
                                            <code className="text-[10px] text-[#AAA] font-mono">CLASS-I-OFFICER</code>
                                        </td>
                                        <td className="px-8 py-7">
                                            <span className="bg-black text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.1em]">{off.cdpo} DISTRICT</span>
                                        </td>
                                        <td className="px-8 py-7 text-center font-black text-black text-[16px]">{off.mandals}</td>
                                        <td className="px-8 py-7 text-center">
                                            <div className={`inline-flex items-center gap-1.5 font-black text-[15px] ${off.escalations > 10 ? 'text-red-600' : 'text-black'}`}>
                                                {off.escalations}
                                            </div>
                                        </td>
                                        <td className="px-8 py-7 text-center font-black text-[#555] text-[15px]">{off.reports}</td>
                                        <td className="px-8 py-7 text-[#888] font-bold text-[11px] uppercase tracking-widest font-mono">{off.lastLogin}</td>
                                        <td className="px-8 py-7">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className={`w-4 h-4 rounded-full ${getStatusIndicator(off.status)} group-hover:scale-125 transition-transform`} />
                                                <span className="text-[9px] font-black uppercase text-[#BBB] tracking-widest">{off.status}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DpoWorkforce;
