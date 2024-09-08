// app/billing/BillingDetails.tsx
import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { BillItem } from "./types"

interface BillingDetailsProps {
    billItems: BillItem[]
    total: number
    removeFromBill: (productId: number) => void
}

export default function BillingDetails({ billItems, total, removeFromBill }: BillingDetailsProps) {
    return (
        <Card className="w-[50%]">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Billing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead className="text-right">Quantity</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {billItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="text-right">{item.quantity}</TableCell>
                                <TableCell className="text-right">₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => removeFromBill(item.id)} size="sm" variant="destructive">Remove</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="text-lg font-semibold">Total:</div>
                <div className="text-2xl font-bold">₹{total.toFixed(2)}</div>
            </CardFooter>
        </Card>
    )
}