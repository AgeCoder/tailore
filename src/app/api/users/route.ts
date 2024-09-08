// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { ilike, sql } from 'drizzle-orm'; // Use `ilike` for case-insensitive search
import { db } from '@/db/db';
import { Client } from '@/db/schema';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    // If query is not provided or is empty, return an empty array
    if (!query || query.trim() === '') {
        return NextResponse.json([]);
    }


    try {
        // Fetching users based on partial and case-insensitive match for both name and phone number
        const filteredUsers = await db
            .select({
                id: Client.id,
                name: Client.name,
                phone: Client.phone
            })
            .from(Client)
            .where(
                sql`${ilike(Client.name, `%${query}%`)} OR ${ilike(Client.phone, `%${query}%`)}`
            )
            .limit(10);

        return NextResponse.json(filteredUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}
