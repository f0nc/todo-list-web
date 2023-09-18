import { useState } from "react";
import EntryDetailsModal from "./EntryDetailsModal";

export default function EntryList(props) {
    const entries = props.entries;
    const didDeleteEntry = props.didDeleteEntry;

    const [showEntryDetailsModal, setShowEntryDetailsModal] = useState(false);
    const [entryInModal, setEntryInModal] = useState(null);

    const displayModal = (entry) => {
        setEntryInModal(entry);
        setShowEntryDetailsModal(true);
    }
    const hideModal = () => setShowEntryDetailsModal(false);

    async function handleDelete(entryId) {
        const response = await fetch("/api/entry/" + entryId, { method: "DELETE" });

        if (response.ok) {
            didDeleteEntry();
            hideModal();
        }
    }

    const listEntries = entries.map(entry =>
        <li key={entry.id}>
            <a onClick={() => displayModal(entry)} >{entry.description}</a>
        </li>
    );

    return (
        <>
            <p className="fs-3">List items</p>
            <ul>{listEntries}</ul>
            <EntryDetailsModal 
                showModal={showEntryDetailsModal} 
                entry={entryInModal} 
                handleDelete={() => handleDelete(entryInModal.id)}
                handleHide={() => hideModal()}
            />
        </>
    )
}