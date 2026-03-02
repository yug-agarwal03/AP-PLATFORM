'use client';

import React, { useState } from 'react';
import {
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Filter,
    Search,
    ChevronDown,
    MoreVertical,
    FileText,
    PieChart as PieIcon,
    BarChart2,
    CheckCircle2,
    AlertTriangle,
    Zap,
    Map,
    Award,
    TrendingUp,
    Star,
    ShieldCheck,
    User,
    ChevronRight
} from 'lucide-react';

const CdpoPerformance: React.FC = () => {
    const performances = [
        { id: 'AWW-101', name: 'Lakshmi Devi', mandal: 'Kondapur', role: 'Anganwadi Worker', coverage: 94, score: 92, flags: 0, status: 'Top Performer', lastActive: '2m ago' },
        { id: 'AWW-104', name: 'Savitri Bai', mandal: 'Kondapur', role: 'Anganwadi Worker', coverage: 82, score: 85, flags: 2, status: 'Compliant', lastActive: '14m ago' },
        { id: 'AWW-108', name: 'Rani Kumari', mandal: 'Nellore', role: 'Anganwadi Worker', coverage: 48, score: 54, flags: 8, status: 'Under Review', lastActive: '1h ago' },
        { id: 'AWW-112', name: 'Meena Sahani', mandal: 'Mallapur', role: 'Anganwadi Worker', coverage: 76, score: 78, flags: 1, status: 'Compliant', lastActive: '34m ago' },
        { id: 'AWW-115', name: 'Anitha S.', mandal: 'Nellore', role: 'Anganwadi Worker', coverage: 91, score: 88, flags: 0, status: 'Top Performer', lastActive: '8m ago' },
    ];

    const highlights = [
        { label: 'AVG COVERAGE', value: '78%', icon: <TrendingUp size={20} />, color: 'black' },
        { label: 'TOP PERFORMERS', value: '42', icon: <Award size={20} />, color: 'green' },
        { label: 'BELOW TARGET', value: '18', icon: <AlertTriangle size={20} />, color: 'red' },
        { label: 'RESPONSE TIME', value: '1.4d', icon: <Clock size={20} />, color: 'black' },
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                <div>
                    <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">Personnel Hub</h1>
                    <p className="text-[14px] text-[#888888] font-medium flex items-center gap-2">
                        <User size={14} />
                        Kondapur CDPO Node • Field Compliance Analytics
                    </p>
                </div>
                <div className="flex bg-white shadow-sm border border-[#E5E5E5] rounded-2xl p-1 shrink-0">
                    {['Performance', 'Compliance', 'Directory'].map((pill) => (
                        <button
                            key={pill}
                            className={`px-6 py-2 text-[11px] font-black uppercase rounded-xl transition-all ${pill === 'Performance' ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-[#888] hover:text-black hover:bg-gray-50'}`}
                        >
                            {pill}
                        </button>
                    ))}
                </div>
            </div>

            {/* PERFORMANCE HIGHLIGHTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {highlights.map((item, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[32px] border border-[#E5E5E5] shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-all">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            <span className="text-[11px] font-black text-[#888888] uppercase tracking-[0.2em] mb-8">{item.label}</span>
                            <div className="flex items-end justify-between">
                                <span className={`text-[42px] font-black tracking-tighter leading-none italic ${item.color === 'green' ? 'text-green-600' : item.color === 'red' ? 'text-red-500' : 'text-black'
                                    }`}>{item.value}</span>
                                <div className="p-2 border border-[#EEE] rounded-xl hover:bg-black hover:text-white transition-all cursor-pointer shadow-sm">
                                    <ChevronRight size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* MAIN SCOREBOARD */}
            <div className="bg-white border border-[#E5E5E5] rounded-[40px] shadow-sm overflow-hidden group">
                <div className="p-10 border-b border-[#F0F0F0] flex justify-between items-center bg-[#fcfcfc] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:rotate-12 transition-transform">
                        <Award size={160} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-[16px] font-black uppercase tracking-widest text-black mb-1">Personnel Scoreboard</h3>
                        <p className="text-[13px] text-[#888] font-medium uppercase tracking-tight">Consolidated AWW/Screener matrix across Kondapur command</p>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="relative group/search">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BBB] group-focus-within/search:text-black transition-colors" />
                            <input type="text" placeholder="Search workers..." className="pl-12 pr-6 h-12 bg-white border-2 border-[#F0F0F0] rounded-2xl text-[13px] w-[260px] focus:border-black outline-none transition-all font-black uppercase tracking-tight shadow-sm" />
                        </div>
                        <button className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-black bg-white px-6 py-3 rounded-xl border border-[#EEE] hover:border-black transition-all shadow-sm">
                            <Filter size={16} /> Filter Scale
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[#AAA] font-black uppercase tracking-widest text-[10px] border-b border-[#F0F0F0] bg-gray-50/50">
                                <th className="px-10 py-6">ID & Worker Profile</th>
                                <th className="px-10 py-6 text-center">Geography</th>
                                <th className="px-10 py-6 text-center">Score Node</th>
                                <th className="px-10 py-6 text-center">Coverage Pulse</th>
                                <th className="px-10 py-6 text-center">Signal Status</th>
                                <th className="px-10 py-6 text-right">Liveliness</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0F0F0]">
                            {performances.map((perf) => (
                                <tr key={perf.id} className="hover:bg-gray-50/80 transition-all group cursor-pointer">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl bg-black/5 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm group-hover:shadow-2xl group-hover:shadow-black/10 text-[20px] font-black">
                                                {perf.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-black text-[18px] leading-tight uppercase tracking-tighter italic">{perf.name}</p>
                                                <p className="text-[11px] text-[#AAA] font-black tracking-widest uppercase mt-1.5 flex items-center gap-2">
                                                    {perf.id} • {perf.role}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-center text-[#555] font-black uppercase tracking-tighter text-[13px]">{perf.mandal}</td>
                                    <td className="px-10 py-8 text-center">
                                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl border-2 font-black text-[16px] italic shadow-sm transition-all group-hover:scale-110 ${perf.score >= 90 ? 'bg-green-50 text-green-700 border-green-200' :
                                                perf.score >= 70 ? 'bg-black text-white border-black' : 'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                            {perf.score}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col gap-2 min-w-[120px]">
                                            <div className="flex justify-between text-[11px] font-black italic">
                                                <span>{perf.coverage}%</span>
                                                <span className="text-[#AAA] uppercase font-bold tracking-widest text-[9px]">District Target</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                                                <div className={`h-full transition-all duration-1000 ${perf.coverage >= 90 ? 'bg-green-500' :
                                                        perf.coverage >= 70 ? 'bg-black' : 'bg-red-500'
                                                    }`} style={{ width: `${perf.coverage}%` }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border-2 ${perf.status === 'Top Performer' ? 'bg-green-50 text-green-700 border-green-200 shadow-xl shadow-green-100' :
                                                perf.status === 'Compliant' ? 'bg-black text-white border-black' : 'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                            {perf.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[13px] font-black text-black uppercase tracking-tight">{perf.lastActive}</span>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                                <span className="text-[10px] text-[#AAA] font-black uppercase tracking-widest">Active</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-10 bg-gray-50/50 flex items-center justify-between border-t border-[#F0F0F0]">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center"><Star size={20} fill="currentColor" /></div>
                        <p className="text-[13px] font-black uppercase tracking-tight text-black">Total Personnel Index</p>
                    </div>
                    <button className="text-[11px] font-black uppercase tracking-widest text-black hover:underline underline-offset-8 decoration-gray-300">Expand Regional Matrix</button>
                    <p className="text-[11px] font-black text-[#888] uppercase tracking-[0.2em] italic">Authenticated By CDPO Node 44</p>
                </div>
            </div>

            {/* PERFORMANCE TREND SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-black p-12 rounded-[40px] shadow-2xl text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <ShieldCheck size={120} />
                    </div>
                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-xl border border-white/5 flex items-center justify-center text-white"><ShieldCheck size={20} /></div>
                            <h3 className="text-[14px] font-black uppercase tracking-widest text-white/40">Compliance Directive</h3>
                        </div>
                        <h2 className="text-[28px] font-black tracking-tighter uppercase leading-tight italic">AWW Field Training Protocol — Q1 Target Implementation Active.</h2>
                        <p className="text-[14px] text-white/60 font-medium uppercase tracking-tight">Personnel qualifying for technical tier-2 screening must complete regional certify matrix by March end.</p>
                        <button className="px-10 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[12px] hover:scale-105 transition-all shadow-2xl shadow-white/10">Dispatch Alerts</button>
                    </div>
                </div>

                <div className="bg-white border-2 border-black p-12 rounded-[40px] shadow-sm relative overflow-hidden group">
                    <div className="absolute bottom-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform">
                        <TrendingUp size={160} />
                    </div>
                    <div className="relative z-10 space-y-8">
                        <h3 className="text-[14px] font-black uppercase tracking-widest text-black">Momentum Indicator</h3>
                        <div className="flex items-end gap-6 border-b-2 border-black/5 pb-8">
                            <span className="text-[64px] font-black tracking-tighter leading-none italic">+14%</span>
                            <div className="pb-2">
                                <p className="text-[12px] font-black uppercase tracking-widest text-green-600">Regional Velocity</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#AAA]">Current Cycle vs Previous</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <p className="text-[11px] font-black text-[#AAA] uppercase tracking-widest">Active nodes</p>
                                <p className="text-[20px] font-black uppercase italic">152/156</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[11px] font-black text-[#AAA] uppercase tracking-widest">Efficiency</p>
                                <p className="text-[20px] font-black uppercase italic">High Grade</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CdpoPerformance;
