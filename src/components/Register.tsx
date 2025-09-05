import { useState } from "react";
import type { RegisterDto } from "../dto/RegisterDto";
import { registerApiCall } from "../service/AuthSrevice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [education, setEducation] = useState<string>("");
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const navigator = useNavigate();

  const qualificationHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQualifications(event.target.value.split(","));
  };

  const registerHandler = (e) =>{
    e.preventDefault();
    const register:RegisterDto={
      firstName,
      lastName,
      email,
      username,
      password,
      qualifications,
      education,
    }

    const type = isTeacher ? "teacher" : "student";

    registerApiCall(register,type)
    .then(res=>{
      console.log(res);
      navigator("/login");
  })
    .catch(err => console.log(err)); 
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        
        <form className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Enter first name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Enter last name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Account Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Teacher/Student Toggle */}
          <div className="flex items-center mb-4">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isTeacher}
                  onChange={() => setIsTeacher(!isTeacher)}
                />
                <div className={`block w-14 h-7 rounded-full ${isTeacher ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${isTeacher ? 'transform translate-x-7' : ''}`}></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                {isTeacher ? 'Teacher' : 'Student'}
              </span>
            </label>
          </div>

          {/* Conditional Fields */}
          {isTeacher ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qualifications
              </label>
              <input
                value={qualifications.join(",")}
                onChange={qualificationHandler}
                type="text"
                placeholder="Enter qualifications (comma separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple qualifications with commas
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {["HIGH_SCHOOL", "UNDER_GRADUATE", "POST_GRADUATE"].map((level) => (
                  <label key={level} className="flex items-center p-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="education"
                      value={level}
                      checked={education === level}
                      onChange={() => setEducation(level)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {level.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            onClick={registerHandler}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}