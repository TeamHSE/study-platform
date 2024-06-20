import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IUser } from "@/types/auth.types";

interface EditUserModalProps {
  show: boolean;
  handleClose: () => void;
  userInfo: IUser | null;
  handleSave: (data: IUser) => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ show, handleClose, userInfo, handleSave }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<IUser>({
    mode: "onTouched",
    defaultValues: userInfo || {}
  });

  useEffect(() => {
    if (userInfo) {
      reset(userInfo);
    }
  }, [ userInfo, reset ]);

  const onSubmit: SubmitHandler<IUser> = (data) => {
    handleSave(data);
  };

  return (
    <Modal show={ show } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать пользователя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={ handleSubmit(onSubmit) }>
          <Form.Group controlId="formUsername">
            <Form.Label className={ "my-1" }>Никнейм</Form.Label>
            <Controller
              name="username"
              control={ control }
              rules={ { required: "Введите никнейм", maxLength: 50 } }
              render={ ({ field }) => (
                <Form.Control type="text" isInvalid={ !!errors.username } { ...field } />
              ) }
            />
            <Form.Control.Feedback type="invalid">
              { errors.username && errors.username.message }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formFirstName">
            <Form.Label className={ "my-1" }>Имя</Form.Label>
            <Controller
              name="firstName"
              control={ control }
              rules={ { required: "Введите имя", maxLength: 50 } }
              render={ ({ field }) => (
                <Form.Control type="text" isInvalid={ !!errors.firstName } { ...field } />
              ) }
            />
            <Form.Control.Feedback type="invalid">
              { errors.firstName && errors.firstName.message }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label className={ "my-1" }>Фамилия</Form.Label>
            <Controller
              name="lastName"
              control={ control }
              rules={ { required: "Введите фамилию", maxLength: 50 } }
              render={ ({ field }) => (
                <Form.Control type="text" isInvalid={ !!errors.lastName } { ...field } />
              ) }
            />
            <Form.Control.Feedback type="invalid">
              { errors.lastName && errors.lastName.message }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label className={ "my-1" }>Email</Form.Label>
            <Controller
              name="email"
              control={ control }
              rules={ {
                required: "Введите email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Введите корректный email"
                }
              } }
              render={ ({ field }) => (
                <Form.Control type="email" isInvalid={ !!errors.email } { ...field } />
              ) }
            />
            <Form.Control.Feedback type="invalid">
              { errors.email && errors.email.message }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBirthDate">
            <Form.Label className={ "my-1" }>Дата рождения</Form.Label>
            <Controller
              name="birthDate"
              control={ control }
              rules={ {
                required: "Введите корректную дату рождения",
                validate: (date) => {
                  const selectedDate = (date && new Date(date)) ?? new Date();
                  return selectedDate <= new Date() || "Дата рождения не может быть в будущем";
                }
              } }
              render={ ({ field }) => (
                <Form.Control
                  type="date"
                  isInvalid={ !!errors.birthDate }
                  { ...field }
                  value={ field.value ? field.value.toString() : "" }
                />
              ) }
            />
            <Form.Control.Feedback type="invalid">
              { errors.birthDate && errors.birthDate.message }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formGender">
            <Form.Label className={ "my-1" }>Пол</Form.Label>
            <Controller
              name="isMale"
              control={ control }
              rules={ { required: "Выберите пол" } }
              render={ ({ field }) => (
                <div>
                  <Form.Check
                    type="radio"
                    label="Мужской"
                    id="male"
                    value="true"
                    checked={ field.value === true }
                    onChange={ () => field.onChange(true) }
                    inline
                  />
                  <Form.Check
                    type="radio"
                    label="Женский"
                    id="female"
                    value="false"
                    checked={ field.value === false }
                    onChange={ () => field.onChange(false) }
                    inline
                  />
                </div>
              ) }
            />
            <Form.Control.Feedback type="invalid">
              { errors.isMale && errors.isMale.message }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formWeight">
            <Form.Label className={ "my-1" }>Вес (кг)</Form.Label>
            <Controller
              name="weight"
              control={ control }
              rules={ { required: "Введите вес", min: 0, max: 500 } }
              render={ ({ field }) => (
                <Form.Control type="number" isInvalid={ !!errors.weight } { ...field } min={ 30 } max={ 500 } />
              ) }
            />
            <Form.Control.Feedback type="invalid">
              { errors.weight && errors.weight.message }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formHeight">
            <Form.Label className={ "my-1" }>Рост (см)</Form.Label>
            <Controller
              name="height"
              control={ control }
              rules={ { required: "Введите рост", min: 0, max: 300 } }
              render={ ({ field }) => (
                <Form.Control type="number" isInvalid={ !!errors.height } { ...field } min={ 100 } max={ 300 } />
              ) }
            />
            <Form.Control.Feedback type="invalid">
              { errors.height && errors.height.message }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formAchievements">
            <Form.Label className={ "my-1" }>Достижения</Form.Label>
            <Controller
              name="achievements"
              control={ control }
              rules={ { max: 1000 } }
              render={ ({ field }) => (
                <Form.Control as="textarea" isInvalid={ !!errors.achievements } { ...field } />
              ) }
            />
            <Form.Control.Feedback type="invalid">
              { errors.achievements && errors.achievements.message }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formHealthIssues">
            <Form.Label className={ "my-1" }>Проблемы со здоровьем</Form.Label>
            <Controller
              name="healthIssues"
              control={ control }
              rules={ { max: 1000 } }
              render={ ({ field }) => (
                <Form.Control as="textarea" isInvalid={ !!errors.healthIssues } { ...field } />
              ) }
            />
            <Form.Control.Feedback type="invalid">
              { errors.healthIssues && errors.healthIssues.message }
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={ handleClose }>
              Отмена
            </Button>
            <Button variant="primary" type={ "submit" }>
              Сохранить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
