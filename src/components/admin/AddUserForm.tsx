'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as actions from '@/app/admin/users/actions';
import * as geoActions from '@/app/admin/geography/actions';

const ROLE_LABELS: Record<string, string> = {
    aww: 'AWW (Anganwadi Worker)',
    supervisor: 'Supervisor (Mandal Team)',
    cdpo: 'CDPO',
    district_officer: 'District Officer',
    commissioner: 'Commissioner',
    system_admin: 'System Admin',
    super_admin: 'Super Admin',
};

export default function AddUserForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: ''
    });

    const [assignments, setAssignments] = useState({
        state_id: '',
        district_id: '',
        mandal_id: '',
        sector_id: '',
        panchayat_id: '',
        awc_id: '',
    });

    const [locations, setLocations] = useState({
        states: [] as any[],
        districts: [] as any[],
        mandals: [] as any[],
        sectors: [] as any[],
        panchayats: [] as any[],
        awcs: [] as any[],
    });

    // Fetch states on mount
    useEffect(() => {
        async function fetchStates() {
            const tree = await geoActions.getGeographicTree();
            setLocations(prev => ({
                ...prev,
                states: tree.states || []
            }));
        }
        fetchStates();
    }, []);

    // Reactive fetching
    useEffect(() => {
        async function fetchDistricts() {
            if (!assignments.state_id) {
                setLocations(prev => ({ ...prev, districts: [] }));
                return;
            }
            const data = await geoActions.getEntitiesByParent('STATE', assignments.state_id);
            setLocations(prev => ({ ...prev, districts: data || [] }));
        }
        fetchDistricts();
    }, [assignments.state_id]);

    useEffect(() => {
        async function fetchMandals() {
            if (!assignments.district_id) {
                setLocations(prev => ({ ...prev, mandals: [] }));
                return;
            }
            const data = await geoActions.getEntitiesByParent('DISTRICT', assignments.district_id);
            setLocations(prev => ({ ...prev, mandals: data || [] }));
        }
        fetchMandals();
    }, [assignments.district_id]);

    useEffect(() => {
        async function fetchSectors() {
            if (!assignments.mandal_id) {
                setLocations(prev => ({ ...prev, sectors: [] }));
                return;
            }
            const data = await geoActions.getEntitiesByParent('MANDAL', assignments.mandal_id);
            setLocations(prev => ({ ...prev, sectors: data || [] }));
        }
        fetchSectors();
    }, [assignments.mandal_id]);

    useEffect(() => {
        async function fetchPanchayats() {
            if (!assignments.sector_id) {
                setLocations(prev => ({ ...prev, panchayats: [] }));
                return;
            }
            const data = await geoActions.getEntitiesByParent('SECTOR', assignments.sector_id);
            setLocations(prev => ({ ...prev, panchayats: data || [] }));
        }
        fetchPanchayats();
    }, [assignments.sector_id]);

    useEffect(() => {
        async function fetchAWCs() {
            if (!assignments.panchayat_id) {
                setLocations(prev => ({ ...prev, awcs: [] }));
                return;
            }
            const data = await geoActions.getEntitiesByParent('PANCHAYAT', assignments.panchayat_id);
            setLocations(prev => ({ ...prev, awcs: data || [] }));
        }
        fetchAWCs();
    }, [assignments.panchayat_id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await actions.createNewUser({
                ...formData,
                ...assignments
            });

            if (result.success) {
                router.push('/admin/users');
            } else {
                setError(result.error || 'Failed to create user');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl bg-white p-8 border border-slate-200 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Personal Information</h3>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                        <input
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-black transition-all"
                            placeholder="Lakshmi Devi"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-black transition-all"
                            placeholder="lakshmi@jiveesha.in"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                        <input
                            required
                            type="password"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-black transition-all"
                            placeholder="Min 8 characters"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                        <input
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-black transition-all"
                            placeholder="9876543210"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">System Role</label>
                        <select
                            required
                            value={formData.role}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-black transition-all appearance-none"
                        >
                            <option value="">Select Role</option>
                            {Object.entries(ROLE_LABELS).map(([val, label]) => (
                                <option key={val} value={val}>{label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Geographic Assignment</h3>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                        <select
                            value={assignments.state_id}
                            onChange={e => setAssignments({ ...assignments, state_id: e.target.value, district_id: '', mandal_id: '', sector_id: '', panchayat_id: '', awc_id: '' })}
                            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-black transition-all"
                        >
                            <option value="">All States</option>
                            {locations.states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">District</label>
                        <select
                            disabled={!assignments.state_id}
                            value={assignments.district_id}
                            onChange={e => setAssignments({ ...assignments, district_id: e.target.value, mandal_id: '', sector_id: '', panchayat_id: '', awc_id: '' })}
                            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-black transition-all disabled:opacity-50"
                        >
                            <option value="">All Districts</option>
                            {locations.districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Mandal / Project</label>
                        <select
                            disabled={!assignments.district_id}
                            value={assignments.mandal_id}
                            onChange={e => setAssignments({ ...assignments, mandal_id: e.target.value, sector_id: '', panchayat_id: '', awc_id: '' })}
                            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-black transition-all disabled:opacity-50"
                        >
                            <option value="">All Mandals</option>
                            {locations.mandals.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Sector</label>
                        <select
                            disabled={!assignments.mandal_id}
                            value={assignments.sector_id}
                            onChange={e => setAssignments({ ...assignments, sector_id: e.target.value, panchayat_id: '', awc_id: '' })}
                            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-black transition-all disabled:opacity-50"
                        >
                            <option value="">All Sectors</option>
                            {locations.sectors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Panchayat</label>
                        <select
                            disabled={!assignments.sector_id}
                            value={assignments.panchayat_id}
                            onChange={e => setAssignments({ ...assignments, panchayat_id: e.target.value, awc_id: '' })}
                            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-black transition-all disabled:opacity-50"
                        >
                            <option value="">All Panchayats</option>
                            {locations.panchayats.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Anganwadi Center (AWC)</label>
                        <select
                            disabled={!assignments.panchayat_id}
                            value={assignments.awc_id}
                            onChange={e => setAssignments({ ...assignments, awc_id: e.target.value })}
                            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-black transition-all disabled:opacity-50"
                        >
                            <option value="">Specific AWC</option>
                            {locations.awcs.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-black transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md disabled:bg-slate-400"
                >
                    {loading ? 'Processing...' : 'Create Account'}
                </button>
            </div>
        </form>
    );
}
