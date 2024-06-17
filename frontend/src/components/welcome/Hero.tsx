import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { DASHBOARD_PAGE } from "@/constants/pages-url.constants";

const HeroSection = () => {
  return (
    <div className="hero-section text-center text-white bg-dark landing-section">
      <Container>
        <Row>
          <Col>
            <h1 className="py-5">Добро пожаловать!</h1>
            <p className="lead py-4">Курсы от тренеров любого уровня с возможностью<br />саморазвития и
                                     публикации <b>собственных</b> курсов <b>бесплатно</b>!</p>
            <Button href={ DASHBOARD_PAGE } variant="primary" size="lg">Начнем!</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
