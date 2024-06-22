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

// Fetch data at build time
export async function generateStaticParams() {
  // Replace this with your data fetching logic to get all course IDs
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
  // Replace this with your data fetching logic
  return {
    id,
    name: `Course ${ id }`,
    description: `This is the description for Course ${ id }.`,
    modules: [
      {
        id: "module1",
        title: "Module 1",
        content: "Content for module 1"
      },
      {
        id: "module2",
        title: "Module 2",
        content: "Content for module 2"
      }
      // Add more modules as needed
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
