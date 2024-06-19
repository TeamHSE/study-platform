import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { IUser } from "@/types/auth.types";

interface EditUserModalProps {
  show: boolean;
  handleClose: () => void;
  userInfo: IUser | null;
  handleSave: (data: IUser) => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ show, handleClose, userInfo, handleSave }) => {
  const [ formData, setFormData ] = useState<IUser | null>(null);

  useEffect(() => {
    if (userInfo) {
      setFormData(userInfo);
    }
  }, [ userInfo ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: name === "isMale" ? value === "true" : value
      });
    }
  };

  const handleSubmit = () => {
    if (formData) {
      handleSave(formData);
    }
  };

  if (!formData) {
    return null;
  }

  return (
    <Modal show={ show } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать пользователя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Никнейм</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={ formData.username }
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Group controlId="formFirstName">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={ formData.firstName }
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={ formData.lastName }
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={ formData.email }
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Group controlId="formBirthDate">
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              value={ formData.birthDate ? formData.birthDate.split("T")[0] : "" }
              onChange={ handleChange }
            />
            <Form.Group controlId="formGender">
              <Form.Label>Пол</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Мужской"
                  id="male"
                  name="isMale"
                  value="true"
                  checked={ formData.isMale === true }
                  onChange={ handleChange }
                  inline
                />
                <Form.Check
                  type="radio"
                  label="Женский"
                  id="female"
                  name="isMale"
                  value="false"
                  checked={ formData.isMale === false }
                  onChange={ handleChange }
                  inline
                />
              </div>
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formWeight">
            <Form.Label>Вес</Form.Label>
            <Form.Control
              type="number"
              name="weight"
              value={ formData.weight || "" }
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Group controlId="formHeight">
            <Form.Label>Рост</Form.Label>
            <Form.Control
              type="number"
              name="height"
              value={ formData.height || "" }
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Group controlId="formAchievements">
            <Form.Label>Достижения</Form.Label>
            <Form.Control
              as="textarea"
              name="achievements"
              value={ formData.achievements || "" }
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Group controlId="formHealthIssues">
            <Form.Label>Проблемы со здоровьем</Form.Label>
            <Form.Control
              as="textarea"
              name="healthIssues"
              value={ formData.healthIssues || "" }
              onChange={ handleChange }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ handleClose }>
          Отмена
        </Button>
        <Button variant="primary" onClick={ handleSubmit }>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
