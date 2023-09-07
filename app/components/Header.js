export default function Header(props) {
    const user = props.user;

    let name = user? user.name : "Anonymous";

    let authActionLink = null;
    if (user) {
        authActionLink = <a href="/api/auth/logout">Logout</a>
    }

    return (
        <header className="d-flex justify-content-end pb-3 pt-2">
            <div className="d-flex align-items-end flex-column">
                <div>Hello, {name}</div> 
                <div>{authActionLink}</div>
            </div>
        </header>
    );
}