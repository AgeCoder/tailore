/* eslint-disable react/no-unescaped-entities */
"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
interface ClientFormData {
    name: string;
    phone: string;
    address: string;
    dob: string;
    top: string;
    lengths: string;
    chest: string;
    waist: string;
    seat: string;
    shoulder: string;
    sleeve: string;
    churidar: string;
    patiala: string;
    stand: string;
    back: string;
    front: string;
    vCut: string;
}



export default function Clientprofile() {
    const router = useRouter()
    const [formData, setFormData] = useState<ClientFormData>({
        name: '',
        phone: '',
        address: '',
        dob: '',
        top: '',
        lengths: '',
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
        vCut: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        try {
            const response = await fetch('/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            // console.log(result);

            if (result.message == "Client Already Exists" && result.data.length > 0) {
                return toast.info("Client Already Exists")
            }

            if (result.message == "Client Created") {
                toast.success('Client created successfully');
                router.push(`/ClientManagement?name=${result.data[0].name}&Phone=${result.data[0].phone}`)
            } else {
                toast.error('Failed to create client');
            }
        } catch (error) {
            toast.error("Failed to create client");
        }
    };

    return (
        <div className='mx-5 mb-10 mt-5 flex w-full items-center justify-between'>
            <Card className="w-full max-w-6xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Tailor's Measurement Form</CardTitle>
                    <CardDescription className="text-center text-lg">Please enter the customer's measurements accurately.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name='name' placeholder="Enter customer name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" placeholder="Enter phone number" type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    name="phone"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dob">Date of Birth</Label>
                                <Input id="dob" placeholder="Date of Birth"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    name='dob'
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" placeholder="Enter customer address"
                                value={formData.address}
                                onChange={handleChange}
                                name='address'
                            />
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div className="space-y-2">
                                <Label htmlFor="topLength">Top Length</Label>
                                <Input id="topLength" placeholder="Enter top length" type="number"
                                    name='top'
                                    value={formData.top}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lengths"> Length</Label>
                                <Input id="lengths" placeholder="Enter top length" type="number"
                                    name='lengths'
                                    value={formData.lengths}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="chest">Chest</Label>
                                <Input id="chest" placeholder="Enter chest measurement" type="number"
                                    name='chest'
                                    value={formData.chest}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="waist">Waist</Label>
                                <Input id="waist" placeholder="Enter waist measurement" type="number"
                                    name='waist'
                                    value={formData.waist}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="seat">Seat</Label>
                                <Input id="seat" placeholder="Enter seat measurement" type="number"
                                    name='seat'
                                    value={formData.seat}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="shoulder">Shoulder</Label>
                                <Input id="shoulder" placeholder="Enter shoulder measurement" type="number"
                                    value={formData.shoulder}
                                    onChange={handleChange}
                                    name='shoulder'
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sleeve">Sleeve</Label>
                                <Input id="sleeve" placeholder="Enter sleeve length" type="number"
                                    name='sleeve'
                                    value={formData.sleeve}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="churidar">Churidar</Label>
                                <Input id="churidar" placeholder="Enter churidar measurement" type="number"
                                    name='churidar'
                                    value={formData.churidar}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="patiala">Patiala</Label>
                                <Input id="patiala" placeholder="Enter patiala measurement" type="number"
                                    name='patiala'
                                    value={formData.patiala}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stand">Stand</Label>
                                <Input id="stand" placeholder="Enter stand measurement" type="number"
                                    value={formData.stand}
                                    onChange={handleChange}
                                    name='stand'
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="back">Back</Label>
                                <Input id="back" placeholder="Enter back measurement" type="number" value={formData.back} name='back'
                                    onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="front">Front</Label>
                                <Input id="front" placeholder="Enter front measurement" type="number" value={formData.front} name='front'
                                    onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="vCut">V-Cut</Label>
                                <Input id="vCut" placeholder="Enter v-cut measurement" type="number" value={formData.vCut} name='vCut'
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <Button type='submit' className="w-full text-lg py-6">Submit Measurements</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
