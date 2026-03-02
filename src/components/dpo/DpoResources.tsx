'use client';

import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
    ReferenceLine,
    Cell
} from 'recharts';
import { Scorecard, PerformanceRing, CoverageMiniBar } from './DpoUI';
import { KPI } from '@/lib/dpo/types';
import {
    Users,
    Smartphone,
    BookOpen,
    ChevronRight,
    AlertCircle,
    CheckCircle2,
    MoreHorizontal,
    Download,
    Filter,
    ShieldCheck,
    Truck,
    Box,
    HardDrive,
    Signal,
    Award,
    TrendingUp,
    Calendar
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const DpoResources: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'Workforce' | 'Devices' | 'Training'>('Workforce');

    const kpis: KPI[] = [
        { label: 'TOTAL AWWS', value: '680', trend: [650, 660, 675, 680], change: '+5', isPositive: true },
        { label: 'MANDAL SCREENERS', value: '42', trend: [38, 40, 42, 42], change: '+4', isPositive: true },
        { label: 'CDPOS', value: '5', trend: [5, 5, 5, 5], change: '0', isPositive: true },
        { label: 'POSITIONS FILLED', value: '95%', trend: [90, 92, 94, 95], change: '+1%', isPositive: true },
    ];

    const workforceData = [
        { id: 1, name: 'Kondapur Central', aww: '145 / 150', screeners: '10 / 10', gap: '0%', vacancy: 3.3 },
        { id: 2, name: 'Nellore North', aww: '98 / 120', screeners: '6 / 10', gap: '18%', vacancy: 18.3, alert: true },
        { id: 3, name: 'Guntur East', aww: '102 / 110', screeners: '8 / 8', gap: '7%', vacancy: 7.2 },
        { id: 4, name: 'Tirupati South', aww: '148 / 155', screeners: '9 / 10', gap: '4%', vacancy: 4.5 },
        { id: 5, name: 'Vizag West', aww: '132 / 150', screeners: '9 / 10', gap: '12%', vacancy: 12.0, alert: true },
    ];

    const ratioData = [
        { name: 'Central', ratio: 38 },
        { name: 'North', ratio: 48 },
        { name: 'East', ratio: 42 },
        { name: 'South', ratio: 35 },
        { name: 'West', ratio: 41 },
    ];

    const deviceData = [
        { name: 'Kondapur Central', teams: 10, smartphone: 145, connectivity: 98 },
        { name: 'Nellore North', teams: 4, smartphone: 85, connectivity: 42, alert: true },
        { name: 'Guntur East', teams: 8, smartphone: 98, connectivity: 85 },
        { name: 'Tirupati South', teams: 9, smartphone: 130, connectivity: 72 },
        { name: 'Vizag West', teams: 7, smartphone: 110, connectivity: 68 },
    ];

    const trainingData = [
        { name: 'Kondapur Central', awwsTrained: 138, percent: 95, lastDate: '12 Jan 2024', certified: 10, valid: true },
        { name: 'Nellore North', awwsTrained: 62, percent: 63, lastDate: '05 Nov 2023', certified: 4, valid: false, alert: true },
        { name: 'Guntur East', awwsTrained: 88, percent: 86, lastDate: '15 Dec 2023', certified: 8, valid: true },
        { name: 'Tirupati South', awwsTrained: 115, percent: 78, lastDate: '20 Dec 2023', certified: 7, valid: true },
        { name: 'Vizag West', awwsTrained: 98, percent: 74, lastDate: '10 Dec 2023', certified: 6, valid: false, alert: true },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">Resource Allocation</h1>
                    <p className="text-[14px] text-[#888888] font-medium flex items-center gap-2">
                        <Box size={14} />
                        680 AWCs • District Logistics & Infrastructure
                    </p>
                </div>
                <div className="flex bg-white shadow-sm border border-[#E5E5E5] rounded-xl p-1">
                    <button className="flex items-center gap-2 px-6 py-1.5 bg-white border border-[#E5E5E5] rounded-lg text-[11px] font-black uppercase text-black hover:border-black transition-all">
                        <Download size={14} /> Export Assets
                    </button>
                </div>
            </div>

            <div className="flex gap-10 border-b border-[#F0F0F0] px-2 overflow-x-auto scrollbar-hide">
                {[
                    { id: 'Workforce', label: 'Workforce' },
                    { id: 'Devices', label: 'Devices & Infra' },
                    { id: 'Training', label: 'Instruction' }
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

            <div className="flex flex-nowrap gap-5 overflow-x-auto pb-4 scrollbar-hide">
                {kpis.map(kpi => <Scorecard key={kpi.label} kpi={kpi} />)}
            </div>

            {activeTab === 'Workforce' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-700">
                    <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-[#F0F0F0] flex justify-between items-center bg-[#fcfcfc] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Users size={120} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-[14px] font-black uppercase tracking-widest text-black">District Personnel Census</h3>
                                <p className="text-[12px] text-[#888] font-medium">Headcount and vacancy indexing by CDPO unit</p>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-[13px] border-collapse">
                                <thead>
                                    <tr className="bg-black text-white font-bold uppercase tracking-widest text-[10px]">
                                        <th className="px-8 py-5">CDPO Command</th>
                                        <th className="px-8 py-5 text-center">AWWs (Filled / Registry)</th>
                                        <th className="px-8 py-5 text-center">Screeners (Active / Target)</th>
                                        <th className="px-8 py-5 text-center">Coverage Gap</th>
                                        <th className="px-8 py-5 text-center">Vacancy Index</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F0F0F0]">
                                    {workforceData.map(row => (
                                        <tr
                                            key={row.id}
                                            className={`hover:bg-gray-50 transition-all cursor-pointer group ${row.alert ? 'bg-red-50/20' : ''}`}
                                            onClick={() => router.push(`/dpo/cdpos/${row.id}`)}
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="font-black text-black text-[14px] uppercase tracking-tighter">{row.name}</span>
                                                        {row.alert && (
                                                            <div className="flex items-center gap-1.5 text-red-600 font-black uppercase text-[9px] mt-1 tracking-widest">
                                                                <AlertCircle size={10} /> Severe Shortage
                                                            </div>
                                                        )}
                                                    </div>
                                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className="font-black text-black text-[15px]">{row.aww}</span>
                                            </td>
                                            <td className="px-8 py-6 text-center font-bold text-[#555] tracking-widest uppercase text-[11px]">{row.screeners}</td>
                                            <td className={`px-8 py-6 text-center font-black text-[14px] ${row.alert ? 'text-red-600' : 'text-black'}`}>
                                                {row.gap}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="max-w-[140px] mx-auto">
                                                    <CoverageMiniBar coverage={100 - row.vacancy} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                <ShieldCheck size={140} />
                            </div>
                            <h3 className="text-[14px] font-black uppercase tracking-widest text-black mb-10 relative z-10 flex items-center gap-2">
                                <TrendingUp size={16} /> Personnel Density Profile
                            </h3>
                            <div className="h-[300px] relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart layout="vertical" data={ratioData} margin={{ left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#F0F0F0" />
                                        <XAxis type="number" fontSize={10} tickLine={false} axisLine={false} domain={[0, 60]} fontWeight="black" />
                                        <YAxis dataKey="name" type="category" fontSize={11} tickLine={false} axisLine={false} width={100} fontWeight="black" />
                                        <Tooltip cursor={{ fill: '#fcfcfc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                                        <ReferenceLine x={40} stroke="#000" strokeDasharray="8 8" label={{ position: 'top', value: 'Threshold 1:40', fontSize: 10, fill: '#000', fontWeight: '900', letterSpacing: '0.05em' }} />
                                        <Bar dataKey="ratio" name="Ratio 1:X" radius={[0, 8, 8, 0]} barSize={32}>
                                            {ratioData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.ratio > 40 ? '#ef4444' : '#000000'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="mt-8 text-[11px] font-bold text-[#AAA] italic text-center uppercase tracking-widest">Ratio calculated by AWW headcount vs registered child census</p>
                        </div>

                        <div className="bg-black p-8 rounded-2xl shadow-2xl text-white relative overflow-hidden group border border-white/5">
                            <div className="absolute bottom-[-20px] left-[-20px] w-64 h-64 bg-white opacity-[0.03] rounded-full group-hover:scale-125 transition-transform duration-1000" />
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Truck size={120} />
                            </div>
                            <div className="relative z-10 space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-white/50">Tactical Allocation</h3>
                                    <p className="text-[24px] font-black leading-tight tracking-tight uppercase">Nellore North Personnel Gap identified at 18.3%</p>
                                </div>
                                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                    <p className="text-[13px] font-medium leading-relaxed italic text-white/80">"Recommendation: Temporary dispatch of 4 regional screeners from Central Node to North Node until local hiring is finalized."</p>
                                </div>
                                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                                    <div className="text-center">
                                        <div className="text-[20px] font-black">24h</div>
                                        <div className="text-[9px] text-white/40 uppercase font-black tracking-widest mt-1">SLA Target</div>
                                    </div>
                                    <div className="w-[1px] h-10 bg-white/10" />
                                    <div className="text-center">
                                        <div className="text-[20px] font-black">L-4</div>
                                        <div className="text-[9px] text-white/40 uppercase font-black tracking-widest mt-1">Auth-Tier</div>
                                    </div>
                                    <div className="w-[1px] h-10 bg-white/10" />
                                    <div className="text-center">
                                        <div className="text-[20px] font-black">+14%</div>
                                        <div className="text-[9px] text-white/40 uppercase font-black tracking-widest mt-1">Impact</div>
                                    </div>
                                </div>
                                <button className="w-full py-4 bg-white text-black rounded-xl font-black uppercase tracking-[0.4em] text-[11px] hover:bg-gray-100 transition-all shadow-xl shadow-black">Initialize Dispatch</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'Devices' && (
                <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden animate-in slide-in-from-bottom-2 duration-500">
                    <div className="p-8 border-b border-[#F0F0F0] bg-[#fcfcfc] flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                                <Smartphone size={28} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-[16px] font-black uppercase tracking-[0.2em] text-black">Infrastructure & Telecom Log</h3>
                                <p className="text-[12px] text-[#888] font-medium">Monitoring device availability and field connectivity uptime</p>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-[13px] border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-[#F0F0F0] text-[10px] font-black uppercase tracking-widest text-[#888]">
                                    <th className="px-8 py-5">CDPO Unit</th>
                                    <th className="px-8 py-5 text-center">Tactical Devices</th>
                                    <th className="px-8 py-5 text-center">Smartphones Provisioned</th>
                                    <th className="px-8 py-5 text-center">Sync Uptime %</th>
                                    <th className="px-8 py-5">Network Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F0F0F0]">
                                {deviceData.map(d => (
                                    <tr key={d.name} className="hover:bg-gray-50 transition-all group">
                                        <td className="px-8 py-7">
                                            <div className="font-black text-black text-[15px] underline decoration-black/10 underline-offset-4 uppercase tracking-tighter">{d.name}</div>
                                            <code className="text-[10px] text-[#AAA] font-mono mt-1 block">NODE-ID: {d.name.substring(0, 3).toUpperCase()}-402</code>
                                        </td>
                                        <td className={`px-8 py-7 text-center font-black text-[18px] ${d.alert ? 'text-red-600 underline decoration-red-200' : 'text-black'}`}>{d.teams}</td>
                                        <td className="px-8 py-7 text-center font-bold text-[#555] text-[16px]">{d.smartphone}</td>
                                        <td className="px-8 py-7">
                                            <div className="max-w-[140px] mx-auto">
                                                <div className="flex justify-between items-center mb-1 text-[9px] font-black text-black uppercase tracking-widest">
                                                    <span>{d.connectivity}%</span>
                                                    <span>Min 85%</span>
                                                </div>
                                                <div className="h-2 w-full bg-[#f0f0f0] rounded-full overflow-hidden border border-black/5">
                                                    <div
                                                        className={`h-full transition-all duration-700 ${d.connectivity < 60 ? 'bg-red-500' : d.connectivity < 85 ? 'bg-amber-400' : 'bg-black'}`}
                                                        style={{ width: `${d.connectivity}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-7">
                                            {d.alert ? (
                                                <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1.5 rounded-xl border border-red-100 w-fit">
                                                    <Signal size={14} className="animate-pulse" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Critical Signal Drop</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-black bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 w-fit">
                                                    <CheckCircle2 size={14} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Stable Connection</span>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'Training' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
                    <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-[#F0F0F0] flex justify-between items-center bg-[#fcfcfc]">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                                    <BookOpen size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-[16px] font-black uppercase tracking-[0.2em] text-black">Instruction & Certification Sync</h3>
                                    <p className="text-[12px] text-[#888] font-medium tracking-tight">Personnel qualification audits and valid certification tracking</p>
                                </div>
                            </div>
                            <button className="bg-black text-white px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
                                Deploy Training
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-[13px] border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-[#F0F0F0] text-[10px] font-black uppercase tracking-widest text-[#888]">
                                        <th className="px-8 py-5">Command Node</th>
                                        <th className="px-8 py-5 text-center">Units Trained</th>
                                        <th className="px-8 py-5 text-center">Qualification %</th>
                                        <th className="px-8 py-5">Last Instruction Date</th>
                                        <th className="px-8 py-5 text-center">Certified Specialist</th>
                                        <th className="px-8 py-5 text-center">Auth-Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F0F0F0]">
                                    {trainingData.map(t => (
                                        <tr key={t.name} className="hover:bg-gray-50 transition-all group">
                                            <td className="px-8 py-7">
                                                <div className="font-black text-black text-[15px] uppercase tracking-tighter">{t.name}</div>
                                                <code className="text-[10px] text-[#AAA] font-mono mt-1 block">REGIONAL-UNIT-LEVEL-III</code>
                                            </td>
                                            <td className="px-8 py-7 text-center font-black text-black text-[16px]">{t.awwsTrained}</td>
                                            <td className="px-8 py-7 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className={`text-[18px] font-black leading-none ${t.percent < 80 ? 'text-red-600' : 'text-black'}`}>{t.percent}%</span>
                                                    <div className="w-12 h-0.5 bg-gray-100 mt-1.5 rounded-full overflow-hidden">
                                                        <div className={`h-full ${t.percent < 80 ? 'bg-red-500' : 'bg-black'}`} style={{ width: `${t.percent}%` }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-7">
                                                <div className="flex items-center gap-2 text-[#555555] font-black uppercase text-[11px] tracking-widest">
                                                    <Calendar size={14} className="text-[#AAA]" />
                                                    {t.lastDate}
                                                </div>
                                            </td>
                                            <td className="px-8 py-7 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-10 h-10 rounded-full bg-white border-2 border-dashed border-black/10 flex items-center justify-center text-[12px] font-black text-black group-hover:border-black transition-colors">
                                                        {t.certified}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-7 text-center">
                                                {t.valid ? (
                                                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-xl border border-green-100">
                                                        <ShieldCheck size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Certified</span>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-xl border border-red-100">
                                                        <Award size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Re-Audit Required</span>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-[#fcfcfc] border border-[#E5E5E5] rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-20 h-20 bg-white shadow-2xl rounded-3xl flex items-center justify-center">
                            <TrendingUp size={32} className="text-black" />
                        </div>
                        <div className="max-w-md">
                            <h4 className="text-[20px] font-black uppercase tracking-tight text-black">District Instruction Benchmark</h4>
                            <p className="text-[14px] text-[#888] font-medium leading-relaxed mt-4 uppercase tracking-widest">Qualified personnel density up by 12% following the Jan '24 certification cycle.</p>
                        </div>
                        <div className="flex gap-10 pt-4">
                            <div className="text-center">
                                <div className="text-[32px] font-black text-black leading-none">82%</div>
                                <div className="text-[10px] text-[#AAA] uppercase font-black tracking-[0.2em] mt-2">Qualified</div>
                            </div>
                            <div className="w-[1px] h-12 bg-[#EEE]" />
                            <div className="text-center">
                                <div className="text-[32px] font-black text-black leading-none">630+</div>
                                <div className="text-[10px] text-[#AAA] uppercase font-black tracking-[0.2em] mt-2">Certificates</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DpoResources;
