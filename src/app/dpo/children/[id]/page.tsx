import DpoChildDetail from '@/components/dpo/DpoChildDetail';
import { getDpoChildDetail } from '@/lib/dpo/actions';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ChildDetailPage({ params }: PageProps) {
    const { id } = await params;
    const data = await getDpoChildDetail(id);

    if (!data) {
        notFound();
    }

    return (
        <div className="container mx-auto py-8">
            <DpoChildDetail data={data} />
        </div>
    );
}
