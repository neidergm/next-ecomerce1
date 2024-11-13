'use client'

import { useSession } from "next-auth/react";

export default function ProfilePage() {

    const { data } = useSession();

    return (
        <div>
        <h2 className="text-lg font-semibold text-gray-800">Profile</h2>

            <p>Welcome back, {data?.user?.name}!</p>

            <div>
                <pre>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </div>
    );
}