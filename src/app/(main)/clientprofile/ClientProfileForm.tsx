/* eslint-disable react/no-unescaped-entities */
// app/client-profile/ClientProfileForm.tsx
'use client'

import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormDatatype } from '../ClientManagement/types'
import { getClientDataAction, updateMeasurementsAction } from '@/lib/action'

export default function ClientProfileForm({ phone }: { phone: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [formData, setFormData] = useState<FormDatatype>({
        name: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        top: '',
        chest: '',
        waist: '',
        seat: '',
        shoulder: '',
        sleeve: '',
        churidar: '',
        patiala: '',
        stand: '',
        back: '',
        front: '',
        flare: '',
        vCut: '',
    })

    useEffect(() => {
        if (phone) {
            GetUserData(phone)
        }
    }, [phone])

    async function GetUserData(phone: string) {
        setLoading(true)
        try {
            const data = await getClientDataAction(phone)
            if (data) {
                setFormData(data)
            }
        } catch (error) {
            toast.error("Failed to fetch client data")
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await updateMeasurementsAction(formData)
            toast.success("Measurements updated successfully!")
            router.push(`/ClientManagement?Phone=${formData.phone}&name=${formData.name}`)
        } catch (error) {
            toast.error("Failed to update measurements")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-6xl mx-auto">
            <CardHeader>
                <div className='w-full flex items-end justify-end'>
                    <Link href={{
                        pathname: '/ClientManagement',
                        query: { Phone: formData.phone, name: formData.name }
                    }}>
                        <Button>Next</Button>
                    </Link>
                </div>
                <CardTitle className="text-3xl font-bold text-center">
                    Tailor's Measurement Form
                </CardTitle>
                <CardDescription className="text-center text-lg">
                    Please enter the customer's measurements accurately.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter customer name"
                                required
                                onChange={handleChange}
                                value={formData?.name}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                placeholder="Enter phone number"
                                type="tel"
                                required
                                name="phone"
                                onChange={handleChange}
                                value={formData?.phone}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" placeholder="Date of Birth" name="dob"
                                onChange={handleChange}
                                value={formData?.dateOfBirth ?? ""}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            placeholder="Enter customer address"
                            name="address"
                            onChange={handleChange}
                            value={formData?.address ?? ""}
                        />
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { id: 'topLength', label: 'Top Length', name: 'top' },
                            { id: 'chest', label: 'Chest', name: 'chest' },
                            { id: 'waist', label: 'Waist', name: 'waist' },
                            { id: 'seat', label: 'Seat', name: 'seat' },
                            { id: 'shoulder', label: 'Shoulder', name: 'shoulder' },
                            { id: 'sleeve', label: 'Sleeve', name: 'sleeve' },
                            { id: 'churidar', label: 'Churidar', name: 'churidar' },
                            { id: 'patiala', label: 'Patiala', name: 'patiala' },
                            { id: 'stand', label: 'Stand', name: 'stand' },
                            { id: 'back', label: 'Back', name: 'back' },
                            { id: 'front', label: 'Front', name: 'front' },
                            { id: 'vCut', label: 'V-Cut', name: 'vCut' },
                        ].map((field) => (
                            <div key={field.id} className="space-y-2">
                                <Label htmlFor={field.id}>{field.label}</Label>
                                <Input
                                    id={field.id}
                                    placeholder={`Enter ${field.label.toLowerCase()} measurement`}
                                    type="number"
                                    name={field.name}
                                    onChange={handleChange}
                                    value={formData[field.name as keyof FormDatatype] ?? ""}
                                />
                            </div>
                        ))}
                    </div>
                    <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
                        Submit Measurements
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}