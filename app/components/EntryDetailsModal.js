import { Button, Modal } from "react-bootstrap";

export default function EntryDetailsModal(props) {
    const showModal = props.showModal;
    const entry = props.entry;
    const handleDelete = props.handleDelete;
    const handleHide = props.handleHide;

    return (
        <Modal show={showModal} centered={true} onHide={handleHide} >
            <Modal.Header closeButton={true}>Item</Modal.Header>
            <Modal.Body>
                <ul>
                    <li>Id: {entry?.id}</li>
                    <li>Desctiption: {entry?.description}</li>
                    <li>Due date: {entry?.dueDateTime}</li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}