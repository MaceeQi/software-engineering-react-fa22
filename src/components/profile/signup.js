import {useState} from "react";
import * as service from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();

    const signup = () =>
        // POSTs new user to signup middleware
        service.signup(newUser)
            .then(() => navigate('/profile'))
            .catch(e => alert(e));

    return (
        <div>
            <h1>Signup</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    username: e.target.value
                                })}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    password: e.target.value
                                })}
                   placeholder="password" type="password"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    email: e.target.value
                                })}
                   placeholder="email" type="email"/>
            <button className="mb-5 btn btn-primary" onClick={signup}>
                Signup
            </button>
        </div>
    );
};
export default Signup;