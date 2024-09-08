import { Suspense } from 'react'
import ClientProfileForm from './ClientProfileForm'

export default function ClientProfilePage({ searchParams }: { searchParams: { Phone: string } }) {
    return (
        <div className="mx-5 mb-10 mt-5 flex w-full items-center justify-between">
            <Suspense fallback={<div>Loading...</div>}>
                <ClientProfileForm phone={searchParams.Phone} />
            </Suspense>
        </div>
    )
}