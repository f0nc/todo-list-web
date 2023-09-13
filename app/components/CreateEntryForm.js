import { useState } from "react";

export default function CreateEntryForm(props) {
    const didCreateNewEntry = props.didCreateNewEntry;

    const [description, setDescription] = useState("");
    const [dueDateTime, setDueDateTime] = useState("");
    const [formSubmittedMessage, setFormSubmittedMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const response = await fetch("/api/entry", { method: "post", body: formData });

        if (response.ok) {
            setDescription("");
            setFormSubmittedMessage("");
            didCreateNewEntry();
        } else {
            setFormSubmittedMessage("There was an error creating the entry");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 col-6">
                    <label htmlFor="inputDescription" className="form-label">Item description</label>
                    <input type="text" className="form-control" id="inputDescription" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>

                    <label htmlFor="inputDueDateTime" className="form-label">Due date</label>
                    <input type="datetime-local" className="form-control" id="inputDueDateTime" name="dueDateTime" value={dueDateTime} onChange={(e) => setDueDateTime(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
                <div>{formSubmittedMessage}</div>
            </form>
        </>
    );
}