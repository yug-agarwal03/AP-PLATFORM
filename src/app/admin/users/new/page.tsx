import AddUserForm from '@/components/admin/AddUserForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewUserPage() {
    return (
        <div className="space-y-6 container mx-auto px-4 py-8">
            <div className="flex items-center space-x-4 mb-2">
                <Link
                    href="/admin/users"
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create New User</h1>
                    <p className="text-sm text-slate-500 font-medium">Add a new officer or worker to the JIVEESHA system</p>
                </div>
            </div>

            <div className="flex justify-center">
                <AddUserForm />
            </div>
        </div>
    )
}
