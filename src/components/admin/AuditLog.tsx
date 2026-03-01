'use client';

import React, { useState } from 'react';
import {
    ScrollText, Search, Calendar, Filter, Download,
    ChevronDown, ArrowUpRight, ShieldCheck, AlertCircle,
    Clock, User as UserIcon, Globe, FileJson, ChevronRight,
    Info, ExternalLink, RefreshCw, X, FileText, ChevronUp
} from 'lucide-react';

interface AuditEvent {
    id: string;
    timestamp: string;
    admin: string;
    action: 'Created' | 'Edited' | 'Deleted' | 'Disabled' | 'Password Reset' | 'Role Changed' | 'Reassigned' | 'Hierarchy Modified' | 'Bulk Import' | 'Config Changed' | 'Login';
    description: string;
    target: string;
    ip: string;
    status: 'SUCCESS' | 'FAILED' | 'WARNING';
    before?: string;
    after?: string;
}

const MOCK_AUDIT_LOGS: AuditEvent[] = [
    { id: 'ev-10293', timestamp: '16 Feb 2026, 14:32:15', admin: 'Arjun Mehta', action: 'Role Changed', description: 'Role changed from AWW to Mandal Screener', target: 'AWW Lakshmi Devi', ip: '49.37.1.1', status: 'SUCCESS', before: 'Role: AWW', after: 'Role: Mandal Screener' },
    { id: 'ev-10292', timestamp: '16 Feb 2026, 13:45:05', admin: 'Admin Ravi', action: 'Created', description: 'Created new AWC administrative unit', target: 'Rampur North-2 AWC', ip: '103.21.12.98', status: 'SUCCESS' },
    { id: 'ev-10291', timestamp: '16 Feb 2026, 13:42:58', admin: 'Admin Ravi', action: 'Deleted', description: 'Removed inactive AWW account permanently', target: 'Suresh B. (AWW)', ip: '103.21.12.98', status: 'SUCCESS' },
    { id: 'ev-10290', timestamp: '16 Feb 2026, 12:15:22', admin: 'System Bot', action: 'Login', description: 'Failed login attempt (3/3) - Account Locked', target: 'admin@jiveesha.in', ip: '192.168.1.1', status: 'FAILED' },
    { id: 'ev-10289', timestamp: '16 Feb 2026, 11:30:00', admin: 'Admin Priya', action: 'Bulk Import', description: 'Bulk imported 45 AWW records via CSV', target: '13 Districts (CSV)', ip: '106.51.45.22', status: 'SUCCESS' },
    { id: 'ev-10288', timestamp: '16 Feb 2026, 10:05:41', admin: 'Arjun Mehta', action: 'Password Reset', description: 'Triggered administrative password reset', target: 'Meena Iyer (CDPO)', ip: '49.37.1.1', status: 'SUCCESS' },
    { id: 'ev-10287', timestamp: '16 Feb 2026, 09:12:12', admin: 'Arjun Mehta', action: 'Reassigned', description: 'Reassigned from Rampur AWC to Raipur AWC', target: 'Kondapur Mandal', ip: '49.37.1.1', status: 'SUCCESS', before: 'Loc: Rampur AWC', after: 'Loc: Raipur AWC' },
    { id: 'ev-10286', timestamp: '15 Feb 2026, 18:45:30', admin: 'Admin Ravi', action: 'Edited', description: 'Updated contact phone number', target: 'Rajesh Sharma', ip: '103.21.12.98', status: 'SUCCESS', before: 'Phone: +91 99999 00000', after: 'Phone: +91 98888 11111' },
];

const ACTION_COLORS: Record<string, string> = {
    'Created': 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]',
    'Edited': 'bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]',
    'Deleted': 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]',
    'Disabled': 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]',
    'Password Reset': 'bg-[#FFEDD5] text-[#9A3412] border-[#FED7AA]',
    'Role Changed': 'bg-[#F3E8FF] text-[#6B21A8] border-[#E9D5FF]',
    'Reassigned': 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
    'Hierarchy Modified': 'bg-[#E0E7FF] text-[#3730A3] border-[#C7D2FE]',
    'Bulk Import': 'bg-[#F5F3FF] text-[#5B21B6] border-[#DDD6FE]',
    'Config Changed': 'bg-black text-white border-black',
    'Login': 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]',
};

