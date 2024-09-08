import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from '@/db/db';
import { orders } from '@/db/schema';
import { desc } from 'drizzle-orm';



export default async function Orders() {
  const recentorders = await db.select()
    .from(orders)
    .limit(10)
    .orderBy(desc(orders.id));
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
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
            {recentorders.map(({ clientName, orderDate, clientPhone, status, paymentStatus, totalAmount, deliveryDate }, index) => (
              <TableRow key={index} className={index % 2 === 0 ? 'bg-accent' : ''}>
                <TableCell>
                  <div className="font-medium capitalize">{clientName}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">{clientPhone}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{status}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs">{paymentStatus}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{orderDate}</TableCell>
                <TableCell className="hidden md:table-cell">{deliveryDate}</TableCell>
                <TableCell className="hidden md:table-cell"> ₹{totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
