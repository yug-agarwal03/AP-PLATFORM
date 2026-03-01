import AuditLog from '@/components/admin/AuditLog';

export const metadata = {
    title: 'Audit Log | Admin',
    description: 'System-wide administrative action logs',
};

export default function AuditLogPage() {
    return <AuditLog />;
}
