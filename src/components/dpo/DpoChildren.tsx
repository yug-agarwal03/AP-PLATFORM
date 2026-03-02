'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Search,
    Download,
    ArrowUpRight,
    Loader2,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    Filter
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface Child {
    id: string;
    name: string;
    dob: string;
    gender: string;
    awc_id: string;
    current_risk_level: string;
    last_screening_date: string | null;
    awcs?: {
        name: string;
        mandals?: {
            name: string;
        }
    }
}

const DpoChildren: React.FC = () => {
    const router = useRouter();
    const supabase = createClient();
    const [children, setChildren] = useState<Child[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [riskFilter, setRiskFilter] = useState<string>('All');
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(0);
    const pageSize = 20;

    const fetchChildren = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let query = supabase
                .from('children')
                .select(`
          *,
          awcs (
            name,
            mandals (
              name
            )
          )
        `, { count: 'exact' });

            if (searchTerm) {
                query = query.or(`name.ilike.%${searchTerm}%`);
            }

            if (riskFilter !== 'All') {
                query = query.eq('current_risk_level', riskFilter.toLowerCase());
            }

            const { data, count, error: supabaseError } = await query
                .order('name', { ascending: true })
                .range(page * pageSize, (page + 1) * pageSize - 1);

            if (supabaseError) throw supabaseError;

            setChildren(data || []);
            setTotalCount(count || 0);
        } catch (err: any) {
            console.error('Error fetching children:', err);
            setError(err.message || 'Failed to fetch children. Please check your connection.');
        } finally {
            setLoading(false);
        }
    }, [searchTerm, riskFilter, page, supabase]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchChildren();
        }, 500); // Debounce search
        return () => clearTimeout(timer);
    }, [fetchChildren]);

    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
            years--;
            months += 12;
        }
        return `${years}y ${months}m`;
    };

    const getRiskColor = (risk: string) => {
        if (!risk) return 'bg-gray-100 text-[#888888]';
        switch (risk.toLowerCase()) {
            case 'critical': return 'bg-red-50 text-red-600 border-red-100';
            case 'high': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'medium': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'low': return 'bg-green-50 text-green-600 border-green-100';
            default: return 'bg-gray-100 text-[#888888] border-gray-200';
        }
    };

    const riskLevels = ['All', 'Critical', 'High', 'Medium', 'Low'];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-[32px] font-bold text-black tracking-tighter uppercase">Children Directory</h1>
                    <p className="text-[14px] text-[#888888] font-medium">{totalCount.toLocaleString()} children registered in portal</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E5] rounded-lg text-[13px] font-bold text-black hover:bg-gray-50 transition-all">
                        <Download size={16} />
                        <span>Export Census</span>
                    </button>
                </div>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-sm overflow-visible">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="relative flex-1">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
                        <input
                            type="text"
                            placeholder="Find by name or child ID..."
                            className="w-full h-12 pl-12 pr-4 bg-[#F9F9F9] border-none rounded-lg focus:ring-1 focus:ring-black outline-none transition-all text-[14px] font-medium"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(0);
                            }}
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 text-[#888888]">
                            <Filter size={14} />
                            <span className="text-[12px] font-bold uppercase tracking-wider">Risk Level:</span>
                        </div>
                        <div className="flex gap-1.5">
                            {riskLevels.map(level => (
                                <button
                                    key={level}
                                    onClick={() => {
                                        setRiskFilter(level);
                                        setPage(0);
                                    }}
                                    className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all border ${riskFilter === level
                                        ? 'bg-black text-white border-black shadow-lg shadow-black/10'
                                        : 'bg-white text-[#555555] border-[#E5E5E5] hover:border-black hover:bg-gray-50'
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto min-h-[400px]">
                    {loading && children.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 space-y-4">
                            <Loader2 className="animate-spin text-black" size={32} />
                            <p className="text-[11px] font-bold text-[#888] uppercase tracking-widest">Fetching Central Registry...</p>
                        </div>
                    ) : error ? (
                        <div className="p-16 text-center">
                            <AlertCircle size={40} className="text-red-500 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-black mb-2">Sync Error</h3>
                            <p className="text-sm text-[#888888] mb-6 max-w-xs mx-auto">{error}</p>
                            <button
                                onClick={() => fetchChildren()}
                                className="px-8 py-2.5 bg-black text-white rounded-lg text-[13px] font-bold hover:bg-gray-800 transition-all"
                            >
                                Retry Sync
                            </button>
                        </div>
                    ) : (
                        <table className="w-full text-left text-[13px] border-collapse">
                            <thead>
                                <tr className="bg-black text-white font-bold uppercase tracking-widest text-[10px]">
                                    <th className="px-6 py-5">Full Name & ID</th>
                                    <th className="px-6 py-5">Demographics</th>
                                    <th className="px-6 py-5">Location Hierarchy</th>
                                    <th className="px-6 py-5">Screening Status</th>
                                    <th className="px-6 py-5">Last Activity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F0F0F0]">
                                {children.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-32 text-center">
                                            <div className="max-w-[300px] mx-auto space-y-2">
                                                <p className="font-bold text-black uppercase tracking-wider">No Matches Found</p>
                                                <p className="text-[13px] text-[#888]">Try adjusting your search or filters to expand your results.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    children.map((child) => (
                                        <tr
                                            key={child.id}
                                            className="hover:bg-gray-50 transition-all group cursor-pointer"
                                            onClick={() => router.push(`/dpo/children/${child.id}`)}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                                    <span className="font-bold text-black text-[14px]">{child.name}</span>
                                                    <ArrowUpRight size={14} className="text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <code className="text-[10px] text-[#AAAAAA] mt-1 block">#{child.id.slice(0, 8)}</code>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-black font-medium">{calculateAge(child.dob)}</span>
                                                    <span className="text-[11px] text-[#888] uppercase font-bold tracking-tighter">{child.gender === 'male' ? 'MALE' : 'FEMALE'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-black font-medium">{child.awcs?.name || '-'}</span>
                                                    <span className="text-[11px] text-[#888] uppercase font-bold tracking-tighter">{child.awcs?.mandals?.name || 'Central'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`px-3 py-1 rounded-md text-[10px] font-black uppercase inline-block border ${getRiskColor(child.current_risk_level)}`}>
                                                    {child.current_risk_level || 'NOT SCREENED'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-[#888888] font-medium">
                                                    {child.last_screening_date ? new Date(child.last_screening_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Never'}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="p-6 bg-[#F9F9F9] border-t border-[#F0F0F0] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-[12px] font-bold text-[#888888] uppercase tracking-widest">
                            Page {page + 1} of {Math.ceil(totalCount / pageSize) || 1}
                        </span>
                        <div className="h-4 w-[1px] bg-gray-200" />
                        <span className="text-[12px] text-[#AAAAAA]">Showing {children.length} records</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 0 || loading}
                            onClick={() => setPage(p => p - 1)}
                            className="flex items-center gap-2 px-6 py-2 bg-white border border-[#E5E5E5] rounded-xl text-[12px] font-bold text-black disabled:opacity-30 disabled:cursor-not-allowed hover:border-black transition-all"
                        >
                            <ChevronLeft size={16} />
                            <span>Previous</span>
                        </button>
                        <button
                            disabled={(page + 1) * pageSize >= totalCount || loading}
                            onClick={() => setPage(p => p + 1)}
                            className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-xl text-[12px] font-bold disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-800 transition-all shadow-lg shadow-black/5"
                        >
                            <span>Next</span>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DpoChildren;
