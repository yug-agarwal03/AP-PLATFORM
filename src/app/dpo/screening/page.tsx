import DpoScreening from '@/components/dpo/DpoScreening';
import { getDpoScreeningStats } from '@/lib/dpo/actions';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ScreeningPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const range = (searchParams.range as string) || 'Month';
    const stats = await getDpoScreeningStats(range);
    
    return <DpoScreening stats={stats} initialRange={range} />;
}