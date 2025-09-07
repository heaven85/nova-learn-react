import { useEffect, useState } from "react";
import type { CourseLessonDto } from "../dto/CourseLessonDto";
import { useParams } from "react-router-dom";
import { getAllLessonsByCourseApiCall } from "../service/NovalearnService";

export default function CourseLessonsTable() {
    const {id} = useParams();
    const [courseLessons, setCourseLessons] = useState<CourseLessonDto[]>([]);
    useEffect(() => {
        getAllLessonsByCourseApiCall(Number(id)
    ).then(res => setCourseLessons(res.data))
    .catch(err => console.log(err));
    }, []);
  return (
    <div>
        <h2>Course Lessons - CourseId : {id}</h2>


    </div>
  )
}
