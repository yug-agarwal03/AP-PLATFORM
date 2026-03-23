import DpoEscalations from '@/components/dpo/DpoEscalations';
import { getDpoEscalationsData } from '@/lib/dpo/actions';

export default async function EscalationsPage() {
    const data = await getDpoEscalationsData();
    return <DpoEscalations stats={data} />;
}