'use client';

import React, { useState } from 'react';
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    PieChart,
    Pie,
    CartesianGrid,
    Legend,
    Treemap,
    LineChart,
    Line
} from 'recharts';
import { Scorecard } from './DpoUI';
import { KPI } from '@/lib/dpo/types';
import {
    ChevronRight,
    Search,
    ArrowUpRight,
    AlertCircle,
    Activity,
    Thermometer,
    ShieldAlert,
    BarChart3,
    Filter,
    Layers,
    ActivitySquare,
    ChevronDown
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const DpoRiskAnalysis: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'Coverage' | 'Risk' | 'Trends'>('Coverage');
    const [trendType, setTrendType] = useState<'Coverage' | 'Risk' | 'Volume'>('Coverage');

    const coverageKpis: KPI[] = [
        { label: 'TOTAL CHILDREN', value: '28,500', trend: [20, 22, 24, 25, 28.5], change: '+1.2%', isPositive: true },
        { label: 'SCREENED', value: '18,200', trend: [10, 12, 15, 17, 18.2], change: '+4.5%', isPositive: true },
        { label: 'UNSCREENED', value: '10,300', trend: [15, 14, 12, 11, 10.3], change: '-2.8%', isPositive: true },
        { label: 'COVERAGE RATE', value: '64%', trend: [58, 60, 61, 63, 64], change: '+3.0%', isPositive: true },
    ];

    const riskKpis = [
        { label: 'LOW RISK', value: '12,400', color: '#22c55e', percentage: '68%', change: '+2.1%', icon: Activity },
        { label: 'MEDIUM RISK', value: '4,200', color: '#eab308', percentage: '23%', change: '-0.5%', icon: ActivitySquare },
        { label: 'HIGH RISK', value: '1,200', color: '#f97316', percentage: '7%', change: '-1.2%', icon: AlertCircle },
        { label: 'CRITICAL', value: '400', color: '#ef4444', percentage: '2%', change: '+0.1%', icon: ShieldAlert },
    ];

    const treemapData = [
        { id: 1, name: 'Kondapur Central', size: 6200, coverage: 87, color: '#000000' },
        { id: 2, name: 'Nellore North', size: 5800, coverage: 38, color: '#ef4444' },
        { id: 3, name: 'Guntur East', size: 4900, coverage: 63, color: '#333333' },
        { id: 4, name: 'Tirupati South', size: 7100, coverage: 63, color: '#333333' },
        { id: 5, name: 'Vizag West', size: 6500, coverage: 74, color: '#111111' },
    ];

    const domainHeatmap = [
        { domain: 'Gross Motor (GM)', scores: [2, 8, 4, 3, 1] },
        { domain: 'Fine Motor (FM)', scores: [1, 5, 2, 2, 0] },
        { domain: 'Lang/Communication (LC)', scores: [5, 12, 6, 8, 3] },
        { domain: 'Cognitive (COG)', scores: [3, 9, 3, 4, 2] },
        { domain: 'Socio-Emotional (SE)', scores: [1, 4, 2, 3, 1] },
    ];

    const cdpos = ['Central', 'North', 'East', 'South', 'West'];

    const riskHistory = [
        { name: 'Jan', Low: 60, Med: 25, High: 10, Crit: 5 },
        { name: 'Feb', Low: 62, Med: 24, High: 10, Crit: 4 },
        { name: 'Mar', Low: 61, Med: 25, High: 11, Crit: 3 },
        { name: 'Apr', Low: 64, Med: 23, High: 10, Crit: 3 },
        { name: 'May', Low: 66, Med: 22, High: 9, Crit: 3 },
        { name: 'Jun', Low: 68, Med: 23, High: 7, Crit: 2 },
    ];

    const highRiskChildren = [
        { id: 10002, name: 'Sita M.', age: '4y 1m', awc: 'AWC 02', mandal: 'Mandal B', cdpo: 'North', risk: 'High', score: 82, conditions: 'Delayed Motor', status: 'Pending' },
        { id: 10005, name: 'Rajesh K.', age: '3y 8m', awc: 'AWC 14', mandal: 'Mandal X', cdpo: 'North', risk: 'Critical', score: 94, conditions: 'Severe Malnutrition', status: 'Referred' },
        { id: 10009, name: 'Anjali P.', age: '2y 11m', awc: 'AWC 08', mandal: 'Mandal D', cdpo: 'Central', risk: 'High', score: 78, conditions: 'Cognitive Delay', status: 'Scheduled' },
        { id: 10012, name: 'Vikram S.', age: '5y 2m', awc: 'AWC 21', mandal: 'Mandal G', cdpo: 'South', risk: 'Critical', score: 91, conditions: 'Multiple Domains', status: 'In Review' },
    ];

    const multiLineData = [
        { month: 'Jan', North: 32, Central: 80, East: 55, South: 58, West: 68, target: 75 },
        { month: 'Feb', North: 34, Central: 82, East: 57, South: 59, West: 70, target: 75 },
        { month: 'Mar', North: 35, Central: 84, East: 58, South: 61, West: 71, target: 75 },
        { month: 'Apr', North: 36, Central: 85, East: 60, South: 62, West: 72, target: 75 },
        { month: 'May', North: 37, Central: 86, East: 62, South: 63, West: 73, target: 75 },
        { month: 'Jun', North: 38, Central: 87, East: 63, South: 63, West: 74, target: 75 },
    ];

    const getColorByCoverage = (cov: number) => {
        if (cov < 40) return '#ef4444';
        if (cov < 60) return '#eab308';
        if (cov < 80) return '#555555';
        return '#000000';
    };

    const getColorByConcern = (score: number) => {
        const opacity = Math.min(score / 15, 1);
        return `rgba(0, 0, 0, ${opacity})`;
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">Screening & Risk Analysis</h1>
                    <p className="text-[14px] text-[#888888] font-medium flex items-center gap-2">
                        <Activity size={14} />
                        District Vitals • {coverageKpis[3].value} Coverage Across 28.5k Census
                    </p>
                </div>
                <div className="flex bg-white shadow-sm border border-[#E5E5E5] rounded-xl p-1">
                    {['Week', 'Month', 'Quarter', 'Year'].map((pill) => (
                        <button key={pill} className={`px-5 py-1.5 text-[11px] font-black uppercase rounded-lg transition-all ${pill === 'Month' ? 'bg-black text-white shadow-lg shadow-black/10' : 'text-[#888] hover:text-black hover:bg-gray-50'}`}>{pill}</button>
                    ))}
                </div>
            </div>

            <div className="flex gap-10 border-b border-[#F0F0F0] px-2 overflow-x-auto scrollbar-hide">
                {[
                    { id: 'Coverage', label: 'Coverage Matrix' },
                    { id: 'Risk', label: 'Risk Distribution' },
                    { id: 'Trends', label: 'Performance Trends' }
                ].map(tab => {
                    const isActive = activeTab === (tab.id === 'Risk Distribution' ? 'Risk' : tab.id as any);
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

            {activeTab === 'Coverage' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-700">
                    <div className="flex flex-nowrap gap-5 overflow-x-auto pb-4 scrollbar-hide">
                        {coverageKpis.map(kpi => <Scorecard key={kpi.label} kpi={kpi} />)}
                    </div>

                    <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden group">
                        <div className="p-8 border-b border-[#F0F0F0] flex justify-between items-center bg-[#fcfcfc]">
                            <div>
                                <h3 className="text-[14px] font-black uppercase tracking-widest text-black">Coverage Intensity Map</h3>
                                <p className="text-[12px] text-[#888] font-medium">Regional screening efficiency by child volume</p>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/5 border border-[#F0F0F0]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <Treemap
                                        data={treemapData}
                                        dataKey="size"
                                        aspectRatio={16 / 9}
                                        stroke="#fff"
                                        onClick={(data: any) => data && router.push(`/dpo/cdpos/${data.id}`)}
                                        content={(props: any) => {
                                            const { x, y, width, height, index, name, coverage } = props;
                                            return (
                                                <g className="cursor-pointer hover:opacity-90 transition-opacity">
                                                    <rect x={x} y={y} width={width} height={height} fill={getColorByCoverage(coverage)} stroke="#fff" strokeWidth={2} />
                                                    {width > 120 && height > 60 && (
                                                        <>
                                                            <text x={x + 20} y={y + 35} fill="#fff" fontSize={14} fontWeight="black" textAnchor="start" className="uppercase tracking-widest">{name}</text>
                                                            <text x={x + 20} y={y + 55} fill="rgba(255,255,255,0.6)" fontSize={11} fontWeight="bold" textAnchor="start" className="uppercase tracking-widest">{coverage}% COVERAGE</text>
                                                            <rect x={x + 20} y={y + 70} width={width - 40} height={4} fill="rgba(255,255,255,0.1)" rx={2} />
                                                            <rect x={x + 20} y={y + 70} width={(width - 40) * (coverage / 100)} height={4} fill="#fff" rx={2} />
                                                        </>
                                                    )}
                                                </g>
                                            );
                                        }}
                                    />
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden">
                            <div className="px-8 py-6 bg-red-50/30 border-b border-red-100 flex items-center gap-4">
                                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-200">
                                    <AlertCircle size={20} />
                                </div>
                                <h3 className="text-[14px] font-black uppercase tracking-widest text-black">Critically Underscreened</h3>
                            </div>
                            <div className="p-0 overflow-x-auto">
                                <table className="w-full text-left text-[13px] border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-[#F0F0F0] text-[10px] font-black uppercase tracking-widest text-[#888]">
                                            <th className="px-8 py-4">Mandal Node</th>
                                            <th className="px-8 py-4 text-center">Depth %</th>
                                            <th className="px-8 py-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#F0F0F0]">
                                        {[
                                            { name: 'Mandal X', cdpo: 'North', coverage: 32, activity: '2 days ago' },
                                            { name: 'Mandal Y', cdpo: 'North', coverage: 38, activity: 'Yesterday' },
                                            { name: 'Mandal Z', cdpo: 'South', coverage: 42, activity: '4 days ago' },
                                            { name: 'Mandal Q', cdpo: 'West', coverage: 48, activity: '1 week ago' },
                                        ].map(m => (
                                            <tr key={m.name} className="hover:bg-red-50/20 transition-all cursor-pointer group">
                                                <td className="px-8 py-5">
                                                    <div className="font-black text-black uppercase tracking-tighter text-[14px]">{m.name}</div>
                                                    <div className="text-[10px] text-[#AAA] font-bold uppercase tracking-widest leading-none mt-1">CDPO: {m.cdpo} Node</div>
                                                </td>
                                                <td className="px-8 py-5 text-center">
                                                    <div className={`text-[16px] font-black ${m.coverage < 35 ? 'text-red-600' : 'text-amber-600'}`}>
                                                        {m.coverage}%
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="text-[10px] text-[#AAA] font-black uppercase tracking-widest">Active {m.activity}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm">
                            <h3 className="text-[14px] font-black uppercase tracking-widest text-black mb-10 flex items-center gap-2">
                                <Layers size={16} /> Demographic Coverage Depth
                            </h3>
                            <div className="h-[240px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={[
                                        { age: '0-1Y', screened: 450, total: 1200 },
                                        { age: '1-2Y', screened: 800, total: 1500 },
                                        { age: '2-3Y', screened: 1200, total: 1800 },
                                        { age: '3-4Y', screened: 1500, total: 2000 },
                                        { age: '4-5Y', screened: 1800, total: 2200 },
                                    ].map(d => ({ ...d, unscreened: d.total - d.screened }))}>
                                        <XAxis dataKey="age" fontSize={10} tickLine={false} axisLine={false} fontWeight="black" />
                                        <Tooltip cursor={{ fill: '#fcfcfc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                                        <Bar dataKey="screened" name="Screened" stackId="a" fill="#000000" radius={[0, 0, 0, 0]} barSize={40} />
                                        <Bar dataKey="unscreened" name="Unscreened" stackId="a" fill="#F0F0F0" radius={[8, 8, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-8 flex justify-center gap-10">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-black rounded-sm" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#555]">Completed</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-[#F0F0F0] rounded-sm" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#AAA]">Remaining</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'Risk' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-700">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {riskKpis.map(kpi => (
                            <div key={kpi.label} className="bg-white p-6 rounded-2xl border-t-4 border-x border-b shadow-sm hover:shadow-lg transition-all" style={{ borderTopColor: kpi.color }}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="text-[11px] text-[#888888] font-black uppercase tracking-widest leading-none">{kpi.label}</div>
                                    <kpi.icon size={16} style={{ color: kpi.color }} strokeWidth={3} />
                                </div>
                                <div className="flex items-baseline justify-between">
                                    <span className="text-[32px] font-black text-black leading-none">{kpi.value}</span>
                                    <span className="text-[13px] font-black text-[#555] opacity-50">{kpi.percentage}</span>
                                </div>
                                <div className={`text-[11px] font-black mt-4 flex items-center gap-1.5 ${kpi.change.startsWith('+') ? 'text-red-500' : 'text-green-600'}`}>
                                    {kpi.change.startsWith('+') ? '↗' : '↘'} {kpi.change} THIS MONTH
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-7 bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm group">
                            <h3 className="text-[14px] font-black uppercase tracking-widest text-black mb-10 flex items-center gap-2">
                                <BarChart3 size={16} /> Regional Risk Stratification
                            </h3>
                            <div className="h-[320px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={[
                                        { name: 'Central', Low: 3800, Med: 1200, High: 300, Crit: 100 },
                                        { name: 'North', Low: 1500, Med: 400, High: 200, Crit: 100 },
                                        { name: 'East', Low: 2100, Med: 700, High: 200, Crit: 100 },
                                        { name: 'South', Low: 3100, Med: 900, High: 350, Crit: 150 },
                                        { name: 'West', Low: 3400, Med: 1000, High: 300, Crit: 100 },
                                    ]} barGap={0}>
                                        <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} fontWeight="black" />
                                        <YAxis fontSize={10} tickLine={false} axisLine={false} fontWeight="black" />
                                        <Tooltip cursor={{ fill: '#fcfcfc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                                        <Bar dataKey="Low" fill="#22c55e" radius={[2, 2, 0, 0]} barSize={20} />
                                        <Bar dataKey="Med" fill="#eab308" radius={[2, 2, 0, 0]} barSize={20} />
                                        <Bar dataKey="High" fill="#f97316" radius={[2, 2, 0, 0]} barSize={20} />
                                        <Bar dataKey="Crit" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="lg:col-span-5 bg-black p-8 rounded-2xl shadow-2xl text-white relative overflow-hidden group border border-white/5 flex flex-col justify-between">
                            <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-white opacity-[0.03] rounded-full group-hover:scale-125 transition-transform duration-1000" />
                            <div>
                                <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-white/40 mb-8">Consolidated District Pulse</h3>
                                <div className="h-[200px] relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={riskKpis}
                                                innerRadius={65}
                                                outerRadius={85}
                                                paddingAngle={8}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {riskKpis.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                            </Pie>
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', color: '#000' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-[32px] font-black leading-none">18.2K</span>
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mt-1">TOTAL SCREENED</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="text-[18px] font-black text-green-500">68%</div>
                                    <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">Optimal Baseline</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="text-[18px] font-black text-red-500">2%</div>
                                    <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">Intervention Load</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm">
                            <h3 className="text-[14px] font-black uppercase tracking-widest text-black mb-10 flex items-center gap-2">
                                <Thermometer size={16} /> District Risk Progression
                            </h3>
                            <div className="h-[280px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={riskHistory}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                                        <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} fontWeight="black" />
                                        <YAxis fontSize={10} tickLine={false} axisLine={false} fontWeight="bold" />
                                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                                        <Area type="monotone" dataKey="Low" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.8} />
                                        <Area type="monotone" dataKey="Med" stackId="1" stroke="#eab308" fill="#eab308" fillOpacity={0.7} />
                                        <Area type="monotone" dataKey="High" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                                        <Area type="monotone" dataKey="Crit" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.5} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm overflow-hidden">
                            <h3 className="text-[14px] font-black uppercase tracking-widest text-black mb-10 flex items-center gap-2">
                                <ShieldAlert size={16} /> Domain Concern Matrix
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-center border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-widest text-[#AAA] w-[180px]">Domain Node</th>
                                            {cdpos.map(c => <th key={c} className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[#AAA]">{c}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#F0F0F0]">
                                        {domainHeatmap.map(row => (
                                            <tr key={row.domain} className="group">
                                                <td className="px-4 py-5 text-left font-black text-[11px] uppercase tracking-tight text-[#333] group-hover:translate-x-1 transition-transform">{row.domain}</td>
                                                {row.scores.map((s, idx) => (
                                                    <td key={idx} className="p-0.5 border border-[#F9F9F9]">
                                                        <div
                                                            className="h-12 flex items-center justify-center rounded-lg transition-all hover:scale-105 cursor-help"
                                                            style={{ backgroundColor: getColorByConcern(s) }}
                                                        >
                                                            <span className={`text-[10px] font-black ${s > 10 ? 'text-white' : 'text-black/40'}`}>{s}%</span>
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-8 flex items-center justify-between">
                                <div className="text-[10px] font-black text-[#AAA] uppercase tracking-widest italic leading-none">* VALUES INDICATE % OF REGIONAL CENSUS WITH CONCERN</div>
                                <div className="flex gap-2">
                                    {[0, 1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-4 h-4 rounded-sm" style={{ backgroundColor: getColorByConcern(i * 3) }} title={`${i * 3}% Concern`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-[#F0F0F0] flex justify-between items-center bg-[#fcfcfc]">
                            <div>
                                <h3 className="text-[14px] font-black uppercase tracking-widest text-black">High-Risk Prioritization Census</h3>
                                <p className="text-[12px] text-[#888] font-medium uppercase tracking-tight">Immediate clinical intervention requested for following nodes</p>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-[13px] border-collapse">
                                <thead>
                                    <tr className="bg-black text-white font-bold uppercase tracking-widest text-[10px]">
                                        <th className="px-8 py-5">Beneficiary Node</th>
                                        <th className="px-8 py-5">Sub-Region</th>
                                        <th className="px-8 py-5">Risk State</th>
                                        <th className="px-8 py-5 text-center">Score</th>
                                        <th className="px-8 py-5">Primary Conditions</th>
                                        <th className="px-8 py-5 text-right">Workflow</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F0F0F0]">
                                    {highRiskChildren.map(c => (
                                        <tr key={c.id} onClick={() => router.push(`/dpo/children/${c.id}`)} className="hover:bg-gray-50 cursor-pointer group transition-all">
                                            <td className="px-8 py-6">
                                                <div className="font-black text-black text-[15px] uppercase tracking-tighter flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                                    {c.name}
                                                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <div className="text-[10px] text-[#AAA] font-black uppercase tracking-widest mt-1">{c.age} • #{c.id}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="font-black text-black uppercase tracking-tighter text-[11px]">{c.cdpo} Command</div>
                                                <div className="text-[11px] text-[#AAA] font-medium lowercase leading-none mt-1">{c.mandal} • {c.awc}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${c.risk === 'Critical' ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-100' : 'bg-orange-500 text-white border-orange-500'}`}>
                                                    {c.risk}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-center font-black text-[18px] text-black tracking-tighter underline underline-offset-4 decoration-black/10">{c.score}</td>
                                            <td className="px-8 py-6 text-[#555] font-black uppercase text-[11px] italic tracking-tight">{c.conditions}</td>
                                            <td className="px-8 py-6 text-right font-black text-black uppercase text-[11px] tracking-widest bg-gray-50/30 group-hover:bg-black group-hover:text-white transition-all underline underline-offset-4">{c.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'Trends' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-700">
                    <div className="bg-white border border-[#E5E5E5] rounded-2xl p-10 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                            <Activity size={200} />
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 relative z-10 gap-8">
                            <div>
                                <h3 className="text-[16px] font-black uppercase tracking-[0.3em] text-black">District Longitudinal Analysis</h3>
                                <p className="text-[12px] text-[#888] font-black uppercase tracking-widest mt-2">{trendType} Tracking across all Command Nodes</p>
                            </div>
                            <div className="flex bg-[#F9F9F9] p-1.5 rounded-2xl border border-[#EEE] shadow-inner">
                                {['Coverage', 'Risk', 'Volume'].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setTrendType(t as any)}
                                        className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${trendType === t ? 'bg-white shadow-xl text-black border border-[#EEE]' : 'text-[#BBB] hover:text-[#555]'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="h-[450px] relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={multiLineData}>
                                    <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#F0F0F0" />
                                    <XAxis dataKey="month" fontSize={11} tickLine={false} axisLine={false} fontWeight="black" dy={15} />
                                    <YAxis fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} fontWeight="bold" dx={-10} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 40px 80px rgba(0,0,0,0.15)', padding: '20px' }}
                                    />
                                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '40px' }} />
                                    <Line type="stepAfter" dataKey="target" name="District Benchmark" stroke="#000" strokeWidth={1} strokeDasharray="8 8" dot={false} />
                                    <Line type="monotone" dataKey="Central" stroke="#000" strokeWidth={4} dot={{ r: 6, fill: '#000', strokeWidth: 0 }} activeDot={{ r: 8, strokeWidth: 0 }} />
                                    <Line type="monotone" dataKey="West" stroke="#555" strokeWidth={3} dot={{ r: 4, fill: '#555', strokeWidth: 0 }} />
                                    <Line type="monotone" dataKey="East" stroke="#888" strokeWidth={2} dot={{ r: 4, fill: '#888', strokeWidth: 0 }} />
                                    <Line type="monotone" dataKey="South" stroke="#BBB" strokeWidth={2} dot={{ r: 4, fill: '#BBB', strokeWidth: 0 }} />
                                    <Line type="monotone" dataKey="North" stroke="#ef4444" strokeWidth={3} strokeDasharray="4 4" dot={{ r: 5, fill: '#ef4444', strokeWidth: 0 }} activeDot={{ r: 7 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-16 pt-10 border-t border-[#F9F9F9] grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-[#AAA] mb-2 uppercase tracking-widest leading-none">Leading Zone</span>
                                <span className="text-[16px] font-black text-black uppercase tracking-tight">Kondapur Central • 87%</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-red-600 mb-2 uppercase tracking-widest leading-none">Critical Floor</span>
                                <span className="text-[16px] font-black text-red-600 uppercase tracking-tight">Nellore North • 38%</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-[#AAA] mb-2 uppercase tracking-widest leading-none">Growth Vector</span>
                                <span className="text-[16px] font-black text-black uppercase tracking-tight">+4.5% District Δ</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-[#AAA] mb-2 uppercase tracking-widest leading-none">Bench-Delta</span>
                                <span className="text-[16px] font-black text-black uppercase tracking-tight">-11% below target</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DpoRiskAnalysis;
