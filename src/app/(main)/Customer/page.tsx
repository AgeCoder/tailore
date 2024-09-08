import { Suspense } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from '@/db/db';
import { Client, orders } from '@/db/schema';
import { count, desc, eq } from 'drizzle-orm';

interface ClientOrder {
    client: any;
    orderCount: number;
}

async function fetchClientOrders(): Promise<ClientOrder[]> {
    try {
        return await db.select({
            client: Client,
            orderCount: count()
        })
            .from(Client)
            .leftJoin(orders, eq(orders.clientPhone, Client.phone))
            .groupBy(Client.phone)
            .orderBy(desc(Client.createdAt))
            .limit(10);
    } catch (error) {
        console.error('Failed to fetch client orders:', error);
        return [];
    }
}

function ClientsTable({ clientOrders }: { clientOrders: ClientOrder[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Phone</TableHead>
                    <TableHead className="hidden sm:table-cell">Address</TableHead>
                    <TableHead className="hidden md:table-cell">Date of Birth</TableHead>
                    <TableHead className="hidden md:table-cell">Order Count</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {clientOrders.map(({ client, orderCount }, index) => (
                    <TableRow key={client.phone} className={index % 2 === 0 ? 'bg-accent' : ''}>
                        <TableCell>
                            <div className="font-medium capitalize">{client.name}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{client.phone}</TableCell>
                        <TableCell className="hidden sm:table-cell">{client.address}</TableCell>
                        <TableCell className="hidden md:table-cell">{client.dateOfBirth || 'N/A'}</TableCell>
                        <TableCell className="hidden md:table-cell">
                            <Badge className="text-xs px-5 py-2">{orderCount}</Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default async function Clients() {
    const clientOrders = await fetchClientOrders();

    return (
        <Card className='w-full mt-5 mx-5'>
            <CardHeader className="px-7">
                <CardTitle>Clients</CardTitle>
                <CardDescription>Recent clients and their order counts.</CardDescription>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<div>Loading...</div>}>
                    <ClientsTable clientOrders={clientOrders} />
                </Suspense>
            </CardContent>
        </Card>
    );
}