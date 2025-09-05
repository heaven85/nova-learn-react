import axios from "axios";
import type { LoginDto } from "../dto/LoginDto";
import type { RegisterDto } from "../dto/RegisterDto";

const AUTH_BACKEND_URL = "http://localhost:8080/api/auth";



export const loginAipCall = (login:LoginDto) =>
    axios.post(`${AUTH_BACKEND_URL}/login`, login);

export const registerApiCall = (registerDto:RegisterDto,type:string) =>
    axios.post(`${AUTH_BACKEND_URL}/register/${type}`, registerDto);


export const logoutApiCall = () =>{
    localStorage.removeItem("token");
    sessionStorage.removeItem("loggedInUserName");
    sessionStorage.removeItem("loggedInUserRole");
}

export const setToken = (token:string) =>{
    localStorage.setItem("token", token);
}

export const getToken = () => localStorage.getItem("token");

export const setLoggedInUserName = (username:string) =>{
    sessionStorage.setItem("loggedInUserName", username);
}

export const getLoggedInUserName = () => 
    sessionStorage.getItem("loggedInUserName");

export const isLoggedIn = () => getLoggedInUserName() !== null;

export const setLoggedInUserRole = (role:string) =>{
    sessionStorage.setItem("loggedInUserRole", role);
}

export const getLoggedInUserRole = () => 
    sessionStorage.getItem("loggedInUserRole");

export const isStudent = () =>{
    const role = getLoggedInUserRole();
    if(role){
        return role.trim() === "ROLE_STUDENT";
    }
    return false;
}
export const isTeacher = () =>{
    const role = getLoggedInUserRole();
    if(role){
        return role.trim() === "ROLE_TEACHER";
    }
    return false;
}

export const isSiteOwner = () =>{
    const role = getLoggedInUserRole();
    if(role){
        return role.trim() === "ROLE_SITE_OWNER";
    }
    return false;
}
     


