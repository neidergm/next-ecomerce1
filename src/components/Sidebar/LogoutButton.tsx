'use client'

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react'
import { CiLogin, CiLogout } from 'react-icons/ci'

export const LogoutButton = () => {

    const { status } = useSession();

    if (status === 'loading') return null;

    if (status === 'unauthenticated')
        return (
            <button
                onClick={() => signIn()}
                className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <CiLogin />
                <span className="group-hover:text-gray-700">Login</span>
            </button>
        )

    return (
        <button onClick={() => signOut()}
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <CiLogout />
            <span className="group-hover:text-gray-700">Logout</span>
        </button>
    )
}
