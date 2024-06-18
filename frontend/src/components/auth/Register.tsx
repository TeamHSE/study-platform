"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { IRegisterForm } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button, Card, Container, Form } from "react-bootstrap";
import { LOGIN_PAGE } from "@/constants/pages-url.constants";
import { authService } from "@/services/auth.service";
import { emailRegex, generalRegex, lettersRegex, matchPasswords } from "@/utils";

export function Register() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IRegisterForm>({
    mode: "onTouched"
  });
  const { push } = useRouter();
  const [ loading, setLoading ] = useState(false);

  const { mutate } = useMutation({
    mutationKey: [ "register" ],
    mutationFn: async (form: IRegisterForm) => {
      setLoading(true);
      let error = await authService.register(form);
      setLoading(false);
      if (error) {
        throw new Error(error);
      }
    },
    onSuccess() {
      toast.success("Успешная регистрация!");
      reset();
      push(LOGIN_PAGE);
    },
    onError(err) {
      toast.error(err.message);
    }
  });

  const onSubmit: SubmitHandler<IRegisterForm> = form => {
    mutate(form);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card style={ { maxWidth: "35%", width: "100%" } }>
        <Card.Body>
          <Card.Title className="text-center mb-4 display-6 py-3">Регистрация</Card.Title>
          <Form onSubmit={ handleSubmit(onSubmit) }>
            <Form.Group className="mb-3" controlId="formLogin">
              <Form.Label>Логин (e-mail)</Form.Label>
              <Form.Control type="text" placeholder="Введите Ваш e-mail..."
                            isInvalid={ !!errors.email }
                            {
                              ...register("email",
                                {
                                  required: "Введите, пожалуйста, логин",
                                  minLength: { value: 3, message: "Введите не менее 3 символов" },
                                  maxLength: { value: 100, message: "Введите не более 100 символов" },
                                  pattern: {
                                    value: emailRegex,
                                    message: "Введите корректный e-mail"
                                  }
                                })
                            } />
              <Form.Control.Feedback type="invalid">
                { errors.email && errors.email.message }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Никнейм</Form.Label>
              <Form.Control type="text" placeholder="Придумайте никнейм..."
                            isInvalid={ !!errors.username }
                            {
                              ...register("username",
                                {
                                  required: "Введите, пожалуйста, никнейм",
                                  minLength: { value: 3, message: "Введите не менее 3 символов" },
                                  maxLength: { value: 100, message: "Введите не более 100 символов" },
                                  pattern: {
                                    value: generalRegex,
                                    message: "Разрешены латинские буквы и некоторые другие символы"
                                  }
                                })
                            } />
              <Form.Control.Feedback type="invalid">
                { errors.username && errors.username.message }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control type="text" placeholder="Введите вашу фамилию..."
                            isInvalid={ !!errors.lastName }
                            {
                              ...register("lastName",
                                {
                                  required: "Введите, пожалуйста, фамилию",
                                  minLength: { value: 3, message: "Введите не менее 3 символов" },
                                  maxLength: { value: 100, message: "Введите не более 100 символов" },
                                  pattern: {
                                    value: lettersRegex,
                                    message: "Введите только буквы"
                                  }
                                })
                            } />
              <Form.Control.Feedback type="invalid">
                { errors.lastName && errors.lastName.message }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>Имя</Form.Label>
              <Form.Control type="text" placeholder="Введите ваше имя..."
                            isInvalid={ !!errors.firstName }
                            {
                              ...register("firstName",
                                {
                                  required: "Введите, пожалуйста, имя",
                                  minLength: { value: 3, message: "Введите не менее 3 символов" },
                                  maxLength: { value: 100, message: "Введите не более 100 символов" },
                                  pattern: {
                                    value: lettersRegex,
                                    message: "Введите только буквы"
                                  }
                                })
                            } />
              <Form.Control.Feedback type="invalid">
                { errors.firstName && errors.firstName.message }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" placeholder="Введите Ваш пароль..."
                            isInvalid={ !!errors.password }
                            {
                              ...register("password",
                                {
                                  required: "Введите, пожалуйста, пароль",
                                  minLength: { value: 3, message: "Введите не менее 3 символов" },
                                  maxLength: { value: 100, message: "Введите не более 100 символов" },
                                  pattern: {
                                    value: generalRegex,
                                    message: "Введите корректные символы"
                                  }
                                })
                            } />
              <Form.Control.Feedback type="invalid">
                { errors.password && errors.password.message }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Повторите пароль</Form.Label>
              <Form.Control type="password" placeholder="Повторите Ваш пароль..."
                            isInvalid={ !!errors.confirmPassword }
                            {
                              ...register("confirmPassword",
                                {
                                  required: "Повторите, пожалуйста, пароль",
                                  minLength: { value: 3, message: "Введите не менее 3 символов" },
                                  maxLength: { value: 100, message: "Введите не более 100 символов" },
                                  pattern: {
                                    value: generalRegex,
                                    message: "Введите корректные символы"
                                  },
                                  validate: (confirmPass, formValues) => {
                                    if (!matchPasswords(formValues.password, confirmPass)) {
                                      return "Пароли не совпадают!";
                                    }
                                  }
                                })
                            } />
              <Form.Control.Feedback type="invalid">
                { errors.confirmPassword && errors.confirmPassword.message }
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 my-3" disabled={ loading }>
              { loading ? "Регистрируем..." : "Зарегистрироваться" }
            </Button>
          </Form>
          <div className="text-center mt-3">
            <span className="text-muted">Уже есть аккаунт? </span>
            <Link href={ LOGIN_PAGE } passHref>
              <Button variant="link">Войти в существующий</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}