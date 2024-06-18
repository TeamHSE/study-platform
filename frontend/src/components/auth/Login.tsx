"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthForm } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button, Card, Container, Form } from "react-bootstrap";
import { DASHBOARD_PAGE, REGISTER_PAGE } from "@/constants/pages-url.constants";
import { authService } from "@/services/auth.service";

export function Login() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IAuthForm>({
    mode: "onTouched"
  });
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || DASHBOARD_PAGE;
  const [ loading, setLoading ] = useState(false);

  const { mutate } = useMutation({
    mutationKey: [ "login" ],
    mutationFn: async (form: IAuthForm) => {
      setLoading(true);
      let error = await authService.login(form);
      setLoading(false);
      if (error) {
        throw new Error(error);
      }
    },
    onSuccess() {
      toast.success("Успешный вход в аккаунт!");
      reset();
      push(redirect);
    },
    onError(err) {
      toast.error(err.message);
    }
  });

  const onSubmit: SubmitHandler<IAuthForm> = form => {
    mutate(form);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card style={ { maxWidth: "35%", width: "100%" } }>
        <Card.Body>
          <Card.Title className="text-center mb-4 display-6 py-3">Вход</Card.Title>
          <Form onSubmit={ handleSubmit(onSubmit) }>
            <Form.Group className="mb-3" controlId="formLogin">
              <Form.Label>Логин (e-mail)</Form.Label>
              <Form.Control type="text" placeholder="Введите Ваш логин..."
                            isInvalid={ !!errors.email }
                            {
                              ...register("email",
                                {
                                  required: "Введите, пожалуйста, логин",
                                  minLength: { value: 3, message: "Введите не менее 3 символов" },
                                  maxLength: { value: 100, message: "Введите не более 100 символов" },
                                  pattern: {
                                    value: /^[a-zA-Z0-9._%+-@]+$/,
                                    message: "Введите корректные символы"
                                  }
                                })
                            } />
              <Form.Control.Feedback type="invalid">
                { errors.email && errors.email.message }
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
                                    value: /^[a-zA-Z0-9._%+-@$*#]+$/,
                                    message: "Введите корректные символы"
                                  }
                                })
                            } />
              <Form.Control.Feedback type="invalid">
                { errors.password && errors.password.message }
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 my-3" disabled={ loading }>
              { loading ? "Входим..." : "Войти" }
            </Button>
          </Form>
          <div className="text-center mt-3">
            <span className="text-muted">Нужен аккаунт? </span>
            <Link href={ REGISTER_PAGE } passHref>
              <Button variant="link">Создать новый</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}