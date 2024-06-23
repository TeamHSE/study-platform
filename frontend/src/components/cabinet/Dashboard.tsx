"use client";

import React from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { COURSES_PAGE } from "@/constants/pages-url.constants";
import Link from "next/link";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const data = {
    labels: [ "Завершили курс", "Проходят сейчас", "Не выбрали ни один курс" ],
    datasets: [
      {
        data: [ 256894, 256894, 256894 ],
        backgroundColor: [ "#FF6384", "#36A2EB", "#FFCE56" ],
        hoverBackgroundColor: [ "#FF6384", "#36A2EB", "#FFCE56" ]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <h1>Главная</h1>
      </Row>
      <Row className="mb-4">
        <Col md={ 4 }>
          <Card className="text-center p-3">
            <Card.Body>
              <Card.Title>7498</Card.Title>
              <Card.Text>Количество курсов</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={ 4 }>
          <Card className="text-center p-3">
            <Card.Body>
              <Card.Title>1375</Card.Title>
              <Card.Text>Количество создателей</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={ 4 }>
          <Card className="text-center p-3">
            <Card.Body>
              <Card.Title>8360</Card.Title>
              <Card.Text>Количество учеников</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={ 6 }>
          <h4>Популярные категории</h4>
          <ListGroup>
            <ListGroupItem>
              <p>Full-body</p> 9,287 9,287 $9,287
            </ListGroupItem>
            <ListGroupItem>
              <p>Calisthenics</p> 9,287 9,287 $9,287
            </ListGroupItem>
            <ListGroupItem>
              <p>Gym</p> 9,287 9,287 $9,287
            </ListGroupItem>
            <ListGroupItem>
              <p>At home</p> 9,287 9,287 $9,287
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={ 6 }>
          <h4>Статистика платформы</h4>
          <div style={ { height: "300px" } }>
            <Pie data={ data } options={ options } />
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>Популярные курсы</h4>
        </Col>
      </Row>
      <Row>
        <Col md={ 4 } className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>
                <a href={ `${ COURSES_PAGE }/1` } className={ "stretched-link" }>Утренняя зарядка</a>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={ 4 } className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>
                <a href={ `${ COURSES_PAGE }/2` } className={ "stretched-link" }>Все тело за 1 час</a>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={ 4 } className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>
                <a href={ `${ COURSES_PAGE }/3` } className={ "stretched-link" }>Растяжка перед сном</a>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
