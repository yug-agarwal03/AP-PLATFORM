'use client'

import { useState } from 'react'

export function BulkUploadDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [logs, setLogs] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setLoading(true)
        setError(null)
        setLogs(null)

        const reader = new FileReader()
        reader.onload = async (event) => {
            try {
                const text = event.target?.result as string
                const rows = text.split('\n').filter(row => row.trim() !== '')
                const headers = rows[0].split(',').map(h => h.trim().toLowerCase())

                // Improved CSV parse to handle basic quoted strings
                const users = rows.slice(1).map(row => {
                    const values: string[] = []
                    let current = ''
                    let inQuotes = false

                    for (let i = 0; i < row.length; i++) {
                        const char = row[i]
                        if (char === '"' && (i === 0 || row[i - 1] !== '\\')) {
                            inQuotes = !inQuotes
                        } else if (char === ',' && !inQuotes) {
                            values.push(current.trim())
                            current = ''
                        } else {
                            current += char
                        }
                    }
                    values.push(current.trim())

                    const user: any = {}
                    headers.forEach((h, i) => {
                        user[h] = values[i]?.replace(/^"|"$/g, '').trim() || ''
                    })
                    return user
                })

                // Validate headers
                const requiredHeaders = ['name', 'email', 'role']
                const missing = requiredHeaders.filter(h => !headers.includes(h))
                if (missing.length > 0) {
                    setError(`Missing required columns: ${missing.join(', ')}`)
                    setLoading(false)
                    return
                }

                const response = await fetch('/api/admin/users/bulk', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ users })
                })

                const data = await response.json()
                if (data.results) {
                    setLogs(data.results)
                } else if (data.error) {
                    setError(data.error)
                }
            } catch (err: any) {
                setError('Failed to parse file: ' + err.message)
            } finally {
                setLoading(false)
                // Clear the input so same file can be uploaded again
                e.target.value = ''
            }
        }
        reader.readAsText(file)
    }

    const downloadTemplate = () => {
        const headers = 'name,email,password,phone,role,awc_id,mandal_id,district_id\n'
        const sample = 'John Doe,john@example.com,password123,9876543210,aww,,,\n'
        const blob = new Blob([headers + sample], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'user_bulk_upload_template.csv'
        a.click()
    }

    return (
        <div className="inline-block">
            <button
                onClick={() => setIsOpen(true)}
                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm hover:bg-slate-200 transition-colors border border-slate-200"
            >
                Bulk Upload
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h2 className="text-xl font-bold text-slate-800">Bulk User Upload</h2>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-slate-500">
                                Upload a CSV file with the following columns: <br />
                                <code className="bg-slate-50 px-1 py-0.5 rounded text-xs">name, email, password, phone, role, awc_id, mandal_id, district_id</code>
                            </p>

                            <button
                                onClick={downloadTemplate}
                                className="text-blue-600 text-xs font-semibold hover:underline"
                            >
                                Download CSV Template
                            </button>

                            <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center gap-3">
                                {loading ? (
                                    <div className="text-slate-500 animate-pulse text-sm">Processing...</div>
                                ) : (
                                    <>
                                        <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <input
                                            type="file"
                                            accept=".csv"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="bulk-csv-input"
                                        />
                                        <label
                                            htmlFor="bulk-csv-input"
                                            className="cursor-pointer bg-slate-800 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-slate-700 transition-colors shadow-sm"
                                        >
                                            Select CSV File
                                        </label>
                                    </>
                                )}
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">
                                    {error}
                                </div>
                            )}

                            {logs && (
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-sm space-y-2">
                                    <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                                        <span className="text-green-600">Success: {logs.success}</span>
                                        <span className="text-red-600">Failed: {logs.failed}</span>
                                    </div>
                                    {logs.errors.length > 0 && (
                                        <div className="max-h-32 overflow-y-auto pt-2 border-t border-slate-200">
                                            <p className="text-[10px] text-slate-400 mb-1 uppercase font-bold">Errors</p>
                                            {logs.errors.map((err: any, i: number) => (
                                                <p key={i} className="text-[10px] text-red-500">
                                                    <strong>{err.email}:</strong> {err.error}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                    <button
                                        onClick={() => {
                                            setIsOpen(false)
                                            window.location.reload()
                                        }}
                                        className="w-full mt-2 py-2 bg-white border border-slate-200 rounded text-xs font-bold hover:bg-slate-50"
                                    >
                                        Close & Refresh
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
