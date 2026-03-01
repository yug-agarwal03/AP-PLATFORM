import NotificationManager from '@/components/admin/Notifications';

export const metadata = {
    title: 'Notifications | Admin',
    description: 'Configure and manage system-wide notification rules',
};

export default function NotificationsPage() {
    return <NotificationManager />;
}
