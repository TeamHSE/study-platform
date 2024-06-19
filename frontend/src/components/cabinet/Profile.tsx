"use client";

import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { IUser } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { WELCOME_PAGE } from "@/constants/pages-url.constants";
import { useProfile } from "@/hooks/useProfile";

const Profile = () => {
  const [ show, setShow ] = useState(false);
  const [ userInfo, setUserInfo ] = useState<IUser | null>(null);
  const { user, isLoading } = useProfile();

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [ user ]);

  const handleClose = () => {
    setShow(false);
    if (user) {
      setUserInfo(user);
    }
  };
  const handleShow = () => setShow(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = () => {
    // todo: update user logic
    handleClose();
  };

  const router = useRouter();
  const logout = async () => {
    await authService.logout();
    router.push(WELCOME_PAGE);
  };

  return (
    isLoading ? (
      <p>Загрузка...</p>
    ) : (
      <Container>
        <Row className="my-3">
          <Col md={ 8 } className="text-center">
            <h1>{ user.username }</h1>
          </Col>
          <Col md={ 4 } className="d-flex align-items-center justify-content-end">
            <Button variant="dark" onClick={ handleShow }>
              <FaEdit /> Редактировать
            </Button>
          </Col>
        </Row>
        <Row className="my-3">
          <Col md={ 6 }>
            <p><strong>Имя:</strong> { user.firstName }</p>
            <p><strong>Фамилия:</strong> { user.lastName }</p>
            <p><strong>Email:</strong> { user.email }</p>
            <p><strong>Пол:</strong> { (user.isMale && (user.isMale ? "Мужской" : "Женский")) ?? "Не указан" }</p>
          </Col>
          <Col md={ 6 }>
            <p><strong>Дата
                       рождения:</strong> { (user.birthDate && new Date(user.birthDate).toLocaleDateString()) ?? "Не указана" }
            </p>
            <p><strong>Вес:</strong> { user.weight ?? "?" } кг</p>
            <p><strong>Рост:</strong> { user.height ?? "?" } см</p>
            <p><strong>Достижения:</strong> { user.achievements ?? "Не указаны" }</p>
            <p><strong>Проблемы со здоровьем:</strong> { user.healthIssues ?? "Не указаны" }</p>
          </Col>
        </Row>
        <Row className="my-5">
          <Col md={ 12 }>
            <h5>Ваши курсы</h5>
            <hr />
            <Row>
              <Col md={ 4 }><strong>Курсы</strong></Col>
              <Col md={ 4 }><strong>Цена</strong></Col>
              <Col md={ 4 }><strong>Дата</strong></Col>
            </Row>
            <Row className="my-3">
              <Col md={ 4 }>Название курса</Col>
              <Col md={ 4 }>$350</Col>
              <Col md={ 4 }>20/08/2024</Col>
            </Row>
            <Row className="my-3">
              <Col md={ 4 }>Название курса</Col>
              <Col md={ 4 }>$350</Col>
              <Col md={ 4 }>20/08/2024</Col>
            </Row>
            <Button variant="dark" className="mt-3">
              Добавить новый курс
            </Button>
          </Col>
        </Row>

        <Modal show={ show } onHide={ handleClose }>
          <Modal.Header closeButton>
            <Modal.Title>Редактировать информацию пользователя</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите имя"
                  name="firstName"
                  value={ userInfo?.firstName }
                  onChange={ handleChange }
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите фамилию"
                  name="lastName"
                  value={ userInfo?.lastName }
                  onChange={ handleChange }
                />
              </Form.Group>
              <Form.Group controlId="formUsername">
                <Form.Label>Никнейм</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите никнейм"
                  name="username"
                  value={ userInfo?.username }
                  onChange={ handleChange }
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Введите email"
                  name="email"
                  value={ userInfo?.email }
                  onChange={ handleChange }
                />
              </Form.Group>
              <Form.Group controlId="formIsMale">
                <Form.Label>Пол</Form.Label>
                <Form.Check
                  type="radio"
                  label="Мужской"
                  name="isMale"
                  value="true"
                  checked={ userInfo?.isMale ?? true }
                  onChange={ () => setUserInfo((prev) => (prev ? { ...prev, isMale: true } : null)) }
                />
                <Form.Check
                  type="radio"
                  label="Женский"
                  name="isMale"
                  value="false"
                  checked={ !(userInfo?.isMale ?? true) }
                  onChange={ () => setUserInfo((prev) => (prev ? { ...prev, isMale: false } : null)) }
                />
              </Form.Group>
              <Form.Group controlId="formBirthDate">
                <Form.Label>Дата рождения</Form.Label>
                <Form.Control
                  type="date"
                  name="birthDate"
                  value={ (userInfo?.birthDate && new Date(userInfo.birthDate).toISOString().substr(0, 10)) ?? "" }
                  onChange={ handleChange }
                />
              </Form.Group>
              <Form.Group controlId="formWeight">
                <Form.Label>Вес (кг)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Введите вес"
                  name="weight"
                  value={ userInfo?.weight }
                  onChange={ handleChange }
                />
              </Form.Group>
              <Form.Group controlId="formHeight">
                <Form.Label>Рост (см)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Введите рост"
                  name="height"
                  value={ userInfo?.height }
                  onChange={ handleChange }
                />
              </Form.Group>
              <Form.Group controlId="formAchievements">
                <Form.Label>Достижения</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={ 3 }
                  placeholder="Введите достижения"
                  name="achievements"
                  value={ userInfo?.achievements }
                  onChange={ handleChange }
                />
              </Form.Group>
              <Form.Group controlId="formHealthIssues">
                <Form.Label>Проблемы со здоровьем</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={ 3 }
                  placeholder="Введите проблемы со здоровьем"
                  name="healthIssues"
                  value={ userInfo?.healthIssues }
                  onChange={ handleChange }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={ handleClose }>
              Отмена
            </Button>
            <Button variant="primary" onClick={ handleSave }>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>)
  );
};

export default Profile;