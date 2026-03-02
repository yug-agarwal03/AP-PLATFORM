'use client';

import React, { useState } from 'react';
import {
    Activity,
    ArrowRight,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Filter,
    Search,
    ChevronDown,
    MoreVertical,
    FileText,
    ExternalLink,
    PieChart as PieIcon,
    BarChart2,
    CheckCircle2,
    AlertTriangle,
    Zap,
    Map
} from 'lucide-react';

const CdpoReferrals: React.FC = () => {
    const kpis = [
        { label: 'TOTAL REFERRALS', value: '467', delta: '+12%', isUp: true, color: '#000000' },
        { label: 'PENDING ESCALATIONS', value: '28', delta: '-5%', isUp: false, color: '#EF4444' },
        { label: 'COMPLETED AUDITS', value: '389', delta: '+18%', isUp: true, color: '#22C55E' },
        { label: 'AVG TURNAROUND', value: '4.2d', delta: '-0.5d', isUp: false, color: '#000000' },
        { label: 'OPEN FLAGS', value: '14', delta: '-2', isUp: false, color: '#000000' },
    ];

    const pipelineSteps = [
        { stage: 'REFERRAL TRIGGERED', count: '467', desc: 'Screener initial flags' },
        { stage: 'MANDAL AUDIT', count: '124', desc: 'Ph-2 assessment active' },
        { stage: 'CDPO ESCALATED', count: '42', desc: 'Critical node review' },
        { stage: 'DPO TRANSMITTED', count: '18', desc: 'External medical dispatch' },
    ];

    const referrals = [
        { id: 'REF-1002', child: 'Priya Sharma', age: '4y 2m', mandal: 'Kondapur', awc: 'Rampur-A', priority: 'CRITICAL', status: 'CDPO Review', days: '2d' },
        { id: 'REF-1004', child: 'Rahul K.', age: '3y 8m', mandal: 'Nellore', awc: 'North-B', priority: 'HIGH', status: 'Mandal Audit', days: '4d' },
        { id: 'REF-1005', child: 'Sneha M.', age: '5y 1m', mandal: 'Kondapur', awc: 'Cen-2', priority: 'MEDIUM', status: 'Completed', days: '1d' },
        { id: 'REF-1008', child: 'Arjun V.', age: '4y 11m', mandal: 'Mallapur', awc: 'G-Road', priority: 'CRITICAL', status: 'DPO Transmit', days: '3d' },
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                <div>
                    <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">Referral Pipeline</h1>
                    <p className="text-[14px] text-[#888888] font-medium flex items-center gap-2">
                        <Activity size={14} fill="currentColor" />
                        Kondapur CDPO Node • Clinical Dispatch Intelligence
                    </p>
                </div>
                <div className="flex bg-white shadow-sm border border-[#E5E5E5] rounded-2xl p-1 shrink-0">
                    {['Pipeline', 'Geography', 'Efficiency'].map((pill) => (
                        <button
                            key={pill}
                            className={`px-6 py-2 text-[11px] font-black uppercase rounded-xl transition-all ${pill === 'Pipeline' ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-[#888] hover:text-black hover:bg-gray-50'}`}
                        >
                            {pill}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[32px] border border-[#E5E5E5] shadow-sm group hover:scale-[1.02] transition-all">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[11px] font-black text-[#888888] uppercase tracking-[0.2em]">{kpi.label}</span>
                        </div>
                        <div className="text-[42px] font-black tracking-tighter leading-none mb-4 italic" style={{ color: kpi.color }}>{kpi.value}</div>
                        <div className="flex items-center justify-between">
                            <div className={`flex items-center gap-1.5 text-[12px] font-black ${(kpi.isUp && kpi.label !== 'PENDING ESCALATIONS') || (!kpi.isUp && kpi.label === 'PENDING ESCALATIONS') ? 'text-green-600' : 'text-red-500'}`}>
                                {kpi.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {kpi.delta}
                            </div>
                            <div className="w-8 h-1 bg-black/5 rounded-full overflow-hidden">
                                <div className="h-full bg-black/20" style={{ width: '60%' }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* PIPELINE FUNNEL */}
            <div className="bg-white border border-[#E5E5E5] rounded-[40px] shadow-sm p-10 group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform">
                    <Activity size={160} />
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
                    <h3 className="text-[14px] font-black uppercase tracking-widest text-black flex items-center gap-3">
                        <Zap size={18} /> Functional Referral Funnel
                    </h3>
                    <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                        <button className="px-4 py-1.5 text-[10px] font-black uppercase bg-white shadow-sm border border-gray-100 rounded-lg">Real-time Node</button>
                        <button className="px-4 py-1.5 text-[10px] font-black uppercase text-[#AAA]">Historic</button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-stretch gap-4 relative z-10">
                    {pipelineSteps.map((step, i) => (
                        <React.Fragment key={i}>
                            <div className="flex-1 bg-black p-8 rounded-3xl text-white group/step hover:scale-[1.02] transition-all shadow-2xl shadow-black/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <span className="text-[32px] font-black italic">0{i + 1}</span>
                                </div>
                                <p className="text-[10px] font-black uppercase opacity-40 tracking-[0.2em] mb-4">{step.stage}</p>
                                <p className="text-[48px] font-black tracking-tighter leading-none italic mb-4">{step.count}</p>
                                <p className="text-[12px] font-bold text-white/40 uppercase tracking-tight">{step.desc}</p>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                                    <div className="h-full bg-white opacity-40" style={{ width: `${100 - (i * 20)}%` }} />
                                </div>
                            </div>
                            {i < pipelineSteps.length - 1 && (
                                <div className="hidden lg:flex items-center justify-center px-2 opacity-10">
                                    <ArrowRight size={32} />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* ACTIVE REFERRALS TABLE */}
            <div className="bg-white border border-[#E5E5E5] rounded-[40px] shadow-sm overflow-hidden group">
                <div className="p-10 border-b border-[#F0F0F0] flex justify-between items-center bg-[#fcfcfc] relative overflow-hidden">
                    <div className="absolute bottom-[-20px] left-[-20px] p-8 opacity-[0.02] group-hover:scale-110 transition-transform">
                        <Map size={140} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-[16px] font-black uppercase tracking-widest text-black mb-1">Active Case Registry</h3>
                        <p className="text-[13px] text-[#888] font-medium uppercase tracking-tight">Real-time tracking of regional medical dispatch</p>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="relative group/search">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BBB] group-focus-within/search:text-black transition-colors" />
                            <input type="text" placeholder="Search children..." className="pl-12 pr-6 h-12 bg-white border-2 border-[#F0F0F0] rounded-2xl text-[13px] w-[280px] focus:border-black outline-none transition-all font-black uppercase tracking-tight shadow-sm" />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto relative z-10">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[#AAA] font-black uppercase tracking-widest text-[10px] border-b border-[#F0F0F0] bg-gray-50/50">
                                <th className="px-10 py-6">ID & Beneficiary</th>
                                <th className="px-10 py-6">Geography</th>
                                <th className="px-10 py-6 text-center">Priority</th>
                                <th className="px-10 py-6 text-center">Status Tier</th>
                                <th className="px-10 py-6 text-right">Ageing</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0F0F0]">
                            {referrals.map((ref) => (
                                <tr key={ref.id} className="hover:bg-gray-50/80 transition-all group cursor-pointer">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl bg-black/5 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm group-hover:shadow-2xl group-hover:shadow-black/10">
                                                <FileText size={22} />
                                            </div>
                                            <div>
                                                <p className="font-black text-black text-[18px] leading-tight uppercase tracking-tighter italic">{ref.child}</p>
                                                <p className="text-[11px] text-[#AAA] font-black tracking-widest uppercase mt-1.5 flex items-center gap-2">
                                                    {ref.id} • {ref.age}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <p className="font-black text-black uppercase text-[13px] tracking-tight">{ref.mandal} Mandal</p>
                                        <p className="text-[11px] text-[#AAA] font-bold uppercase tracking-widest">{ref.awc} AWC</p>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <span className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-[0.1em] border-2 shadow-sm ${ref.priority === 'CRITICAL' ? 'bg-red-50 text-red-600 border-red-100 shadow-red-200' :
                                                ref.priority === 'HIGH' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-green-50 text-green-600 border-green-100'
                                            }`}>
                                            {ref.priority}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-[#EEE] bg-[#FCFCFC] rounded-full">
                                            <div className={`w-2 h-2 rounded-full ${ref.status === 'Completed' ? 'bg-green-500' : 'bg-black animate-pulse'}`} />
                                            <span className="text-[11px] font-black uppercase tracking-widest text-[#555]">{ref.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[16px] font-black text-black italic">T+{ref.days}</span>
                                            <span className="text-[10px] text-[#AAA] font-black uppercase tracking-widest">Since Trigger</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="w-full py-6 bg-gray-50/50 text-[11px] font-black uppercase text-black hover:bg-black hover:text-white tracking-[0.4em] border-t border-[#F0F0F0] transition-all">
                    Load Consolidated Referral Registry
                </button>
            </div>
        </div>
    );
};

export default CdpoReferrals;
