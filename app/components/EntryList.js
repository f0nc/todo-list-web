export default function EntryList(props) {
    const entries = props.entries;

    const listEntries = entries.map(entry => 
        <li key={entry.id}>
            {entry.id} {entry.username} {entry.description}
        </li>
    );

    return <ul>{listEntries}</ul>
}