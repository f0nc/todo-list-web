import { useEffect, useState } from "react";
import { fetchEntries } from "../utility/api";
import EntryList from "./EntryList";
import { Button, Col, Row } from "react-bootstrap";
import EntryCreateModal from "./EntryCreateModal";

export default function MainView(props) {
    const user = props.user;

    const [entries, setEntries] = useState([]);
    const [showCreateEntryModal, setShowCreateEntryModal] = useState(false);

    useEffect(() => {
        if (user) { fetchEntries(setEntries) }
    }, [user]);

    return (
        <div>
            <Row>
                <Col sm={10}>
                    <EntryList entries={entries} didDeleteEntry={() => fetchEntries(setEntries)} />
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
        </div>
    );
}