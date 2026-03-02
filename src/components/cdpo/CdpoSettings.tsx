'use client';

import React, { useState } from 'react';
import {
    User,
    Shield,
    Settings as SettingsIcon,
    Bell,
    Database,
    LogOut,
    ChevronRight,
    Mail,
    Phone,
    CheckCircle2,
    Download,
    RefreshCcw,
    X,
    Lock,
    Smartphone,
    Server,
    Key,
    Globe,
    Activity,
    Zap,
    ShieldCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface CdpoSettingsProps {
    user: { name: string; role: string; avatarUrl?: string };
}

const CdpoSettings: React.FC<CdpoSettingsProps> = ({ user }) => {
    const router = useRouter();
    const supabase = createClient();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [activeSection, setActiveSection] = useState<'Profile' | 'Security' | 'Project' | 'Notifications'>('Profile');

    const [coverageTarget, setCoverageTarget] = useState('80');
    const [escalationThreshold, setEscalationThreshold] = useState('7');
    const [recipients, setRecipients] = useState(['district.kondapur@icds.gov.in', 'state.office@icds.gov.in']);
    const [notifications, setNotifications] = useState({
        urgentFlags: true,
        weeklySummary: true,
        coverageAlerts: true,
        newMandalResults: false
    });

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <div className="max-w-[1000px] mx-auto space-y-12 pb-32 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                <div>
                    <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">Administrative Control</h1>
                    <p className="text-[14px] text-[#888888] font-medium flex items-center gap-2">
                        <Lock size={14} />
                        Kondapur CDPO Command • Official Registry Profile
                    </p>
                </div>
                <div className="flex bg-white shadow-sm border border-[#E5E5E5] rounded-2xl p-1 relative z-10">
                    {['Profile', 'Security', 'Project', 'Notifications'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveSection(tab as any)}
                            className={`px-6 py-2 text-[11px] font-black uppercase rounded-xl transition-all ${activeSection === tab ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-[#888] hover:text-black hover:bg-gray-50'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-12 space-y-12">

                    {activeSection === 'Profile' && (
                        <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
                            {/* PROFILE CARD */}
                            <div className="bg-white border border-[#E5E5E5] rounded-3xl p-10 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                                    <User size={160} />
                                </div>
                                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                                    <div className="w-32 h-32 rounded-3xl bg-black text-white flex items-center justify-center text-[48px] font-black shadow-2xl shadow-black/20 overflow-hidden relative">
                                        {user.avatarUrl ? (
                                            <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            user.name.charAt(0)
                                        )}
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                                            <h2 className="text-[32px] font-black text-black leading-none uppercase tracking-tighter">{user.name}</h2>
                                            <span className="px-3 py-1 bg-black text-white text-[10px] font-black rounded-lg uppercase tracking-widest">CDPO Auth</span>
                                        </div>
                                        <p className="text-[16px] text-[#888888] font-black uppercase tracking-[0.2em]">Child Development Project Officer • Kondapur Node</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mt-8 pt-8 border-t border-[#F9F9F9]">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-[#EEE] flex items-center justify-center text-black">
                                                    <Mail size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-[#AAA] uppercase tracking-widest">Institutional Email</p>
                                                    <p className="text-[14px] font-bold text-black">meena.cdpo@icds.gov.in</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-[#EEE] flex items-center justify-center text-black">
                                                    <Phone size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-[#AAA] uppercase tracking-widest">Encrypted Mobile</p>
                                                    <p className="text-[14px] font-bold text-black">+91 98765 43210</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="px-8 py-3 bg-white border border-black text-black rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-xl shadow-black/5 whitespace-nowrap">
                                        Update Registry
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="bg-[#fcfcfc] border border-[#E5E5E5] rounded-3xl p-8 relative overflow-hidden group">
                                    <div className="absolute bottom-0 right-0 p-8 opacity-[0.02] group-hover:scale-110 transition-transform">
                                        <Globe size={120} />
                                    </div>
                                    <h3 className="text-[14px] font-black uppercase tracking-widest text-[#AAA] mb-6 flex items-center gap-2">
                                        <Globe size={16} /> Regional Jurisdiction
                                    </h3>
                                    <div className="space-y-4 relative z-10">
                                        <div className="flex justify-between items-end border-b border-black/5 pb-3">
                                            <span className="text-[12px] font-black uppercase text-[#888]">Primary Project</span>
                                            <span className="text-[18px] font-black text-black uppercase">Kondapur CDPO</span>
                                        </div>
                                        <div className="flex justify-between items-end border-b border-black/5 pb-3">
                                            <span className="text-[12px] font-black uppercase text-[#888]">Regions</span>
                                            <span className="text-[18px] font-black text-black">8 Mandals</span>
                                        </div>
                                        <div className="flex justify-between items-end border-b border-black/5 pb-3">
                                            <span className="text-[12px] font-black uppercase text-[#888]">Active AWCs</span>
                                            <span className="text-[18px] font-black text-black">156 Centers</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-black p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <ShieldCheck size={100} />
                                    </div>
                                    <h3 className="text-[14px] font-black uppercase tracking-widest text-white/30 mb-8">Access Token Meta</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Clearance Tier</p>
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full w-2/3 bg-white" />
                                                </div>
                                                <span className="text-[12px] font-black uppercase">Tier 2-C</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 p-3 bg-white/5 border border-white/10 rounded-xl">
                                                <p className="text-[9px] font-black text-white/40 uppercase mb-1">Last Audit</p>
                                                <p className="text-[11px] font-bold">Today</p>
                                            </div>
                                            <div className="flex-1 p-3 bg-white/5 border border-white/10 rounded-xl">
                                                <p className="text-[9px] font-black text-white/40 uppercase mb-1">Key Status</p>
                                                <p className="text-[11px] font-bold text-green-400">SECURE</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'Security' && (
                        <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
                            <div className="bg-white border border-[#E5E5E5] rounded-3xl overflow-hidden shadow-sm">
                                <div className="p-8 border-b border-[#F0F0F0] bg-[#fcfcfc] flex items-center justify-between">
                                    <h3 className="text-[14px] font-black uppercase tracking-widest text-black flex items-center gap-3">
                                        <Shield size={18} /> Credentials & Authentication Node
                                    </h3>
                                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                                        <ShieldCheck size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Shield Active</span>
                                    </div>
                                </div>
                                <div className="divide-y divide-[#F9F9F9]">
                                    <button className="w-full flex items-center justify-between p-8 hover:bg-gray-50 transition-all group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                                                <Key size={20} />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[16px] font-black text-black uppercase tracking-tight">Access Auth Key</p>
                                                <p className="text-[12px] text-[#888888] font-medium">Reset your regional login credentials</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={20} className="text-[#DDD] group-hover:text-black transition-all" />
                                    </button>

                                    <div className="flex items-center justify-between p-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-black shadow-sm">
                                                <Smartphone size={20} />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[16px] font-black text-black uppercase tracking-tight">2FA Hardware Attestation</p>
                                                <p className="text-[12px] text-[#888888] font-medium">Enforce biometric verification for field sync</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-lg uppercase tracking-widest border border-green-100 shadow-sm">
                                                Enabled
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'Project' && (
                        <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
                            <div className="bg-white border border-[#E5E5E5] rounded-3xl overflow-hidden shadow-sm group">
                                <div className="p-8 border-b border-[#F0F0F0] bg-[#fcfcfc] flex items-center justify-between relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                        <SettingsIcon size={120} />
                                    </div>
                                    <h3 className="text-[14px] font-black uppercase tracking-widest text-black flex items-center gap-3 relative z-10">
                                        <SettingsIcon size={18} /> Project Configuration
                                    </h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#AAA] bg-white px-3 py-1 rounded-lg border border-[#EEE] relative z-10">Regional Benchmarks</p>
                                </div>
                                <div className="p-10 space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="group border-l-4 border-black pl-6 py-1">
                                            <label className="text-[11px] font-black text-black uppercase tracking-[0.2em] mb-3 block">Coverage Target (%)</label>
                                            <div className="flex items-center gap-4">
                                                <input type="number" value={coverageTarget} onChange={e => setCoverageTarget(e.target.value)} className="w-24 h-14 bg-[#F9F9F9] border-none rounded-2xl text-[24px] font-black text-center focus:ring-2 focus:ring-black outline-none transition-all" />
                                                <div className="flex flex-col">
                                                    <span className="text-[18px] font-black text-black">% Population</span>
                                                    <span className="text-[10px] text-[#AAA] font-bold uppercase tracking-widest mt-1">Regional baseline index</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group border-l-4 border-[#EEE] hover:border-black pl-6 py-1 transition-all">
                                            <label className="text-[11px] font-black text-black uppercase tracking-[0.2em] mb-3 block">Flag Threshold (Days)</label>
                                            <div className="flex items-center gap-4">
                                                <input type="number" value={escalationThreshold} onChange={e => setEscalationThreshold(e.target.value)} className="w-24 h-14 bg-[#F9F9F9] border-none rounded-2xl text-[24px] font-black text-center focus:ring-2 focus:ring-black outline-none transition-all" />
                                                <div className="flex flex-col">
                                                    <span className="text-[18px] font-black text-black">Days Alpha</span>
                                                    <span className="text-[10px] text-[#AAA] font-bold uppercase tracking-widest mt-1">AWW to CDPO Command</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-8 border-t border-[#F9F9F9]">
                                        <label className="text-[11px] font-black text-black uppercase tracking-[0.2em] mb-3 block">Report Recipients</label>
                                        <div className="space-y-3">
                                            {recipients.map((email, idx) => (
                                                <div key={idx} className="flex items-center justify-between h-14 px-6 bg-[#F9F9F9] rounded-2xl text-[14px] group border border-transparent hover:border-black transition-all">
                                                    <span className="font-bold uppercase tracking-tight">{email}</span>
                                                    <button onClick={() => setRecipients(recipients.filter((_, i) => i !== idx))} className="p-2 hover:bg-gray-200 rounded-xl transition-all opacity-0 group-hover:opacity-100 text-red-600">
                                                        <X size={18} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button className="text-[11px] font-black text-black uppercase tracking-[0.2em] underline underline-offset-4 hover:opacity-70 transition-all">+ Add New Gateway</button>
                                        </div>
                                    </div>

                                    <div className="pt-8 flex justify-end">
                                        <button className="bg-black text-white px-10 py-4 rounded-2xl font-black uppercase tracking-[0.4em] text-[12px] hover:bg-gray-800 transition-all shadow-2xl shadow-black/20 flex items-center gap-3">
                                            <Zap size={18} /> Save Settings
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'Notifications' && (
                        <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
                            <div className="bg-white border border-[#E5E5E5] rounded-3xl overflow-hidden shadow-sm">
                                <div className="p-8 border-b border-[#F0F0F0] bg-[#fcfcfc] flex items-center justify-between">
                                    <h3 className="text-[14px] font-black uppercase tracking-widest text-black flex items-center gap-3">
                                        <Bell size={18} /> Signal & Alert Intelligence
                                    </h3>
                                    <p className="text-[11px] font-black text-black/40 uppercase tracking-widest">Regional Directives</p>
                                </div>
                                <div className="divide-y divide-[#F9F9F9]">
                                    {[
                                        { label: 'Urgent Flag Escalations', id: 'urgentFlags' },
                                        { label: 'Weekly Summary Email', id: 'weeklySummary' },
                                        { label: 'Coverage Alerts (below 50%)', id: 'coverageAlerts' },
                                        { label: 'New Mandal Screening Results', id: 'newMandalResults' },
                                    ].map((item, idx) => (
                                        <div key={item.id} className="flex items-center justify-between p-8 group hover:bg-gray-50/50 transition-all">
                                            <div className="text-left flex items-start gap-6">
                                                <div className={`w-2 h-14 rounded-full transition-all ${notifications[item.id as keyof typeof notifications] ? 'bg-black' : 'bg-[#DDD] group-hover:bg-black'}`} />
                                                <div>
                                                    <p className="text-[16px] font-black text-black uppercase tracking-tight">{item.label}</p>
                                                    <p className="text-[12px] text-[#888888] font-medium mt-1 uppercase tracking-tight">Automated signal processing for regional vitality</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-10">
                                                <div
                                                    onClick={() => setNotifications({ ...notifications, [item.id]: !notifications[item.id as keyof typeof notifications] })}
                                                    className={`w-14 h-7 rounded-full relative cursor-pointer transition-all ${notifications[item.id as keyof typeof notifications] ? 'bg-black' : 'bg-[#E5E5E5]'}`}
                                                >
                                                    <div className={`absolute top-1.5 left-1.5 w-4 h-4 bg-white rounded-full transition-all ${notifications[item.id as keyof typeof notifications] ? 'translate-x-7' : ''}`} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SHARED INFRA CARD */}
                    <div className="bg-white border border-[#E5E5E5] rounded-3xl overflow-hidden shadow-sm p-8 flex flex-col md:flex-row items-center justify-between gap-8 group">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                                <Database size={32} />
                            </div>
                            <div>
                                <h3 className="text-[18px] font-black text-black uppercase tracking-tighter">Regional Data Warehouse Node</h3>
                                <div className="flex items-center gap-4 mt-1">
                                    <span className="text-[11px] text-[#BBB] font-black flex items-center gap-1.5 uppercase tracking-widest"><RefreshCcw size={12} /> Synced 5m ago</span>
                                    <span className="px-2 py-0.5 bg-green-50 text-green-600 font-black text-[9px] uppercase tracking-widest border border-green-100 rounded">API Connected</span>
                                </div>
                            </div>
                        </div>
                        <button className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-black rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white transition-all shadow-xl shadow-black/5 whitespace-nowrap">
                            <Download size={18} /> Export Regional CSV
                        </button>
                    </div>

                    {/* TERMINATION */}
                    <div className="pt-12">
                        {!showLogoutConfirm ? (
                            <button
                                onClick={() => setShowLogoutConfirm(true)}
                                className="w-full h-20 bg-red-50 border border-red-100 text-red-600 rounded-3xl flex items-center justify-center gap-4 font-black uppercase tracking-[0.4em] text-[14px] hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm group"
                            >
                                <LogOut size={24} className="group-hover:translate-x-1 transition-transform" /> De-Authenticate Node
                            </button>
                        ) : (
                            <div className="w-full p-10 border-2 border-red-600 bg-red-50 rounded-3xl space-y-8 text-center animate-in zoom-in-95 duration-500 shadow-2xl shadow-red-200">
                                <div className="space-y-2">
                                    <h4 className="text-[24px] font-black text-red-900 uppercase tracking-tighter">Immediate Node Termination?</h4>
                                    <p className="text-[14px] text-red-800 font-medium uppercase tracking-widest">Administrative session for Kondapur Project will be purged from the registry.</p>
                                </div>
                                <div className="flex items-center justify-center gap-6">
                                    <button
                                        onClick={() => setShowLogoutConfirm(false)}
                                        className="px-10 py-3 bg-white border border-red-200 rounded-2xl text-[13px] font-black uppercase tracking-widest text-red-900 hover:bg-red-100 transition-all shadow-lg"
                                    >
                                        Abort
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="px-10 py-3 bg-red-600 text-white rounded-2xl text-[13px] font-black uppercase tracking-widest shadow-2xl shadow-red-400 hover:bg-red-700 transition-all"
                                    >
                                        Confirm Purge
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="text-center pt-8">
                        <p className="text-[11px] text-[#DDD] uppercase font-black tracking-[0.5em] flex items-center justify-center gap-4">
                            <Server size={12} /> JIVEESHA CDPO PLATFORM — CLUSTER v4.2.0-SECURE
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CdpoSettings;
