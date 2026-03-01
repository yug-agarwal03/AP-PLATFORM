export type HierarchyType = 'STATE' | 'DISTRICT' | 'CDPO' | 'MANDAL' | 'SECTOR' | 'PANCHAYAT' | 'AWC';

export interface HierarchyNode {
    id: string;
    name: string;
    type: HierarchyType;
    code?: string;
    gps?: string;
    children?: HierarchyNode[];
}
