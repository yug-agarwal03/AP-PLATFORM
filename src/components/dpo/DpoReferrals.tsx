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
    ComposedChart,
    Line,
} from 'recharts';
import { Scorecard } from './DpoUI';
import { KPI } from '@/lib/dpo/types';
import { Search, Download, Filter, ChevronRight, AlertCircle, Calendar, Phone, ArrowUpRight, Send, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DpoReferrals: React.FC = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const kpis: KPI[] = [
        { label: 'TOTAL REFERRALS', value: '478', trend: [350, 380, 410, 440, 478], change: '+34', isPositive: true },
        { label: 'ACTIVE', value: '234', trend: [200, 210, 220, 230, 234], change: '+12%', isPositive: true },
        { label: 'SCHEDULED', value: '108', trend: [80, 90, 100, 105, 108], change: '+3%', isPositive: true },
        { label: 'COMPLETED', value: '198', trend: [150, 160, 175, 185, 198], change: '+12%', isPositive: true },
        { label: 'OVERDUE', value: '38', trend: [45, 42, 40, 39, 38], change: '-7', isPositive: true },
        { label: 'AVG WAIT TIME', value: '12d', trend: [15, 14, 13, 13, 12], change: '-3d', isPositive: true },
    ];

    const typeData = [
        { name: 'Paediatrics', active: 45, completed: 30, overdue: 5 },
        { name: 'Therapist-OT', active: 38, completed: 25, overdue: 12 },
        { name: 'Therapist-Speech', active: 32, completed: 20, overdue: 8 },
        { name: 'ENT', active: 28, completed: 35, overdue: 2 },
        { name: 'Nutrition', active: 50, completed: 45, overdue: 5 },
        { name: 'Psychologist', active: 15, completed: 10, overdue: 3 },
        { name: 'Ophthalmology', active: 26, completed: 33, overdue: 3 },
    ];

    const cdpoData = [
        { name: 'Kondapur Central', pending: 42, scheduled: 25, completed: 85 },
        { name: 'Nellore North', pending: 88, scheduled: 15, completed: 32 },
        { name: 'Guntur East', pending: 35, scheduled: 22, completed: 45 },
        { name: 'Tirupati South', pending: 52, scheduled: 38, completed: 28 },
        { name: 'Vizag West', pending: 17, scheduled: 8, completed: 8 },
    ];

    const overdueTable = [
        { id: 1002, child: 'Sita M.', type: 'Motor Delay', urgency: 'Critical', cdpo: 'Nellore North', mandal: 'Mandal B', facility: 'North District Hospital', created: '15 Jan', overdue: 28, status: 'Active' },
        { id: 1005, child: 'Arun K.', type: 'Nutritional', urgency: 'High', cdpo: 'Kondapur Central', mandal: 'Mandal A', facility: 'Central PHC', created: '22 Jan', overdue: 21, status: 'Scheduled' },
        { id: 1008, child: 'Rahul R.', type: 'Speech', urgency: 'Medium', cdpo: 'Guntur East', mandal: 'Mandal D', facility: 'Regional Health Hub', created: '01 Feb', overdue: 12, status: 'Active' },
        { id: 1012, child: 'Priya S.', type: 'Vision', urgency: 'Low', cdpo: 'Tirupati South', mandal: 'Mandal F', facility: 'District Eye Center', created: '05 Feb', overdue: 8, status: 'Active' },
    ];

    const trendData = [
        { name: 'Jan', generated: 85, completed: 62, rate: 72.9 },
        { name: 'Feb', generated: 92, completed: 74, rate: 80.4 },
        { name: 'Mar', generated: 88, completed: 68, rate: 77.2 },
        { name: 'Apr', generated: 110, completed: 85, rate: 77.2 },
        { name: 'May', generated: 125, completed: 92, rate: 73.6 },
        { name: 'Jun', generated: 108, completed: 98, rate: 90.7 },
        { name: 'Jul', generated: 130, completed: 105, rate: 80.7 },
        { name: 'Aug', generated: 140, completed: 112, rate: 80 },
        { name: 'Sep', generated: 135, completed: 118, rate: 87.4 },
        { name: 'Oct', generated: 145, completed: 122, rate: 84.1 },
        { name: 'Nov', generated: 155, completed: 132, rate: 85.1 },
        { name: 'Dec', generated: 165, completed: 150, rate: 90.9 },
    ];

    const funnelSteps = [
        { label: 'Generated', count: 478, color: '#E5E5E5', percentage: 100 },
        { label: 'Sent', count: 412, color: '#999999', percentage: 86, dropOff: '14%' },
        { label: 'Scheduled', count: 298, color: '#444444', percentage: 72, dropOff: '28%' },
        { label: 'Completed', count: 198, color: '#000000', percentage: 66, dropOff: '34%' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">Referral Pipeline</h1>
                    <p className="text-[14px] text-[#888888] font-medium flex items-center gap-2">
                        <Send size={14} />
                        Active Case Management • {kpis[0].value} Direct Referrals
                    </p>
                </div>
                <div className="flex bg-white shadow-sm border border-[#E5E5E5] rounded-xl p-1">
                    {['Live', 'History', 'Forecast'].map((pill) => (
                        <button
                            key={pill}
                            className={`px-6 py-1.5 text-[11px] font-bold uppercase rounded-lg transition-all ${pill === 'Live' ? 'bg-black text-white shadow-lg shadow-black/10' : 'text-[#888] hover:text-black hover:bg-gray-50'}`}
                        >
                            {pill}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-nowrap gap-5 overflow-x-auto pb-4 scrollbar-hide">
                {kpis.map((kpi) => (
                    <div key={kpi.label} className={kpi.label === 'OVERDUE' ? 'relative group' : ''}>
                        <Scorecard kpi={{
                            ...kpi,
                            value: kpi.label === 'OVERDUE' ? kpi.value : kpi.value
                        }} />
                        {kpi.label === 'OVERDUE' && (
                            <div className="absolute inset-0 border-2 border-red-500/20 rounded-xl pointer-events-none" />
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="text-[14px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                            <Activity size={16} /> District Conversion Lifecycle
                        </h3>
                        <p className="text-[12px] text-[#888] font-medium mt-1">Measuring efficiency from case generation to final clinical completion</p>
                    </div>
                </div>

                <div className="relative h-[280px] flex items-center justify-around gap-12 px-12">
                    {funnelSteps.map((step, idx) => {
                        const height = (step.count / 478) * 240;
                        return (
                            <div key={step.label} className="flex flex-col items-center gap-6 relative group w-full max-w-[200px]">
                                <div className="text-center">
                                    <p className="text-[10px] font-black text-[#888] uppercase tracking-widest mb-1">{step.label}</p>
                                    <p className="text-[32px] font-black text-black leading-none">{step.count}</p>
                                </div>
                                <div
                                    className="w-full rounded-xl transition-all duration-700 group-hover:opacity-90 shadow-lg"
                                    style={{
                                        height: `${height}px`,
                                        backgroundColor: step.color,
                                        clipPath: idx < funnelSteps.length - 1 ? 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)' : 'none'
                                    }}
                                />
                                <div className={`text-[12px] font-black uppercase tracking-tighter ${step.percentage < 70 ? 'text-red-600' : 'text-black'}`}>
                                    {step.percentage}% Retained
                                </div>
                                {step.dropOff && (
                                    <div className="absolute top-[60%] -right-[30%] z-10 hidden lg:flex flex-col items-center animate-pulse">
                                        <div className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-black rounded-lg shadow-lg shadow-red-200">-{step.dropOff} Loss</div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="mt-12 pt-8 border-t border-[#F9F9F9] grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[#AAA] mb-1 uppercase tracking-widest">Generation Velocity</span>
                        <span className="text-[14px] font-black text-black">Instant • 0d</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[#AAA] mb-1 uppercase tracking-widest">Courier Latency</span>
                        <span className="text-[14px] font-black text-black">Normal • 2d</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-red-600 mb-1 uppercase tracking-widest">Scheduling Lag</span>
                        <span className="text-[14px] font-black text-red-600">Critical • 8d</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-red-600 mb-1 uppercase tracking-widest">Clinical TAT</span>
                        <span className="text-[14px] font-black text-red-600">Delayed • 14d</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm">
                    <h3 className="text-[14px] font-black uppercase tracking-widest text-black mb-8">Specialization Demand</h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={typeData} margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="5 5" horizontal={true} vertical={false} stroke="#f0f0f0" />
                                <XAxis type="number" fontSize={10} tickLine={false} axisLine={false} fontWeight="black" />
                                <YAxis dataKey="name" type="category" fontSize={11} tickLine={false} axisLine={false} width={120} fontWeight="bold" />
                                <Tooltip />
                                <Legend iconType="circle" />
                                <Bar dataKey="active" stackId="a" fill="#eab308" name="Active" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="completed" stackId="a" fill="#000" name="Completed" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="overdue" stackId="a" fill="#ef4444" name="Overdue" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm">
                    <h3 className="text-[14px] font-black uppercase tracking-widest text-black mb-8">Regional Workflow Load</h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={cdpoData} margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="5 5" horizontal={true} vertical={false} stroke="#f0f0f0" />
                                <XAxis type="number" fontSize={10} tickLine={false} axisLine={false} fontWeight="black" />
                                <YAxis dataKey="name" type="category" fontSize={11} tickLine={false} axisLine={false} width={120} fontWeight="bold" />
                                <Tooltip />
                                <Legend iconType="circle" />
                                <Bar dataKey="pending" stackId="a" fill="#E5E5E5" name="Pending Log" />
                                <Bar dataKey="scheduled" stackId="a" fill="#888" name="Scheduled" />
                                <Bar dataKey="completed" stackId="a" fill="#000" name="Fullfilled" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-white border-l-8 border-red-600 border-y border-r border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden">
                <div className="px-8 py-6 bg-red-50/30 flex justify-between items-center border-b border-red-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
                            <AlertCircle size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-[16px] font-black uppercase tracking-tight text-black">Stagnant Cases Warning</h3>
                            <p className="text-[12px] text-red-600 font-bold uppercase tracking-widest">38 Referral blocks detected over 7 days</p>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-[13px] border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-[#F0F0F0] text-[#888] font-black uppercase tracking-widest text-[10px]">
                                <th className="px-8 py-4">Beneficiary</th>
                                <th className="px-8 py-4">Concern Type</th>
                                <th className="px-8 py-4">Location</th>
                                <th className="px-8 py-4">Facility Assign</th>
                                <th className="px-8 py-4 text-center">Stagnation</th>
                                <th className="px-8 py-4">Intervention</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0F0F0]">
                            {overdueTable.map(row => (
                                <tr key={row.id} className="hover:bg-red-50/20 transition-all group">
                                    <td className="px-8 py-5" onClick={() => router.push(`/dpo/children/${row.id}`)}>
                                        <div className="flex items-center gap-2 font-black text-black group-hover:translate-x-1 transition-transform cursor-pointer">
                                            {row.child}
                                            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <code className="text-[10px] text-[#AAA] font-mono">#{row.id}</code>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase border ${row.urgency === 'Critical' ? 'bg-red-600 text-white border-red-600' : 'bg-orange-600 text-white border-orange-600'}`}>
                                            {row.urgency} • {row.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="font-bold text-black uppercase tracking-tighter text-[11px]">{row.cdpo}</p>
                                        <p className="text-[11px] text-[#888] font-medium">{row.mandal}</p>
                                    </td>
                                    <td className="px-8 py-5 text-[#555555] font-medium text-[12px]">{row.facility}</td>
                                    <td className={`px-8 py-5 text-center font-black text-[18px] ${row.overdue > 21 ? 'text-red-600' : 'text-black'}`}>
                                        {row.overdue}<span className="text-[10px] ml-0.5">D</span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center gap-2 justify-end">
                                            <button className="px-4 py-2 bg-black text-white rounded-lg text-[11px] font-black uppercase hover:bg-red-600 transition-colors shadow-lg shadow-black/5">Escalate</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-2xl p-10 shadow-sm overflow-hidden relative">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-50 rounded-tl-full opacity-50" />
                <h3 className="text-[18px] font-black uppercase tracking-tighter text-black mb-8">Clinical Conversion Trends</h3>
                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} fontWeight="black" />
                            <YAxis yAxisId="left" fontSize={10} tickLine={false} axisLine={false} fontWeight="bold" />
                            <YAxis yAxisId="right" orientation="right" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                            />
                            <Legend verticalAlign="top" align="right" />
                            <Bar yAxisId="left" dataKey="generated" name="Generated" fill="#E5E5E5" radius={[4, 4, 0, 0]} />
                            <Bar yAxisId="left" dataKey="completed" name="Completed" fill="#000" radius={[4, 4, 0, 0]} />
                            <Line yAxisId="right" type="stepAfter" dataKey="rate" name="Efficiency %" stroke="#ef4444" strokeWidth={3} dot={{ stroke: '#ef4444', strokeWidth: 2, fill: '#fff', r: 4 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden">
                <div className="p-8 border-b border-[#F0F0F0] flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h3 className="text-[14px] font-black uppercase tracking-widest text-black">Registry of Referrals</h3>
                        <p className="text-[12px] text-[#888] font-medium">Detailed audit trail for all district cases</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative group">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAAAAA] group-focus-within:text-black transition-colors" />
                            <input
                                type="text"
                                placeholder="Search UUID or Facility..."
                                className="pl-12 pr-6 h-11 bg-[#fcfcfc] border border-[#E5E5E5] rounded-xl text-[13px] w-[300px] focus:ring-1 focus:ring-black focus:border-black transition-all outline-none font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 h-11 bg-white border border-[#E5E5E5] rounded-xl text-[13px] font-bold text-[#555] hover:border-black hover:text-black transition-all">
                            <Filter size={16} /> Filters
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 h-11 bg-black text-white rounded-xl text-[13px] font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
                            <Download size={16} /> Export CSV
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left text-[13px] border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-[#F0F0F0] text-[10px] font-black uppercase tracking-[0.2em] text-[#888]">
                                <th className="px-8 py-5">Case #</th>
                                <th className="px-8 py-5">Beneficiary</th>
                                <th className="px-8 py-5">Origin CDPO</th>
                                <th className="px-8 py-5">Discipline</th>
                                <th className="px-8 py-5">Facility Node</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">TAT</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0F0F0]">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-8 py-6 text-[#BBB] font-mono text-[11px]">{2400 + i}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 font-black text-black text-[14px]">
                                            Beneficiary Name {i}
                                            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <p className="text-[10px] font-bold text-[#AAA] tracking-tighter">4Y 2M • FEMALE</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-black font-black uppercase tracking-tighter text-[11px]">Region {i % 5}</p>
                                        <p className="text-[11px] text-[#AAA] font-medium lowercase">mandal_{i}_sector</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-black font-bold text-[12px]">{i % 3 === 0 ? 'Speech' : i % 3 === 1 ? 'Motor' : 'Nutrition'}</span>
                                    </td>
                                    <td className="px-8 py-6 text-[#555555] font-medium text-[12px]">District Referral Hospital Center</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-green-600 shadow-[0_0_8px_rgba(22,163,74,0.4)]' : i % 3 === 1 ? 'bg-amber-400' : 'bg-blue-400'
                                                }`} />
                                            <span className={`text-[12px] font-black uppercase tracking-tighter ${i % 3 === 0 ? 'text-green-600' : i % 3 === 1 ? 'text-amber-500' : 'text-blue-500'
                                                }`}>
                                                {i % 3 === 0 ? 'Fulfilled' : i % 3 === 1 ? 'Pending Slot' : 'In Pipeline'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right font-black text-[14px] text-black">
                                        {i * 4}d
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DpoReferrals;
