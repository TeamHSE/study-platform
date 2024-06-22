"use client";

import React from "react";
import { useProfile } from "@/hooks/useProfile";
import { LuLoader } from "react-icons/lu";
import { Container, Row, Col, Card } from "react-bootstrap";
import { COURSES_PAGE } from "@/constants/pages-url.constants"; // Import Bootstrap components

const courses = [
  {
    name: "Всe тело за 1 час",
    price: "$350",
    date: "20/08/2024",
    category: "Full-body"
  },
  {
    name: "Утренняя зарядка",
    price: "$350",
    date: "20/08/2024",
    category: "Разминки"
  }
  // Add more courses as needed
];

const Courses: React.FC = () => {
  const { user } = useProfile();

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Курсы</h1>
            <div>
              <span className="text-dark">{ user?.username ?? <LuLoader /> }</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        { courses.map((course, index) => (
          <Col key={ index } md={ 6 } lg={ 4 } className="mb-4">
            <Card>
              <Card.Body>
                <h5 className="card-title">{ course.category }</h5>
                <div className="card-text">Курс: { course.name }</div>
                <div className="card-text">Цена: { course.price }</div>
                <div className="card-text">Дата: { course.date }</div>
                <a href={ COURSES_PAGE + "/1" } className="stretched-link"></a>
              </Card.Body>
            </Card>
          </Col>
        )) }
      </Row>
    </Container>
  );
};

export default Courses;
