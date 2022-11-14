import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as service from "../../services/auth-service";
import * as usersService from "../../services/users-service";
import React from "react";
import {UserList} from "./user-list";
import Signup from "./signup";

export const Login = () => {
  const [loginUser, setLoginUser] = useState({});
  const navigate = useNavigate();

  // const deleteUser = (uid) =>
  //   usersService.deleteUser(uid)
  //     .then(findAllUsers)
  //
  // const findAllUsers = () =>
  //   usersService.findAllUsers()
  //     .then(users => {
  //       setExistingUsers(users)
  //     })

    const login = () =>
        service.login(loginUser)
            .then((user) => navigate('/profile/mytuits'))
            .catch(e => alert(e));


  // useEffect(findAllUsers, []);

  return (
    <div>
      <Signup/>

      <h1>Login</h1>
      <input className="mb-2 form-control"
             onChange={(e) =>
               setLoginUser({...loginUser, username: e.target.value})}
             placeholder="username"/>
      <input className="mb-2 form-control"
             onChange={(e) =>
               setLoginUser({...loginUser, password: e.target.value})}
             placeholder="password" type="password"/>
      <button onClick={login} className="btn btn-primary mb-5">
          Login
      </button>

      {/*<h1>Login As</h1>*/}
      {/*<UserList users={existingUsers} deleteUser={deleteUser}/>*/}

    </div>
  );
};