'use client';

import React, { useState } from 'react';
import { 
    ArrowLeft, 
    User, 
    Activity, 
    ClipboardList, 
    Eye, 
    Flag, 
    Send, 
    ShieldAlert,
    Calendar,
    Phone,
    MapPin,
    Scale,
    Ruler,
    Heart,
    ChevronRight,
    Search,
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChildDetailData } from '@/lib/dpo/types';

interface DpoChildDetailProps {
    data: ChildDetailData;
}

const DpoChildDetail: React.FC<DpoChildDetailProps> = ({ data }) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Overview');
    const tabs = ['Overview', 'Screenings', 'Flags', 'Referrals'];

    const getRiskColor = (risk: string) => {
        switch (risk.toLowerCase()) {
            case 'critical': return 'text-red-600 bg-red-50 border-red-100';
            case 'high': return 'text-orange-600 bg-orange-50 border-orange-100';
            case 'medium': return 'text-amber-600 bg-amber-50 border-amber-100';
            case 'low': return 'text-green-600 bg-green-50 border-green-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex items-start gap-5">
                    <button 
                        onClick={() => router.back()} 
                        className="mt-1 p-3 bg-white border border-[#E5E5E5] rounded-2xl hover:bg-gray-50 hover:border-black transition-all group shadow-sm"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-[32px] font-black text-black tracking-tighter uppercase leading-none">{data.name}</h1>
                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border ${getRiskColor(data.currentRisk)}`}>
                                {data.currentRisk} Risk
                            </span>
                        </div>
                        <p className="text-[14px] text-[#888888] font-bold tracking-tight flex items-center gap-2">
                            <span className="bg-[#F0F0F0] px-2 py-0.5 rounded text-black shadow-sm">#{data.id.slice(0, 8).toUpperCase()}</span>
                            <span>•</span>
                            <span>{data.age}</span>
                            <span>•</span>
                            <span className="uppercase">{data.gender}</span>
                        </p>
                    </div>
                </div>
                
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white border border-[#E5E5E5] text-black px-6 py-3 rounded-xl text-[13px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
                        <Send size={16} />
                        Share Report
                    </button>
                    <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl text-[13px] font-black uppercase tracking-widest hover:bg-[#222222] transition-all shadow-black/10 shadow-xl">
                        <ShieldAlert size={16} />
                        Escalate Case
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-10 border-b border-[#F0F0F0] px-4 overflow-x-auto scrollbar-hide">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-[12px] font-black uppercase tracking-widest relative transition-all ${
                            activeTab === tab ? 'text-black' : 'text-[#AAAAAA] hover:text-[#888]'
                        }`}
                    >
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white border border-[#E5E5E5] rounded-[24px] overflow-hidden shadow-sm shadow-black/5">
                {activeTab === 'Overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* Stats Sidebar */}
                        <div className="lg:col-span-4 bg-[#fcfcfc] border-r border-[#F0F0F0] p-10 space-y-10">
                            <div>
                                <h4 className="text-[11px] font-black text-[#AAAAAA] uppercase tracking-[0.2em] mb-6">Profile Vitals</h4>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-white border border-[#F0F0F0] rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Ruler size={18} /></div>
                                            <span className="text-[13px] font-bold text-[#888]">HEIGHT</span>
                                        </div>
                                        <span className="text-[18px] font-black">{data.vitals?.height || '--'} cm</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white border border-[#F0F0F0] rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Scale size={18} /></div>
                                            <span className="text-[13px] font-bold text-[#888]">WEIGHT</span>
                                        </div>
                                        <span className="text-[18px] font-black">{data.vitals?.weight || '--'} kg</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white border border-[#F0F0F0] rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Activity size={18} /></div>
                                            <span className="text-[13px] font-bold text-[#888]">MUAC</span>
                                        </div>
                                        <span className="text-[18px] font-black">{data.vitals?.muac || '--'} cm</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[11px] font-black text-[#AAAAAA] uppercase tracking-[0.2em] mb-6">Hierarchy</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-[13px]">
                                        <MapPin size={16} className="text-[#888]" />
                                        <span className="font-bold text-black uppercase tracking-tight">{data.awcName}</span>
                                        <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded font-black">AWC</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[13px]">
                                        <div className="w-4" />
                                        <span className="font-bold text-[#888] uppercase tracking-tight">{data.mandalName}</span>
                                        <span className="text-[10px] text-[#AAA] font-black">MANDAL</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Info */}
                        <div className="lg:col-span-8 p-12 space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-[11px] font-black text-[#AAAAAA] uppercase tracking-widest mb-4">Registration Context</h4>
                                        <div className="grid grid-cols-1 gap-y-4 text-[14px]">
                                            <div className="flex items-center justify-between border-b border-[#F5F5F5] pb-2">
                                                <span className="text-[#888] font-medium">Guardian</span>
                                                <span className="font-black uppercase tracking-tight">{data.guardianName}</span>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-[#F5F5F5] pb-2">
                                                <span className="text-[#888] font-medium">Date of Birth</span>
                                                <span className="font-black uppercase tracking-tight">{new Date(data.dob).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-[#F5F5F5] pb-2">
                                                <span className="text-[#888] font-medium">Contact</span>
                                                <span className="font-black tracking-tight">{data.contactNo}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#fcfcfc] rounded-3xl p-8 border border-[#F0F0F0] border-dashed">
                                    <h4 className="text-[11px] font-black text-[#AAAAAA] uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <Heart size={14} className="text-red-500" /> Latest Health Note
                                    </h4>
                                    <div className="space-y-4">
                                        <p className="text-[15px] font-medium text-black leading-relaxed italic">
                                            "{data.recentObservation?.text || "Child is under monitoring. Regular growth screenings are recommended given current risk assessment."}"
                                        </p>
                                        <div className="flex items-center gap-2 pt-4 border-t border-[#EEE]">
                                            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">
                                                {(data.recentObservation?.by || 'AWW').substring(0, 1)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[12px] font-black text-black leading-none">{data.recentObservation?.by || 'Saritha P.'}</span>
                                                <span className="text-[10px] text-[#888] font-bold uppercase tracking-tight">{data.recentObservation?.date || 'Registered Data'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-[#F0F0F0]">
                                <h4 className="text-[11px] font-black text-[#AAAAAA] uppercase tracking-widest mb-8">Summary Roadmap</h4>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white"><CheckCircle2 size={20} /></div>
                                        <span className="text-[10px] font-black text-black">REGISTRY</span>
                                    </div>
                                    <div className="h-[2px] flex-1 bg-green-500 mx-4" />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${data.screenings.length ? 'bg-green-500' : 'bg-[#EEE]'}`}>
                                            {data.screenings.length ? <CheckCircle2 size={20} /> : <div className="w-4 h-4 rounded-full border-4 border-white" />}
                                        </div>
                                        <span className={`text-[10px] font-black ${data.screenings.length ? 'text-black' : 'text-[#AAA]'}`}>SCREENING</span>
                                    </div>
                                    <div className={`h-[2px] flex-1 mx-4 ${data.currentRisk === 'LOW' ? 'bg-[#EEE]' : 'bg-orange-500'}`} />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${data.currentRisk === 'LOW' ? 'bg-[#EEE]' : 'bg-orange-500'}`}>
                                            {data.flags.length ? <AlertCircle size={20} /> : <div className="w-4 h-4 rounded-full border-4 border-white" />}
                                        </div>
                                        <span className={`text-[10px] font-black ${data.currentRisk === 'LOW' ? 'text-[#AAA]' : 'text-orange-500'}`}>FLAGGED</span>
                                    </div>
                                    <div className={`h-[2px] flex-1 mx-4 ${data.referrals.length ? 'bg-red-500' : 'bg-[#EEE]'}`} />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${data.referrals.length ? 'bg-red-500' : 'bg-[#EEE]'}`}>
                                            {data.referrals.length ? <Activity size={20} /> : <div className="w-4 h-4 rounded-full border-4 border-white" />}
                                        </div>
                                        <span className={`text-[10px] font-black ${data.referrals.length ? 'text-red-500' : 'text-[#AAA]'}`}>REFERRAL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Screenings' && (
                    <div className="p-10">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-[18px] font-black text-black uppercase tracking-tight">Screening History</h3>
                                <p className="text-[13px] text-[#888] font-medium">Timeline of developmental questionnaire sessions</p>
                            </div>
                            <button className="px-5 py-2 bg-black text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-black/10">Full History</button>
                        </div>
                        
                        <div className="space-y-6">
                            {data.screenings.length > 0 ? data.screenings.map((s, i) => (
                                <div key={s.id} className="flex gap-6 group">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-[12px] shadow-lg ${i === 0 ? 'bg-black shadow-black/20' : 'bg-gray-200 text-gray-500 shadow-none'}`}>
                                            #{data.screenings.length - i}
                                        </div>
                                        {i !== data.screenings.length - 1 && <div className="w-[2px] flex-1 bg-[#F0F0F0] my-2" />}
                                    </div>
                                    <div className="flex-1 bg-[#fcfcfc] border border-[#F0F0F0] rounded-3xl p-6 group-hover:border-black transition-all">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[15px] font-black text-black">{s.level} Screening</span>
                                                    <span className="px-2 py-0.5 bg-green-50 text-green-600 border border-green-100 rounded-md text-[9px] font-black uppercase">STATUS: {s.status}</span>
                                                </div>
                                                <p className="text-[12px] text-[#888] font-bold uppercase tracking-tight mt-1">Conducted by {s.by} • {new Date(s.date).toLocaleDateString('en-GB')}</p>
                                            </div>
                                            <button className="text-[11px] font-black text-black uppercase tracking-widest border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-all">Report</button>
                                        </div>
                                        {s.scores && (
                                            <div className="flex flex-wrap gap-3">
                                                {Object.entries(s.scores).map(([domain, score]) => (
                                                    <div key={domain} className="bg-white px-3 py-1.5 rounded-xl border border-[#EEE] flex items-center gap-2 shadow-sm">
                                                        <span className="text-[10px] font-black text-[#AAA]">{domain}</span>
                                                        <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                            <div className="h-full bg-black" style={{ width: `${(score as number) * 10}%` }} />
                                                        </div>
                                                        <span className="text-[11px] font-black">{score}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-[#DDD]">
                                    <Clock size={40} className="mx-auto text-gray-300 mb-4" />
                                    <p className="font-black text-[#AAA] uppercase tracking-[0.2em]">No Screenings Found</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'Flags' && (
                    <div className="p-10 space-y-10">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-[18px] font-black text-black uppercase tracking-tight">System Flags</h3>
                                <p className="text-[13px] text-[#888] font-medium">Automatic Alerts & Manual Observations</p>
                            </div>
                            <span className="px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-[11px] font-black uppercase border border-red-100">
                                {data.flags.length} Active Alerts
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.flags.length > 0 ? data.flags.map(f => (
                                <div key={f.id} className={`p-6 rounded-3xl border transition-all ${f.priority === 'HIGH' || f.priority === 'CRITICAL' ? 'bg-red-50/30 border-red-100' : 'bg-white border-[#F0F0F0]'}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-2 rounded-xl ${f.priority === 'HIGH' || f.priority === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'}`}>
                                            <ShieldAlert size={18} />
                                        </div>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${f.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {f.status}
                                        </span>
                                    </div>
                                    <h4 className="text-[16px] font-black text-black leading-tight mb-2 uppercase tracking-tight">{f.title}</h4>
                                    <p className="text-[12px] text-[#888] font-bold mb-4 uppercase tracking-tighter">Priority: {f.priority} • {new Date(f.date).toLocaleDateString()}</p>
                                    <div className="flex items-center gap-2 pt-4 border-t border-[#F0F0F0]">
                                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-[9px] font-black">
                                            {f.raisedBy.substring(0, 1)}
                                        </div>
                                        <span className="text-[11px] font-bold text-[#555]">Raised by {f.raisedBy}</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-2 text-center py-20 bg-gray-50 rounded-3xl">
                                    <CheckCircle2 size={40} className="mx-auto text-green-400 mb-4" />
                                    <p className="font-black text-[#AAA] uppercase tracking-[0.2em]">Zero Critical Flags</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'Referrals' && (
                    <div className="p-10 space-y-10">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-[18px] font-black text-black uppercase tracking-tight">Referral Pipeline</h3>
                                <p className="text-[13px] text-[#888] font-medium">Clinical & Nutritional Coordination</p>
                            </div>
                        </div>

                        <div className="bg-[#fcfcfc] border border-[#F0F0F0] rounded-[32px] overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-black text-white text-[10px] font-black uppercase tracking-widest">
                                    <tr>
                                        <th className="px-8 py-5">Referral Type</th>
                                        <th className="px-8 py-5">Initiated By</th>
                                        <th className="px-8 py-5">Timeline</th>
                                        <th className="px-8 py-5">Current Status</th>
                                        <th className="px-8 py-5 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F0F0F0]">
                                    {data.referrals.length > 0 ? data.referrals.map(r => (
                                        <tr key={r.id} className="hover:bg-gray-50 transition-all group">
                                            <td className="px-8 py-5 font-black text-black text-[14px] uppercase tracking-tighter">
                                                {r.type}
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 bg-[#EEE] rounded-full flex items-center justify-center text-[10px] font-black">{r.referredBy.substring(0, 1)}</div>
                                                    <span className="text-[13px] font-bold text-black">{r.referredBy}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="text-[13px] font-bold text-[#888]">{new Date(r.date).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${r.status === 'COMPLETED' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                                                    {r.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="p-2 border border-[#E5E5E5] rounded-xl group-hover:bg-black group-hover:text-white transition-all">
                                                    <ChevronRight size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center">
                                                <p className="font-black text-[#AAA] uppercase tracking-[0.2em]">No Referrals Initiated</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DpoChildDetail;
