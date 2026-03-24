'use client'

import React, { useState, useRef, useEffect } from 'react';
import {
    LayoutGrid,
    Building2,
    Scan,
    AlertTriangle,
    ArrowUp,
    Send,
    Hospital,
    Layers,
    Users,
    User,
    FileText,
    Settings,
    ChevronRight,
    Bell,
    UserCircle,
    ChevronDown,
    LogOut,
    Menu,
    ChevronLeft
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { DpoTab } from '@/lib/dpo/types';

interface NavItem {
    name: string;
    icon: any;
    id: DpoTab;
    route: string;
}

const NAV_ITEMS: NavItem[] = [
    { name: 'Dashboard', icon: LayoutGrid, id: DpoTab.DASHBOARD, route: '/dpo/dashboard' },
    { name: 'CDPOs', icon: Building2, id: DpoTab.CDPOS, route: '/dpo/cdpos' },
    { name: 'Screening', icon: Scan, id: DpoTab.SCREENING, route: '/dpo/screening' },
    { name: 'Risk Analysis', icon: AlertTriangle, id: DpoTab.RISK_ANALYSIS, route: '/dpo/risk-analysis' },
    { name: 'Escalations', icon: ArrowUp, id: DpoTab.ESCALATIONS, route: '/dpo/escalations' },
    { name: 'Referral Pipeline', icon: Send, id: DpoTab.REFERRAL_PIPELINE, route: '/dpo/referrals' },
    { name: 'Facility Health', icon: Hospital, id: DpoTab.FACILITY_HEALTH, route: '/dpo/facilities' },
    { name: 'Resources', icon: Layers, id: DpoTab.RESOURCES, route: '/dpo/resources' },
    { name: 'Workforce', icon: Users, id: DpoTab.WORKFORCE, route: '/dpo/workforce' },
    { name: 'Children', icon: User, id: DpoTab.CHILDREN, route: '/dpo/children' },
    { name: 'Reports', icon: FileText, id: DpoTab.REPORTS, route: '/dpo/reports' },
    { name: 'Settings', icon: Settings, id: DpoTab.SETTINGS, route: '/dpo/settings' },
];

interface DpoShellProps {
    children: React.ReactNode;
    userName: string;
    userRole: string;
    avatarUrl: string | null;
    breadcrumbPath?: string[];
}

export default function DpoShell({ children, userName, userRole, avatarUrl, breadcrumbPath = ['District'] }: DpoShellProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const activeTab = NAV_ITEMS.find(item => pathname.startsWith(item.route))?.id || DpoTab.DASHBOARD;

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/login');
    };

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setProfileDropdownOpen(false);
            }
        }
        if (profileDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [profileDropdownOpen]);

    return (
        <div className="flex min-h-screen bg-[#F9F9F9]">
            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full bg-white border-r border-[#E5E5E5] transition-all duration-300 z-50 ${isSidebarCollapsed ? 'w-[64px]' : 'w-[240px]'
                    }`}
            >
                <div className="flex flex-col h-full pt-[56px]">
                    <nav className="flex-1 mt-4 overflow-y-auto scrollbar-hide">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => router.push(item.route)}
                                className={`w-full h-[48px] flex items-center transition-colors relative group ${activeTab === item.id
                                    ? 'bg-black text-white'
                                    : 'text-[#555555] bg-white hover:bg-[#F5F5F5]'
                                    }`}
                            >
                                {activeTab === item.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white" />
                                )}
                                <div className={`flex items-center justify-center shrink-0 ${isSidebarCollapsed ? 'w-[64px]' : 'w-[56px]'}`}>
                                    <item.icon size={18} />
                                </div>
                                {!isSidebarCollapsed && (
                                    <span className="text-[13px] font-medium whitespace-nowrap">{item.name}</span>
                                )}
                                {isSidebarCollapsed && (
                                    <div className="absolute left-[64px] bg-black text-white px-2 py-1 rounded text-[12px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                        {item.name}
                                    </div>
                                )}
                            </button>
                        ))}
                    </nav>

                    <button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="p-4 border-t border-[#E5E5E5] flex justify-center hover:bg-gray-50 text-[#555555]"
                    >
                        <ChevronLeft className={`transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} size={18} />
                    </button>
                </div>
            </aside>

            <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'pl-[64px]' : 'pl-[240px]'}`}>
                <header className="fixed top-0 right-0 left-0 h-[56px] bg-black z-[60] flex items-center justify-between px-6">
                    <div className="flex items-center gap-4 shrink-0">
                        <img src="/whitelogo.png" alt="Jiveesha Logo" className="h-7 w-auto object-contain" />
                        <div className="h-4 w-[1px] bg-[#333333]" />
                        <span className="text-[#888888] text-[11px] font-bold tracking-widest uppercase hidden sm:block">DISTRICT COMMAND</span>
                    </div>

                    <div className="flex-1 px-8 hidden md:flex items-center justify-center text-[13px] gap-2">
                        {breadcrumbPath.map((item, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <ChevronRight size={14} className="text-[#AAAAAA]" />}
                                <span className={`${index === breadcrumbPath.length - 1 ? 'text-white font-medium' : 'text-[#AAAAAA]'}`}>
                                    {item}
                                </span>
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="flex items-center gap-5 shrink-0">
                        <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
                            <Bell size={18} className="text-white" />
                            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-black" />
                        </div>

                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className="flex flex-col items-end hidden sm:flex">
                                    <span className="text-white text-[13px] font-medium leading-tight">{userName}</span>
                                    <span className="text-[#AAAAAA] text-[11px] uppercase tracking-wider">{userRole.replace('_', ' ')}</span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gray-600 border border-white/20 flex items-center justify-center overflow-hidden">
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <UserCircle size={32} className="text-white" />
                                    )}
                                </div>
                            </button>

                            {profileDropdownOpen && (
                                <div className="absolute right-0 top-[calc(100%+8px)] w-56 bg-white rounded-lg shadow-2xl border border-[#E5E5E5] overflow-hidden z-[100]">
                                    <div className="px-4 py-3 border-b border-[#F0F0F0]">
                                        <p className="text-[13px] font-bold text-black truncate">{userName}</p>
                                        <p className="text-[11px] text-[#888] uppercase tracking-wider">{userRole.replace('_', ' ')}</p>
                                    </div>
                                    <div className="py-1">
                                        <button
                                            onClick={() => {
                                                setProfileDropdownOpen(false)
                                                router.push('/dpo/settings')
                                            }}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 text-[13px] text-[#444] font-medium hover:bg-[#F5F5F5] transition-colors"
                                        >
                                            <Settings size={16} className="text-[#888]" />
                                            Settings
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 text-[13px] text-red-600 font-medium hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="pt-[56px] min-h-screen">
                    <div className="max-w-[1400px] mx-auto p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
