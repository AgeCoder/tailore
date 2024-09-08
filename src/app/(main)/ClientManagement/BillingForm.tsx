// app/billing/BillingForm.tsx
'use client'

import React, { useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { createOrderAction } from "@/lib/action"
import { BillItem, Product } from "./types"
import BillingDetails from "./BillingDetails"
import { AddItemsCard } from "./AddItemsCard"

// Mock product data (consider moving this to a server component or API route)
const products: Product[] = [
    { id: 1, name: "Simple Dress", price: 400 },
    { id: 2, name: "Top Lining Dress", price: 600 },
    { id: 3, name: "Top lining inner dress", price: 500 },
    { id: 4, name: "Top salwar lining dress", price: 800 },
    { id: 5, name: "Top only", price: 300 },
    { id: 6, name: "Top lining top", price: 500 },
]

interface Props {
    name: string | null
    phone: string | null
}

export default function BillingForm({ name, phone }: Props) {
    const [billItems, setBillItems] = useState<BillItem[]>([])
    const [loading, setLoading] = useState(false)
    const [advancePayment, setAdvancePayment] = useState<string>('')
    const [paymentMethod, setPaymentMethod] = useState<string>('Cash')
    const [paymentStatus, setPaymentStatus] = useState<string>('Unpaid')
    const [deliveryDate, setDeliveryDate] = useState<Date | undefined>()
    const router = useRouter()

    const addToBill = useCallback((product: Product) => {
        setBillItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id)
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prevItems, { ...product, quantity: 1 }]
        })
    }, [])

    const removeFromBill = useCallback((productId: number) => {
        setBillItems(prevItems => prevItems.filter(item => item.id !== productId))
    }, [])

    const total = useMemo(() => {
        return billItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }, [billItems])

    const handleClick = async () => {
        setLoading(true)
        const data = {
            name,
            phone,
            bill: billItems,
            total,
            advancePayment,
            paymentMethod,
            paymentStatus,
            deliveryDate,
        }
        try {
            const result = await createOrderAction(data)
            if (result.success) {
                toast.success('Order created successfully', {
                    duration: 2000,
                })
                router.push(`/billing/${result.orderId}?name=${result.clientName}&phone=${result.clientPhone}`)
            } else {
                throw new Error(result.error)
            }
        } catch (error) {
            toast.error("Error creating order")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex gap-8 w-full">
            <BillingDetails
                billItems={billItems}
                total={total}
                removeFromBill={removeFromBill}
            />
            <AddItemsCard
                products={products}
                addToBill={addToBill}
                loading={loading}
                advancePayment={advancePayment}
                setAdvancePayment={setAdvancePayment}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                paymentStatus={paymentStatus}
                setPaymentStatus={setPaymentStatus}
                deliveryDate={deliveryDate}
                setDeliveryDate={setDeliveryDate}
                handleClick={handleClick}
            />
        </div>
    )
}