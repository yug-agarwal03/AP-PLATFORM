import { HierarchyNode } from '@/lib/types/hierarchy';

export const STATUS_COLORS: Record<string, string> = {
    ACTIVE: 'bg-green-500',
    INACTIVE: 'bg-gray-400',
    LOCKED: 'bg-red-500',
    PENDING: 'bg-amber-500'
};

export const MOCK_USERS = [
    { id: '1', name: 'Lakshmi Devi', role: 'AWW', status: 'ACTIVE' },
    { id: '2', name: 'Anitha Rao', role: 'AWW', status: 'PENDING' },
    { id: '3', name: 'Srinivas Reddy', role: 'SCREENER', status: 'ACTIVE' },
    { id: '4', name: 'Meena Iyer', role: 'CDPO', status: 'ACTIVE' },
];

export const MOCK_HIERARCHY: HierarchyNode[] = [
    {
        id: 's1',
        name: 'Andhra Pradesh',
        type: 'STATE',
        code: 'AP',
        children: [
            {
                id: 'd1',
                name: 'Hyderabad',
                type: 'DISTRICT',
                code: 'HYD',
                children: [
                    {
                        id: 'c1',
                        name: 'Charminar Project',
                        type: 'CDPO',
                        code: 'CP-01',
                        children: [
                            {
                                id: 'm1',
                                name: 'Old City Mandal',
                                type: 'MANDAL',
                                code: 'M-12',
                                children: [
                                    {
                                        id: 'a1',
                                        name: 'Rampur AWC',
                                        type: 'AWC',
                                        code: 'AWC-501',
                                        gps: '17.3850, 78.4867'
                                    },
                                    {
                                        id: 'a2',
                                        name: 'Kondapur AWC',
                                        type: 'AWC',
                                        code: 'AWC-502',
                                        gps: '17.4500, 78.3500'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'd2',
                name: 'Rangareddy',
                type: 'DISTRICT',
                code: 'RR',
                children: [
                    {
                        id: 'c2',
                        name: 'Serilingampally Project',
                        type: 'CDPO',
                        code: 'SP-05'
                    }
                ]
            }
        ]
    }
];
