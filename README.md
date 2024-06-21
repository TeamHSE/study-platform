Проект по разработке веб-приложения для организации тренировочных курсов с элементами геймификации

Технологии:
- Frontend: React, Next.js, Bootstrap
- Backend: Node.js, Express, ORM
- DB: PostgreSQL

# Quick start

## Информация о проекте
Соглашения о процессе ведения проекта (роли, git, GitHub), а также документация доступны в [Wiki](https://github.com/TeamHSE/train-platform/wiki) проекта

Вы также можете непосредственно отслеживать ход выполнения задач проекта в [Issues](https://github.com/TeamHSE/train-platform/issues), [Pull requests](https://github.com/TeamHSE/train-platform/pulls), а также на [Kanban-доске](https://github.com/orgs/TeamHSE/projects/1) проекта

Что-то обсудить, предложить или задать вопрос можно в [разделе дискуссий](https://github.com/TeamHSE/train-platform/discussions/62). Будем рады пообщаться!

- [API DOCS](https://github.com/TeamHSE/train-platform/wiki/Endpoints)
- [Development Agreement](https://github.com/TeamHSE/train-platform/wiki/Dev-Experience)
- [Buisness model](https://github.com/TeamHSE/train-platform/wiki/Business-model)
- [UI Design](https://www.figma.com/file/K5YbaVEbehlOig6ZWo1Mft/HSE-Project?type=design&node-id=0%3A1&mode=design&t=ecU1TQEZhG9LRVbk-1)

## Запуск проекта

### Docker (рекомендуется)
Требования: Docker, docker-compose<br>

Для запуска необходимо в корне проекта выполнить команду
```
docker-compose up --build
```
В Docker должны появиться 3 контейнера: для backend, frontend и postgres<br>
Доступ к интерфейсу приложения по умолчанию осуществляется по адресу http://localhost:3001

### Ручной запуск

Инструкции по ручному запуску приложения расположены в директориях backend (для запуска бэкенд-приложения) и frontend (для запуска фронтенд-приложения)

- [Frontend](https://github.com/TeamHSE/train-platform/blob/develop/frontend/README.md)
- [Backend](https://github.com/TeamHSE/train-platform/blob/develop/backend/README.md)
