"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "sonner";

interface ICourseForm {
  courseName: string;
  coursePrice: string;
  courseDate: string;
}

interface AddCourseModalProps {
  show: boolean;
  handleClose: () => void;
}

export function AddCourseModal({ show, handleClose }: AddCourseModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ICourseForm>({
    mode: "onTouched"
  });

  const [ loading, setLoading ] = useState(false);

  const { mutate } = useMutation({
    mutationKey: [ "addCourse" ],
    mutationFn: async (form: ICourseForm) => {
      setLoading(true);
      const response: any = {}; // todo: api call
      setLoading(false);
      if (response.error) {
        throw new Error(response.error);
      }
    },
    onSuccess() {
      toast.success("Курс успешно добавлен!");
      reset();
      handleClose();
    },
    onError(err) {
      toast.error(err.message);
    }
  });

  const onSubmit: SubmitHandler<ICourseForm> = form => {
    mutate(form);
  };

  return (
    <Modal show={ show } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новый курс</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={ handleSubmit(onSubmit) }>
          <Form.Group className="mb-3" controlId="formCourseName">
            <Form.Label>Название курса</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название курса"
              isInvalid={ !!errors.courseName }
              { ...register("courseName", {
                required: "Введите название курса",
                minLength: { value: 3, message: "Введите не менее 3 символов" },
                maxLength: { value: 100, message: "Введите не более 100 символов" }
              }) }
            />
            <Form.Control.Feedback type="invalid">
              { errors.courseName?.message }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCoursePrice">
            <Form.Label>Цена</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите цену курса"
              isInvalid={ !!errors.coursePrice }
              { ...register("coursePrice", {
                required: "Введите цену курса",
                pattern: { value: /^\d+$/, message: "Цена курса должна быть числом" }
              }) }
            />
            <Form.Control.Feedback type="invalid">
              { errors.coursePrice?.message }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCourseDate">
            <Form.Label>Дата</Form.Label>
            <Form.Control
              type="date"
              isInvalid={ !!errors.courseDate }
              { ...register("courseDate", { required: "Введите дату курса" }) }
            />
            <Form.Control.Feedback type="invalid">
              { errors.courseDate?.message }
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 my-3" disabled={ loading }>
            { loading ? "Сохраняем..." : "Сохранить" }
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ handleClose }>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
