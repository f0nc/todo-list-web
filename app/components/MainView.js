import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { fetchEntries } from '../utility/api';
import EntryList from './EntryList';
import EntryCreateModal from './EntryCreateModal';
import EntryDetailsModal from './EntryDetailsModal';

export default function MainView({ user }) {
    const [entries, setEntries] = useState([]);
    const [showCreateEntryModal, setShowCreateEntryModal] = useState(false);
    const [showEntryDetailsModal, setShowEntryDetailsModal] = useState(false);
    const [entryDetailsModalEntry, setEntryDetailsModalEntry] = useState(null);

    const displayEntryDetailsModal = (entry) => {
        setEntryDetailsModalEntry(entry);
        setShowEntryDetailsModal(true);
    };
    const hideEntryDetailsModal = () => setShowEntryDetailsModal(false);

    async function handleDeleteEntry(entryId) {
        const response = await fetch(`/api/entry/${entryId}`, { method: 'DELETE' });

        if (response.ok) {
            fetchEntries(setEntries);
            hideEntryDetailsModal();
        }
    }

    useEffect(() => {
        if (user) { fetchEntries(setEntries); }
    }, [user]);

    return (
        <div>
            <Row>
                <Col sm={10}>
                    <EntryList
                        entries={entries}
                        didSelectEntry={(entry) => displayEntryDetailsModal(entry)}
                    />
                </Col>
                <Col className="d-flex justify-content-end">
                    <div>
                        <Button className="btn-md" onClick={() => setShowCreateEntryModal(true)}>New</Button>
                    </div>
                </Col>
            </Row>
            <EntryCreateModal
                showModal={showCreateEntryModal}
                handleHide={() => setShowCreateEntryModal(false)}
                handleDidCreateEntry={() => {
                    setShowCreateEntryModal(false);
                    fetchEntries(setEntries);
                }}
            />
            <EntryDetailsModal
                showModal={showEntryDetailsModal}
                entry={entryDetailsModalEntry}
                handleDelete={() => handleDeleteEntry(entryDetailsModalEntry.id)}
                handleHide={() => hideEntryDetailsModal()}
            />
        </div>
    );
}
