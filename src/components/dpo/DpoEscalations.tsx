'use client';

import React, { useState } from 'react';
import {
    ArrowUp,
    Bell,
    ChevronDown,
    ChevronUp,
    User,
    MapPin,
    Clock,
    ExternalLink,
    RotateCcw,
    Zap,
    ShieldAlert,
    CheckCircle2,
    TrendingUp,
    AlertCircle,
    ChevronRight,
    Search,
    ArrowUpRight
} from 'lucide-react';
import { Escalation, KPI } from '@/lib/dpo/types';
import { Scorecard } from './DpoUI';
import { useRouter } from 'next/navigation';

const ESCALATIONS_DATA: Escalation[] = [
    {
        id: 'ESC-001',
        priority: 'critical',
        title: 'Suspected motor delay — unresolved 18 days',
        daysOpen: 18,
        childName: 'Arun Kumar',
        childAge: '3y 2m',
        childGender: 'M',
        location: {
            awc: 'Rampur',
            mandal: 'Kondapur',
            cdpo: 'Kondapur'
        },
        path: ['AWW', 'Mandal', 'CDPO', 'District'],
        history: [
            { event: 'Raised by AWW Lakshmi', date: '1 Feb' },
            { event: 'Mandal acknowledged', date: '3 Feb' },
            { event: 'Mandal unresolved', date: '7 Feb' },
            { event: 'Auto-escalated to CDPO', date: '8 Feb' },
            { event: 'CDPO unresolved', date: '14 Feb' },
            { event: 'Auto-escalated to District', date: '15 Feb' },
        ],
        notes: 'Attempted referral but facility at capacity. Local PHC staff reported unavailability of pediatricians for specialized screening.'
    },
    {
        id: 'ESC-002',
        priority: 'high',
        title: 'Severe malnutrition flag — 12 days open',
        daysOpen: 12,
        childName: 'Sita M.',
        childAge: '4y 1m',
        childGender: 'F',
        location: {
            awc: 'Colony Hub',
            mandal: 'B-Nagar',
            cdpo: 'North'
        },
        path: ['AWW', 'Mandal', 'CDPO', 'District'],
        history: [
            { event: 'Raised by AWW Lakshmi', date: '5 Feb' },
            { event: 'Mandal acknowledged', date: '7 Feb' },
            { event: 'CDPO acknowledged', date: '12 Feb' },
            { event: 'Escalated to District', date: '17 Feb' },
        ],
        notes: 'Family refusing treatment due to cultural beliefs. Multiple counseling sessions by AWW failed to achieve consensus.'
    },
    {
        id: 'ESC-003',
        priority: 'amber',
        title: 'Questionnaire inconsistencies flagged — 7 days open',
        daysOpen: 7,
        childName: 'Rahul R.',
        childAge: '2y 8m',
        childGender: 'M',
        location: {
            awc: 'Market Hub',
            mandal: 'Mandal C',
            cdpo: 'East'
        },
        path: ['AWW', 'Mandal', 'CDPO', 'District'],
        history: [
            { event: 'Raised by AWW Kavitha', date: '10 Feb' },
            { event: 'Escalated to District', date: '17 Feb' },
        ],
    }
];

const RESOLVED_DATA: Escalation[] = [
    {
        id: 'ESC-RES-01',
        priority: 'low' as any,
        title: 'Address update verification',
        daysOpen: 3,
        childName: 'Priya S.',
        childAge: '5y 0m',
        childGender: 'F',
        location: { awc: 'Main', mandal: 'A', cdpo: 'Central' },
        path: [],
        history: [],
        resolutionOutcome: 'Resolved',
        resolvedBy: 'Admin A',
        resolvedDate: '15 Feb'
    },
    {
        id: 'ESC-RES-02',
        priority: 'high',
        title: 'Critical vision impairment',
        daysOpen: 5,
        childName: 'Amit G.',
        childAge: '3y 6m',
        childGender: 'M',
        location: { awc: 'Rural 02', mandal: 'B', cdpo: 'North' },
        path: [],
        history: [],
        resolutionOutcome: 'Referred',
        resolvedBy: 'Dr. Anita Rao',
        resolvedDate: '16 Feb'
    }
];

