'use client';

import React, { useState } from 'react';
import {
    Database, Download, RefreshCcw, Trash2,
    CheckCircle2, AlertCircle, ShieldAlert, X,
    FileJson, FileSpreadsheet, HardDrive,
    Loader2, Clock, Calendar, Lock, ChevronDown, Check
} from 'lucide-react';

const BACKUP_HISTORY = [
    { id: 'b-1', date: '16 Feb 2026, 02:00 AM', size: '2.1 GB', type: 'Auto' },
    { id: 'b-2', date: '15 Feb 2026, 02:00 AM', size: '2.08 GB', type: 'Auto' },
    { id: 'b-3', date: '14 Feb 2026, 04:30 PM', size: '2.05 GB', type: 'Manual' },
    { id: 'b-4', date: '14 Feb 2026, 02:00 AM', size: '2.04 GB', type: 'Auto' },
];

const EXPORT_FIELDS = [
    'Users', 'Children', 'Questionnaires', 'Screenings',
    'Referrals', 'Flags', 'Observations', 'Geographic Hierarchy', 'Audit Log'
];

const DataManagement: React.FC = () => {
    const [isAutoBackupOn, setIsAutoBackupOn] = useState(true);
    const [isBackingUp, setIsBackingUp] = useState(false);
    const [backupProgress, setBackupProgress] = useState(0);
    const [selectedFormat, setSelectedFormat] = useState<'CSV' | 'JSON'>('CSV');
    const [selectedFields, setSelectedFields] = useState<Set<string>>(new Set(EXPORT_FIELDS));

    // Destructive Actions States
    const [confirmingAction, setConfirmingAction] = useState<'RESTORE' | 'PURGE_QUEUE' | 'PURGE_TEST' | 'RESET' | null>(null);
    const [confirmText, setConfirmText] = useState('');
    const [adminPass, setAdminPass] = useState('');
    const [mfaCode, setMfaCode] = useState('');

    const handleManualBackup = () => {
        setIsBackingUp(true);
        setBackupProgress(0);
        const interval = setInterval(() => {
            setBackupProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsBackingUp(false), 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    const toggleField = (field: string) => {
        const next = new Set(selectedFields);
        if (next.has(field)) next.delete(field);
        else next.add(field);
        setSelectedFields(next);
    };

    const closeConfirm = () => {
        setConfirmingAction(null);
        setConfirmText('');
        setAdminPass('');
        setMfaCode('');
    };

    const renderDestructiveModal = () => {
        if (!confirmingAction) return null;

        const titles: Record<string, string> = {
            RESTORE: 'Restore Database from Backup',
            PURGE_QUEUE: 'Clear Sync Queue',
            PURGE_TEST: 'Purge Test Data',
            RESET: 'RESET ENTIRE DATABASE'
        };

        const requiredText: Record<string, string> = {
            RESTORE: 'RESTORE',
            PURGE_QUEUE: 'CLEAR',
            PURGE_TEST: 'PURGE',
            RESET: 'DELETE ALL DATA'
        };

        const isReset = confirmingAction === 'RESET';

        return (
            <div className="fixed inset-0 flex items-center justify-center z-[100]">
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={closeConfirm} />
                <div className="relative w-[420px] bg-white rounded-2xl shadow-2xl z-[110] animate-in zoom-in-95 duration-200 overflow-hidden">
                    <div className={`p-6 border-b border-gray-100 flex items-center justify-between ${isReset ? 'bg-red-50' : 'bg-gray-50'}`}>
                        <div className="flex items-center space-x-3">
                            <ShieldAlert size={20} className={isReset ? 'text-red-600' : 'text-amber-500'} />
                            <h2 className={`text-[16px] font-bold ${isReset ? 'text-red-600' : 'text-black'}`}>{titles[confirmingAction]}</h2>
                        </div>
                        <button onClick={closeConfirm} className="text-gray-400 hover:text-black transition-colors"><X size={20} /></button>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                            <p className="text-[12px] text-red-800 leading-relaxed font-medium">
                                Warning: This action is irreversible. It will immediately affect the live platform.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type "{requiredText[confirmingAction]}" to confirm</label>
                                <input
                                    type="text"
                                    className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:border-black outline-none transition-all font-bold"
                                    value={confirmText}
                                    onChange={(e) => setConfirmText(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:border-black outline-none transition-all"
                                    value={adminPass}
                                    onChange={(e) => setAdminPass(e.target.value)}
                                />
                            </div>

                            {isReset && (
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">MFA Code</label>
                                    <input
                                        type="text"
                                        placeholder="000 000"
                                        className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:border-black outline-none transition-all text-center tracking-[0.2em] font-bold"
                                        value={mfaCode}
                                        onChange={(e) => setMfaCode(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            disabled={confirmText !== requiredText[confirmingAction] || !adminPass || (isReset && !mfaCode)}
                            className={`w-full h-12 rounded-xl font-bold text-[14px] transition-all shadow-lg ${isReset ? 'bg-red-600 text-white shadow-red-200 hover:bg-red-700' : 'bg-black text-white hover:bg-gray-800 shadow-gray-200'
                                } disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none`}
                        >
                            Confirm Irreversible Action
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-[800px] mx-auto space-y-8 pb-24">
            <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-black text-white rounded-lg"><Database size={24} /></div>
                <h1 className="text-[24px] font-semibold text-black leading-tight">Data Management</h1>
            </div>

            {/* Backup & Restore */}
            <section className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Clock size={18} className="text-gray-400" />
                        <h3 className="text-[13px] font-bold text-black uppercase tracking-widest">Database Backup</h3>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-[11px] font-bold text-gray-400 uppercase">Auto-backup</span>
                            <button
                                onClick={() => setIsAutoBackupOn(!isAutoBackupOn)}
                                className={`w-9 h-5 rounded-full relative transition-colors ${isAutoBackupOn ? 'bg-green-500' : 'bg-gray-200'}`}
                            >
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isAutoBackupOn ? 'left-5' : 'left-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-8 space-y-8">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckCircle2 size={24} /></div>
                            <div>
                                <p className="text-[14px] font-bold text-black leading-none">Last successful backup</p>
                                <p className="text-[11px] text-gray-400 mt-1">16 Feb 2026, 02:00 AM (auto) • Size: 2.1 GB</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Scheduled Next</p>
                            <p className="text-[13px] font-bold text-black">17 Feb, 02:00 AM</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Manual Trigger</p>
                            {isBackingUp && <span className="text-[11px] font-bold text-black animate-pulse uppercase tracking-widest">Creating backup... {backupProgress}%</span>}
                        </div>

                        {isBackingUp ? (
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-black transition-all duration-100 ease-linear" style={{ width: `${backupProgress}%` }} />
                            </div>
                        ) : (
                            <button
                                onClick={handleManualBackup}
                                className="w-full py-4 bg-black text-white rounded-xl font-bold text-[14px] hover:bg-gray-800 transition-all shadow-lg shadow-black/10 flex items-center justify-center space-x-2"
                            >
                                <RefreshCcw size={18} />
                                <span>Create Manual Backup</span>
                            </button>
                        )}
                    </div>

                    <div className="space-y-4">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Previous Backups</p>
                        <div className="border border-gray-100 rounded-xl overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3">Size</th>
                                        <th className="px-4 py-3">Type</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 text-[13px]">
                                    {BACKUP_HISTORY.map(b => (
                                        <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-black">{b.date}</td>
                                            <td className="px-4 py-3 text-gray-500">{b.size}</td>
                                            <td className="px-4 py-3">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${b.type === 'Auto' ? 'bg-gray-100 border-gray-200' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
                                                    {b.type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right space-x-2">
                                                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-500" title="Download"><Download size={14} /></button>
                                                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-500" title="Delete"><Trash2 size={14} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-red-700">
                                <AlertCircle size={20} />
                                <div>
                                    <p className="text-[13px] font-bold uppercase tracking-tight leading-none">High-risk Zone</p>
                                    <p className="text-[12px] opacity-80 mt-1 font-medium">Overwriting database with a backup is irreversible.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setConfirmingAction('RESTORE')}
                                className="px-6 py-2 bg-white text-red-600 border border-red-200 rounded-lg text-[12px] font-bold hover:bg-red-600 hover:text-white transition-all shadow-sm"
                            >
                                Restore from backup
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Full Data Export */}
            <section className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                        <Download size={18} className="text-gray-400" />
                        <h3 className="text-[13px] font-bold text-black uppercase tracking-widest">Full Data Export</h3>
                    </div>
                    <div className="flex items-center p-1 bg-gray-100 rounded-lg space-x-1">
                        <button
                            onClick={() => setSelectedFormat('CSV')}
                            className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase transition-all ${selectedFormat === 'CSV' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
                        >
                            CSV
                        </button>
                        <button
                            onClick={() => setSelectedFormat('JSON')}
                            className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase transition-all ${selectedFormat === 'JSON' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
                        >
                            JSON
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {EXPORT_FIELDS.map(field => (
                        <div
                            key={field}
                            onClick={() => toggleField(field)}
                            className={`flex items-center space-x-3 p-3 rounded-xl border transition-all cursor-pointer group ${selectedFields.has(field) ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-300'}`}
                        >
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedFields.has(field) ? 'bg-black border-black text-white' : 'border-gray-300 group-hover:border-black'}`}>
                                {selectedFields.has(field) && <Check size={14} strokeWidth={4} />}
                            </div>
                            <span className={`text-[13px] font-medium ${selectedFields.has(field) ? 'text-black' : 'text-gray-500 group-hover:text-black'}`}>{field}</span>
                        </div>
                    ))}
                </div>

                <button className="w-full py-4 bg-black text-white rounded-xl font-bold text-[14px] hover:bg-gray-800 transition-all flex items-center justify-center space-x-2">
                    {selectedFormat === 'CSV' ? <FileSpreadsheet size={18} /> : <FileJson size={18} />}
                    <span>Export Selected ({selectedFields.size})</span>
                </button>
            </section>

            {/* Data Purge (Danger Zone) */}
            <section className="bg-white border-l-4 border-l-red-500 border-y border-r border-red-100 rounded-r-2xl shadow-sm p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center space-x-2 mb-6">
                    <Trash2 size={20} className="text-red-500" />
                    <h3 className="text-[13px] font-bold text-red-600 uppercase tracking-widest">Data Purge Zone</h3>
                </div>
                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                            <p className="text-[14px] font-bold text-black leading-none">Sync Queue Clear</p>
                            <p className="text-[12px] text-gray-500 mt-1">Force remove all pending unsynced items.</p>
                        </div>
                        <button onClick={() => setConfirmingAction('PURGE_QUEUE')} className="px-4 py-2 bg-amber-50 text-amber-600 border border-amber-200 rounded-lg text-[12px] font-bold hover:bg-amber-600 hover:text-white transition-all">Clear Sync Queue</button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                            <p className="text-[14px] font-bold text-black leading-none">Purge Test Data</p>
                            <p className="text-[12px] text-gray-500 mt-1">Remove all records flagged with "is_test: true".</p>
                        </div>
                        <button onClick={() => setConfirmingAction('PURGE_TEST')} className="px-4 py-2 bg-amber-50 text-amber-600 border border-amber-200 rounded-lg text-[12px] font-bold hover:bg-amber-600 hover:text-white transition-all">Purge Test Data</button>
                    </div>

                    <div className="p-6 border-t border-red-50 pt-8 mt-2 space-y-4">
                        <div className="flex items-start space-x-4">
                            <ShieldAlert size={24} className="text-red-600 shrink-0" />
                            <div>
                                <p className="text-[14px] font-bold text-red-600 uppercase tracking-tight">Destructive Platform Reset</p>
                                <p className="text-[12px] text-red-700 font-medium leading-relaxed mt-1">
                                    Wipes all records across all tables. This action requires high-level authentication and MFA verification.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setConfirmingAction('RESET')}
                            className="w-full py-4 bg-red-600 text-white rounded-xl font-bold text-[14px] hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-center justify-center space-x-2"
                        >
                            <Lock size={18} />
                            <span>Reset Entire Database</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Storage Usage */}
            <section className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                        <HardDrive size={18} className="text-gray-400" />
                        <h3 className="text-[13px] font-bold text-black uppercase tracking-widest">Storage Usage</h3>
                    </div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Capacity: 10.0 GB</span>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between items-end">
                            <p className="text-[20px] font-bold text-black">2.1 GB used <span className="text-[14px] text-gray-400 font-medium">(21%)</span></p>
                            <p className="text-[12px] font-bold text-green-600 uppercase tracking-widest">Normal</p>
                        </div>
                        <div className="w-full h-4 bg-gray-100 rounded-full flex overflow-hidden">
                            <div className="h-full bg-blue-500 w-[5%]" title="Children: 0.5 GB" />
                            <div className="h-full bg-indigo-500 w-[8%]" title="Screenings: 0.8 GB" />
                            <div className="h-full bg-amber-500 w-[4%]" title="Media: 0.4 GB" />
                            <div className="h-full bg-gray-300 w-[4%]" title="Other: 0.4 GB" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <UsageSegment label="Children" size="0.5 GB" color="bg-blue-500" />
                        <UsageSegment label="Screenings" size="0.8 GB" color="bg-indigo-500" />
                        <UsageSegment label="Media" size="0.4 GB" color="bg-amber-500" />
                        <UsageSegment label="Other" size="0.4 GB" color="bg-gray-300" />
                    </div>
                </div>
            </section>

            {/* Destructive Action Modal */}
            {renderDestructiveModal()}
        </div>
    );
};

const UsageSegment = ({ label, size, color }: { label: string, size: string, color: string }) => (
    <div className="space-y-1">
        <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">{label}</p>
        </div>
        <p className="text-[14px] font-bold text-black ml-4 leading-none">{size}</p>
    </div>
);

export default DataManagement;
