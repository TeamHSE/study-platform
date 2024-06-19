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

export const userValidationDescription = () => {
  return [
    check("login").isEmail().withMessage("Неверный формат почты!"),
    check("username")
      .not()
      .isEmpty()
      .withMessage("Имя пользователя не может быть пустым!"),
    check("firstName").not().isEmpty().withMessage("Имя не может быть пустым!"),
    check("lastName")
      .not()
      .isEmpty()
      .withMessage("Фамилия не может быть пустой!"),
    check("isMale")
      .optional({nullable: true })
      .isBoolean()
      .withMessage("Пол должен быть указан как булевое значение!"),
    check("birthDate")
      .optional({nullable: true })
      .isISO8601()
      .toDate()
      .withMessage("Неверный формат даты!"),
    check("weight").optional().isFloat().withMessage("Вес должен быть числом!"),
    check("height")
      .optional({nullable: true })
      .isFloat()
      .withMessage("Рост должен быть числом!"),
    check("achievements")
      .optional({nullable: true })
      .isString()
      .withMessage("Достижения должны быть строкой!"),
    check("healthIssues")
      .optional({nullable: true })
      .isString()
      .withMessage("Проблемы со здоровьем должны быть строкой!"),
  ];
};
