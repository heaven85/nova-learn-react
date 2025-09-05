import { useState } from "react";
import type { CourseLessonDto } from "../dto/CourseLessonDto";
import { useParams } from "react-router-dom";

export default function CourseLessonsTable() {
    const {id} = useParams();
    const [courseLessons, setCourseLessons] = useState<CourseLessonDto[]>([]);
  return (
    <div>
        
        <h2>Course Lessons - CourseId : {id}</h2>

    </div>
  )
}
