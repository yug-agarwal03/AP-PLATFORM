'use client'

import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { KPI } from '@/lib/dpo/types';
import { TrendingDown, TrendingUp, AlertCircle, AlertTriangle } from 'lucide-react';

export const Scorecard: React.FC<{ kpi: KPI }> = ({ kpi }) => {
    return (
        <div className="bg-white border border-[#E5E5E5] p-5 rounded-[12px] w-[200px] shrink-0 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="text-[11px] text-[#888888] font-bold uppercase tracking-wider mb-1">{kpi.label}</div>
            <div className="flex items-baseline justify-between mb-4">
                <span className="text-[28px] font-black text-black leading-none">{kpi.value}</span>
            </div>

            <div className="flex items-center justify-between">
                <div className="h-[24px] w-[80px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={kpi.trend.map((v, i) => ({ val: v, i }))}>
                            <Line
                                type="monotone"
                                dataKey="val"
                                stroke={kpi.isPositive ? "#000000" : "#ef4444"}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <span className={`text-[11px] font-black flex items-center gap-0.5 ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {kpi.change}
                </span>
            </div>

            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className={`w-1.5 h-1.5 rounded-full ${kpi.isPositive ? 'bg-black' : 'bg-red-500'}`} />
            </div>
        </div>
    );
};

export const FunnelStep: React.FC<{ label: string, count: number, total: number, bottleneck?: boolean }> = ({ label, count, total, bottleneck }) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
        <div className="space-y-2 relative group">
            <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold uppercase tracking-wider text-[#888]">{label}</span>
                <div className="flex items-center gap-2">
                    {bottleneck && (
                        <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[9px] font-black rounded uppercase flex items-center gap-1 border border-red-100">
                            <AlertTriangle size={10} /> Bottleneck
                        </span>
                    )}
                    <span className="font-black text-black">{count.toLocaleString()}</span>
                </div>
            </div>
            <div className="h-[32px] w-full bg-[#F5F5F5] rounded-lg overflow-hidden flex relative border border-[#EEE]">
                <div
                    className={`h-full transition-all duration-700 ease-out ${bottleneck ? 'bg-red-500' : 'bg-black'}`}
                    style={{ width: `${percentage}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-end px-3">
                    <span className={`text-[10px] font-bold ${percentage > 90 ? 'text-white' : 'text-black/40'} group-hover:text-white transition-colors`}>
                        {Math.round(percentage)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export const AlertItem: React.FC<{ type: 'red' | 'amber', message: string }> = ({ type, message }) => {
    return (
        <div className={`p-4 rounded-xl border flex items-start gap-4 transition-all ${type === 'red'
            ? 'bg-red-50 border-red-100 text-red-900 hover:bg-red-100 shadow-sm shadow-red-100/50'
            : 'bg-amber-50 border-amber-100 text-amber-900 hover:bg-amber-100 shadow-sm shadow-amber-100/50'
            }`}>
            {type === 'red' ? (
                <div className="p-1.5 bg-red-600 rounded-lg shrink-0 mt-0.5">
                    <AlertCircle size={16} className="text-white" />
                </div>
            ) : (
                <div className="p-1.5 bg-amber-500 rounded-lg shrink-0 mt-0.5">
                    <AlertTriangle size={16} className="text-white" />
                </div>
            )}
            <div>
                <p className="text-[13px] leading-tight font-bold mb-1">{type === 'red' ? 'CRITICAL ESCALATION' : 'PRIORITY ACTION'}</p>
                <p className="text-[12px] opacity-80 font-medium">{message}</p>
            </div>
        </div>
    );
};

export const PerformanceRing: React.FC<{ score: number }> = ({ score }) => {
    const color = score > 80 ? '#22c55e' : score > 50 ? '#eab308' : '#ef4444';
    const radius = 10;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center w-[32px] h-[32px]">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="16"
                    cy="16"
                    r={radius}
                    stroke="#F0F0F0"
                    strokeWidth="3"
                    fill="transparent"
                />
                <circle
                    cx="16"
                    cy="16"
                    r={radius}
                    stroke={color}
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute text-[9px] font-black">{score}</span>
        </div>
    );
};

export const CoverageMiniBar: React.FC<{ coverage: number }> = ({ coverage }) => {
    return (
        <div className="space-y-1">
            <div className="h-1.5 w-full bg-[#F0F0F0] rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-500 ${coverage < 50 ? 'bg-red-500' : coverage < 75 ? 'bg-amber-400' : 'bg-black'}`}
                    style={{ width: `${coverage}%` }}
                />
            </div>
            <div className="text-[9px] font-black text-right text-[#888]">{coverage}%</div>
        </div>
    );
};
