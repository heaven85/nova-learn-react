import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { isLoggedIn, isSiteOwner, isTeacher } from "./service/AuthSrevice";
import Login from "./components/Login";
import type { ReactElement } from "react";
import Register from "./components/Register";
import Dashborard from "./components/Dashborard";
import CreateCourse from "./components/CreateCourse";
import DataEntry from "./components/DataEntry";
import CourseTable from "./components/CourseTable";
import CreateLessons from "./components/CreateLessons";





export default function App() {
  const beLogin = isLoggedIn();
  const beTeacher = isTeacher();
  const beSiteAdmin = isSiteOwner();

  const AuthenticatedRoute = ({ children }: { children: ReactElement }) => {
     if(!beLogin) return <Login />;
     return children;
  };
  return (
    <div>
       <BrowserRouter>
        <Navbar />
        <Routes>
           <Route path="/" element={
            <AuthenticatedRoute>
            {(beSiteAdmin || beTeacher)? <Dashborard />:<Home />}
            </AuthenticatedRoute>
         } />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/dashboard" element={
            <Dashborard />
           } >
            { beTeacher ? <Route path="create-course" element={<CreateCourse />} /> : "" }
            { beTeacher ? <Route path="data-entry" element={<DataEntry />} /> : "" }
            { beTeacher ? <Route path="course-table" element={<CourseTable />} /> : "" }
            { beTeacher ? <Route path="create-lessons/:id" element={<CreateLessons />} /> : "" }
            </Route>
        </Routes>
       </BrowserRouter>
    </div>
  )
}
