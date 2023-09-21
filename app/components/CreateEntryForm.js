import { useState } from 'react';

export default function CreateEntryForm({ didCreateNewEntry }) {
    const defaultFormInputClasses = ['form-control'];
    const invalidFormInputClasses = [...defaultFormInputClasses, 'is-invalid'];

    const [inputDescription, setInputDescription] = useState('');
    const [inputDueDateTime, setInputDueDateTime] = useState('');
    const [inputDescriptionValMsgs, setInputDescriptionValMsgs] = useState([]);
    const [inputDueDateTimeValMsgs, setInputDueDateTimeValMsg] = useState([]);
    const [formSubmittedMessage, setFormSubmittedMessage] = useState('');

    const descriptionValidationView = (inputDescriptionValMsgs.length > 0)
        // eslint-disable-next-line max-len
        ? <ul>{inputDescriptionValMsgs.map((errorMsg) => <li key={errorMsg}>{errorMsg}</li>)}</ul> : null;
    const dueDateTimeValidationView = (inputDueDateTimeValMsgs.length > 0)
        // eslint-disable-next-line max-len
        ? <ul>{inputDueDateTimeValMsgs.map((errorMsg) => <li key={errorMsg}>{errorMsg}</li>)}</ul> : null;

    async function handleSubmit(e) {
        e.preventDefault();

        // Reset errors
        setInputDescriptionValMsgs([]);
        setInputDueDateTimeValMsg([]);
        setFormSubmittedMessage('');

        const form = e.target;
        const formData = new FormData(form);

        const response = await fetch('/api/entry', { method: 'post', body: formData });

        if (response.ok) {
            didCreateNewEntry();
        } else {
            const responseJson = await response.json();
            const { errors } = responseJson;

            if (!errors) {
                setFormSubmittedMessage('There was an error creating the entry');
                return;
            }

            if (errors.description) {
                setInputDescriptionValMsgs(errors.description);
            }

            if (errors.dueDateTime) {
                setInputDueDateTimeValMsg(errors.dueDateTime);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3 col-6">
                <label htmlFor="inputDescription" className="form-label">Item description</label>
                <input
                    type="text"
                    id="inputDescription"
                    name="description"
                    className={
                        ((inputDescriptionValMsgs.length === 0) ? defaultFormInputClasses : invalidFormInputClasses).join(' ')
                    }
                    value={inputDescription}
                    onChange={(e) => setInputDescription(e.target.value)}
                />
                <div className="invalid-feedback">{descriptionValidationView}</div>

                <label htmlFor="inputDueDateTime" className="form-label">Due date</label>
                <input
                    type="datetime-local"
                    id="inputDueDateTime"
                    name="dueDateTime"
                    className={
                        ((inputDueDateTimeValMsgs.length === 0) ? defaultFormInputClasses : invalidFormInputClasses).join(' ')
                    }
                    value={inputDueDateTime}
                    onChange={(e) => setInputDueDateTime(e.target.value)}
                />
                <div className="invalid-feedback">{dueDateTimeValidationView}</div>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
            <div>{formSubmittedMessage}</div>
        </form>
    );
}
