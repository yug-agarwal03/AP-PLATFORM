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
    Search,
    FileDown,
    RefreshCw
} from 'lucide-react';

const CdpoReports: React.FC = () => {
    const [reportType, setReportType] = useState('Monthly Summary');
    const [reportFormat, setReportFormat] = useState('PDF');
    const [isGenerating, setIsGenerating] = useState(false);
    const [genProgress, setGenProgress] = useState(0);

    const reportTypes = [
        'Monthly Summary',
        'Quarterly Review',
        'Mandal Scorecard',
        'Referral Pipeline Audit',
        'Custom Range'
    ];

    const previousReports = [
        { id: 1, name: 'Monthly_Summary_Kondapur_Jan_2024.pdf', period: 'Jan 2024', scope: 'All Mandals', type: 'Monthly Summary', by: 'Admin User', date: '02 Feb 2024', size: '1.8 MB', format: 'PDF' },
        { id: 2, name: 'Quarterly_Review_Q4_2023.pdf', period: 'Oct-Dec 2023', scope: 'All Mandals', type: 'Quarterly Review', by: 'State Officer', date: '05 Jan 2024', size: '3.2 MB', format: 'PDF' },
        { id: 3, name: 'Mandal_Scorecard_Nellore.csv', period: 'Dec 2023', scope: 'Nellore North', type: 'Mandal Scorecard', by: 'Admin User', date: '02 Jan 2024', size: '640 KB', format: 'CSV' },
    ];

    const handleGenerateReport = () => {
        setIsGenerating(true);
        setGenProgress(0);
        const interval = setInterval(() => {
            setGenProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsGenerating(false), 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-500 pb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                <div>
                    <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">Reporting Engine</h1>
                    <p className="text-[14px] text-[#888888] font-medium flex items-center gap-2">
                        <Clock size={14} />
                        Last sync: Today, 09:12 AM • Regional Documentation Hub
                    </p>
                </div>
                <div className="flex bg-white shadow-sm border border-[#E5E5E5] rounded-2xl p-1">
                    {['Compile', 'Registry', 'Schedules'].map((pill) => (
                        <button
                            key={pill}
                            className={`px-6 py-2 text-[11px] font-black uppercase rounded-xl transition-all ${pill === 'Compile' ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-[#888] hover:text-black hover:bg-gray-50'}`}
                        >
                            {pill}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* GENERATOR CARD */}
                <div className="lg:col-span-8 space-y-12">
                    <div className="bg-white border border-[#E5E5E5] rounded-[32px] shadow-sm overflow-hidden group">
                        <div className="p-10 border-b border-[#F0F0F0] flex justify-between items-center bg-[#fcfcfc] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                                <FileText size={160} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-[16px] font-black uppercase tracking-widest text-black mb-1">Documentation Compiler</h3>
                                <p className="text-[13px] text-[#888] font-medium uppercase tracking-tight">Regional performance report generation node</p>
                            </div>
                            <div className="flex items-center gap-3 relative z-10">
                                <span className="text-[10px] font-black text-black uppercase tracking-widest bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">Ready</span>
                                <div className="w-2.5 h-2.5 rounded-full bg-black animate-pulse shadow-[0_0_15px_rgba(0,0,0,0.3)]" />
                            </div>
                        </div>

                        <div className="p-10 space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <label className="text-[11px] font-black text-black uppercase tracking-[0.2em] block mb-4">Report Template</label>
                                    <div className="space-y-3">
                                        {reportTypes.map((type) => (
                                            <label key={type} className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all hover:border-black group ${reportType === type ? 'bg-black border-black text-white shadow-2xl shadow-black/10' : 'bg-white border-[#F0F0F0] text-[#555555]'}`}>
                                                <input type="radio" checked={reportType === type} onChange={() => setReportType(type)} className="hidden" />
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${reportType === type ? 'border-white' : 'border-[#DDD] group-hover:border-black'}`}>
                                                    {reportType === type && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                                </div>
                                                <span className="text-[14px] font-black uppercase tracking-tight">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    <div className="space-y-6">
                                        <label className="text-[11px] font-black text-black uppercase tracking-[0.2em] block mb-4">Encoding Format</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {['PDF', 'CSV', 'XLSX', 'JSON'].map((f) => (
                                                <button
                                                    key={f}
                                                    onClick={() => setReportFormat(f)}
                                                    className={`px-6 py-4 rounded-2xl border-2 transition-all font-black uppercase text-[12px] tracking-widest ${reportFormat === f ? 'bg-black text-white border-black shadow-xl shadow-black/10' : 'bg-white text-[#AAA] border-[#F0F0F0] hover:border-black hover:text-black'}`}
                                                >
                                                    {f}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-10 border-t border-[#F9F9F9]">
                                        <label className="text-[11px] font-black text-black uppercase tracking-[0.2em] block mb-4">Time Horizon</label>
                                        <div className="relative group">
                                            <Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#AAAAAA] group-focus-within:text-black transition-colors" />
                                            <select className="w-full h-14 pl-14 pr-8 border-2 border-[#F0F0F0] rounded-2xl text-[14px] font-black uppercase tracking-tight bg-white appearance-none cursor-pointer focus:border-black outline-none transition-all">
                                                <option>January 2024</option>
                                                <option>February 2024</option>
                                                <option>Q1 2024 Forecast</option>
                                            </select>
                                            <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#AAAAAA] pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {isGenerating && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500 pt-10 border-t border-[#F9F9F9]">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[11px] font-black text-black uppercase tracking-widest mb-1">Status: Compiling Regional Data</p>
                                            <p className="text-[14px] font-black uppercase tracking-tight text-[#AAA]">Manifesting {reportType}...</p>
                                        </div>
                                        <span className="text-[24px] font-black text-black italic">{genProgress}%</span>
                                    </div>
                                    <div className="h-4 w-full bg-[#F5F5F5] rounded-full overflow-hidden p-1 border border-[#EEE]">
                                        <div className="h-full bg-black rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.2)]" style={{ width: `${genProgress}%` }} />
                                    </div>
                                </div>
                            )}

                            <div className="pt-10 border-t border-[#F9F9F9]">
                                <button
                                    onClick={handleGenerateReport}
                                    disabled={isGenerating}
                                    className="w-full h-20 bg-black text-white rounded-3xl font-black uppercase tracking-[0.6em] text-[15px] flex items-center justify-center gap-6 hover:bg-gray-800 transition-all disabled:bg-[#DDD] disabled:cursor-not-allowed shadow-2xl shadow-black/20"
                                >
                                    {isGenerating ? (
                                        <>
                                            <RefreshCw size={28} className="animate-spin" />
                                            Encoding
                                        </>
                                    ) : (
                                        <>
                                            <FileDown size={24} />
                                            Initiate Compilation
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* REGISTRY TABLE */}
                    <div className="bg-white border border-[#E5E5E5] rounded-[32px] shadow-sm overflow-hidden">
                        <div className="p-10 border-b border-[#F0F0F0] flex justify-between items-center bg-[#fcfcfc]">
                            <h3 className="text-[16px] font-black uppercase tracking-widest text-black">Historical Document Registry</h3>
                            <div className="flex items-center gap-4">
                                <div className="relative group hidden md:block">
                                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BBB] group-focus-within:text-black transition-colors" />
                                    <input type="text" placeholder="Filter logs..." className="pl-12 pr-6 h-11 bg-white border border-[#EEE] rounded-2xl text-[13px] w-[240px] focus:border-black outline-none transition-all font-bold uppercase tracking-tight shadow-sm" />
                                </div>
                                <button className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-black bg-white px-6 py-3 rounded-xl border border-[#EEE] hover:border-black transition-all shadow-sm">
                                    <Filter size={16} /> Refine Matrix
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[#AAA] font-black uppercase tracking-widest text-[10px] border-b border-[#F0F0F0] bg-gray-50/50">
                                        <th className="px-10 py-6">Document Identity</th>
                                        <th className="px-10 py-6 text-center">Span</th>
                                        <th className="px-10 py-6 text-center">Format</th>
                                        <th className="px-10 py-6 text-right">Node Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F0F0F0]">
                                    {previousReports.map((report) => (
                                        <tr key={report.id} className="hover:bg-gray-50/80 transition-all group cursor-pointer">
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 rounded-2xl bg-black/5 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm group-hover:shadow-xl group-hover:shadow-black/10">
                                                        <FileText size={22} />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-black text-[16px] leading-tight uppercase tracking-tight group-hover:underline underline-offset-4 decoration-black/10">{report.name}</p>
                                                        <p className="text-[11px] text-[#AAA] font-black tracking-widest uppercase mt-1.5 flex items-center gap-2">
                                                            {report.size} • <span className="text-black/30 tracking-tight">{report.type}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-center text-[#555] font-black uppercase tracking-tighter text-[13px]">{report.period}</td>
                                            <td className="px-10 py-8 text-center">
                                                <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">{report.format}</span>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center justify-end gap-8">
                                                    <button className="text-[#DDD] hover:text-black transition-all hover:scale-110" title="View"><Eye size={22} /></button>
                                                    <button className="text-[#DDD] hover:text-black transition-all hover:scale-110" title="Download"><Download size={22} /></button>
                                                    <button className="text-[#DDD] hover:text-black transition-all hover:scale-110" title="Share"><Share2 size={22} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* SIDEBAR AUTOMATIONS */}
                <div className="lg:col-span-4 space-y-12 animate-in slide-in-from-right-4 duration-1000">
                    <div className="bg-white border border-[#E5E5E5] rounded-[32px] p-10 shadow-sm group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform">
                            <Zap size={140} />
                        </div>
                        <div className="flex items-center justify-between mb-10 relative z-10">
                            <h3 className="text-[16px] font-black uppercase tracking-widest text-black flex items-center gap-3">
                                <Zap size={18} /> Automations
                            </h3>
                            <button className="text-[11px] font-black uppercase tracking-widest text-[#AAA] hover:text-black transition-all">Configure</button>
                        </div>

                        <div className="space-y-8 relative z-10">
                            <div className="p-8 border-2 border-black rounded-3xl space-y-6 hover:bg-black hover:text-white transition-all group/card shadow-2xl shadow-black/5">
                                <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 rounded-2xl bg-black text-white group-hover/card:bg-white group-hover/card:text-black flex items-center justify-center transition-all">
                                        <TrendingUp size={24} />
                                    </div>
                                    <div className="relative inline-block w-12 h-6 cursor-pointer">
                                        <div className="w-full h-full bg-black/10 group-hover/card:bg-white/20 rounded-full transition-all" />
                                        <div className="absolute left-7 top-1 w-4 h-4 bg-black group-hover/card:bg-white rounded-full shadow-md" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-[16px] font-black uppercase tracking-tight">Weekly Flash Audit</h4>
                                    <p className="text-[12px] text-[#AAA] font-medium uppercase mt-1">Automatic dist. to regional officers</p>
                                </div>
                                <div className="pt-6 border-t border-black/5 group-hover/card:border-white/10 flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                                    <span>Next Run</span>
                                    <span>Mon, 08:00 AM</span>
                                </div>
                            </div>

                            <button className="w-full py-6 border-2 border-dashed border-[#E5E5E5] hover:border-black text-black rounded-3xl font-black uppercase tracking-[0.2em] text-[12px] hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                                <Zap size={18} /> New Workflow Sync
                            </button>
                        </div>
                    </div>

                    <div className="bg-black p-10 rounded-[32px] shadow-2xl text-white relative overflow-hidden group border border-white/5">
                        <div className="absolute bottom-[-40px] right-[-40px] w-64 h-64 bg-white opacity-[0.03] rounded-full group-hover:scale-125 transition-transform duration-1000" />
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                                    <ShieldCheck size={28} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-[12px] font-black uppercase tracking-widest text-white/40 mb-1">Mirror Status</h3>
                                    <p className="text-[16px] font-black uppercase tracking-tight italic">Registry Safe</p>
                                </div>
                            </div>
                            <p className="text-[14px] font-medium leading-relaxed text-white/60 uppercase tracking-tight">Kondapur Node data is mirrored to the sovereign district archive every 12 hours.</p>
                            <div className="flex flex-col gap-4 py-2">
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-green-400">Sync: Operational</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CdpoReports;
