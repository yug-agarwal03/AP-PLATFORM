import AssignmentMap from '@/components/admin/UserAssignmentMap';

export const metadata = {
    title: 'Assignment Map | Admin',
    description: 'Visual overview of user assignments across the hierarchy',
};

export default function AssignmentMapPage() {
    return (
        <div className="p-8">
            <AssignmentMap />
        </div>
    );
}