const AuditLog: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    const toggleRow = (id: string) => {
        const next = new Set(expandedRows);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setExpandedRows(next);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-[24px] font-semibold text-black leading-tight">Audit Log</h1>
                    <p className="text-[13px] text-gray-500">Complete record of all administrative actions</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded text-[13px] font-bold hover:bg-gray-50 transition-all text-gray-700">
                        <RefreshCw size={16} />
                        <span>Refresh</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded text-[13px] font-bold hover:bg-gray-800 transition-all shadow-md">
                        <FileText size={16} />
                        <span>Export filtered log (CSV)</span>
                    </button>
                </div>
            </div>

            {/* Sticky Filters */}
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm sticky top-[56px] z-30 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Date Range</label>
                        <div className="flex items-center space-x-2">
                            <input type="date" className="flex-1 h-10 px-3 bg-gray-50 border-none rounded-lg text-xs" />
                            <span className="text-gray-300">-</span>
                            <input type="date" className="flex-1 h-10 px-3 bg-gray-50 border-none rounded-lg text-xs" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Admin User</label>
                        <div className="relative">
                            <select className="w-full h-10 pl-3 pr-8 bg-gray-50 border-none rounded-lg text-xs appearance-none">
                                <option>All Admins</option>
                                <option>Arjun Mehta</option>
                                <option>Admin Ravi</option>
                                <option>Admin Priya</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Action Type</label>
                        <div className="relative">
                            <select className="w-full h-10 pl-3 pr-8 bg-gray-50 border-none rounded-lg text-xs appearance-none">
                                <option>All Actions</option>
                                {[
                                    'User Created', 'User Edited', 'User Deleted',
                                    'User Disabled', 'Password Reset', 'Role Changed',
                                    'Assignment Changed', 'Hierarchy Modified', 'Bulk Import',
                                    'Config Changed', 'Login'
                                ].map(type => <option key={type}>{type}</option>)}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="space-y-1 lg:col-span-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Target User</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="Search target..."
                                className="w-full h-10 pl-9 pr-4 bg-gray-50 border-none rounded-lg text-xs outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-end space-x-2">
                        <button className="flex-1 h-10 bg-black text-white rounded-lg text-[12px] font-bold hover:bg-gray-800 transition-all">
                            Apply
                        </button>
                        <button className="px-4 h-10 text-[12px] font-bold text-gray-400 hover:text-black transition-all">
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            {/* Audit Table */}
            <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black text-white text-[11px] font-bold uppercase tracking-widest">
                            <th className="px-6 py-5 w-48">Timestamp</th>
                            <th className="px-6 py-5">Admin</th>
                            <th className="px-6 py-5">Action</th>
                            <th className="px-6 py-5">Target</th>
                            <th className="px-6 py-5">IP Address</th>
                            <th className="px-6 py-5 text-right">Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {MOCK_AUDIT_LOGS.map((event) => {
                            const isExpanded = expandedRows.has(event.id);
                            return (
                                <React.Fragment key={event.id}>
                                    <tr className={`hover:bg-gray-50 transition-colors group ${isExpanded ? 'bg-gray-50' : ''}`}>
                                        <td className="px-6 py-4">
                                            <span className="text-[12px] font-medium text-gray-600">{event.timestamp}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold">
                                                    {event.admin.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="text-[13px] font-bold text-gray-800">{event.admin}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded text-[10px] font-bold border uppercase tracking-wider ${ACTION_COLORS[event.action] || 'bg-gray-100 text-gray-700'}`}>
                                                {event.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[13px] font-semibold text-gray-900">{event.target}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                <Globe size={12} />
                                                <span className="text-[11px] font-mono">{event.ip}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => toggleRow(event.id)}
                                                className={`p-2 rounded-full transition-all ${isExpanded ? 'bg-black text-white' : 'text-gray-400 hover:text-black hover:bg-gray-100'}`}
                                            >
                                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            </button>
                                        </td>
                                    </tr>
                                    {isExpanded && (
                                        <tr className="bg-white animate-in slide-in-from-top-2 duration-200">
                                            <td colSpan={6} className="px-12 py-6 border-l-4 border-black">
                                                <div className="space-y-4">
                                                    <div className="flex items-start space-x-4">
                                                        <Info size={16} className="text-gray-400 mt-0.5 shrink-0" />
                                                        <div>
                                                            <p className="text-[13px] font-bold text-black mb-1">Action Description</p>
                                                            <p className="text-[13px] text-gray-600">{event.description}</p>
                                                        </div>
                                                    </div>

                                                    {(event.before || event.after) && (
                                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                                            <div className="p-3 bg-red-50/50 rounded-lg border border-red-100">
                                                                <p className="text-[10px] font-bold text-red-400 uppercase mb-1">Before Change</p>
                                                                <p className="text-[12px] font-mono text-red-700">{event.before || '---'}</p>
                                                            </div>
                                                            <div className="p-3 bg-green-50/50 rounded-lg border border-green-100">
                                                                <p className="text-[10px] font-bold text-green-400 uppercase mb-1">After Change</p>
                                                                <p className="text-[12px] font-mono text-green-700">{event.after || '---'}</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center space-x-4 pt-2">
                                                        <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-md">
                                                            <ShieldCheck size={14} className="text-emerald-500" />
                                                            <span className="text-[11px] font-bold text-gray-500 uppercase">Integrity Verified</span>
                                                        </div>
                                                        <button className="text-[11px] font-bold text-blue-600 hover:underline flex items-center">
                                                            <ExternalLink size={12} className="mr-1.5" />
                                                            View Full JSON Payload
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>

                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-[12px] font-medium text-gray-500">
                    <span>Showing 100 per page (1,244,092 total events)</span>
                    <div className="flex items-center space-x-1">
                        <button className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-400 cursor-not-allowed">Previous</button>
                        <button className="px-3 py-1 bg-black text-white border border-black rounded shadow-sm">1</button>
                        <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:border-black">2</button>
                        <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:border-black">3</button>
                        <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:border-black">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuditLog;
