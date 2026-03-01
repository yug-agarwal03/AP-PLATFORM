'use client';

import React from 'react';
import {
    Activity, CheckCircle2, AlertTriangle, XCircle,
    Database, Zap, Clock, Server, ShieldCheck,
    ArrowUpRight, RefreshCw, BarChart3, HardDrive,
    Info, Cpu, Network
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, AreaChart, Area,
    Legend
} from 'recharts';

// --- Mock Data ---

const SYNC_QUEUE_DEPTH = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    depth: Math.floor(Math.random() * 200) + (i > 8 && i < 18 ? 300 : 50),
}));

const API_LATENCY_DATA = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    p50: Math.floor(Math.random() * 50) + 100,
    p95: Math.floor(Math.random() * 100) + 200,
    p99: Math.floor(Math.random() * 200) + 350,
}));

const DB_GROWTH_DATA = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    size: 1.5 + (i * 0.02) + (Math.random() * 0.01),
}));

const SERVICES = [
    { name: 'Supabase (Database)', status: 'Operational', uptime: '99.99%', health: 'HEALTHY' },
    { name: 'Auth Service', status: 'Operational', uptime: '100%', health: 'HEALTHY' },
    { name: 'File Storage', status: 'Operational', uptime: '99.95%', health: 'HEALTHY' },
    { name: 'AI Models (ONNX)', status: 'Operational', uptime: '99.98%', health: 'HEALTHY' },
    { name: 'OMR Processing', status: 'Degraded', uptime: '98.42%', health: 'DEGRADED' },
    { name: 'Background Sync', status: 'Operational', uptime: '99.99%', health: 'HEALTHY' },
    { name: 'Push Notifications', status: 'Operational', uptime: '99.90%', health: 'HEALTHY' },
];

const ERROR_LOG = [
    { time: '14:22:10', service: 'OMR Processing', error: 'Timeout waiting for worker', count: 12, status: 'Investigating' },
    { time: '14:15:05', service: 'Push Notifications', error: 'FCM Token Invalid', count: 4, status: 'Resolved' },
    { time: '13:58:22', service: 'Sync Service', error: 'Payload size limit exceeded', count: 1, status: 'Resolved' },
    { time: '12:10:44', service: 'Auth Service', error: 'MFA SMS Provider Latency', count: 8, status: 'Resolved' },
];

const DB_TABLES = [
    { name: 'children', rows: '450,230', size: '412 MB' },
    { name: 'questionnaire_responses', rows: '1,240,591', size: '890 MB' },
    { name: 'screening_sessions', rows: '382,100', size: '210 MB' },
    { name: 'user_logs', rows: '5,102,400', size: '540 MB' },
];

// --- Sub-components ---

