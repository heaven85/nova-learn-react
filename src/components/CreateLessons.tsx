import { useState } from "react";
import { useParams } from "react-router-dom";

export default function CreateLessons() {
  const { id } = useParams();

  const [lessonName, setLessonName] = useState<string>("");
  const [lessonLink, setLessonLink] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ lessonName, lessonLink, courseId: id });
    // Add your submission logic here
  };

  return (
    <div className="w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Create Lessons Page
      </h1>
    {alertMessage && (
        <div role="alert" className="alert alert-success">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Your purchase has been confirmed!</span>
</div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="lessonName"
            className="block text-sm font-medium text-gray-700"
          >
            Lesson Name
          </label>
          <input
            type="text"
            id="lessonName"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter lesson name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="lessonLink"
            className="block text-sm font-medium text-gray-700"
          >
            Lesson Link
          </label>
          <input
            type="url"
            id="lessonLink"
            value={lessonLink}
            onChange={(e) => setLessonLink(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/lesson"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Create Lesson
        </button>
      </form>
    </div>
  );
}
