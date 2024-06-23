"use client";

import React, { useState } from "react";
import { Button, Row, Col, Card, ListGroup } from "react-bootstrap";

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

interface ClientCoursePageProps {
  course: Course;
}

const ClientCoursePage: React.FC<ClientCoursePageProps> = ({ course }) => {
  const [ applied, setApplied ] = useState(false);
  const [ currentModule, setCurrentModule ] = useState<Module | null>(null);

  const handleApply = () => {
    setApplied(true);
    setCurrentModule(course.modules[0]);
  };

  return (
    <div>
      { !applied ? (
        <div className="apply-section my-5 text-center">
          <Button variant="primary" size="lg" onClick={ handleApply }>
            Записаться на курс
          </Button>
        </div>
      ) : (
        <div className="course-content my-5">
          <Row>
            <Col md={ 8 }>
              { currentModule ? (
                <Card>
                  <Card.Body>
                    <Card.Title>{ currentModule.title }</Card.Title>
                    <Card.Text>{ currentModule.content }</Card.Text>
                  </Card.Body>
                </Card>
              ) : (
                <Card>
                  <Card.Body>
                    <Card.Title>Выберите модуль для просмотра его содержимого</Card.Title>
                  </Card.Body>
                </Card>
              ) }
            </Col>
            <Col md={ 4 }>
              <h2>Модули</h2>
              <ListGroup>
                { course.modules.map((module) => (
                  <ListGroup.Item
                    key={ module.id }
                    action
                    onClick={ () => setCurrentModule(module) }
                  >
                    { module.title }
                  </ListGroup.Item>
                )) }
              </ListGroup>
            </Col>
          </Row>
        </div>
      ) }
    </div>
  );
};

export default ClientCoursePage;
