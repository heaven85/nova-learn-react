import { useEffect, useState } from "react"
import type { CourseDto } from "../dto/CourseDto"
import { getAllCoursesApiCall, getCategoriesApiCall } from "../service/NovalearnService";
import type { CategoryDto } from "../dto/CategoryDto";

export default function Home() {
  const [courseDtos, setCourseDtos] = useState<CourseDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  
  useEffect(() => {
    getAllCoursesApiCall()
      .then(res => setCourseDtos(res.data))
      .catch(err => console.log(err));

    getCategoriesApiCall()
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  // Mock categories for the navbar
  // const categories = [
  //   "Development", "Business", "Finance & Accounting", "IT & Software", 
  //   "Office Productivity", "Personal Development", "Design", "Marketing",
  //   "Lifestyle", "Photography & Video", "Health & Fitness", "Music"
  // ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">Novalearn</span>
            </div>
            
            {/* Categories Dropdown */}
            <div className="hidden md:flex space-x-8">
              <div className="relative group">
                <button className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Categories
                </button>
                <div className="absolute z-10 hidden group-hover:block w-64 bg-white shadow-lg rounded-md p-2 grid grid-cols-2 gap-2">
                  {categories.slice(0, 10).map((category, index) => (
                    <a key={index} href="#" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                      {category.categoryName}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for anything"
                  className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Right Menu */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                My Learning
              </a>
              <a href="#" className="bg-white border border-gray-300 rounded-full h-8 w-8 flex items-center justify-center text-gray-700 hover:bg-gray-100">
                <span className="text-sm font-medium">A</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">Learning that gets you</h1>
            <p className="text-xl mb-6">Skills for your present (and your future). Get started with us.</p>
          </div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Courses</h2>
        
        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courseDtos.map((course) => (
            <div key={course.courseId} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
              {/* Course Image */}
              <div className="h-40 bg-gray-300 relative">
                {course.imageBase64 ? (
                  <img 
                    src={`data:image/jpeg;base64,${course.imageBase64}`} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Novalearn</span>
                  </div>
                )}
              </div>
              
              {/* Course Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 line-clamp-2 h-14 overflow-hidden">{course.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2 h-10 overflow-hidden">{course.description}</p>
                <p className="text-xs text-gray-500 mt-1">By {course.teacherName}</p>
                
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400">★★★★☆</span>
                  <span className="text-gray-600 text-sm ml-1">(4.5)</span>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-900">${course.fees}</span>
                  <span className="text-sm text-gray-600">10 hours</span>
                </div>
                
                <div className="mt-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">Bestseller</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show message if no courses available */}
        {courseDtos.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No courses available</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new course.</p>
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-bold text-gray-900">{category.categoryName}</h3>
                <p className="text-sm text-gray-600 mt-2">24 courses</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Novalearn</h3>
              <p className="text-gray-400">Learn from industry experts with flexible courses</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Categories</h4>
              <ul className="space-y-2">
                {categories.slice(0, 5).map((category, index) => (
                  <li key={index}><a href="#" className="text-gray-400 hover:text-white">{category.categoryName}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">© 2023 Novalearn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}