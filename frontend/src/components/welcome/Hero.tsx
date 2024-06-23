import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { DASHBOARD_PAGE } from "@/constants/pages-url.constants";
import VideoBackground from "@/components/welcome/VideoBackground";

const HeroSection = () => {
  return (
    <>
      <VideoBackground />
      <div className="hero-section text-center text-white bg-opacity-0 landing-section"
           style={ { position: "relative", zIndex: 1 } }>
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
    </>);
};

export default HeroSection;
