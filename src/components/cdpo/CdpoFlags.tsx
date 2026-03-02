'use client';

import React, { useState } from 'react';
import {
    Flag,
    AlertTriangle,
    ShieldCheck,
    Clock,
    ChevronDown,
    Search,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    User,
    CheckCircle2,
    Calendar,
    Zap,
    MessageSquare,
    MoreVertical,
    Activity,
    Lock
} from 'lucide-react';

const CdpoFlags: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Escalated to CDPO');

    const kpis = [
        { label: 'OPEN FLAGS', value: '42', delta: '+12%', isUp: true, color: '#EF4444' },
        { label: 'ESCALATED CDPO', value: '18', delta: '-15%', isUp: false, color: '#000000' },
        { label: 'RESOLVED (24H)', value: '26', delta: '+8%', isUp: true, color: '#22C55E' },
        { label: 'AVG RESOLUTION', value: '1.2d', delta: '-0.2d', isUp: false, color: '#000000' },
    ];

    const flags = [
        { id: 'FLG-8822', title: 'Severe developmental concern triggered via Ph-2 screening', child: 'Priya Sharma', age: '4y 2m', awc: 'Rampur-A', priority: 'CRITICAL', escalationTime: '2h ago', status: 'CDPO Review', photo: 'PS' },
        { id: 'FLG-8825', title: 'Language acquisition delay flag — Manual Screener audit', child: 'Rahul K.', age: '3y 8m', awc: 'North-B', priority: 'HIGH', escalationTime: '4h ago', status: 'Mandal Audit', photo: 'RK' },
        { id: 'FLG-8826', title: 'Social-emotional reactivity concern escalation', child: 'Sneha M.', age: '5y 1m', awc: 'Cen-2', priority: 'MEDIUM', escalationTime: '6h ago', status: 'Completed', photo: 'SM' },
        { id: 'FLG-8829', title: 'Gross motor coordination deficit flagged by AWW', child: 'Arjun V.', age: '4y 11m', awc: 'G-Road', priority: 'CRITICAL', escalationTime: '8h ago', status: 'DPO Transmit', photo: 'AV' },
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                <div>
                    <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">Alert Intelligence</h1>
                    <p className="text-[14px] text-[#888888] font-medium flex items-center gap-2">
                        <Flag size={14} fill="red" className="text-red-500" />
                        Kondapur CDPO Node • Systemic Flags & Escalations
                    </p>
                </div>
                <div className="flex bg-white shadow-sm border border-[#E5E5E5] rounded-2xl p-1 shrink-0">
                    {['Escalated to CDPO', 'All Open Flags', 'Resolved'].map((pill) => (
                        <button
                            key={pill}
                            onClick={() => setActiveTab(pill)}
                            className={`px-6 py-2 text-[11px] font-black uppercase rounded-xl transition-all ${activeTab === pill ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-[#888] hover:text-black hover:bg-gray-50'}`}
                        >
                            {pill}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[32px] border border-[#E5E5E5] shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-all">
                        <div className="flex flex-col h-full justify-between">
                            <span className="text-[11px] font-black text-[#888888] uppercase tracking-[0.2em] mb-8">{kpi.label}</span>
                            <div className="flex items-end justify-between">
                                <span className="text-[42px] font-black tracking-tighter leading-none italic" style={{ color: kpi.color }}>{kpi.value}</span>
                                <div className={`flex items-center gap-1.5 text-[12px] font-black ${(kpi.isUp && kpi.label !== 'OPEN FLAGS') || (!kpi.isUp && kpi.label === 'OPEN FLAGS') ? 'text-green-600' : 'text-red-500'}`}>
                                    {kpi.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {kpi.delta}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* MAIN LIST & SIDEBAR */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-8 space-y-8 animate-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center justify-between px-2 mb-4">
                        <h3 className="text-[14px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                            Active Signal Queue
                        </h3>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black px-3 py-1 bg-black text-white rounded-lg uppercase tracking-widest">Sort: Priority</span>
                        </div>
                    </div>

                    {flags.map((flag) => (
                        <div key={flag.id} className="bg-white border-2 border-transparent hover:border-black rounded-[40px] p-8 shadow-sm transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                                <AlertTriangle size={120} />
                            </div>
                            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
                                <div className="flex items-center gap-4">
                                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border-2 shadow-sm ${flag.priority === 'CRITICAL' ? 'bg-red-50 text-red-600 border-red-100 shadow-red-200' :
                                            flag.priority === 'HIGH' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-green-50 text-green-600 border-green-100'
                                        }`}>
                                        {flag.priority}
                                    </span>
                                    <div className="flex items-center gap-2 text-[10px] text-[#AAA] font-black uppercase tracking-widest">
                                        <Clock size={14} /> {flag.escalationTime} • {flag.id}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-all text-[#AAA] hover:text-black shadow-sm bg-white border border-[#F0F0F0]">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </header>

                            <div className="flex flex-col md:flex-row items-center gap-10 mb-8 relative z-10">
                                <div className="w-24 h-24 rounded-3xl bg-black flex items-center justify-center text-white text-[28px] font-black italic shadow-2xl shadow-black/20 group-hover:scale-105 transition-transform">
                                    {flag.photo}
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-[20px] font-black text-black leading-tight uppercase tracking-tight italic mb-3 underline decoration-black/5 underline-offset-8">{flag.title}</h3>
                                    <div className="flex items-center justify-center md:justify-start gap-6">
                                        <div className="flex items-center gap-2">
                                            <User size={14} className="text-[#AAA]" />
                                            <span className="text-[13px] font-black text-black uppercase tracking-tight">{flag.child}</span>
                                            <span className="text-[11px] font-bold text-[#AAA] uppercase tracking-widest leading-none">({flag.age})</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Lock size={14} className="text-[#AAA]" />
                                            <span className="text-[13px] font-black text-black uppercase tracking-tight">{flag.awc} AWC</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-8 border-t border-[#F9F9F9] relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-xl border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-black shadow-sm">AW</div>
                                        ))}
                                    </div>
                                    <div className="text-[11px] font-black uppercase tracking-widest text-[#AAA]">Assigned Workers</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="h-12 px-8 bg-white border-2 border-black text-black rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-xl shadow-black/5">Re-Assign</button>
                                    <button className="h-12 px-8 bg-black text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.4em] hover:bg-gray-800 transition-all shadow-2xl shadow-black/20 flex items-center gap-3">
                                        <Zap size={18} /> Resolve
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button className="w-full py-8 text-[11px] font-black uppercase text-[#BBB] hover:text-black tracking-[0.6em] transition-all">Consolidated Regional Logs</button>
                </div>

                <div className="lg:col-span-4 space-y-12 animate-in slide-in-from-right-4 duration-1000">
                    <div className="bg-white border border-[#E5E5E5] rounded-[40px] p-10 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 transition-transform">
                            <Activity size={140} />
                        </div>
                        <h3 className="text-[14px] font-black uppercase tracking-widest text-black flex items-center gap-3 mb-10 relative z-10">
                            <Activity size={18} /> Signal Matrix
                        </h3>
                        <div className="space-y-10 relative z-10">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-[#AAA] uppercase tracking-widest">Resolution Rate</p>
                                <div className="flex items-end justify-between border-b-2 border-black/5 pb-4">
                                    <span className="text-[48px] font-black italic leading-none">84.5%</span>
                                    <span className="text-[12px] font-black text-green-600 uppercase tracking-widest">+2.4% Δ</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-[#AAA] uppercase tracking-widest">Escalation Velocity</p>
                                <div className="flex items-end justify-between border-b-2 border-black/5 pb-4">
                                    <span className="text-[48px] font-black italic leading-none">1.4h</span>
                                    <span className="text-[12px] font-black text-black/40 uppercase tracking-widest">AVG TRIG</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-black p-10 rounded-[40px] shadow-2xl text-white relative overflow-hidden group border border-white/5">
                        <div className="absolute bottom-[-20px] left-[-20px] w-64 h-64 bg-white opacity-[0.03] rounded-full group-hover:scale-110 transition-transform duration-1000" />
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/5 shadow-inner cursor-pointer hover:scale-110 transition-transform">
                                    <MessageSquare size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[12px] font-black uppercase tracking-widest text-white/40 mb-1">State Directives</h3>
                                    <p className="text-[14px] font-black uppercase tracking-tighter italic">Unified Feed Active</p>
                                </div>
                            </div>
                            <div className="p-6 bg-white/5 border border-white/5 rounded-3xl space-y-4 hover:border-white/10 transition-all">
                                <p className="text-[11px] font-black uppercase text-white/40 tracking-widest flex items-center justify-between">
                                    From CDPO North <span className="text-[9px] opacity-40 italic">14m ago</span>
                                </p>
                                <p className="text-[13px] font-medium leading-relaxed italic opacity-80 uppercase tracking-tight">"Protocol update: All Ph-2 developmental flags require medical certify sync within 48h."</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)] animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Node Sync: Optimal Grade</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CdpoFlags;
