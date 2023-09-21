import { useState } from 'react';
import EntryDetailsModal from './EntryDetailsModal';

export default function EntryList({ entries, didDeleteEntry }) {
    const [showEntryDetailsModal, setShowEntryDetailsModal] = useState(false);
    const [entryInModal, setEntryInModal] = useState(null);

    const displayModal = (entry) => {
        setEntryInModal(entry);
        setShowEntryDetailsModal(true);
    };
    const hideModal = () => setShowEntryDetailsModal(false);

    async function handleDelete(entryId) {
        const response = await fetch(`/api/entry/${entryId}`, { method: 'DELETE' });

        if (response.ok) {
            didDeleteEntry();
            hideModal();
        }
    }

    const sortedUniqueDueDates = entries
        // Get dates
        .map((entry) => entry.dueDateTime.split('T')[0])
        // Remove duplicates
        .reduce((acc, v) => {
            if (!acc.includes(v)) {
                acc.push(v);
            }
            return acc;
        }, [])
        // Convert to Date and sort
        .map((dateString) => new Date(dateString))
        .sort((a, b) => a.getTime() - b.getTime());

    const listEntriesByDueDate = sortedUniqueDueDates.map((dueDate) => {
        const entriesForDueDate = entries.filter((entry) => {
            const dueDateString = entry.dueDateTime.split('T')[0];
            const entryDueDate = new Date(dueDateString);

            return entryDueDate.getTime() === dueDate.getTime();
        });

        const listItems = entriesForDueDate.map((entry) => (
            <li key={entry.id}>
                <a onClick={() => displayModal(entry)}>{entry.description}</a>
            </li>
        ));

        const dateFormattingOptions = { day: 'numeric', year: 'numeric', month: 'numeric' };
        return (
            <div key={dueDate}>
                <h5>{dueDate.toLocaleDateString(undefined, dateFormattingOptions)}</h5>
                <ul className="pb-3">
                    {listItems}
                </ul>
            </div>
        );
    });

    return (
        <>
            <p className="fs-3">List items</p>
            {listEntriesByDueDate}
            <EntryDetailsModal
                showModal={showEntryDetailsModal}
                entry={entryInModal}
                handleDelete={() => handleDelete(entryInModal.id)}
                handleHide={() => hideModal()}
            />
        </>
    );
}
