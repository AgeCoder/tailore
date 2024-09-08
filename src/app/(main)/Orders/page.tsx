import { Suspense } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from '@/db/db';
import { orders } from '@/db/schema';
import { desc } from 'drizzle-orm';

interface Order {
    id: number;
    clientName: string;
    orderDate: string;
    clientPhone: string;
    status: string;
    paymentStatus: string;
    totalAmount: number;
    deliveryDate: string;
}

async function fetchRecentOrders(): Promise<Order[]> {
    try {
        //@ts-ignore
        return await db.select()
            .from(orders)
            .limit(10)
            .orderBy(desc(orders.id));
    } catch (error) {
        console.error('Failed to fetch recent orders:', error);
        return [];
    }
}

function OrdersTable({ recentOrders }: { recentOrders: Order[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Shop Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="hidden md:table-cell">Delivery Date</TableHead>
                    <TableHead className="hidden md:table-cell">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {recentOrders.map(({ id, clientName, orderDate, clientPhone, status, paymentStatus, totalAmount, deliveryDate }, index) => (
                    <TableRow key={id} className={index % 2 === 0 ? 'bg-accent' : ''}>
                        <TableCell>
                            <div className="font-medium capitalize">{clientName}</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">{clientPhone}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{status}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs">{paymentStatus}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{new Date(orderDate).toLocaleDateString()}</TableCell>
                        <TableCell className="hidden md:table-cell">{new Date(deliveryDate).toLocaleDateString()}</TableCell>
                        <TableCell className="hidden md:table-cell">₹{totalAmount.toLocaleString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default async function Orders() {
    const recentOrders = await fetchRecentOrders();

    return (
        <Card className='w-full mt-5 mx-5'>
            <CardHeader className="px-7">
                <CardTitle>Orders</CardTitle>
                <CardDescription>Recent orders from your store.</CardDescription>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<div>Loading orders...</div>}>
                    <OrdersTable recentOrders={recentOrders} />
                </Suspense>
            </CardContent>
        </Card>
    );
}