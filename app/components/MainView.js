import { useEffect, useState } from "react";
import { fetchEntries } from "../utility/api";
import EntryList from "./EntryList";

export default function MainView(props) {
    const user = props.user;

    const [entries, setEntries] = useState([]);

    useEffect(() => {
        if (user) { fetchEntries(setEntries) }
    }, [user]);

    return (
        <div>
            Hello {user.name}!
            <EntryList entries={entries}/>
            <a href="/api/auth/logout">Logout</a>
        </div>
    );
}