const KPIChartCard = ({ label, value, sub, icon, colorClass, statusIcon }: any) => (
    <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2 bg-gray-50 rounded-lg ${colorClass}`}>
                {icon}
            </div>
            {statusIcon}
        </div>
        <div>
            <p className="text-[28px] font-bold text-black leading-tight">{value}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <p className={`text-[11px] font-medium mt-1 ${colorClass}`}>{sub}</p>
        </div>
    </div>
);

const SystemHealth: React.FC = () => {
    const overallHealth: 'HEALTHY' | 'DEGRADED' | 'ISSUE' = 'DEGRADED';

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-[24px] font-semibold text-black leading-tight">System Health</h1>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded text-[13px] font-bold hover:bg-gray-50 text-gray-700 transition-all">
                        <RefreshCw size={16} />
                        <span>Refresh All</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded text-[13px] font-bold hover:bg-gray-800 transition-all">
                        <ShieldCheck size={16} />
                        <span>Security Audit</span>
                    </button>
                </div>
            </div>

            {/* Status Banner */}
            {overallHealth === 'DEGRADED' ? (
                <div className="w-full bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-4 flex items-center justify-between animate-in fade-in duration-500">
                    <div className="flex items-center space-x-3 text-[#92400E]">
                        <AlertTriangle size={20} />
                        <div>
                            <p className="text-[14px] font-bold uppercase tracking-tight">Degraded performance — sync queue elevated</p>
                            <p className="text-[12px] opacity-80">Sync service is operating above p95 latency thresholds. Investigating OMR worker scaling.</p>
                        </div>
                    </div>
                    <button className="text-[12px] font-bold text-[#92400E] underline">View Incident Log</button>
                </div>
            ) : overallHealth === 'HEALTHY' ? (
                <div className="w-full bg-[#DCFCE7] border border-[#BBF7D0] rounded-xl p-4 flex items-center space-x-3 text-[#166534] animate-in fade-in duration-500">
                    <CheckCircle2 size={20} />
                    <p className="text-[14px] font-bold uppercase tracking-tight">All systems operational</p>
                </div>
            ) : (
                <div className="w-full bg-[#FEE2E2] border border-[#FECACA] rounded-xl p-4 flex items-center space-x-3 text-[#991B1B] animate-in fade-in duration-500">
                    <XCircle size={20} />
                    <p className="text-[14px] font-bold uppercase tracking-tight">System issue detected — see details below</p>
                </div>
            )}

            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <KPIChartCard
                    label="UPTIME (30d)"
                    value="99.8%"
                    sub="Stable"
                    icon={<Clock size={18} />}
                    colorClass="text-green-600"
                    statusIcon={<CheckCircle2 size={16} className="text-green-500" />}
                />
                <KPIChartCard
                    label="API LATENCY"
                    value="142ms"
                    sub="Healthy"
                    icon={<Zap size={18} />}
                    colorClass="text-green-600"
                    statusIcon={<CheckCircle2 size={16} className="text-green-500" />}
                />
                <KPIChartCard
                    label="SYNC QUEUE"
                    value="342"
                    sub="Elevated"
                    icon={<Activity size={18} />}
                    colorClass="text-amber-600"
                    statusIcon={<AlertTriangle size={16} className="text-amber-500" />}
                />
                <KPIChartCard
                    label="ERRORS (24h)"
                    value="0"
                    sub="Optimal"
                    icon={<AlertTriangle size={18} />}
                    colorClass="text-green-600"
                    statusIcon={<CheckCircle2 size={16} className="text-green-500" />}
                />
                <KPIChartCard
                    label="DB SIZE"
                    value="2.1 GB"
                    sub="Capacity: 10GB"
                    icon={<Database size={18} />}
                    colorClass="text-gray-500"
                    statusIcon={<Info size={16} className="text-gray-400" />}
                />
            </div>

            {/* Row 2: Service Status & Sync Queue */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Card A: Service Status */}
                <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-sm flex flex-col">
                    <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="text-[13px] font-bold text-black uppercase tracking-widest">Service Status</h3>
                        <span className="text-[11px] font-bold text-gray-400">Total: 7 Services</span>
                    </div>
                    <div className="p-0 overflow-hidden flex-1">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Service</th>
                                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-3 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Uptime</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {SERVICES.map((s, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-[13px] font-medium text-black">{s.name}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-2 h-2 rounded-full ${s.health === 'HEALTHY' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]'}`} />
                                                <span className={`text-[11px] font-bold uppercase tracking-tight ${s.health === 'HEALTHY' ? 'text-green-700' : 'text-amber-700'}`}>{s.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right text-[12px] font-mono font-bold text-gray-500">{s.uptime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Card B: Sync Queue */}
                <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-sm flex flex-col">
                    <div className="p-5 border-b border-gray-50">
                        <h3 className="text-[13px] font-bold text-black uppercase tracking-widest">Sync Queue Status</h3>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <p className="text-[24px] font-bold text-black">342 items pending</p>
                                <p className="text-[12px] text-gray-500">Avg processing: <span className="text-black font-bold">12/min</span></p>
                            </div>
                            <div className="text-right">
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Breakdown</p>
                                <p className="text-[10px] font-medium text-gray-500 flex items-center justify-end flex-wrap gap-x-3 gap-y-1">
                                    <span>Children: <b className="text-black">120</b></span>
                                    <span>Responses: <b className="text-black">89</b></span>
                                    <span>Observations: <b className="text-black">45</b></span>
                                    <span>Flags: <b className="text-black">12</b></span>
                                    <span>Protocols: <b className="text-black">76</b></span>
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 h-[220px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={SYNC_QUEUE_DEPTH}>
                                    <defs>
                                        <linearGradient id="colorDepth" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
                                    <XAxis dataKey="hour" fontSize={10} tickLine={false} axisLine={false} tick={{ fill: '#999' }} />
                                    <YAxis fontSize={10} tickLine={false} axisLine={false} tick={{ fill: '#999' }} />
                                    <Tooltip
                                        contentStyle={{ border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '11px' }}
                                    />
                                    <Area type="monotone" dataKey="depth" stroke="#000000" fillOpacity={1} fill="url(#colorDepth)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 3: Error Log & API Response */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Error Log */}
                <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-sm flex flex-col">
                    <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="text-[13px] font-bold text-black uppercase tracking-widest">Error Log (Last 24h)</h3>
                        <button className="text-[11px] font-bold text-blue-600 hover:underline">Download full log</button>
                    </div>
                    <div className="p-0 overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time</th>
                                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Service</th>
                                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Error</th>
                                    <th className="px-6 py-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {ERROR_LOG.map((err, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-[12px] font-mono text-gray-400">{err.time}</td>
                                        <td className="px-6 py-4 text-[13px] font-bold text-black">{err.service}</td>
                                        <td className="px-6 py-4">
                                            <p className="text-[12px] text-gray-600 leading-tight">{err.error}</p>
                                            <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-tight">Occurred {err.count} times</p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${err.status === 'Investigating' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
                                                }`}>
                                                {err.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* API Latency Chart */}
                <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-sm p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[13px] font-bold text-black uppercase tracking-widest">API Response Time (24h)</h3>
                        <div className="flex space-x-3 text-[10px] font-bold uppercase">
                            <span className="flex items-center"><div className="w-2 h-2 bg-gray-300 rounded-full mr-1.5" /> P50</span>
                            <span className="flex items-center"><div className="w-2 h-2 bg-gray-500 rounded-full mr-1.5" /> P95</span>
                            <span className="flex items-center"><div className="w-2 h-2 bg-black rounded-full mr-1.5" /> P99</span>
                        </div>
                    </div>
                    <div className="flex-1 h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={API_LATENCY_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
                                <XAxis dataKey="hour" fontSize={10} tickLine={false} axisLine={false} tick={{ fill: '#999' }} />
                                <YAxis fontSize={10} tickLine={false} axisLine={false} tick={{ fill: '#999' }} label={{ value: 'ms', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#999' }} />
                                <Tooltip
                                    contentStyle={{ border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '11px' }}
                                />
                                <Line type="monotone" dataKey="p50" stroke="#D1D5DB" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="p95" stroke="#6B7280" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="p99" stroke="#000000" strokeWidth={3} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Row 4: Database Health */}
            <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-[13px] font-bold text-black uppercase tracking-widest">Database Health & Growth</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Table Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Storage by Table</h4>
                        <div className="space-y-4">
                            {DB_TABLES.map((t, idx) => (
                                <div key={idx} className="flex justify-between items-center group">
                                    <div>
                                        <p className="text-[13px] font-bold text-gray-800 group-hover:text-black">{t.name}</p>
                                        <p className="text-[11px] text-gray-400">{t.rows} rows</p>
                                    </div>
                                    <span className="text-[13px] font-mono font-bold text-gray-500">{t.size}</span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-6 border-t border-gray-100">
                            <div className="flex justify-between items-center text-[13px]">
                                <span className="font-bold text-gray-800">Total Utilization</span>
                                <span className="font-bold text-black">2.1 GB / 10.0 GB</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-black w-[21%]" />
                            </div>
                        </div>
                    </div>

                    {/* Growth Chart */}
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">30-Day Storage Growth (GB)</h4>
                            <span className="text-[11px] font-bold text-green-600">+0.6 GB this month</span>
                        </div>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={DB_GROWTH_DATA}>
                                    <defs>
                                        <linearGradient id="colorSize" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#000000" stopOpacity={0.05} />
                                            <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
                                    <XAxis dataKey="day" fontSize={10} tickLine={false} axisLine={false} tick={{ fill: '#999' }} />
                                    <YAxis domain={['auto', 'auto']} fontSize={10} tickLine={false} axisLine={false} tick={{ fill: '#999' }} />
                                    <Tooltip
                                        contentStyle={{ border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '11px' }}
                                        labelFormatter={(label) => `Day ${label}`}
                                    />
                                    <Area type="monotone" dataKey="size" stroke="#000000" fillOpacity={1} fill="url(#colorSize)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
                {[
                    { icon: <Cpu size={16} />, label: 'CLUSTER NODES', val: '12 Active' },
                    { icon: <MemoryStick size={16} />, label: 'RAM POOL', val: '48 GB Total' },
                    { icon: <Network size={16} />, label: 'THROUGHPUT', val: '840 req/sec' },
                    { icon: <ShieldCheck size={16} />, label: 'FIREWALL', val: 'IPS Engaged' },
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="text-gray-400">{item.icon}</div>
                        <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{item.label}</p>
                            <p className="text-[13px] font-bold text-gray-700 leading-none">{item.val}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MemoryStick = ({ size, className }: { size: number, className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M6 19v-3h12v3" />
        <path d="M10 16v-5" />
        <path d="M14 16v-5" />
        <path d="M18 16V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v11" />
    </svg>
);

export default SystemHealth;
