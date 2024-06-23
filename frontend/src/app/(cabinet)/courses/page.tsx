"use client";

import React, { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { LuLoader } from "react-icons/lu";
import { Container, Row, Col, Card, Dropdown, ButtonGroup } from "react-bootstrap";
import { COURSES_PAGE } from "@/constants/pages-url.constants";
import Link from "next/link";

const newCourses = [
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
];

const initialAppliedCourses = [
  {
    name: "Утренняя зарядка",
    price: "$500",
    date: "01/09/2024",
    category: "Разминки"
  },
  {
    name: "Верхняя часть тела",
    price: "$800",
    date: "15/09/2024",
    category: "Функциональная"
  }
];

const Courses: React.FC = () => {
  const { user } = useProfile();
  const [ appliedCourses, setAppliedCourses ] = useState(initialAppliedCourses);

  const handleUnsubscribe = (courseIndex: number) => {
    setAppliedCourses(appliedCourses.filter((_, index) => index !== courseIndex));
  };

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

      <h2 className="mb-4">Поиск новых курсов</h2>
      <Row>
        { newCourses.map((course, index) => (
          <Col key={ index } md={ 6 } lg={ 4 } className="mb-4">
            <Card>
              <Card.Body>
                <h5 className="card-title">
                  <a href={ `${ COURSES_PAGE }/${ index }` } className="stretched-link">{ course.category }</a>
                </h5>
                <div className="card-text">Курс: { course.name }</div>
                <div className="card-text">Цена: { course.price }</div>
                <div className="card-text">Дата: { course.date }</div>
              </Card.Body>
            </Card>
          </Col>
        )) }
      </Row>

      <h2 className="my-4">Управление подписками</h2>
      <Row>
        { appliedCourses.map((course, index) => (
          <Col key={ index } md={ 6 } lg={ 4 } className="mb-4">
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <Link href={ `${ COURSES_PAGE }/1` }>
                    <h5 className="card-title">
                      { course.category }
                    </h5>
                    <div className="card-text">Курс: { course.name }</div>
                    <div className="card-text">Цена: { course.price }</div>
                    <div className="card-text">Дата: { course.date }</div>
                  </Link>
                  <Dropdown as={ ButtonGroup }>
                    <Dropdown.Toggle split variant="link" id={ `dropdown-split-basic-${ index }` } />
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={ () => handleUnsubscribe(index) }>Отписаться</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )) }
      </Row>
    </Container>
  );
};

export default Courses;
