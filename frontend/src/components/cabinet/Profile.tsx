"use client";

import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { IUser } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { WELCOME_PAGE } from "@/constants/pages-url.constants";
import { useProfile } from "@/hooks/useProfile";
import { CiLogout } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { AddCourseModal } from "@/components/cabinet/AddCourseModal";
import { EditUserModal } from "@/components/cabinet/EditUserModal";
import { userService } from "@/services/user.service";
import Loader from "@/components/Loader";

const Profile = () => {
  const { user, isLoading } = useProfile();

  /* LOGOUT & DELETE */
  const router = useRouter();

  const [ showLogout, setShowLogout ] = useState(false);
  const [ showDelete, setShowDelete ] = useState(false);

  const handleShowLogout = () => setShowLogout(true);
  const handleCloseLogout = () => setShowLogout(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const handleLogout = async () => {
    await authService.logout();
    router.push(WELCOME_PAGE);
    setShowLogout(false);
  };

  const handleDelete = async () => {
    await authService.delete();
    router.push(WELCOME_PAGE);
    setShowDelete(false);
  };

  /* COURSE MGM */
  const [ showAddCourse, setShowAddCourse ] = useState(false);

  const handleShowAddCourse = () => setShowAddCourse(true);
  const handleCloseAddCourse = () => setShowAddCourse(false);

  /* USER EDIT */
  const [ showEditUserForm, setShowEditUserForm ] = useState(false);
  const [ userInfo, setUserInfo ] = useState<IUser | null>(null);

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [ user ]);

  const handleShowEditUserForm = () => {
    if (user) {
      setUserInfo(user);
      setShowEditUserForm(true);
    }
  };

  const handleCloseEditUserForm = () => setShowEditUserForm(false);

  const handleSaveEditUserForm = async (data: IUser) => {
    let newUser = await userService.updateUser(data);
    if (newUser) {
      setShowEditUserForm(false);
      setUserInfo(newUser);
      location.reload();
    }
  };

  return (
    isLoading ? (
      <Loader />
    ) : (
      <Container>
        <Row className="my-3 justify-content-center">
          <Col md={ 8 } className="text-center">
            <h1>{ user.username }</h1>
            <Row className="mt-3 justify-content-center">
              <Col xs={ 12 } md={ 4 } className="d-flex justify-content-center mb-2 mb-md-0">
                <Button variant="dark" onClick={ handleShowEditUserForm }>
                  <FaEdit /> Редактировать
                </Button>
              </Col>
              <Col xs={ 12 } md={ 4 } className="d-flex justify-content-center mb-2 mb-md-0">
                <Button variant="dark" onClick={ handleShowLogout }>
                  <CiLogout /> Выйти из аккаунта
                </Button>
              </Col>
              <Col xs={ 12 } md={ 4 } className="d-flex justify-content-center">
                <Button variant="danger" onClick={ handleShowDelete }>
                  <MdDelete /> Удалить аккаунт
                </Button>
              </Col>
            </Row>
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
            <h5>Созданные Вами курсы</h5>
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
            <Button variant="dark" className="mt-3" onClick={ handleShowAddCourse }>
              Добавить новый курс
            </Button>
          </Col>
        </Row>

        <EditUserModal
          show={ showEditUserForm }
          handleClose={ handleCloseEditUserForm }
          userInfo={ userInfo }
          handleSave={ handleSaveEditUserForm }
        />

        {/* Logout Modal */ }
        <Modal show={ showLogout } onHide={ handleCloseLogout }>
          <Modal.Header closeButton>
            <Modal.Title>Подтвердите Выход из аккаунта</Modal.Title>
          </Modal.Header>
          <Modal.Body>Вы действительно хотите выйти из аккаунта? Вы сможете войти снова без потери данных</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={ handleCloseLogout }>
              Отмена
            </Button>
            <Button variant="danger" onClick={ handleLogout }>
              Выйти
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Modal */ }
        <Modal show={ showDelete } onHide={ handleCloseDelete }>
          <Modal.Header closeButton>
            <Modal.Title>Подтвердите Удаление аккаунта</Modal.Title>
          </Modal.Header>
          <Modal.Body>Вы действительно хотите удалить аккаунт? Все Ваши данные будут уничтожены
                      безвозвратно</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={ handleCloseDelete }>
              Отмена
            </Button>
            <Button variant="danger" onClick={ handleDelete }>
              Удалить
            </Button>
          </Modal.Footer>
        </Modal>

        {/*Add course modal*/ }
        <AddCourseModal show={ showAddCourse } handleClose={ handleCloseAddCourse } />
      </Container>
    )
  );
};

export default Profile;