'use client';

import React, { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie,
    Legend
} from 'recharts';
import {
    Scan,
    TrendingUp,
    ShieldCheck,
    Clock,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    ChevronDown,
    Activity,
    Map,
    Award,
    Zap,
    Users,
    PieChart as PieIcon
} from 'lucide-react';

const CdpoScreening: React.FC = () => {
    const [subView, setSubView] = useState<'Coverage' | 'Risk'>('Risk');

    const coverageTrend = [
        { month: 'Oct', coverage: 42 },
        { month: 'Nov', coverage: 58 },
        { month: 'Dec', coverage: 74 },
        { month: 'Jan', coverage: 82 },
        { month: 'Feb', coverage: 89 },
    ];

    const riskDistribution = [
        { name: 'Low', value: 2340, color: '#000000' },
        { name: 'Medium', value: 934, color: '#444444' },
        { name: 'High', value: 467, color: '#888888' },
        { name: 'Critical', value: 149, color: '#CCCCCC' },
    ];

    const ageGroups = [
        { group: '0-1y', screened: 450, total: 600 },
        { group: '1-3y', screened: 1200, total: 1500 },
        { group: '3-6y', screened: 2240, total: 2400 },
    ];

    const kpis = [
        { label: 'TOTAL SCREENED', value: '3,890', delta: '+412', isUp: true, color: 'black' },
        { label: 'COVERAGE RATE', value: '82.4%', delta: '+5.2%', isUp: true, color: 'black' },
        { label: 'HIGH RISK (PH-2)', value: '616', delta: '-12', isUp: false, color: 'red-500' },
        { label: 'SYNC LATENCY', value: '1.4h', delta: '-0.2h', isUp: false, color: 'black' },
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                <div>
                    <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">Screening Matrix</h1>
                    <p className="text-[14px] text-[#888888] font-medium flex items-center gap-2">
                        <Scan size={14} />
                        Kondapur CDPO Node • Field Coverage Intelligence
                    </p>
                </div>
                <div className="flex bg-white shadow-sm border border-[#E5E5E5] rounded-2xl p-1 shrink-0">
                    {['Coverage', 'Risk'].map((v) => (
                        <button
                            key={v}
                            onClick={() => setSubView(v as any)}
                            className={`px-6 py-2 text-[11px] font-black uppercase rounded-xl transition-all ${subView === v ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-[#888] hover:text-black hover:bg-gray-50'}`}
                        >
                            {v}
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
                                <span className={`text-[42px] font-black tracking-tighter leading-none italic ${kpi.color === 'red-500' ? 'text-red-500' : 'text-black'}`}>{kpi.value}</span>
                                <div className={`flex items-center gap-1.5 text-[12px] font-black ${(kpi.isUp) ? 'text-green-600' : 'text-[#AAA]'}`}>
                                    {kpi.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {kpi.delta}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* CHARTS SECTION */}
                <div className="lg:col-span-12 space-y-12 animate-in slide-in-from-bottom-4 duration-700">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* COVERAGE TREND */}
                        <div className="bg-white p-10 rounded-[40px] border border-[#E5E5E5] shadow-sm group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 transition-transform">
                                <TrendingUp size={160} />
                            </div>
                            <div className="flex items-center justify-between mb-12 relative z-10">
                                <h3 className="text-[14px] font-black uppercase tracking-widest text-[#AAA] flex items-center gap-3">
                                    <Activity size={18} /> Coverage Momentum
                                </h3>
                                <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100 shadow-inner">
                                    <button className="px-4 py-1.5 text-[10px] font-black uppercase bg-white border border-gray-100 rounded-lg shadow-sm">Monthly</button>
                                    <button className="px-4 py-1.5 text-[10px] font-black uppercase text-[#AAA]">Quarterly</button>
                                </div>
                            </div>
                            <div className="h-[340px] w-full relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={coverageTrend}>
                                        <defs>
                                            <linearGradient id="colorCov" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#000000" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'bold', fill: '#888' }} dy={15} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'bold', fill: '#888' }} unit="%" dx={-10} domain={[0, 100]} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontWeight: 'black', textTransform: 'uppercase', fontSize: '10px' }}
                                        />
                                        <Area type="monotone" dataKey="coverage" stroke="#000000" strokeWidth={4} fillOpacity={1} fill="url(#colorCov)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* RISK PIE */}
                        <div className="bg-white p-10 rounded-[40px] border border-[#E5E5E5] shadow-sm group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 transition-transform">
                                <PieIcon size={160} />
                            </div>
                            <h3 className="text-[14px] font-black uppercase tracking-widest text-[#AAA] mb-12 flex items-center gap-3 relative z-10">
                                <PieIcon size={18} /> Risk Stratification
                            </h3>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                                <div className="h-[280px] w-[280px] relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={riskDistribution}
                                                innerRadius={80}
                                                outerRadius={110}
                                                paddingAngle={6}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {riskDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                                        <p className="text-[10px] font-black text-[#AAA] uppercase tracking-widest mb-1">Total</p>
                                        <p className="text-[32px] font-black tracking-tighter leading-none italic">3,890</p>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-6">
                                    {riskDistribution.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between group/item">
                                            <div className="flex items-center gap-4">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="text-[12px] font-black text-[#555] uppercase tracking-widest">{item.name} Tier</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[14px] font-black text-black leading-none">{item.value}</p>
                                                <p className="text-[10px] text-[#AAA] font-black mt-1">Beneficiaries</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* AGE GROUPS BAR */}
                        <div className="bg-white p-10 rounded-[40px] border border-[#E5E5E5] shadow-sm group relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 transition-transform">
                                <Users size={140} />
                            </div>
                            <h3 className="text-[14px] font-black uppercase tracking-widest text-[#AAA] mb-12 flex items-center gap-3 relative z-10">
                                <Users size={18} /> Demographic Breakdown
                            </h3>
                            <div className="h-[300px] w-full relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={ageGroups} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F5F5F5" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="group" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'black', fill: '#000' }} />
                                        <Tooltip />
                                        <Bar dataKey="screened" fill="#000000" radius={[0, 8, 8, 0]} barSize={24} />
                                        <Bar dataKey="total" fill="#F0F0F0" radius={[0, 8, 8, 0]} barSize={24} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* ACTION CARD */}
                        <div className="bg-black p-10 rounded-[40px] shadow-2xl text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                                <Award size={120} />
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-between space-y-8">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl border border-white/5 flex items-center justify-center text-white"><ShieldCheck size={20} /></div>
                                        <h3 className="text-[11px] font-black uppercase tracking-widest text-white/40">Regional Directive</h3>
                                    </div>
                                    <h2 className="text-[28px] font-black tracking-tighter uppercase leading-tight italic">Consolidated Ph-2 Registry — Kondapur Node Active.</h2>
                                    <p className="text-[14px] text-white/60 font-medium uppercase tracking-tight">Systematic audit of all high-risk flags must be completed within 12h of trigger sync.</p>
                                </div>
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <button className="flex-1 w-full px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[12px] hover:scale-105 transition-all shadow-2xl shadow-white/10">Initiate Regional Audit</button>
                                    <button className="p-4 bg-white/10 border border-white/10 rounded-2xl text-white hover:bg-white/20 transition-all"><Map size={20} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CdpoScreening;
