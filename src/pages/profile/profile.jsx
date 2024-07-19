export default function Profile() {
    const user = {
        username: "Admin",
        email: "admin@example.com",
    }

    return (<>
        <h1>Welcome {user.username}</h1>
    </>);
}