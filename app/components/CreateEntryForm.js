import { useState } from "react";

export default function CreateEntryForm(props) {
    const didCreateNewEntry = props.didCreateNewEntry;

    const [description, setDescription] = useState("");
    const [formSubmittedMessage, setFormSubmittedMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const response = await fetch("/api/entry", { method: "post", body: formData });

        if (response.ok) {
            setDescription("");
            setFormSubmittedMessage("Entry created");
            didCreateNewEntry();
        } else {
            setFormSubmittedMessage("There was an error creating the entry");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button value="submit">Add</button>
            <div>{formSubmittedMessage}</div>
        </form>
        
    );
}