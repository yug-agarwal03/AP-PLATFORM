import DataManagement from '@/components/admin/DataManagement';

export const metadata = {
    title: 'Data Management | Admin',
    description: 'System-wide data backup, export, and maintenance',
};

export default function DataPage() {
    return <DataManagement />;
}
