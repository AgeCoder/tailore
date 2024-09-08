// app/billing/AddItemsCard.tsx
import React, { Dispatch, SetStateAction } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

import { OrderDetailsForm } from "./OrderDetailsForm"
import { Product } from "./types"

interface AddItemsCardProps {
    products: Product[]
    addToBill: (product: Product) => void
    loading: boolean
    advancePayment: string
    setAdvancePayment: Dispatch<SetStateAction<string>>
    paymentMethod: string
    setPaymentMethod: Dispatch<SetStateAction<string>>
    paymentStatus: string
    setPaymentStatus: Dispatch<SetStateAction<string>>
    deliveryDate: Date | undefined
    setDeliveryDate: Dispatch<SetStateAction<Date | undefined>>
    handleClick: () => void
}

export function AddItemsCard({
    products, addToBill, loading, advancePayment, setAdvancePayment,
    paymentMethod, setPaymentMethod, paymentStatus, setPaymentStatus,
    deliveryDate, setDeliveryDate, handleClick
}: AddItemsCardProps) {
    return (
        <Card className="w-[50%] min-h-screen">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center">
                    <ShoppingCart className="mr-2" />
                    Add Items
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell className="text-right">₹{product.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => addToBill(product)} size="sm">Add</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex gap-5 flex-col">
                <OrderDetailsForm
                    advancePayment={advancePayment}
                    setAdvancePayment={setAdvancePayment}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    paymentStatus={paymentStatus}
                    setPaymentStatus={setPaymentStatus}
                    deliveryDate={deliveryDate}
                    setDeliveryDate={setDeliveryDate}
                />
                <Button
                    disabled={loading}
                    className="w-full"
                    onClick={handleClick}>
                    Confirm The Order
                </Button>
            </CardFooter>
        </Card>
    )
}

