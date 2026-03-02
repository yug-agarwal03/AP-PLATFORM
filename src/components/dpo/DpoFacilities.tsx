'use client';

import React, { useState } from 'react';
import {
    Map,
    Search,
    Filter,
    Table,
    ChevronDown,
    ArrowUpRight,
    ArrowDownRight,
    CheckCircle2,
    AlertTriangle,
    Clock,
    Zap,
    Building2,
    MoreVertical,
    Activity,
    ShieldCheck,
    Navigation,
    Home,
    Smartphone
} from 'lucide-react';

const DpoFacilities: React.FC = () => {
    const facilities = [
        { id: 'FAC-201', name: 'Kondapur Main AWC', type: 'Anganwadi Center', location: 'Kondapur North', capacity: '30 Children', status: 'Operational', performance: 94, lastSync: '12m ago' },
        { id: 'FAC-204', name: 'Nellore District Node', type: 'Health Sub-Center', location: 'Nellore Central', capacity: '120 Children', status: 'Optimal', performance: 88, lastSync: '1h ago' },
        { id: 'FAC-208', name: 'Rampur Cluster B', type: 'Anganwadi Center', location: 'Mallapur South', capacity: '25 Children', status: 'Critical Audit', performance: 42, lastSync: '3h ago' },
        { id: 'FAC-212', name: 'G-Road Integrated', type: 'Health Hub', location: 'Kondapur West', capacity: '80 Children', status: 'Maintenance', performance: 76, lastSync: '5m ago' },
        { id: 'FAC-215', name: 'Valley View Center', type: 'Anganwadi Center', location: 'Nellore East', capacity: '40 Children', status: 'Operational', performance: 91, lastSync: '22m ago' },
    ];

    const kpis = [
        { label: 'TOTAL FACES', value: '156', icon: <Building2 size={20} />, color: 'black' },
        { label: 'OPERATIONAL', value: '142', icon: <CheckCircle2 size={20} />, color: 'green' },
        { label: 'AUDIT PENDING', value: '8', icon: <AlertTriangle size={20} />, color: 'red' },
        { label: 'AVG CAPACITY', value: '42', icon: <Home size={20} />, color: 'black' },
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                <div>
                    <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">Facility Registry</h1>
                    <p className="text-[14px] text-[#888888] font-medium flex items-center gap-2">
                        <Building2 size={14} />
                        District Command Node • Institutional Asset Matrix
                    </p>
                </div>
                <div className="flex bg-white shadow-sm border border-[#E5E5E5] rounded-2xl p-1 shrink-0">
                    {['Inventory', 'Mapping', 'Audit Logs'].map((pill) => (
                        <button
                            key={pill}
                            className={`px-6 py-2 text-[11px] font-black uppercase rounded-xl transition-all ${pill === 'Inventory' ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-[#888] hover:text-black hover:bg-gray-50'}`}
                        >
                            {pill}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((item, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[32px] border border-[#E5E5E5] shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-all">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform">
                            {item.icon}
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            <span className="text-[11px] font-black text-[#888888] uppercase tracking-[0.2em] mb-8">{item.label}</span>
                            <div className="text-[42px] font-black tracking-tighter leading-none italic" style={{ color: item.color === 'red' ? '#EF4444' : item.color === 'green' ? '#22C55E' : 'black' }}>{item.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* MAIN TABLE */}
            <div className="bg-white border border-[#E5E5E5] rounded-[40px] shadow-sm overflow-hidden group">
                <div className="p-10 border-b border-[#F0F0F0] flex justify-between items-center bg-[#fcfcfc] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 transition-transform">
                        <Navigation size={160} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-[16px] font-black uppercase tracking-widest text-black mb-1">Infrastructure Matrix</h3>
                        <p className="text-[13px] text-[#888] font-medium uppercase tracking-tight italic">Unified view of all regional health & early education nodes</p>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="relative group/search">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BBB] group-focus-within/search:text-black transition-colors" />
                            <input type="text" placeholder="Filter nodes..." className="pl-12 pr-6 h-12 bg-white border-2 border-[#F0F0F0] rounded-2xl text-[13px] w-[260px] focus:border-black outline-none transition-all font-black uppercase tracking-tight shadow-sm" />
                        </div>
                        <button className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-black bg-white px-6 py-3 rounded-xl border border-[#EEE] hover:border-black transition-all shadow-sm">
                            <Filter size={16} /> Matrix Refine
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto relative z-10">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[#AAA] font-black uppercase tracking-widest text-[10px] border-b border-[#F0F0F0] bg-gray-50/50">
                                <th className="px-10 py-6">ID & Node Identity</th>
                                <th className="px-10 py-6">Classification</th>
                                <th className="px-10 py-6 text-center">Status Tier</th>
                                <th className="px-10 py-6 text-center">Index</th>
                                <th className="px-10 py-6 text-right">Last Sync</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0F0F0]">
                            {facilities.map((fac) => (
                                <tr key={fac.id} className="hover:bg-gray-50/80 transition-all group cursor-pointer">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl bg-black/5 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm group-hover:shadow-2xl group-hover:shadow-black/10">
                                                <Building2 size={22} />
                                            </div>
                                            <div>
                                                <p className="font-black text-black text-[18px] leading-tight uppercase tracking-tighter italic">{fac.name}</p>
                                                <p className="text-[11px] text-[#AAA] font-black tracking-widest uppercase mt-1.5 flex items-center gap-2">
                                                    {fac.id} • {fac.location}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <p className="font-black text-black uppercase text-[12px] tracking-tight">{fac.type}</p>
                                        <p className="text-[10px] text-[#AAA] font-bold uppercase tracking-widest mt-1">{fac.capacity}</p>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border-2 shadow-sm ${fac.status === 'Operational' ? 'bg-green-50 text-green-700 border-green-200' :
                                                fac.status === 'Optimal' ? 'bg-black text-white border-black' : 'bg-red-50 text-red-700 border-red-200 shadow-red-100'
                                            }`}>
                                            {fac.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <span className={`text-[18px] font-black italic ${fac.performance < 70 ? 'text-red-500' : 'text-black'}`}>{fac.performance}%</span>
                                            <div className="w-12 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                                <div className={`h-full ${fac.performance < 70 ? 'bg-red-500' : 'bg-black'}`} style={{ width: `${fac.performance}%` }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[13px] font-black text-black uppercase tracking-tight">{fac.lastSync}</span>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                                <span className="text-[10px] text-[#AAA] font-black uppercase tracking-widest italic">Node Active</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="w-full py-6 bg-gray-50/50 text-[11px] font-black uppercase text-black hover:bg-black hover:text-white tracking-[0.6em] border-t border-[#F0F0F0] transition-all">
                    Load Continuous Inventory Registry
                </button>
            </div>

            {/* ACTION FOOTER */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-black p-10 rounded-[40px] shadow-2xl text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <ShieldCheck size={120} />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <h3 className="text-[12px] font-black uppercase tracking-widest text-white/40">Compliance Directive</h3>
                        <h2 className="text-[24px] font-black tracking-tighter uppercase leading-tight italic">Registry Purge Protocol — Q1 Infrastructure Reset Active. No data loss sanctioned.</h2>
                        <div className="flex items-center gap-4 pt-4">
                            <button className="px-8 py-3 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[11px] hover:scale-105 transition-all">Audit Node IDs</button>
                            <button className="px-8 py-3 bg-white/10 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">Download Matrix</button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#fcfcfc] border-2 border-black p-10 rounded-[40px] shadow-sm relative overflow-hidden group">
                    <div className="absolute bottom-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform">
                        <Activity size={140} />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <h3 className="text-[14px] font-black uppercase tracking-widest text-black">Signal Dispatch</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center shadow-xl shadow-black/10"><Smartphone size={24} /></div>
                            <div>
                                <p className="text-[16px] font-black uppercase tracking-tight italic">Mobile Registry App</p>
                                <p className="text-[11px] text-[#AAA] font-black uppercase tracking-widest">Connect all 156 nodes to the sovereign API</p>
                            </div>
                        </div>
                        <button className="w-full py-4 bg-white border border-[#EEE] rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] hover:border-black transition-all mt-4">Generate Access Tokens</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DpoFacilities;
