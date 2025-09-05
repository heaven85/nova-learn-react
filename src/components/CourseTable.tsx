import { useEffect, useState } from "react";
import type  { CourseDto } from "../dto/CourseDto";
import { deleteCourseApiCall, getAllCoursesByTeacherNameApiCall } from "../service/NovalearnService";
import { getLoggedInUserName } from "../service/AuthSrevice";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

export default function CourseTable() {
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const loggedInUserName = getLoggedInUserName() as string;
  useEffect(() => {
   fetchAllCoursesByTeacherName(loggedInUserName);  
  }, []);



   const fetchAllCoursesByTeacherName=(name:string)=>{
        getAllCoursesByTeacherNameApiCall(name)
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
   }

     const deleteCourseHandler= (courseId:number) =>{
    deleteCourseApiCall(courseId)
    .then(res=> console.log(res.data))
   .catch((err) => console.log(err));
   fetchAllCoursesByTeacherName(loggedInUserName);
  }

  return (
    <div className="container mt-5 mx-auto p-10">
      <h1 className="text-3xl font-bold text-center p-3">Course Table</h1>
      <div className="overflow-x-auto">
        <table className="table p-4 shadow rounded-2xl">
          <thead>
            <tr>
              <th scope="col">Course Id</th>
              <th scope="col">Course Name</th>
              <th scope="col">Course Fees</th>
              <th scope="col">Course Description</th>
              <th scope="col">Course Category</th>
              <th scope="col"> Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.courseId} className="hover:bg-base-300">
                <th scope="row">{course.courseId}</th>
                <td>{course.title}</td>
                <td>{course.fees}</td>
                <td>{course.description}</td>
                <td>{course.category}</td>

                <td>
                  <div className="flex">
                    <MdDeleteForever onClick={() => deleteCourseHandler(course.courseId)} size={25} className="text-red-500" />
                    Delete
                  </div>
                  <Link to={`/dashboard/create-lessons/${course.courseId}`}>Add Lessons</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}