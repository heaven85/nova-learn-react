import { useState } from "react";
import type { CourseLessonDto } from "../dto/CourseLessonDto";
import { useParams } from "react-router-dom";

export default function CourseLessonsTable() {
    const {id} = useParams();
    const [courseLessons, setCourseLessons] = useState<CourseLessonDto[]>([]);
  return (
    <div>
        <h1>Course Lessons</h1>
        <h2>Course Lessons - CourseId : {id}</h2>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione explicabo! Sint quia quam atque tempora nam sapiente recusandae molestias. Quae illo accusantium asperiores itaque, minima hic quaerat atque nam?</p>

    </div>
  )
}
