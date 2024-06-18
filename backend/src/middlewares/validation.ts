import { check } from "express-validator";

export const userValidationRules = () => {
  return [
    check("login").isEmail().withMessage("Неверный формат почты!"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Пароль слишком короткий!"),
    check("username")
      .not()
      .isEmpty()
      .withMessage("Имя пользователя не может быть пустым!"),
    check("firstName").not().isEmpty().withMessage("Имя не может быть пустым!"),
    check("lastName")
      .not()
      .isEmpty()
      .withMessage("Фамилия не может быть пустой!"),
  ];
};
