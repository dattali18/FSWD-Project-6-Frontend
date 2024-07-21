import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    // get login from AuthContext
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        
        login(email, password);

        navigate("/profile");
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    );
}