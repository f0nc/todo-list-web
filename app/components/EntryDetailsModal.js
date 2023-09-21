import { Button, Modal } from 'react-bootstrap';

export default function EntryDetailsModal({
    showModal, entry, handleDelete, handleHide,
}) {
    return (
        <Modal show={showModal} centered onHide={handleHide}>
            <Modal.Header closeButton>Item</Modal.Header>
            <Modal.Body>
                <ul>
                    <li>{`Id: ${entry?.id}`}</li>
                    <li>{`Description: ${entry?.description}`}</li>
                    <li>{`Due date: ${entry?.dueDateTime}`}</li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}
