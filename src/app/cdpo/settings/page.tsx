'use client';

import CdpoSettings from '@/components/cdpo/CdpoSettings';

export default function Page() {
    const mockUser = {
        name: "Meena Kumari",
        role: "CDPO",
        avatarUrl: undefined
    };

    return <CdpoSettings user={mockUser} />;
}