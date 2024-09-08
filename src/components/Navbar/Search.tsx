// app/components/SearchBar.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface User {
    id: number;
    name: string;
    phone: string;
}

export default function SearchBar() {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<User[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): T => {
        let timeoutId: NodeJS.Timeout | null = null;
        return ((...args: Parameters<T>) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        }) as T;
    };

    const searchUsers = useCallback(
        debounce(async (searchQuery: string) => {
            if (!searchQuery) {
                setResults([]);
                setShowDropdown(false);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`/api/users?query=${encodeURIComponent(searchQuery)}`);
                if (!response.ok) throw new Error('Failed to fetch users');
                const data: User[] = await response.json();
                setResults(data);
                setShowDropdown(true);
            } catch (error) {
                console.error('Error fetching users:', error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 800),
        []
    );

    useEffect(() => {
        searchUsers(query);
    }, [query, searchUsers]);

    return (
        <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-expanded={showDropdown}
                aria-haspopup="listbox"
                aria-controls="search-results"
            />
            {showDropdown && (
                <ul
                    id="search-results"
                    className="absolute z-10 w-full mt-1 bg-background border border-input rounded-md shadow-lg"
                    role="listbox"
                >
                    {isLoading ? (
                        <li className="px-4 py-2">Loading...</li>
                    ) : results.length > 0 ? (
                        results.map((user) => (
                            <Link href={{
                                pathname: '/clientprofile',
                                query: { Phone: user.phone, name: user.name }
                            }}
                                key={user.id}
                            >
                                <li

                                    className="px-4 py-2 hover:bg-muted cursor-pointer"
                                    // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                                    role="option"
                                >

                                    {user.name}
                                </li>
                            </Link>
                        ))
                    ) : (
                        <li className="px-4 py-2">No results found</li>
                    )}
                </ul>
            )}
        </div>
    );
}