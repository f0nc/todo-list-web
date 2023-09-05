'use client'

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { fetchEntries } from "./utility/api";

export default function Home(props) {
    const { user } = useUser();
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        if (user) { fetchEntries(setEntries) }
    }, [user]);

    if (user) {
        const listEntries = entries.map(entry => <li key={entry.id}>{entry.id} {entry.username} {entry.description}</li>);
        
        return (
            <div>
                Hello {user.name}!
                <div>{props.children}</div>
                <ul>{listEntries}</ul>
                <a href="/api/auth/logout">Logout</a>
            </div>
        );
    }

    return (
        <a href="/api/auth/login">Login here!</a>
    )
}