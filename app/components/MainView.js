import { useEffect, useState } from "react";
import { fetchEntries } from "../utility/api";
import EntryList from "./EntryList";
import CreateEntryForm from "./CreateEntryForm";

export default function MainView(props) {
    const user = props.user;

    const [entries, setEntries] = useState([]);

    useEffect(() => {
        if (user) { fetchEntries(setEntries) }
    }, [user]);

    return (
        <div>
            Hello {user.name}!
            <EntryList entries={entries} didDeleteEntry={() => fetchEntries(setEntries)} />
            <CreateEntryForm didCreateNewEntry={() => fetchEntries(setEntries)} />
            <a href="/api/auth/logout">Logout</a>
        </div>
    );
}