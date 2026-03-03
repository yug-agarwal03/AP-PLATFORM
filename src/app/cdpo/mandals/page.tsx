import CdpoMandals from '@/components/cdpo/CdpoMandals'
import { getMandalComparisonData } from '@/lib/cdpo/actions'

export default async function CdpoMandalsPage() {
    const data = await getMandalComparisonData().catch(err => {
        console.error('Failed to fetch mandal comparison:', err)
        return null
    })

    return <CdpoMandals initialMandals={data || undefined} />
}