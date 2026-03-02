'use client';

import React from 'react';
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
} from 'recharts';
import { Scorecard, FunnelStep, AlertItem } from './DpoUI';
import { KPI } from '@/lib/dpo/types';
import { TrendingUp, TrendingDown, ChevronRight, AlertCircle, AlertTriangle, Map, Send, Activity, ShieldCheck, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DpoDashboard: React.FC = () => {
    const router = useRouter();
    const kpis: KPI[] = [
        { label: 'TOTAL CHILDREN', value: '28,500', trend: [20, 22, 24, 25, 26, 28, 28, 28.5], change: '+1.2%', isPositive: true },
        { label: 'SCREENED', value: '18,200', trend: [10, 12, 14, 15, 16, 17, 18, 18.2], change: '+4.5%', isPositive: true },
        { label: 'COVERAGE', value: '64%', trend: [58, 59, 60, 61, 62, 63, 63.5, 64], change: '+3%', isPositive: true },
        { label: 'HIGH/CRITICAL', value: '1,820', trend: [25, 24, 23, 22, 21, 20, 19, 18.2], change: '-2%', isPositive: true },
        { label: 'ESCALATIONS', value: '42', trend: [10, 12, 11, 15, 20, 35, 40, 42], change: '+12', isPositive: false },
        { label: 'ACTIVE REFERRALS', value: '234', trend: [200, 210, 220, 225, 230, 232, 233, 234], change: '+5.1%', isPositive: true },
    ];

    const riskDistribution = [
        { name: 'Low', value: 12400, color: '#22c55e' },
        { name: 'Med', value: 4200, color: '#eab308' },
        { name: 'High', value: 1200, color: '#f97316' },
        { name: 'Critical', value: 400, color: '#ef4444' },
    ];

    const screeningTrend = [
        { name: 'Jan', val: 1200 }, { name: 'Feb', val: 1400 }, { name: 'Mar', val: 1300 },
        { name: 'Apr', val: 1600 }, { name: 'May', val: 1800 }, { name: 'Jun', val: 1700 },
        { name: 'Jul', val: 2000 }, { name: 'Aug', val: 2100 }, { name: 'Sep', val: 2300 },
        { name: 'Oct', val: 2500 }, { name: 'Nov', val: 2700 }, { name: 'Dec', val: 2850 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">District Dashboard</h1>
                    <p className="text-[14px] text-[#888888] font-medium flex items-center gap-2">
                        <Map size={14} />
                        Kondapur District • 5 CDPOs • 42 Mandals • 680 AWCs
                    </p>
                </div>
                <div className="flex bg-white shadow-sm border border-[#E5E5E5] rounded-xl p-1">
                    {['Realtime', 'History', 'Forecast'].map((pill) => (
                        <button
                            key={pill}
                            className={`px-6 py-1.5 text-[11px] font-bold uppercase rounded-lg transition-all ${pill === 'Realtime' ? 'bg-black text-white shadow-lg shadow-black/10' : 'text-[#888] hover:text-black hover:bg-gray-50'}`}
                        >
                            {pill}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-nowrap gap-5 overflow-x-auto pb-4 scrollbar-hide">
                {kpis.map((kpi) => (
                    <Scorecard key={kpi.label} kpi={kpi} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:scale-110 transition-transform">
                        <Map size={240} />
                    </div>
                    <div className="flex justify-between items-center mb-10 relative z-10">
                        <h3 className="text-[14px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                            <Activity size={16} /> Regional Performance Density
                        </h3>
                        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-[#888888]">
                            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-gray-100" /> Low Cov.</div>
                            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-black" /> Optimal</div>
                        </div>
                    </div>
                    <div className="h-[380px] bg-[#fcfcfc] rounded-2xl border border-[#F5F5F5] relative overflow-hidden flex items-center justify-center p-6 shadow-inner">
                        <svg viewBox="0 0 500 400" className="w-full h-full drop-shadow-2xl">
                            <path d="M50 100 L250 50 L300 150 L100 200 Z" fill="#000000" className="cursor-pointer hover:opacity-90 transition-all hover:scale-[1.02] origin-center" onClick={() => router.push('/dpo/cdpos/north')} />
                            <text x="140" y="130" fill="white" fontSize="12" fontWeight="900" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>North</text>
                            <text x="155" y="145" fill="white" fontSize="10" fontWeight="700">84%</text>

                            <path d="M250 50 L450 100 L400 200 L300 150 Z" fill="#222222" className="cursor-pointer hover:opacity-90 transition-all hover:scale-[1.02] origin-center" onClick={() => router.push('/dpo/cdpos/east')} />
                            <text x="320" y="130" fill="white" fontSize="12" fontWeight="900" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>East</text>
                            <text x="335" y="145" fill="white" fontSize="10" fontWeight="700">72%</text>

                            <path d="M100 200 L300 150 L400 200 L350 300 L150 280 Z" fill="#555555" className="cursor-pointer hover:opacity-90 transition-all hover:scale-[1.02] origin-center" onClick={() => router.push('/dpo/cdpos/central')} />
                            <text x="210" y="240" fill="white" fontSize="12" fontWeight="900" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Central</text>
                            <text x="235" y="255" fill="white" fontSize="10" fontWeight="700">64%</text>

                            <path d="M150 280 L350 300 L300 380 L100 350 Z" fill="#888888" className="cursor-pointer hover:opacity-90 transition-all hover:scale-[1.02] origin-center" onClick={() => router.push('/dpo/cdpos/south')} />
                            <text x="200" y="340" fill="white" fontSize="12" fontWeight="900" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>South</text>
                            <text x="215" y="355" fill="white" fontSize="10" fontWeight="700">52%</text>

                            <path d="M20 180 L100 200 L150 280 L100 350 L20 300 Z" fill="#BBBBBB" className="cursor-pointer hover:opacity-90 transition-all hover:scale-[1.02] origin-center" onClick={() => router.push('/dpo/cdpos/west')} />
                            <text x="50" y="270" fill="#000" fontSize="12" fontWeight="900" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>West</text>
                            <text x="65" y="285" fill="#000" fontSize="10" fontWeight="700">42%</text>
                        </svg>
                    </div>
                </div>

                <div className="lg:col-span-5 bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm flex flex-col relative overflow-hidden group">
                    <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-gray-50 rounded-full group-hover:scale-110 transition-transform duration-1000" />
                    <h3 className="text-[14px] font-black uppercase tracking-widest text-black mb-10 relative z-10">Risk Composition Registry</h3>
                    <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                        <div className="relative h-[240px] w-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={riskDistribution}
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {riskDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute flex flex-col items-center justify-center text-center">
                                <span className="text-[32px] font-black text-black leading-none">18.2K</span>
                                <span className="text-[10px] text-[#888] font-black uppercase tracking-widest mt-1">Screened</span>
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-4 mt-10">
                            {riskDistribution.map((risk) => (
                                <div key={risk.name} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-transparent hover:border-black/5 transition-all">
                                    <div className="w-2.5 h-2.5 rounded-full shadow-lg" style={{ backgroundColor: risk.color }} />
                                    <div>
                                        <p className="text-[12px] text-black font-black uppercase tracking-tighter">{risk.name}</p>
                                        <p className="text-[10px] text-[#888] font-bold">
                                            {Math.round(risk.value / 18200 * 100)}% Index
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="w-full mt-10 pt-8 border-t border-[#F9F9F9]">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[11px] font-black uppercase tracking-widest text-[#888]">Gov Coverage Benchmark</span>
                                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-lg border border-green-100 shadow-sm shadow-green-50">+6% V-Index</span>
                            </div>
                            <div className="h-2 w-full bg-[#f0f0f0] rounded-full overflow-hidden">
                                <div className="h-full bg-black transition-all duration-1000 shadow-[0_0_10px_black]" style={{ width: '64%' }} />
                            </div>
                            <div className="flex justify-between mt-3 text-[10px] font-black uppercase tracking-widest">
                                <span className="text-[#CCC]">District Baseline: 58%</span>
                                <span className="text-black">Actual: 64% Optimal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm group">
                    <h3 className="text-[14px] font-black uppercase tracking-widest text-black mb-10">Temporal Screening Velocity</h3>
                    <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={screeningTrend}>
                                <defs>
                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#F0F0F0" />
                                <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} fontWeight="black" />
                                <YAxis fontSize={11} tickLine={false} axisLine={false} fontWeight="bold" />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="val"
                                    stroke="#000000"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorVal)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm flex flex-col group">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-[14px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                            <ShieldCheck size={16} /> Governance Lifecycle
                        </h3>
                        <button onClick={() => router.push('/dpo/escalations')} className="text-[10px] font-black uppercase tracking-widest text-black hover:underline group-hover:translate-x-1 transition-transform flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                            Drill Down <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="space-y-6 flex-1 flex flex-col justify-center px-4">
                        <div className="space-y-6">
                            <FunnelStep label="Escalated From Field" count={42} total={42} />
                            <FunnelStep label="Admin Acknowledged" count={30} total={42} />
                            <FunnelStep label="Active Intervention" count={18} total={42} bottleneck />
                            <FunnelStep label="Resolved (Census)" count={12} total={42} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm flex flex-col group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Send size={120} />
                    </div>
                    <div className="flex justify-between items-center mb-10 relative z-10">
                        <h3 className="text-[14px] font-black uppercase tracking-widest text-black">Clinic Referral Funnel</h3>
                        <button onClick={() => router.push('/dpo/referrals')} className="text-[10px] font-black uppercase tracking-widest text-black hover:underline group-hover:translate-x-1 transition-transform flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                            Flow Metrics <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-1 relative z-10">
                        <div className="space-y-6 flex flex-col justify-center">
                            <FunnelStep label="Clinical Referrals" count={234} total={234} />
                            <FunnelStep label="Dispatched to Node" count={198} total={234} />
                            <FunnelStep label="Slot Realization" count={142} total={234} />
                            <FunnelStep label="Finalized Outcome" count={108} total={234} />
                        </div>
                        <div className="flex flex-col items-center justify-center border-l border-[#F9F9F9] pl-10">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#AAA] mb-2 text-center">Node Latency TAT</span>
                            <div className="text-[64px] font-black text-red-600 leading-none drop-shadow-lg shadow-red-200">12</div>
                            <span className="text-[14px] font-black text-black uppercase tracking-widest mt-2">District Days</span>
                            <div className="mt-6 px-4 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-red-100 flex items-center gap-2">
                                <AlertTriangle size={14} /> Action Required
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm flex flex-col group relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 p-8 opacity-[0.03]">
                        <Bell size={180} />
                    </div>
                    <div className="flex justify-between items-center mb-8 relative z-10">
                        <h3 className="text-[14px] font-black uppercase tracking-widest text-black">District Nerve Center</h3>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Live Intel</span>
                        </div>
                    </div>
                    <div className="space-y-4 flex-1 relative z-10">
                        <AlertItem
                            type="red"
                            message="NELLORE CLUSTER: 3 critical escalations unresolved for 14+ days. System lockout warning."
                        />
                        <AlertItem
                            type="amber"
                            message="MANDAL X: Personnel coverage hit 38% floor. Unit replacement protocol active."
                        />
                        <AlertItem
                            type="amber"
                            message="LOGISTICS: Referral drop-off exceeded 30% in East Sector. Node auditing enabled."
                        />
                        <AlertItem
                            type="red"
                            message="GOVERNANCE: 2 unauthorized terminal access attempts detected. Security key rotation advised."
                        />
                    </div>
                    <button className="w-full mt-8 py-3 bg-black text-white rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-gray-800 transition-all shadow-xl shadow-black/10 relative z-10">
                        Acknowledge All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DpoDashboard;
