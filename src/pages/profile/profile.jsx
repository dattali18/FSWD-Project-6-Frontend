import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";

export default function Profile() {
   const { user } = useContext(AuthContext);

    return (<>
        <h1>Welcome {user.user_name}</h1>
    </>);
}