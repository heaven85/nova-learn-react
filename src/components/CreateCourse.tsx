import { useEffect, useRef, useState } from "react"
import type { CategoryDto } from "../dto/CategoryDto";
import { createCourseAipCall, getCategoriesApiCall } from "../service/NovalearnService";
import { getLoggedInUserName } from "../service/AuthSrevice";

export default function CreateCourse() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
   const formRef = useRef<HTMLFormElement>(null);


  useEffect(() => {
    getCategoriesApiCall()
      .then(res => {
        setCategories(res.data);
  })
      .catch(err => {
        console.log(err);
       
      });
  }, []);

const createCourseHandler = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const username = getLoggedInUserName() as string;

  const formData = new FormData();
  formData.append("title", form.title.value);
  formData.append("fees", form.fees.value);
  formData.append("description", form.description.value);
  formData.append("category_name", form.category_name.value);
  formData.append("username", username);

  const imageFile = form.image.files?.[0];
  if (imageFile) {
    formData.append("image", imageFile);
  }

  createCourseAipCall(formData)
  .then(res => {
    console.log(res);
    if(formRef.current){
      formRef.current.reset();
    }
    if(formData){
      formData.delete("title");
      formData.delete("fees");
      formData.delete("description");
      formData.delete("category_name");
      formData.delete("username");
      formData.delete("image");
      
    }
})
  .catch(err => console.log(err));

};

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl font-bold">Create New Course</h1>
          <p className="text-blue-100 mt-1">Fill in the details below to create a new course</p>
        </div>
        
        <form ref={formRef} onSubmit={createCourseHandler}
        className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              id="title"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
              placeholder="Enter course title"
              name="title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fees</label>
            <input 
              type="number" 
              id="fees"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
              placeholder="Enter course title"
              name="fees"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 min-h-[120px]"
              placeholder="Enter course description"
              name="description" 
              id="description"
              required
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            
              <select 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 appearance-none bg-white"
                name="category_name" 
                required
              >
                <option value="">Select a category</option>
                {categories && categories.length > 0 &&
                  categories.map((category) => (
                    <option key={category.id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))
                }
              </select>
            
          </div>
          
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload an image</span>
                    <input 
                      id="image" 
                      name="image" 
                      type="file" 
                      className="sr-only" 
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}