import React from "react";

const courses = [
  {
    name: "Вс тело за 1 час",
    price: "$350",
    date: "20/08/2024",
    category: "Full-body"
  },
  {
    name: "Название курса",
    price: "$350",
    date: "20/08/2024",
    category: "Coding"
  }
  // Add more courses as needed
];

const Courses: React.FC = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Курсы</h1>
        <div>
          <span className="text-white">User Name</span>
        </div>
      </div>
      <div className="row">
        { courses.map((course, index) => (
          <div key={ index } className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ course.category }</h5>
                <div className="card-text">Курс: { course.name }</div>
                <div className="card-text">Цена: { course.price }</div>
                <div className="card-text">Дата: { course.date }</div>
              </div>
            </div>
          </div>
        )) }
      </div>
    </div>
  );
};

export default Courses;
