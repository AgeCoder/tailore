import { Suspense } from 'react'
import BillingForm from './BillingForm'

export default function BillingPage({ searchParams }: { searchParams: { name: string, Phone: string } }) {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-3xl font-bold text-center">Customer Details & Billing</h1>
        <div className="p-2 flex gap-3 border rounded-lg">
          <p className="text-xl font-semibold">{searchParams.name}</p>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <BillingForm name={searchParams.name} phone={searchParams.Phone} />
      </Suspense>
    </div>
  )
}