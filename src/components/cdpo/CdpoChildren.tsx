'use client';

import React, { useState, useMemo } from 'react';
import {
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    Table,
    BarChart2,
    PieChart as PieIcon,
    ChevronRight,
    ChevronDown,
    Map,
    Award,
    Star,
    ShieldCheck,
    User,
    Clock,
    Flag,
    AlertTriangle,
    Eye,
    Zap,
    MessageSquare,
    MoreVertical,
    CheckCircle2,
    FileText,
    ExternalLink,
    Smartphone,
    Database,
    Phone,
    Mail,
    X,
    MoreHorizontal
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

interface CdpoChildrenProps {
    initialChildren?: any[];
    totalCount?: number;
    projectName?: string;
}

const CdpoChildren: React.FC<CdpoChildrenProps> = ({ initialChildren, totalCount, projectName }) => {
    const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('Overview');
    const [searchTerm, setSearchTerm] = useState('');

    const allChildren = initialChildren || [
        { id: 'CH-1002', name: 'Priya Sharma', age: '4y 2m', gender: 'Female', mandal: 'Kondapur', awc: 'Rampur-A', risk: 'CRITICAL', lastActivity: '2h ago', healthScore: 42, growth: 'Below Avg' },
        { id: 'CH-1004', name: 'Rahul K.', age: '3y 8m', gender: 'Male', mandal: 'Nellore', awc: 'North-B', risk: 'HIGH', lastActivity: '4h ago', healthScore: 68, growth: 'Standard' },
        { id: 'CH-1005', name: 'Sneha M.', age: '5y 1m', gender: 'Female', mandal: 'Kondapur', awc: 'Cen-2', risk: 'LOW', lastActivity: '1d ago', healthScore: 92, growth: 'Optimal' },
        { id: 'CH-1008', name: 'Arjun V.', age: '4y 11m', gender: 'Male', mandal: 'Mallapur', awc: 'G-Road', risk: 'CRITICAL', lastActivity: '3d ago', healthScore: 38, growth: 'Critical Gaps' },
        { id: 'CH-1012', name: 'Meera G.', age: '2y 11m', gender: 'Female', mandal: 'Kondapur', awc: 'Rampur-A', risk: 'MEDIUM', lastActivity: '6h ago', healthScore: 78, growth: 'Standard' },
    ];

    const children = useMemo(() => {
        if (!searchTerm) return allChildren;
        const lowSearch = searchTerm.toLowerCase();
        return allChildren.filter((c: any) =>
            c.name.toLowerCase().includes(lowSearch) ||
            c.id.toLowerCase().includes(lowSearch) ||
            c.awc.toLowerCase().includes(lowSearch)
        );
    }, [allChildren, searchTerm]);

    const riskDomains = [
        { name: 'Gross Motor', score: 45, color: '#EF4444' },
        { name: 'Language', score: 32, color: '#EF4444' },
        { name: 'Cognitive', score: 68, color: '#F59E0B' },
        { name: 'Social', score: 54, color: '#F59E0B' },
        { name: 'Self Help', score: 92, color: '#22C55E' },
    ];

    const renderChildRecord = () => {
        const child = children.find((c: any) => c.id === selectedChildId) || children[0];

        return (
            <div className="max-w-[1000px] mx-auto pb-32 animate-in fade-in zoom-in-95 duration-500">
                <header className="bg-white p-10 rounded-[40px] border border-[#E5E5E5] shadow-sm mb-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 transition-transform">
                        <User size={160} />
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-10 mb-10 relative z-10 text-center md:text-left">
                        <div className="w-32 h-32 rounded-[32px] bg-black text-white flex items-center justify-center text-[42px] font-black italic shadow-2xl shadow-black/20">
                            {child.name.charAt(0)}{child.name.split(' ')[1]?.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                                <h1 className="text-[36px] font-black text-black leading-none uppercase tracking-tighter italic">{child.name}</h1>
                                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 shadow-sm ${child.risk === 'CRITICAL' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-50 text-black'
                                    }`}>{child.risk} NODE</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-6 text-[14px] text-[#888888] font-black uppercase tracking-widest">
                                <span className="flex items-center gap-2"><User size={14} /> {child.age} • {child.gender}</span>
                                <span className="w-1.5 h-1.5 bg-[#EEE] rounded-full" />
                                <span className="flex items-center gap-2"><Map size={14} /> {child.awc} AWC</span>
                                <span className="w-1.5 h-1.5 bg-[#EEE] rounded-full" />
                                <span className="flex items-center gap-2">ID: {child.id}</span>
                            </div>
                        </div>
                        <button onClick={() => setSelectedChildId(null)} className="h-12 px-8 bg-white border-2 border-black text-black rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl shadow-black/5">Dismiss Record</button>
                    </div>
                    <nav className="flex items-center gap-10 border-t border-[#F0F0F0] pt-8 relative z-10 overflow-x-auto">
                        {['Overview', 'Screening History', 'Domain Matrix', 'Audit Trail'].map(t => (
                            <button key={t} onClick={() => setActiveTab(t)} className={`text-[12px] font-black uppercase tracking-[0.2em] pb-4 relative transition-all ${activeTab === t ? 'text-black' : 'text-[#BBB] hover:text-black'}`}>
                                {t}
                                {activeTab === t && <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-full" />}
                            </button>
                        ))}
                    </nav>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">
                        {activeTab === 'Overview' && (
                            <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
                                <section className="bg-white p-10 rounded-[40px] border border-[#E5E5E5] shadow-sm group">
                                    <h3 className="text-[14px] font-black uppercase tracking-widest text-[#AAA] mb-10 flex justify-between items-center">
                                        Developmental Risk Profile
                                        <div className="flex items-center gap-2 text-black bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                                            <Activity size={12} />
                                            <span className="text-[10px]">Matrix Active</span>
                                        </div>
                                    </h3>
                                    <div className="h-[280px] w-full mt-6">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart layout="vertical" data={riskDomains}>
                                                <XAxis type="number" hide domain={[0, 100]} />
                                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'black', fill: '#000' }} width={120} />
                                                <Tooltip cursor={{ fill: '#fcfcfc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontWeight: 'black', textTransform: 'uppercase', fontSize: '10px' }} />
                                                <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={28}>
                                                    {riskDomains.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-10 p-6 bg-[#F9F9F9] rounded-3xl border border-[#EEE] flex items-center justify-between group-hover:border-black transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black italic shadow-xl shadow-black/20">PH-2</div>
                                            <div>
                                                <p className="text-[14px] font-black text-black leading-none uppercase tracking-tight italic">Recommended: Secondary Clinical Audit</p>
                                                <p className="text-[11px] text-[#AAA] font-black uppercase mt-1 tracking-widest italic">Signal based on gross motor latency</p>
                                            </div>
                                        </div>
                                        <button className="p-3 border border-[#DDD] rounded-xl hover:bg-black hover:text-white transition-all shadow-sm"><ChevronRight size={18} /></button>
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-4 space-y-12 animate-in slide-in-from-right-4 duration-1000">
                        <div className="bg-black p-10 rounded-[40px] shadow-2xl text-white relative overflow-hidden group border border-white/5">
                            <div className="absolute top-[-20px] left-[-20px] w-32 h-32 bg-white opacity-[0.03] rounded-full group-hover:scale-110 transition-transform duration-1000" />
                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/5 shadow-inner">
                                        <Flag size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[12px] font-black uppercase tracking-widest text-white/40 mb-1">Open Signals</h3>
                                        <p className="text-[16px] font-black uppercase tracking-tighter italic">2 Primary Flags</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-5 bg-white/5 border border-white/10 rounded-3xl space-y-3 hover:bg-white/10 transition-all cursor-pointer">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black text-red-400 uppercase tracking-widest italic">High Domain Risk</span>
                                            <span className="text-[9px] text-white/20 uppercase font-black tracking-widest italic">2d ago</span>
                                        </div>
                                        <p className="text-[13px] font-black text-white leading-tight uppercase tracking-tight italic">Gross motor deficit triggered via Ph-2 audit matrix.</p>
                                    </div>
                                </div>
                                <button className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[12px] hover:scale-105 transition-all shadow-2xl shadow-white/10">Dispatch Flag</button>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-[#F0F0F0] p-10 rounded-[40px] shadow-sm group hover:border-black transition-all">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-[13px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                                    <ShieldCheck size={16} /> Audit Summary
                                </h3>
                                <div className="p-2 bg-gray-50 rounded-lg"><Star size={16} className="text-black" fill="currentColor" /></div>
                            </div>
                            <div className="space-y-8">
                                <div>
                                    <p className="text-[10px] font-black text-[#AAA] uppercase tracking-widest mb-1.5">Consolidated Health Score</p>
                                    <div className="flex items-end gap-3 italic">
                                        <span className="text-[48px] font-black text-red-600 leading-none">{child.healthScore}</span>
                                        <span className="text-[12px] font-black text-red-600/40 mb-1 uppercase tracking-widest italic">/ 100 Critical</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-[#AAA] uppercase tracking-widest mb-1.5">Regional Growth Delta</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[20px] font-black uppercase italic tracking-tighter italic">{child.growth}</span>
                                        <div className="h-1.5 flex-1 bg-red-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-red-600 w-1/3 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="animate-in fade-in duration-700">
            {selectedChildId ? (
                renderChildRecord()
            ) : (
                <div className="space-y-12 pb-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                        <div>
                            <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">Children Directory</h1>
                            <p className="text-[14px] text-[#888888] font-medium flex items-center gap-2">
                                <User size={14} />
                                {projectName || 'Kondapur'} CDPO Node • Unified Regional Census
                            </p>
                        </div>
                        <div className="flex bg-white shadow-sm border border-[#E5E5E5] rounded-2xl p-1 shrink-0">
                            {['Directory', 'Analytics', 'Exports'].map((pill) => (
                                <button
                                    key={pill}
                                    className={`px-6 py-2 text-[11px] font-black uppercase rounded-xl transition-all ${pill === 'Directory' ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-[#888] hover:text-black hover:bg-gray-50'}`}
                                >
                                    {pill}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-[#E5E5E5] rounded-[40px] shadow-sm overflow-hidden group">
                        <div className="p-10 border-b border-[#F0F0F0] flex justify-between items-center bg-[#fcfcfc] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:rotate-12 transition-transform">
                                <Database size={160} />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-10">
                                <div>
                                    <h3 className="text-[16px] font-black uppercase tracking-widest text-black mb-1">Administrative Registry</h3>
                                    <p className="text-[13px] text-[#888] font-medium uppercase tracking-tight italic">{(totalCount || 3890).toLocaleString()} beneficiaries in current command</p>
                                </div>
                                <div className="h-10 w-[1px] bg-black/5 hidden md:block" />
                                <div className="flex items-center gap-6">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-xl border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-black shadow-sm italic">AW</div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] font-black uppercase text-[#888] tracking-widest whitespace-nowrap">Authorized AWW Access Only</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="relative group/search">
                                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BBB] group-focus-within/search:text-black transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Filter census..."
                                        className="pl-12 pr-6 h-12 bg-white border-2 border-[#F0F0F0] rounded-2xl text-[13px] w-[260px] focus:border-black outline-none transition-all font-black uppercase tracking-tight shadow-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-black bg-white px-6 py-3 rounded-xl border border-[#EEE] hover:border-black transition-all shadow-sm">
                                    <Filter size={16} /> MATRIX
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-inter">
                                <thead>
                                    <tr className="text-[#AAA] font-black uppercase tracking-widest text-[10px] border-b border-[#F0F0F0] bg-gray-50/50">
                                        <th className="px-10 py-6">Identity & Region</th>
                                        <th className="px-10 py-6 text-center">Age Spectrum</th>
                                        <th className="px-10 py-6 text-center">Signal Priority</th>
                                        <th className="px-10 py-6 text-center">Score Delta</th>
                                        <th className="px-10 py-6 text-right">Last Sync</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F0F0F0]">
                                    {children.map((child) => (
                                        <tr key={child.id} onClick={() => setSelectedChildId(child.id)} className="hover:bg-gray-50/80 transition-all group cursor-pointer">
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 rounded-2xl bg-black/5 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm group-hover:shadow-2xl group-hover:shadow-black/10 text-[20px] font-black italic">
                                                        {child.name.charAt(0)}{child.name.split(' ')[1]?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-black text-[18px] leading-tight uppercase tracking-tighter italic group-hover:underline underline-offset-8 decoration-black/5">{child.name}</p>
                                                        <p className="text-[11px] text-[#AAA] font-black tracking-widest uppercase mt-1.5 flex items-center gap-2">
                                                            {child.id} • {child.awc} AWC
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-center text-[#555] font-black uppercase tracking-tighter text-[14px] italic">{child.age}</td>
                                            <td className="px-10 py-8 text-center">
                                                <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border-2 shadow-sm ${child.risk === 'CRITICAL' ? 'bg-red-50 text-red-600 border-red-100 shadow-red-200' :
                                                    child.risk === 'HIGH' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-gray-50 text-black border-gray-100'
                                                    }`}>
                                                    {child.risk}
                                                </span>
                                            </td>
                                            <td className="px-10 py-8 text-center">
                                                <div className="inline-flex items-center gap-4">
                                                    <span className={`text-[16px] font-black italic ${child.healthScore < 50 ? 'text-red-500' : 'text-black'}`}>{child.healthScore}</span>
                                                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className={`h-full ${child.healthScore < 50 ? 'bg-red-500' : 'bg-black'}`} style={{ width: `${child.healthScore}%` }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[13px] font-black text-black uppercase tracking-tight italic">{child.lastActivity}</span>
                                                    <div className="flex items-center gap-1.5 mt-1">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                                        <span className="text-[10px] text-[#AAA] font-black uppercase tracking-widest italic">Encrypted Sink</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-10 bg-gray-50/50 flex items-center justify-between border-t border-[#F0F0F0]">
                            <div className="flex items-center gap-6">
                                <button className="p-3 bg-white border border-[#EEE] rounded-2xl text-black hover:border-black transition-all shadow-sm"><ChevronRight size={20} className="rotate-180" /></button>
                                <div className="flex items-center gap-2">
                                    <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-xl text-[12px] font-black italic">1</span>
                                    <span className="w-8 h-8 flex items-center justify-center bg-white border border-[#EEE] text-[#888] rounded-xl text-[12px] font-black hover:border-black hover:text-black cursor-pointer transition-all">2</span>
                                    <span className="w-8 h-8 flex items-center justify-center bg-white border border-[#EEE] text-[#888] rounded-xl text-[12px] font-black hover:border-black hover:text-black cursor-pointer transition-all">3</span>
                                </div>
                                <button className="p-3 bg-white border border-[#EEE] rounded-2xl text-black hover:border-black transition-all shadow-sm"><ChevronRight size={20} /></button>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-[11px] text-[#AAA] font-black uppercase tracking-[0.4em] italic leading-none">Syncing Node Cluster — AP-KDP-22</p>
                                <div className="w-[1px] h-6 bg-black/5" />
                                <button className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-black hover:underline decoration-blue-200 underline-offset-8">
                                    <Smartphone size={16} /> Registry Transmit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CdpoChildren;
