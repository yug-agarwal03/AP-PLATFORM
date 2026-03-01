import SystemHealth from '@/components/admin/SystemHealth';

export const metadata = {
    title: 'System Health | Admin',
    description: 'Monitor system performance and service status',
};

export default function HealthPage() {
    return <SystemHealth />;
}
