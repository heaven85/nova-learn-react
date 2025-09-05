import { useEffect, useState } from "react";
import type { CategoryDto } from "../dto/CategoryDto";
import { createCategoryApiCall, getCategoriesApiCall } from "../service/NovalearnService";

export default function DataEntry() {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = () =>{
         getCategoriesApiCall()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }

  const createCategoryHandler = () =>{
    const categoryDto:CategoryDto ={
        categoryName
    }
    createCategoryApiCall(categoryDto)
    .then(res => {
        console.log(res);
        setCategoryName("");
        fetchAllCategories();
  })
    .catch(err => console.log(err));
  }

  console.log(categories);

  return (
    <>
      <div className="w-full mt-10 p-5 grid grid-cols-2 grid-gap-4">
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">CategoryName</legend>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="input"
              placeholder="My awesome page"
            />
          </fieldset>
          <button
            onClick={createCategoryHandler}
             className="btn btn-primary mt-5 p=3">Create Category</button>
        </div>
        <div>
          {
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>CategoryName</th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories.length > 0 &&
                  categories.map((cate) => (
                    <tr key={cate.id}>
                      <td>{cate.id}</td>
                      <td>{cate.categoryName}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          }
        </div>
      </div>
    </>
  );
}
