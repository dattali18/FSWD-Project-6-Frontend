import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';

export default function Login() {
    // get login from AuthContext
    const { login } = useContext(AuthContext);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        console.log(email, password);
        
        login(email, password);
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