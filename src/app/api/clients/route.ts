import { db } from "@/db/db";
import { Client } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server"; // Updated imports

export async function POST(req: NextRequest,) {
    try {
        const readableStream = req.body as unknown as ReadableStream;
        const formData = await new Response(readableStream).json();

        try {
            const client = await db.select({
                id: Client.id,
                name: Client.name,
                phone: Client.phone
            })
                .from(Client)
                .where(eq(Client.phone, formData.phone));

            if (client.length > 0) {
                return NextResponse.json({ message: "Client Already Exists", data: client });
            }
        } catch (error) {
            // console.log(error);
            return NextResponse.json({ success: false, error: error });
        }

        const response = await db.insert(Client).values({
            name: formData.name as string,
            phone: formData.phone as string,
            address: formData.address as string,
            dateOfBirth: formData.dob as string,
            top: formData.top as string,
            length: formData.lengths as string,
            chest: formData.chest as string,
            waist: formData.waist as string,
            seat: formData.seat as string,
            shoulder: formData.shoulder as string,
            sleeve: formData.sleeve as string,
            churidar: formData.churidar as string,
            patiala: formData.patiala as string,
            stand: formData.stand as string,
            back: formData.back as string,
            front: formData.front as string,
            flare: formData.gher as string,
            vCut: formData.vCut as string,
        }).returning({
            id: Client.id,
            name: Client.name,
            phone: Client.phone,
        });
        return NextResponse.json({ message: "Client Created", data: response });
    } catch (error) {
        return NextResponse.json({ success: false, error: error });
    }
}
