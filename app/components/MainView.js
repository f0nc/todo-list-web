import { useEffect, useState } from "react";
import { fetchEntries } from "../utility/api";
import EntryList from "./EntryList";
import CreateEntryForm from "./CreateEntryForm";
import { Button, Col, Modal, Row } from "react-bootstrap";

export default function MainView(props) {
    const user = props.user;

    const [entries, setEntries] = useState([]);
    const [showModal, setShowModal] = useState(false);

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
                        <Button className="btn-md" onClick={() => setShowModal(true)}>New</Button>    
                    </div>
                </Col>
            </Row>

            <Modal show={showModal} centered={true} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton={true}>
                    <h5>Create new item</h5>
                </Modal.Header>
                <Modal.Body>
                    <CreateEntryForm 
                        didCreateNewEntry={() => {
                            setShowModal(false);
                            fetchEntries(setEntries);
                        }} 
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}