const DpoEscalations: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'Escalated' | 'Progress' | 'Resolved'>('Escalated');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const kpis: KPI[] = [
        { label: 'OPEN ESCALATIONS', value: '42', trend: [10, 15, 20, 25, 30, 42], change: '+12', isPositive: false },
        { label: 'CRITICAL', value: '12', trend: [5, 8, 10, 12], change: '+4', isPositive: false },
        { label: 'AVG RESOLUTION', value: '8.3d', trend: [10, 9.5, 9, 8.3], change: '-1.2d', isPositive: true },
        { label: 'RESOLUTION RATE', value: '67%', trend: [60, 62, 65, 67], change: '+5%', isPositive: true },
    ];

    const getPriorityStyles = (priority: string) => {
        switch (priority) {
            case 'critical': return 'bg-red-600 text-white border-red-600 shadow-red-200';
            case 'high': return 'bg-orange-500 text-white border-orange-500 shadow-orange-200';
            case 'amber': return 'bg-amber-400 text-black border-amber-400 shadow-amber-200';
            default: return 'bg-gray-400 text-white border-gray-400 shadow-gray-200';
        }
    };

    const EscalationCard: React.FC<{ esc: Escalation }> = ({ esc }) => (
        <div className={`bg-white rounded-2xl p-6 shadow-sm border-l-8 transition-all hover:shadow-md ${esc.priority === 'critical' ? 'border-red-600' : esc.priority === 'high' ? 'border-orange-500' : 'border-amber-400'}`}>
            <div className="flex justify-between items-start mb-6">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-lg ${getPriorityStyles(esc.priority)}`}>
                            {esc.priority}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-[#AAAAAA] font-black uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                            {esc.path.map((step, i) => (
                                <React.Fragment key={step}>
                                    <span>{step}</span>
                                    {i < esc.path.length - 1 && <ChevronRight size={10} className="text-[#CCC]" />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <h3 className="text-[18px] font-black text-black leading-tight tracking-tight uppercase underline decoration-black/10 underline-offset-4">{esc.title}</h3>
                </div>
                <div className="text-right">
                    <div className={`text-[16px] font-black ${esc.daysOpen > 14 ? 'text-red-600' : 'text-black'}`}>
                        {esc.daysOpen} DAYS OPEN
                    </div>
                    <code className="text-[10px] text-[#AAAAAA] font-mono mt-1 block">ID: {esc.id}</code>
                </div>
            </div>

            <div className="flex items-center gap-6 mb-8 p-5 bg-[#F9F9F9] rounded-xl border border-[#F0F0F0] group cursor-pointer hover:bg-white transition-all shadow-inner" onClick={() => router.push(`/dpo/children/${esc.id}`)}>
                <div className="w-12 h-12 rounded-xl bg-white border border-[#EEE] shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <User size={24} className="text-black" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <p className="text-[15px] font-black text-black uppercase">{esc.childName}</p>
                        <ArrowUpRight size={14} className="text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[11px] font-bold text-[#888888] uppercase tracking-widest">{esc.childAge} • {esc.childGender === 'M' ? 'Male' : 'Female'}</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-black uppercase tracking-widest bg-white px-4 py-2 rounded-lg border border-[#EEE]">
                    <MapPin size={14} className="text-[#AAA]" />
                    <span>{esc.location.awc} • {esc.location.mandal}</span>
                </div>
            </div>

            <div className="mb-8">
                <button
                    onClick={() => setExpandedId(expandedId === esc.id ? null : esc.id)}
                    className="flex items-center gap-2 text-[11px] font-black text-black uppercase tracking-widest py-2 px-4 rounded-lg bg-gray-50 hover:bg-black hover:text-white transition-all border border-gray-100"
                >
                    {expandedId === esc.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    Auditorium Log Trace
                </button>
                {expandedId === esc.id && (
                    <div className="mt-6 pl-8 border-l-2 border-dashed border-[#DDD] space-y-6 animate-in slide-in-from-top-2 duration-300">
                        {esc.history.map((h, i) => (
                            <div key={i} className="relative">
                                <div className="absolute left-[-37px] top-[4px] w-4 h-4 rounded-full bg-white border-2 border-black z-10" />
                                <p className="text-[13px] text-black font-black uppercase tracking-tight">{h.event}</p>
                                <p className="text-[10px] text-[#AAAAAA] mt-1 font-mono uppercase tracking-[0.2em]">{h.date}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {esc.notes && (
                <div className="mb-8 p-5 bg-amber-50/50 border border-amber-100 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                        <ShieldAlert size={48} />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-amber-700 uppercase tracking-widest mb-3">
                        <Clock size={14} /> Field Intelligence Notes
                    </div>
                    <p className="text-[14px] text-black font-medium italic leading-relaxed">"{esc.notes}"</p>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#F0F0F0]">
                <button
                    onClick={() => router.push(`/dpo/children/${esc.id}`)}
                    className="text-[11px] font-black text-[#888888] hover:text-black uppercase tracking-widest transition-colors px-2"
                >
                    Bio Registry
                </button>
                <div className="flex-1" />
                <button className="flex items-center gap-2 px-5 py-2.5 border border-[#E5E5E5] rounded-xl text-[11px] font-black uppercase tracking-widest text-black hover:bg-gray-50 transition-all shadow-sm">
                    <RotateCcw size={16} />
                    <span>Recede to CDPO</span>
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
                    <Zap size={16} />
                    <span>Intervene</span>
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-100">
                    <ShieldAlert size={16} />
                    <span>Escalate To State</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">Escalations</h1>
                    <p className="text-[14px] text-[#888888] font-medium flex items-center gap-2 font-mono uppercase tracking-[0.2em]">
                        District Intelligence Unit • Level 4 Clearance
                    </p>
                </div>
                <div className="flex bg-white shadow-sm border border-[#E5E5E5] rounded-xl p-1">
                    {['Critical', 'High', 'All'].map((pill) => (
                        <button
                            key={pill}
                            className={`px-6 py-1.5 text-[11px] font-black uppercase rounded-lg transition-all ${pill === 'All' ? 'bg-black text-white shadow-lg shadow-black/10' : 'text-[#888] hover:text-black hover:bg-gray-50'}`}
                        >
                            {pill}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-red-600 text-white p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-2xl shadow-red-200 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 transform group-hover:scale-110 transition-transform duration-1000" />
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                    <Bell size={32} className="text-red-600 animate-bounce" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                        <CheckCircle2 size={16} className="text-white/80" />
                        <p className="text-[12px] font-black uppercase tracking-[0.3em]">Urgent Protocol Alert</p>
                    </div>
                    <p className="text-[18px] font-black leading-tight tracking-tight uppercase underline decoration-white/20 underline-offset-4">12 critical blocks remain unresolved for 14+ days</p>
                    <p className="text-[13px] text-white/80 font-medium mt-2">Regional bottleneck identified in Nellore North cluster. State intervention pending if TAT exceeds 48h.</p>
                </div>
                <button className="px-8 py-3 bg-white text-red-600 rounded-xl font-black uppercase tracking-widest text-[12px] hover:bg-gray-50 transition-all shadow-xl shadow-black/10">
                    Force Sync All
                </button>
            </div>

            <div className="flex flex-nowrap gap-5 overflow-x-auto pb-4 scrollbar-hide">
                {kpis.map(kpi => <Scorecard key={kpi.label} kpi={kpi} />)}
            </div>

            <div className="flex gap-10 border-b border-[#F0F0F0] px-2 overflow-x-auto scrollbar-hide">
                {[
                    { id: 'Escalated', label: 'Unresolved (42)' },
                    { id: 'Progress', label: 'Direct Active (18)' },
                    { id: 'Resolved', label: 'Archived (86)' }
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
                            {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black shadow-[0_0_10px_black]" />}
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-8 space-y-8">
                    {activeTab === 'Escalated' && (
                        <div className="space-y-6 animate-in slide-in-from-left-2 duration-500">
                            {ESCALATIONS_DATA.map(esc => <EscalationCard key={esc.id} esc={esc} />)}
                        </div>
                    )}

                    {activeTab === 'Progress' && (
                        <div className="space-y-6 animate-in slide-in-from-left-2 duration-500">
                            {ESCALATIONS_DATA.slice(0, 2).map(esc => (
                                <div key={esc.id} className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-black/10 relative">
                                    <div className="flex justify-between items-center mb-6 pl-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-[11px] font-black uppercase shadow-lg">AD</div>
                                            <div>
                                                <p className="text-[13px] font-black uppercase tracking-tighter">Ownership: District Admin</p>
                                                <p className="text-[10px] text-[#888] font-bold uppercase">Locked 4h ago</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-black bg-gray-100 px-3 py-1 rounded-full uppercase tracking-widest border border-gray-200">Session Active</span>
                                    </div>
                                    <EscalationCard esc={esc} />
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'Resolved' && (
                        <div className="bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden shadow-sm animate-in slide-in-from-left-2 duration-500">
                            <table className="w-full text-left text-[13px] border-collapse">
                                <thead>
                                    <tr className="bg-[#fcfcfc] border-b border-[#F0F0F0] text-[#888] font-black uppercase tracking-widest text-[10px]">
                                        <th className="px-6 py-5">Trace ID</th>
                                        <th className="px-6 py-5">Identity</th>
                                        <th className="px-6 py-5">Region</th>
                                        <th className="px-6 py-5">Index</th>
                                        <th className="px-6 py-5">Life Log</th>
                                        <th className="px-6 py-5 text-right">Activity</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F0F0F0]">
                                    {RESOLVED_DATA.map(esc => (
                                        <tr key={esc.id} className="hover:bg-gray-50 transition-all group">
                                            <td className="px-6 py-5 font-mono text-[11px] text-[#BBB]">{esc.id}</td>
                                            <td className="px-6 py-5">
                                                <div className="font-black text-black group-hover:translate-x-1 transition-transform">{esc.childName}</div>
                                                <div className="text-[10px] font-bold text-[#AAA] tracking-widest">{esc.childAge} • {esc.childGender}</div>
                                            </td>
                                            <td className="px-6 py-5 text-[#555555] font-black uppercase tracking-tighter text-[11px]">{esc.location.cdpo}</td>
                                            <td className="px-6 py-5">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${getPriorityStyles(esc.priority)}`}>
                                                    {esc.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className={`px-2.5 py-1 rounded-lg font-black uppercase text-[9px] inline-block border ${esc.resolutionOutcome === 'Referred' ? 'bg-green-50 text-green-600 border-green-100' :
                                                    esc.resolutionOutcome === 'Transferred' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                        'bg-gray-100 text-gray-600 border-gray-200'
                                                    }`}>
                                                    {esc.resolutionOutcome}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-[#888888] font-bold text-right uppercase text-[11px] font-mono">{esc.resolvedDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-4 space-y-8 animate-in slide-in-from-right-2 duration-700">
                    <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm group">
                        <h3 className="text-[14px] font-black uppercase tracking-widest text-black mb-10 flex items-center justify-between">
                            Regional Load Metrics
                            <ChevronRight size={14} className="text-[#DDD]" />
                        </h3>

                        <div className="space-y-6">
                            {[
                                { name: 'Kondapur Central', count: 18, color: 'text-red-600', val: 100 },
                                { name: 'Nellore North', count: 12, color: 'text-orange-500', val: 75 },
                                { name: 'Guntur East', count: 6, color: 'text-black', val: 40 },
                                { name: 'Vizag West', count: 4, color: 'text-black', val: 25 },
                                { name: 'Tirupati South', count: 2, color: 'text-black', val: 15 },
                            ].map(c => (
                                <div key={c.name} className="group cursor-pointer">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[13px] font-black text-black group-hover:translate-x-1 transition-transform uppercase tracking-tighter">{c.name}</span>
                                        <span className={`text-[15px] font-black ${c.color}`}>{c.count}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-[#F5F5F5] rounded-full overflow-hidden">
                                        <div className={`h-full transition-all duration-1000 ${c.count > 10 ? 'bg-red-600' : 'bg-black'}`} style={{ width: `${c.val}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-10 border-t border-[#F9F9F9]">
                            <p className="text-[11px] font-black text-[#888888] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <TrendingUp size={14} /> Weekly Volume Trace
                            </p>
                            <div className="h-[100px] w-full flex items-end justify-between px-2 pt-2 gap-3">
                                {[40, 65, 50, 85].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center group/bar">
                                        <div className="w-full bg-black rounded-t-lg transition-all duration-500 hover:bg-gray-700 hover:scale-105 relative" style={{ height: `${h}%` }}>
                                            <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-xl transition-opacity pointer-events-none whitespace-nowrap">
                                                {h} UNITS
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-black text-[#AAA] mt-2 group-hover/bar:text-black transition-colors">W{i + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-black text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden group border border-white/5">
                        <div className="absolute top-[-30px] right-[-30px] w-48 h-48 bg-white opacity-[0.03] rounded-full group-hover:scale-125 transition-transform duration-1000" />
                        <div className="absolute bottom-[-10px] left-[-10px] w-16 h-16 border border-white/10 rounded-full" />

                        <div className="relative z-10">
                            <h3 className="text-[14px] font-black uppercase tracking-[0.3em] mb-8 text-white/50">Intelligence Core</h3>
                            <div className="space-y-6">
                                <p className="text-[20px] font-black leading-tight tracking-tight uppercase">High-density hotspots identified in Cluster Delta</p>
                                <p className="text-[13px] text-white/60 font-medium leading-relaxed italic">"Correlation found between staffing shortages in Mandal B and the 24% spike in critical escalations."</p>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                                <div className="text-center">
                                    <div className="text-[24px] font-black">1.8h</div>
                                    <div className="text-[9px] text-white/40 uppercase font-black tracking-widest mt-1">Audit TAT</div>
                                </div>
                                <div className="w-[1px] h-10 bg-white/10" />
                                <div className="text-center">
                                    <div className="text-[24px] font-black">+32%</div>
                                    <div className="text-[9px] text-white/40 uppercase font-black tracking-widest mt-1">Efficiency</div>
                                </div>
                                <div className="w-[1px] h-10 bg-white/10" />
                                <div className="text-center">
                                    <div className="text-[24px] font-black">7/10</div>
                                    <div className="text-[9px] text-white/40 uppercase font-black tracking-widest mt-1">Safety</div>
                                </div>
                            </div>

                            <button className="w-full mt-10 py-4 bg-white text-black rounded-xl font-black uppercase tracking-[0.4em] text-[11px] hover:bg-gray-100 transition-all shadow-xl shadow-black">
                                Full Insights
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DpoEscalations;
