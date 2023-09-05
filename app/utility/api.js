export function fetchEntries(callback) {
    fetch("/api/entry")
        .then(response => {
            if (!response.ok) { throw new Error("Error fetching /api/entry") }
            return response.json();
        })
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.log("Error fetching /api/entry: " + error);
        });
}