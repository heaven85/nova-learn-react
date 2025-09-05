import { useState } from "react";
import type { LoginDto } from "../dto/LoginDto";
import { loginAipCall, setLoggedInUserName, setLoggedInUserRole, setToken } from "../service/AuthSrevice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userNameOrEmail,setUserNameOrEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");

  const navigator = useNavigate();

  const userNameEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameOrEmail(event.target.value);
  };
  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const loginHandler = () => {
     const login:LoginDto = {
      userNameEmail: userNameOrEmail,
      password: password
     }
     loginAipCall(login)
     .then(res =>{
       const token = 'Basic '+btoa(userNameOrEmail+":"+password);
       console.log(token);
       setToken(token); 
       setLoggedInUserName(login.userNameEmail) 
       setLoggedInUserRole(res.data);
       setUserNameOrEmail("");
       setPassword("");
       navigator("/");
       window.location.reload();
     })
     .catch(err => console.log(err));
  };
  return (
    <div>
      <div className="max-w-[1530px] container mt-10 flex justify-center align-items-center">
        <div className="flex flex-col">
          <label className="floating-label mb-5">
            <span>UserNameOrEmail</span>
            <input
              value={userNameOrEmail}
              onChange={userNameEmailHandler}
              type="text"
              placeholder="Enter username or Email"
              className="input input-primary w-100 px-10"
            />
          </label>
          <label className="floating-label mb-5">
            <span>Password</span>
            <input
              value={password}
              onChange={passwordHandler}
              type="password"
              placeholder="Enter password"
              className="input input-primary w-100 px-10"
            />
          </label>

          <button 
          onClick={loginHandler} 
          className="btn btn-primary w-100">Login</button>
        </div>
      </div>
    </div>
  );
}
