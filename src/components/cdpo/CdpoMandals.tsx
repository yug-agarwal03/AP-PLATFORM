'use client'

import React, { useState, useMemo } from 'react';
import {
    Table as TableIcon,
    BarChart2,
    Download,
} from 'lucide-react';
import {
    MANDAL_COMPARISON_DATA,
} from '@/lib/cdpo/constants';

interface CdpoMandalsProps {
    initialMandals?: any[];
}

export default function CdpoMandals({ initialMandals }: CdpoMandalsProps) {
    const [viewMode, setViewMode] = useState<'Table' | 'Chart'>('Table');
    const [sortBy, setSortBy] = useState<string>('coverage');

    const sortedMandals = useMemo(() => {
        const data = initialMandals || MANDAL_COMPARISON_DATA;
        return [...data].sort((a: any, b: any) => {
            return b[sortBy] - a[sortBy];
        });
    }, [sortBy, initialMandals]);

    return (
        <div className="animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-[24px] font-semibold mb-1">Mandal Comparison</h1>
                    <p className="text-[13px] text-[#888888]">{sortedMandals.length} mandals in district</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#E5E5E5] shadow-sm">
                        <span className="text-[12px] font-medium text-[#888888]">View:</span>
                        <div className="flex items-center gap-1">
                            <button onClick={() => setViewMode('Table')} className={`p-1.5 rounded-full transition-all ${viewMode === 'Table' ? 'bg-black text-white' : 'text-[#888888] hover:bg-[#F5F5F5]'}`}><TableIcon size={14} /></button>
                            <button onClick={() => setViewMode('Chart')} className={`p-1.5 rounded-full transition-all ${viewMode === 'Chart' ? 'bg-black text-white' : 'text-[#888888] hover:bg-[#F5F5F5]'}`}><BarChart2 size={14} /></button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 text-[12px] font-bold px-3 py-1.5 rounded-lg border border-[#E5E5E5] hover:bg-[#F5F5F5]"><Download size={14} /> CSV</button>
                        <button className="flex items-center gap-2 text-[12px] font-bold px-3 py-1.5 rounded-lg border border-[#E5E5E5] hover:bg-[#F5F5F5]"><Download size={14} /> PDF</button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[12px] border border-[#E5E5E5] shadow-sm overflow-hidden mb-12">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#111111] text-white">
                                <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-widest w-12 text-center">#</th>
                                <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-widest">Mandal Name</th>
                                <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-widest text-center">AWCs</th>
                                <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-widest text-center">Children</th>
                                <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-widest">Coverage %</th>
                                <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-widest text-center">Crit</th>
                                <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-widest text-center">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedMandals.map((m, idx) => (
                                <tr key={m.id} className={`group transition-all hover:bg-[#F0F0F0] cursor-pointer border-b border-[#E5E5E5] ${idx % 2 === 1 ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
                                    <td className="px-6 py-4 text-[12px] text-[#888888] text-center font-bold">{idx + 1}</td>
                                    <td className="px-6 py-4 text-[14px] font-bold text-[#111111] hover:underline">{m.name}</td>
                                    <td className="px-6 py-4 text-[14px] text-center">{m.awcs}</td>
                                    <td className="px-6 py-4 text-[14px] text-center">{m.children}</td>
                                    <td className="px-6 py-4 min-w-[150px]">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[14px] font-bold w-10 ${m.coverage < 50 ? 'text-[#F59E0B]' : ''}`}>{m.coverage}%</span>
                                            <div className="flex-1 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                                                <div className="h-full bg-black rounded-full" style={{ width: `${m.coverage}%` }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[14px] text-center font-semibold text-[#EF4444]">{m.crit}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 text-[12px] font-bold" style={{ borderColor: m.score > 7 ? '#22C55E' : '#EF4444', color: m.score > 7 ? '#15803d' : '#b91c1c' }}>{m.score}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
