import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function EntryList(props) {
    const entries = props.entries;
    const didDeleteEntry = props.didDeleteEntry;

    const [showModal, setShowModal] = useState(false);
    const [entryInModal, setEntryInModal] = useState(null);

    const displayModal = (entry) => {
        setEntryInModal(entry);
        setShowModal(true);
    }
    const hideModal = () => setShowModal(false);

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
            <Modal show={showModal} centered={true} onHide={hideModal} >
                <Modal.Header closeButton={true}>Item</Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>Id: {entryInModal?.id}</li>
                        <li>Desctiption: {entryInModal?.description}</li>
                        <li>Due date: {entryInModal?.dueDateTime}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-danger" onClick={() => handleDelete(entryInModal.id)}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}