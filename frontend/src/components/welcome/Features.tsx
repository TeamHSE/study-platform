// components/FeaturesSection.js
import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const FeaturesSection = () => {
  return (
    <div className="features py-5 landing-section">
      <Container>
        <Row className="text-center">
          <Col md={ 6 } className="d-flex align-items-stretch mb-4">
            <Card className="flex-fill">
              <Card.Body>
                <Card.Title className="my-4 pb-4">Тренировочные курсы</Card.Title>
                <Card.Text>
                  Наши тренировочные курсы охватывают широкий спектр спортивных дисциплин и уровней подготовки.
                  Вы найдете курсы по бегу, силовым тренировкам, йоге, плаванию и многим другим видам спорта.
                  <br /><br />
                  Каждый курс разработан опытными тренерами, которые делятся своими знаниями и практическим опытом,
                  помогая вам достичь ваших целей.
                  <br /><br />
                  Независимо от того, являетесь ли вы начинающим или опытным спортсменом, вы найдете что-то
                  подходящее для себя, чтобы улучшить свои навыки и повысить уровень физической подготовки.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={ 6 } className="d-flex align-items-stretch mb-4">
            <Card className="flex-fill">
              <Card.Body>
                <Card.Title className="my-4 pb-4">Публикация собственных курсов</Card.Title>
                <Card.Text>
                  Наша платформа предоставляет уникальную возможность делиться своими знаниями и опытом с другими.
                  <br /><br />
                  Вы можете создать и опубликовать собственные тренировочные курсы, которые будут доступны для всех
                  пользователей.
                  <br /><br />
                  Делитесь своими уникальными методиками и программами тренировок, помогайте другим достигать успехов в
                  спорте
                  и становитесь частью нашего сообщества тренеров. Благодаря нашей удобной системе публикации,
                  ваш курс легко найдут те, кому он будет полезен, и вы сможете получить обратную связь от благодарных
                  пользователей.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FeaturesSection;
