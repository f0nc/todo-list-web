import { Modal } from 'react-bootstrap';
import CreateEntryForm from './CreateEntryForm';

export default function EntryCreateModal({ showModal, handleHide, handleDidCreateEntry }) {
    return (
        <Modal show={showModal} centered onHide={handleHide}>
            <Modal.Header closeButton>
                <h5>Create new item</h5>
            </Modal.Header>
            <Modal.Body>
                <CreateEntryForm didCreateNewEntry={handleDidCreateEntry} />
            </Modal.Body>
        </Modal>
    );
}
