import React from "react";
import ClientCoursePage from "@/components/cabinet/ClientCoursePage";

interface Module {
  id: string;
  title: string;
  content: string;
}

interface Course {
  id: string;
  name: string;
  description: string;
  modules: Module[];
}

interface CoursePageProps {
  course: Course;
}

const CoursePage: React.FC<CoursePageProps> = ({ course }) => {
  return (
    <div className="container">
      <h1>{ course.name }</h1>
      <p>{ course.description }</p>
      <ClientCoursePage course={ course } />
    </div>
  );
};

export async function generateStaticParams() {
  const courses = [
    { id: "1" },
    { id: "2" },
    { id: "3" }
  ];

  return courses.map((course) => ({
    id: course.id
  }));
}

async function getData(id: string) {
  return {
    id,
    name: `Курс ${ id }`,
    description: `Здесь должно быть описание курса ${ id }.`,
    modules: [
      {
        id: "module1",
        title: "Модуль 1",
        content: "Содержимое модуля: текст с описанием тренировочного плана модуля 1"
      },
      {
        id: "module2",
        title: "Модуль 2",
        content: "Содержимое модуля: текст с описанием тренировочного плана модуля 2"
      }
    ]
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const course = await getData(params.id);

  if (!course) {
    return <p>Course not found</p>;
  }

  return <CoursePage course={ course } />;
}
