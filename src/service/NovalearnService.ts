import axios from "axios";
import { getToken } from "./AuthSrevice";
import type { CategoryDto } from "../dto/CategoryDto";
import type { CourseLessonDto } from "../dto/CourseLessonDto";

axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = getToken();
    return config;
  }, function (error) {
    return Promise.reject(error);
  },
  { synchronous: true, runWhen: () => true}
);
const NOVALEARN_BACKEND_URL = "http://localhost:8080/api/nova-learn";

export const createCourseLessons = (courseLessonDto:CourseLessonDto)=>
    axios.post(`${NOVALEARN_BACKEND_URL}/create-lesson`, courseLessonDto);

export const getAllCoursesApiCall = () =>
    axios.get(`${NOVALEARN_BACKEND_URL}/list-course`); 

export const getAllCoursesByTeacherNameApiCall = (teacherName:string) =>
   axios.get(`${NOVALEARN_BACKEND_URL}/list-course-by-teacher/${teacherName}`);


export const getCategoriesApiCall = ()=>
    axios.get<CategoryDto[]>(`${NOVALEARN_BACKEND_URL}/list-category`);

export const createCategoryApiCall = (categoryDto:CategoryDto)=>
    axios.post(`${NOVALEARN_BACKEND_URL}/create-category`, categoryDto);

export const createCourseAipCall = (courseFormData:FormData)=>
    axios.post(`${NOVALEARN_BACKEND_URL}/create-course`, courseFormData);

export const deleteCourseApiCall = (courseId:number)=>
    axios.delete(`${NOVALEARN_BACKEND_URL}/delete-course/${courseId}`);