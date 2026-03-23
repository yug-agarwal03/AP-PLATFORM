import DpoWorkforce from '@/components/dpo/DpoWorkforce';
import { getDpoWorkforceData } from '@/lib/dpo/actions';

export default async function WorkforcePage() {
    const data = await getDpoWorkforceData();
    return <DpoWorkforce stats={data} />;
}