import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/db/db";
import { Client, orders } from "@/db/schema";
import { eq } from "drizzle-orm";

const measurementFields = [
    "top", "length", "chest", "waist", "seat", "shoulder",
    "sleeve", "churidar", "patiala", "stand", "back", "front"
];

export default async function SonaliBillingPage({ params }: any) {
    const ordersWithClientInfo = await db
        .select()
        .from(orders)
        .where(eq(orders.id, params.id))
        .leftJoin(Client, eq(orders.clientPhone, Client.phone));

    const Orders = ordersWithClientInfo[0]?.orders || {};
    const ClientInfo = ordersWithClientInfo[0]?.Client || {};

    return (
        <div className="container main-content mx-auto p-4 min-h-screen flex items-center justify-center w-full ">
            <Card className="w-full max-w-5xl bg-white shadow-md border border-gray-200 rounded-lg">
                <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Section */}
                        <div className="space-y-2 border-r border-gray-200 pr-6">
                            <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-700">
                                <div>F.L.:</div>
                                <div>H.L.:</div>
                                <div>Suit:</div>
                                <div>Top H.L.:</div>
                                <div>Top:</div>
                                <div>Top:</div>
                                <div>Ch:</div>
                                <div>Ka:</div>
                                <div>Total:</div>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <div>Order No: {Orders.id}</div>
                                <div>Date: {Orders?.orderDate}</div>
                            </div>
                            <div className="flex w-full justify-between text-sm text-gray-600">
                                <div className="capitalize">Name: {Orders.clientName}</div>
                                <div>Phone: {Orders.clientPhone}</div>
                            </div>
                            <div className="space-y-2">
                                {measurementFields.map((field: string, index: number) => (
                                    <div key={index} className="flex justify-between items-center text-gray-700">
                                        <span className="text-sm">{field}:</span>
                                        <span className="w-2/3 border-b border-gray-300 text-sm pl-2">{
                                            //@ts-ignore 
                                            ClientInfo?.[field]}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-7 text-sm text-gray-700">
                                <span>Delivery Date: {Orders.deliveryDate}</span>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800">Sonali</h2>
                                    <p className="text-sm text-gray-500">Fashion Ladies Tailors</p>
                                </div>
                                <div className="text-right">
                                    <p>Gopi T. • Narendra T.</p>
                                    <p>Mob.: 9822616876</p>
                                </div>
                            </div>

                            <div className="text-xs rounded-md">
                                गाळा नं. २ व, शाहूनगर मेट्रोसिटी कॉम्प्लेक्स, दुसरा चौक,
                                एमआय थिएटर सेंटर शेजारी, नवी पेठ, सोलापूर.
                            </div>

                            <div className="flex justify-between items-center my-4">
                                <div>
                                    <h3 className="text-xl font-bold text-red-600">Order No: {Orders.id}</h3>
                                    <p className="text-sm text-gray-600">Date: {Orders?.orderDate}</p>
                                    <p className="capitalize text-sm text-gray-600">Name: {Orders.clientName}</p>
                                    <p className="text-sm text-gray-600">Phone: {Orders.clientPhone}</p>
                                </div>
                                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-gray-400 rounded-md">
                                    QR Code
                                </div>
                            </div>

                            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 border-b">Item</th>
                                        <th className="p-2 border-b">Quantity</th>
                                        <th className="p-2 border-b">Price</th>
                                        <th className="p-2 border-b">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        //@ts-ignore                                    
                                        Orders.bill?.map((item: any) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="p-2 border-b">{item.name}</td>
                                                <td className="p-2 border-b text-center">{item.quantity}</td>
                                                <td className="p-2 border-b text-right">₹{item.price}</td>
                                                <td className="p-2 border-b text-right">₹{parseInt(item.price) * parseInt(item.quantity)}</td>
                                            </tr>
                                        ))}
                                </tbody>
                                <tfoot>
                                    <tr className="font-semibold">
                                        <td colSpan={3} className="p-2 text-right border-t">Total</td>
                                        <td className="p-2 text-right border-t">₹{Orders.totalAmount}</td>
                                    </tr>
                                </tfoot>
                            </table>

                            <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
                                <span>Delivery Date: {Orders.deliveryDate}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
