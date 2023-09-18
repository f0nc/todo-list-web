import { Modal } from "react-bootstrap";
import CreateEntryForm from "./CreateEntryForm";

export default function EntryCreateModal(props) {
    const showModal = props.showModal;
    const handleHide = props.handleHide;
    const handleDidCreateEntry = props.handleDidCreateEntry;

    return (
        <Modal show={showModal} centered={true} onHide={handleHide}>
            <Modal.Header closeButton={true}>
                <h5>Create new item</h5>
            </Modal.Header>
            <Modal.Body>
                <CreateEntryForm didCreateNewEntry={handleDidCreateEntry} />
            </Modal.Body>
        </Modal>
    );
}