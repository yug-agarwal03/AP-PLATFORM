'use client';

import React, { useState } from 'react';
import {
    FileText,
    Download,
    Share2,
    Eye,
    Calendar,
    Filter,
    CheckSquare,
    Square,
    Clock,
    MoreVertical,
    ChevronDown,
    Mail,
    Zap,
    Loader2,
    ChevronRight,
    TrendingUp,
    Map,
    ShieldCheck,
    Search
} from 'lucide-react';

const DpoReports: React.FC = () => {
    const [reportType, setReportType] = useState('Monthly District Summary');
    const [format, setFormat] = useState('PDF Report');
    const [isGenerating, setIsGenerating] = useState(false);
    const [sections, setSections] = useState({
        summary: true,
        cdpo: true,
        screening: true,
        risk: true,
        escalation: true,
        referral: true,
        workforce: true,
        resources: true,
        highrisk: true,
    });

    const reportTypes = [
        'Monthly District Summary',
        'Quarterly Performance Review',
        'CDPO Scorecard',
        'Referral Pipeline Report',
        'Custom Range'
    ];

    const previousReports = [
        { name: 'Monthly_District_Summary_Jan_2024.pdf', period: 'Jan 2024', scope: 'Entire District', type: 'Monthly Summary', by: 'Admin User', date: '02 Feb 2024', size: '2.4 MB' },
        { name: 'Quarterly_Performance_Q4_2023.pdf', period: 'Oct-Dec 2023', scope: 'Entire District', type: 'Quarterly Review', by: 'State Officer', date: '05 Jan 2024', size: '4.8 MB' },
        { name: 'CDPO_Scorecard_Kondapur.csv', period: 'Dec 2023', scope: 'Kondapur Central', type: 'CDPO Scorecard', by: 'Admin User', date: '02 Jan 2024', size: '840 KB' },
        { name: 'Referral_Pipeline_Audit_Dec.pdf', period: 'Dec 2023', scope: 'Entire District', type: 'Referral Audit', by: 'Admin User', date: '28 Dec 2023', size: '1.2 MB' },
    ];

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
        }, 2000);
    };

    const toggleSection = (key: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">Reports & Exports</h1>
                    <p className="text-[14px] text-[#888888] font-medium flex items-center gap-2">
                        <Clock size={14} />
                        Last export: Today, 10:42 AM • District Governance Registry
                    </p>
                </div>
                <div className="flex bg-white shadow-sm border border-[#E5E5E5] rounded-xl p-1">
                    {['Generate', 'History', 'Automations'].map((pill) => (
                        <button
                            key={pill}
                            className={`px-6 py-1.5 text-[11px] font-black uppercase rounded-lg transition-all ${pill === 'Generate' ? 'bg-black text-white shadow-lg shadow-black/10' : 'text-[#888] hover:text-black hover:bg-gray-50'}`}
                        >
                            {pill}
                        </button>
                    ))}
                </div>
            </div>

            {/* GENERATOR CARD */}
            <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden group">
                <div className="p-8 border-b border-[#F0F0F0] flex justify-between items-center bg-[#fcfcfc] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                        <FileText size={120} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-[14px] font-black uppercase tracking-widest text-black">Data Compilation Engine</h3>
                        <p className="text-[12px] text-[#888] font-medium">Initialize district-wide performance documentation</p>
                    </div>
                    <div className="flex items-center gap-3 relative z-10">
                        <span className="text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-lg border border-green-100">Ready to compile</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    </div>
                </div>
                <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-4 space-y-8 border-r border-[#F0F0F0] pr-10">
                        <div className="space-y-4">
                            <label className="text-[11px] font-black text-black uppercase tracking-[0.2em]">Report Type</label>
                            <div className="space-y-3">
                                {reportTypes.map((type) => (
                                    <label key={type} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all hover:border-black group ${reportType === type ? 'bg-black border-black text-white shadow-xl shadow-black/10' : 'bg-white border-[#E5E5E5] text-[#555555]'}`}>
                                        <input
                                            type="radio"
                                            name="reportType"
                                            checked={reportType === type}
                                            onChange={() => setReportType(type)}
                                            className="hidden"
                                        />
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${reportType === type ? 'border-white' : 'border-[#DDD] group-hover:border-black'}`}>
                                            {reportType === type && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                        <span className="text-[13px] font-black uppercase tracking-tight">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[11px] font-black text-black uppercase tracking-[0.2em]">Regional Scope</label>
                            <div className="flex gap-4 p-1 bg-[#F9F9F9] rounded-xl border border-[#EEE]">
                                <button className="flex-1 py-2 text-[11px] font-black uppercase rounded-lg bg-white shadow-sm border border-[#EEE] text-black">Entire District</button>
                                <button className="flex-1 py-2 text-[11px] font-black uppercase text-[#AAA] hover:text-black">Sub-Region</button>
                            </div>
                            <select className="w-full h-12 px-4 border border-[#E5E5E5] rounded-xl text-[13px] font-black uppercase tracking-tight focus:ring-1 focus:ring-black outline-none bg-white transition-all appearance-none cursor-pointer">
                                <option>All 5 CDPOs</option>
                                <option>Kondapur Central</option>
                                <option>Nellore North</option>
                            </select>
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-8 pr-10 border-r border-[#F0F0F0]">
                        <div className="space-y-6">
                            <label className="text-[11px] font-black text-black uppercase tracking-[0.2em] flex justify-between">
                                Module Composition
                                <button
                                    onClick={() => {
                                        const allSelected = Object.values(sections).every(v => v);
                                        setSections({
                                            summary: !allSelected,
                                            cdpo: !allSelected,
                                            screening: !allSelected,
                                            risk: !allSelected,
                                            escalation: !allSelected,
                                            referral: !allSelected,
                                            workforce: !allSelected,
                                            resources: !allSelected,
                                            highrisk: !allSelected,
                                        });
                                    }}
                                    className="text-[10px] font-black uppercase text-[#BBB] hover:text-black transition-colors"
                                >
                                    {Object.values(sections).every(v => v) ? 'Clear All' : 'Select All'}
                                </button>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                {[
                                    { key: 'summary', label: 'Executive Summary' },
                                    { key: 'cdpo', label: 'Regional Scorecards' },
                                    { key: 'screening', label: 'Coverage Analytics' },
                                    { key: 'risk', label: 'Risk Distribution' },
                                    { key: 'escalation', label: 'Escalation Logs' },
                                    { key: 'referral', label: 'Referral Pipeline' },
                                    { key: 'workforce', label: 'Staff Compliance' },
                                    { key: 'resources', label: 'Assets & Logistics' },
                                    { key: 'highrisk', label: 'High-Priority Census' },
                                ].map((sec) => (
                                    <button
                                        key={sec.key}
                                        onClick={() => toggleSection(sec.key as any)}
                                        className="flex items-center gap-3 text-left group transition-all"
                                    >
                                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${sections[sec.key as keyof typeof sections] ? 'bg-black border-black text-white' : 'border-[#EEE] group-hover:border-black'}`}>
                                            {sections[sec.key as keyof typeof sections] && <CheckSquare size={12} strokeWidth={3} />}
                                        </div>
                                        <span className={`text-[12px] font-black uppercase tracking-tight ${sections[sec.key as keyof typeof sections] ? 'text-black' : 'text-[#BBB] group-hover:text-[#555]'}`}>
                                            {sec.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-[#F9F9F9]">
                            <label className="text-[11px] font-black text-black uppercase tracking-[0.2em] mb-4 block">Temporal Bound</label>
                            <div className="flex items-center gap-4">
                                <div className="relative flex-1 group">
                                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAAAAA] group-focus-within:text-black transition-colors" />
                                    <select className="w-full h-12 pl-12 pr-6 border border-[#E5E5E5] rounded-xl text-[13px] font-black uppercase tracking-tight bg-white appearance-none cursor-pointer">
                                        <option>January 2024</option>
                                        <option>February 2024</option>
                                        <option>March 2024 (Projected)</option>
                                    </select>
                                </div>
                                <div className="text-[#DDD] text-[10px] font-black font-mono">OR</div>
                                <button className="h-12 px-6 bg-white border border-[#E5E5E5] rounded-xl text-[11px] font-black uppercase tracking-widest text-black hover:bg-black hover:text-white hover:border-black transition-all shadow-sm">Custom</button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 flex flex-col justify-between">
                        <div className="space-y-4">
                            <label className="text-[11px] font-black text-black uppercase tracking-[0.2em]">Encoding Format</label>
                            <div className="space-y-3">
                                {['PDF Report', 'CSV Data Export', 'PPT Presentation'].map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFormat(f)}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${format === f ? 'bg-black text-white border-black shadow-xl shadow-black/10' : 'bg-white text-[#AAA] border-[#EEE] hover:border-black hover:text-black'
                                            }`}
                                    >
                                        <span className="text-[12px] font-black uppercase tracking-tight">{f}</span>
                                        <FileText size={18} className={format === f ? 'text-white' : 'text-[#DDD]'} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full h-[64px] bg-black text-white rounded-2xl font-black uppercase tracking-[0.4em] text-[13px] flex items-center justify-center gap-4 hover:bg-gray-800 transition-all disabled:bg-[#DDD] disabled:cursor-not-allowed shadow-2xl shadow-black/20"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 size={24} className="animate-spin" />
                                    Compiling...
                                </>
                            ) : (
                                <>
                                    <Zap size={24} />
                                    Generate
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-[#F0F0F0] flex justify-between items-center bg-[#fcfcfc]">
                        <h3 className="text-[14px] font-black uppercase tracking-widest text-black">Historical Document Registry</h3>
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BBB] group-focus-within:text-black transition-colors" />
                                <input type="text" placeholder="Search logs..." className="pl-12 pr-6 h-10 bg-white border border-[#EEE] rounded-xl text-[12px] w-[200px] focus:ring-1 focus:ring-black outline-none transition-all font-medium" />
                            </div>
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black bg-white px-4 py-2 rounded-lg border border-[#EEE] hover:border-black transition-all">
                                <Filter size={14} /> Refine
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-[13px]">
                            <thead>
                                <tr className="text-[#AAA] font-black uppercase tracking-widest text-[10px] border-b border-[#F0F0F0] bg-gray-50/50">
                                    <th className="px-8 py-5">Document Name</th>
                                    <th className="px-8 py-5 text-center">Span</th>
                                    <th className="px-8 py-5">Generated By</th>
                                    <th className="px-8 py-5">Sync Date</th>
                                    <th className="px-8 py-5 text-center">Node Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F0F0F0]">
                                {previousReports.map((report, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-all group cursor-pointer">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-black/5 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                                                    <FileText size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-black text-black text-[14px] leading-tight uppercase underline decoration-black/10 underline-offset-4">{report.name}</p>
                                                    <p className="text-[10px] text-[#AAA] font-black tracking-widest uppercase mt-1">{report.size} • {report.type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center text-[#555] font-black uppercase tracking-tighter text-[11px]">{report.period}</td>
                                        <td className="px-8 py-6">
                                            <p className="font-black text-black uppercase text-[11px] tracking-tight">{report.by}</p>
                                            <p className="text-[10px] text-[#AAA] font-bold uppercase tracking-widest">Level 4 Auth</p>
                                        </td>
                                        <td className="px-8 py-6 text-[#BBB] font-bold text-[11px] uppercase tracking-widest">{report.date}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-center gap-6">
                                                <button className="text-[#DDD] hover:text-black transition-colors" title="View"><Eye size={18} /></button>
                                                <button className="text-[#DDD] hover:text-black transition-colors" title="Download"><Download size={18} /></button>
                                                <button className="text-[#DDD] hover:text-black transition-colors" title="Share"><Share2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="w-full py-5 bg-gray-50/50 text-[11px] font-black uppercase text-[#AAA] hover:text-black tracking-widest border-t border-[#F0F0F0] transition-colors">Load Extended History</button>
                </div>

                <div className="lg:col-span-4 space-y-8 animate-in slide-in-from-right-2 duration-700">
                    <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm group">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-[14px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                                <Clock size={16} /> Autonomous Runs
                            </h3>
                            <button className="text-[10px] font-black uppercase tracking-widest text-[#AAA] hover:text-black">Manage</button>
                        </div>

                        <div className="space-y-6">
                            <div className="p-5 border border-[#EEE] rounded-2xl space-y-5 hover:border-black transition-all bg-[#fcfcfc] relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                                    <TrendingUp size={64} />
                                </div>
                                <div className="flex items-center justify-between relative z-10">
                                    <div>
                                        <h4 className="text-[13px] font-black text-black uppercase tracking-tight">District Master Sync</h4>
                                        <p className="text-[11px] text-[#AAA] font-medium">Automatic hand-off to State Portal</p>
                                    </div>
                                    <div className="relative inline-block w-12 h-6 cursor-pointer">
                                        <div className="w-full h-full bg-black rounded-full shadow-inner" />
                                        <div className="absolute left-7 top-1 w-4 h-4 bg-white rounded-full transition-all shadow-md" />
                                    </div>
                                </div>
                                <div className="space-y-3 pt-4 border-t border-[#F5F5F5] relative z-10">
                                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                                        <span className="text-[#AAA]">Recipients</span>
                                        <span className="text-black">Primary Commission</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-white border border-[#EEE] rounded-lg text-[10px] font-black tracking-tight text-black">master.audit@gov.in</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-green-600 font-black uppercase pt-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        Last sync: 14h ago
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 border border-[#EEE] rounded-2xl space-y-5 hover:border-black transition-all bg-[#fcfcfc]">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-[13px] font-black text-black uppercase tracking-tight">CDPO Flash Audit</h4>
                                        <p className="text-[11px] text-[#AAA] font-medium">Weekly scorecard distribution</p>
                                    </div>
                                    <div className="relative inline-block w-12 h-6 cursor-pointer">
                                        <div className="w-full h-full bg-black rounded-full shadow-inner" />
                                        <div className="absolute left-7 top-1 w-4 h-4 bg-white rounded-full transition-all shadow-md" />
                                    </div>
                                </div>
                                <div className="space-y-3 pt-4 border-t border-[#F5F5F5]">
                                    <div className="flex justify-between items-center text-[10px] font-black text-black uppercase tracking-widest">
                                        <span>Sub-Regions</span>
                                        <span className="px-2 py-0.5 bg-black text-white rounded">5 CDPOs</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-[#AAA] font-black uppercase pt-1">
                                        <Clock size={12} />
                                        Runs: Every Monday 08:00
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-4 border border-black text-black rounded-xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-black hover:text-white transition-all shadow-sm">
                                New Automation
                            </button>
                        </div>
                    </div>

                    <div className="bg-black p-8 rounded-2xl shadow-2xl text-white relative overflow-hidden group border border-white/5">
                        <div className="absolute bottom-[-20px] right-[-20px] w-48 h-48 bg-white opacity-[0.03] rounded-full group-hover:scale-125 transition-transform duration-1000" />
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                    <ShieldCheck size={20} className="text-white/60" />
                                </div>
                                <div>
                                    <h3 className="text-[12px] font-black uppercase tracking-widest text-white/40 leading-none">State Link</h3>
                                    <p className="text-[14px] font-black uppercase tracking-tight mt-1">Sovereign Cloud Backup</p>
                                </div>
                            </div>
                            <p className="text-[13px] font-medium leading-relaxed text-white/60">District data is encrypted and mirrored to the State Secure Archive every 24 hours.</p>
                            <div className="flex flex-col gap-3 pt-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Registry Sync: Active</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Tunnel: Encrypted Layer-7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DpoReports;
